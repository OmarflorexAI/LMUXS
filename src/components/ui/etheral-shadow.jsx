import { useRef, useEffect, useCallback } from 'react'

function Component({
  color = 'rgba(128, 128, 128, 1)',
  animation = { scale: 100, speed: 90 },
  noise = { opacity: 1, scale: 1.2 },
  sizing = 'fill',
  style,
  className,
  ...props
}) {
  const canvasRef = useRef(null)
  const frameRef = useRef(0)
  const noiseCanvasRef = useRef(null)

  const generateNoise = useCallback((width, height, noiseScale) => {
    const offscreen = document.createElement('canvas')
    const nw = Math.ceil(width / noiseScale)
    const nh = Math.ceil(height / noiseScale)
    offscreen.width = nw
    offscreen.height = nh
    const ctx = offscreen.getContext('2d')
    const imageData = ctx.createImageData(nw, nh)
    const data = imageData.data
    for (let i = 0; i < data.length; i += 4) {
      const v = Math.random() * 255
      data[i] = v
      data[i + 1] = v
      data[i + 2] = v
      data[i + 3] = 255
    }
    ctx.putImageData(imageData, 0, 0)
    return offscreen
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let running = true
    const speed = animation.speed / 1000
    const scaleAmt = animation.scale / 100

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      noiseCanvasRef.current = generateNoise(
        rect.width,
        rect.height,
        Math.max(1, noise.scale)
      )
    }

    resize()
    window.addEventListener('resize', resize)

    const draw = (time) => {
      if (!running) return
      const w = canvas.getBoundingClientRect().width
      const h = canvas.getBoundingClientRect().height

      ctx.clearRect(0, 0, w, h)

      const t = time * 0.001 * speed
      const breathe = 1 + Math.sin(t) * 0.08 * scaleAmt
      const drift1X = Math.sin(t * 0.7) * w * 0.06
      const drift1Y = Math.cos(t * 0.5) * h * 0.06
      const drift2X = Math.cos(t * 0.6) * w * 0.08
      const drift2Y = Math.sin(t * 0.8) * h * 0.05
      const drift3X = Math.sin(t * 0.9) * w * 0.04
      const drift3Y = Math.cos(t * 0.4) * h * 0.07

      ctx.save()
      ctx.translate(w / 2, h / 2)
      ctx.scale(breathe, breathe)
      ctx.translate(-w / 2, -h / 2)

      // Primary shadow orb
      const cx1 = w * 0.5 + drift1X
      const cy1 = h * 0.5 + drift1Y
      const r1 = Math.max(w, h) * 0.45
      const g1 = ctx.createRadialGradient(cx1, cy1, 0, cx1, cy1, r1)
      g1.addColorStop(0, color)
      g1.addColorStop(0.4, color.replace(/[\d.]+\)$/, '0.5)'))
      g1.addColorStop(1, 'transparent')
      ctx.fillStyle = g1
      ctx.fillRect(0, 0, w, h)

      // Secondary orb — offset, softer
      const cx2 = w * 0.35 + drift2X
      const cy2 = h * 0.6 + drift2Y
      const r2 = Math.max(w, h) * 0.35
      const g2 = ctx.createRadialGradient(cx2, cy2, 0, cx2, cy2, r2)
      g2.addColorStop(0, color.replace(/[\d.]+\)$/, '0.6)'))
      g2.addColorStop(0.5, color.replace(/[\d.]+\)$/, '0.2)'))
      g2.addColorStop(1, 'transparent')
      ctx.fillStyle = g2
      ctx.fillRect(0, 0, w, h)

      // Tertiary orb — subtle accent
      const cx3 = w * 0.65 + drift3X
      const cy3 = h * 0.4 + drift3Y
      const r3 = Math.max(w, h) * 0.3
      const g3 = ctx.createRadialGradient(cx3, cy3, 0, cx3, cy3, r3)
      g3.addColorStop(0, color.replace(/[\d.]+\)$/, '0.35)'))
      g3.addColorStop(0.6, color.replace(/[\d.]+\)$/, '0.1)'))
      g3.addColorStop(1, 'transparent')
      ctx.fillStyle = g3
      ctx.fillRect(0, 0, w, h)

      ctx.restore()

      // Noise overlay
      if (noiseCanvasRef.current && noise.opacity > 0) {
        ctx.save()
        ctx.globalAlpha = noise.opacity * 0.15
        ctx.globalCompositeOperation = 'overlay'
        ctx.drawImage(noiseCanvasRef.current, 0, 0, w, h)
        ctx.restore()
      }

      frameRef.current = requestAnimationFrame(draw)
    }

    frameRef.current = requestAnimationFrame(draw)

    return () => {
      running = false
      cancelAnimationFrame(frameRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [color, animation.scale, animation.speed, noise.opacity, noise.scale, generateNoise])

  const sizeStyle =
    sizing === 'fill'
      ? { position: 'absolute', inset: 0, width: '100%', height: '100%' }
      : {}

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ ...sizeStyle, ...style }}
      {...props}
    />
  )
}

export { Component }
