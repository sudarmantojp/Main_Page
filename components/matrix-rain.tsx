"use client"

import { useEffect, useRef } from "react"

export function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    // Japanese + katakana + digits characters
    const chars =
      "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン０１２３４５６７８９ＡＢＣＤＥＦabcdef漢字日本語学習"
    const fontSize = 16
    const columns = Math.floor(canvas.width / fontSize)
    const drops: number[] = Array(columns).fill(1)

    const draw = () => {
      ctx.fillStyle = "rgba(8, 18, 8, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)]
        const x = i * fontSize
        const y = drops[i] * fontSize

        // Head character — bright white-green
        if (drops[i] * fontSize < canvas.height * 0.1) {
          ctx.fillStyle = "#afffaf"
          ctx.shadowColor = "#00ff41"
          ctx.shadowBlur = 8
        } else {
          // Body — classic matrix green
          const alpha = Math.random() * 0.5 + 0.5
          ctx.fillStyle = `rgba(0, 220, 80, ${alpha})`
          ctx.shadowColor = "#00ff41"
          ctx.shadowBlur = 4
        }

        ctx.font = `${fontSize}px monospace`
        ctx.fillText(char, x, y)
        ctx.shadowBlur = 0

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    const interval = setInterval(draw, 50)
    return () => {
      clearInterval(interval)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none opacity-30"
      aria-hidden="true"
    />
  )
}
