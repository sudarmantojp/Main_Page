"use client"

import { useState, useRef, useEffect } from "react"
import { ExternalLink } from "lucide-react"

interface ToolCardProps {
  label: string
  slug: string
  icon: string
  kanji: string
  description: string
  color: string
}

export function ToolCard({ label, slug, icon, kanji, description, color }: ToolCardProps) {
  const [hovered, setHovered] = useState(false)
  const [matrixText, setMatrixText] = useState(label)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const stepRef = useRef(0)

  const chars =
    "アイウエオカキクケコサシスセソタチツテトナニヌネノ漢字日本語学習ＡＢＣＤＥＦabcdef0123456789!@#$%"

  useEffect(() => {
    if (hovered) {
      stepRef.current = 0
      intervalRef.current = setInterval(() => {
        stepRef.current++
        const step = stepRef.current
        const scrambled = label
          .split("")
          .map((ch, i) => {
            if (ch === " ") return " "
            if (i < step - 2) return label[i]
            return chars[Math.floor(Math.random() * chars.length)]
          })
          .join("")
        setMatrixText(step > label.length + 3 ? label : scrambled)
        if (step > label.length + 3) {
          clearInterval(intervalRef.current!)
        }
      }, 60)
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current)
      setMatrixText(label)
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [hovered, label])

  const colorMap: Record<string, { border: string; glow: string; badge: string; text: string }> = {
    green: {
      border: "border-matrix-green/40 hover:border-matrix-green",
      glow: "hover:shadow-[0_0_40px_oklch(0.55_0.2_145/0.4),0_0_0_1px_oklch(0.72_0.22_145/0.6)]",
      badge: "bg-matrix-green/15 text-matrix-bright border border-matrix-green/30",
      text: "text-matrix-bright group-hover:matrix-glow-bright",
    },
    red: {
      border: "border-japan-red/40 hover:border-japan-red",
      glow: "hover:shadow-[0_0_40px_oklch(0.58_0.22_25/0.4),0_0_0_1px_oklch(0.58_0.22_25/0.6)]",
      badge: "bg-japan-red/15 text-japan-red border border-japan-red/30",
      text: "text-japan-red group-hover:japan-red-glow",
    },
    gold: {
      border: "border-japan-gold/40 hover:border-japan-gold",
      glow: "hover:shadow-[0_0_40px_oklch(0.82_0.18_85/0.4),0_0_0_1px_oklch(0.82_0.18_85/0.6)]",
      badge: "bg-japan-gold/15 text-japan-gold border border-japan-gold/30",
      text: "text-japan-gold",
    },
    cyan: {
      border: "border-cyan-500/40 hover:border-cyan-400",
      glow: "hover:shadow-[0_0_40px_rgba(34,211,238,0.3),0_0_0_1px_rgba(34,211,238,0.5)]",
      badge: "bg-cyan-500/15 text-cyan-300 border border-cyan-500/30",
      text: "text-cyan-300",
    },
  }

  const c = colorMap[color] ?? colorMap.green

  return (
    <a
      href={`https://sudarmantojp.github.io/${slug}`}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group relative flex flex-col gap-4 p-7 rounded-2xl bg-card border transition-all duration-300 cursor-pointer select-none
        ${c.border} ${c.glow}
        shadow-[0_4px_24px_rgba(0,0,0,0.5)]
        hover:-translate-y-2 hover:scale-[1.025]
        active:scale-[0.98]
      `}
      aria-label={`Open ${label} in a new tab`}
    >
      {/* Scanline overlay on hover */}
      <div
        className={`absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300 ${
          hovered ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,65,0.025) 2px, rgba(0,255,65,0.025) 4px)",
        }}
      />

      {/* Top row */}
      <div className="flex items-start justify-between">
        <span className="text-5xl leading-none" role="img" aria-hidden="true">
          {icon}
        </span>
        <div className="flex flex-col items-end gap-2">
          <span
            className={`text-3xl font-black leading-none transition-all duration-300 ${
              hovered ? "scale-110" : "scale-100"
            }`}
            style={
              hovered
                ? {
                    textShadow:
                      color === "red"
                        ? "0 0 12px oklch(0.58 0.22 25), 0 0 30px oklch(0.58 0.22 25 / 0.5)"
                        : color === "gold"
                          ? "0 0 12px oklch(0.82 0.18 85), 0 0 30px oklch(0.82 0.18 85 / 0.5)"
                          : color === "cyan"
                            ? "0 0 12px rgb(34 211 238), 0 0 30px rgb(34 211 238 / 0.5)"
                            : "0 0 12px oklch(0.88 0.25 145), 0 0 30px oklch(0.72 0.22 145)",
                  }
                : {}
            }
          >
            {kanji}
          </span>
          <ExternalLink
            size={16}
            className={`transition-all duration-200 ${
              hovered ? "opacity-100 translate-x-0 translate-y-0" : "opacity-0 -translate-x-1 translate-y-1"
            } text-muted-foreground`}
          />
        </div>
      </div>

      {/* Label with matrix scramble */}
      <div>
        <div
          className={`font-mono text-xl font-bold tracking-wider transition-all duration-100 ${c.text}`}
          style={
            hovered
              ? {
                  textShadow:
                    color === "red"
                      ? "0 0 8px oklch(0.58 0.22 25)"
                      : color === "gold"
                        ? "0 0 8px oklch(0.82 0.18 85)"
                        : color === "cyan"
                          ? "0 0 8px rgb(34 211 238)"
                          : "0 0 8px oklch(0.88 0.25 145), 0 0 20px oklch(0.72 0.22 145)",
                }
              : {}
          }
        >
          {matrixText}
        </div>
        <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{description}</p>
      </div>

      {/* Badge */}
      <div className="mt-auto">
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold font-mono ${c.badge}`}>
          <span
            className={`w-1.5 h-1.5 rounded-full animate-pulse ${
              color === "red"
                ? "bg-japan-red"
                : color === "gold"
                  ? "bg-japan-gold"
                  : color === "cyan"
                    ? "bg-cyan-400"
                    : "bg-matrix-green"
            }`}
          />
          sudarmantojp.github.io/{slug}
        </span>
      </div>
    </a>
  )
}
