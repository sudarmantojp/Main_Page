import { MatrixRain } from "@/components/matrix-rain"
import { ToolCard } from "@/components/tool-card"

const tools = [
  {
    label: "Kanji_Writer",
    slug: "Kanji_Writer",
    icon: "✍️",
    kanji: "漢字",
    description: "Practice drawing kanji stroke-by-stroke with guided animations.",
    color: "green",
  },
  {
    label: "Study_Nihon",
    slug: "Study_Nihon",
    icon: "📚",
    kanji: "日本語",
    description: "Comprehensive Japanese study materials — vocab, grammar & more.",
    color: "red",
  },
  {
    label: "JapanQuiz",
    slug: "JapanQuiz",
    icon: "🎯",
    kanji: "試験",
    description: "Test your Japanese knowledge with interactive quizzes and flashcards.",
    color: "gold",
  },
  {
    label: "Kanji_Listening",
    slug: "Kanji_Listening",
    icon: "🎧",
    kanji: "聴解",
    description: "Train your ear with kanji pronunciation and listening exercises.",
    color: "cyan",
  },
]

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      {/* Matrix rain background */}
      <MatrixRain />

      {/* Radial glow center */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 40%, oklch(0.35 0.12 145 / 0.12) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-16">
        {/* Header */}
        <header className="text-center mb-14">
          {/* Japan flag dot */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-japan-red shadow-[0_0_20px_oklch(0.58_0.22_25/0.7)] flex-shrink-0" aria-hidden="true" />
            <span className="text-xs font-mono text-muted-foreground tracking-[0.3em] uppercase">
              Nihon Study Hub
            </span>
            <div className="w-10 h-10 rounded-full bg-japan-red shadow-[0_0_20px_oklch(0.58_0.22_25/0.7)] flex-shrink-0" aria-hidden="true" />
          </div>

          <h1
            className="text-5xl sm:text-7xl font-black tracking-tight text-balance leading-none mb-3"
            style={{
              textShadow:
                "0 0 20px oklch(0.72 0.22 145), 0 0 50px oklch(0.55 0.2 145 / 0.6)",
              color: "oklch(0.88 0.25 145)",
            }}
          >
            日本語を学ぼう
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground font-sans leading-relaxed max-w-md mx-auto text-balance">
            Choose your tool and begin your Japanese journey today
          </p>

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="h-px w-16 bg-matrix-green/40" />
            <span className="text-matrix-green font-mono text-sm tracking-widest">[ SELECT MODULE ]</span>
            <div className="h-px w-16 bg-matrix-green/40" />
          </div>
        </header>

        {/* Cards grid */}
        <section
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full max-w-6xl"
          aria-label="Japanese learning tools"
        >
          {tools.map((tool) => (
            <ToolCard key={tool.slug} {...tool} />
          ))}
        </section>

        {/* Footer */}
        <footer className="mt-16 text-center">
          <p className="text-muted-foreground text-xs font-mono tracking-widest">
            {"// "} sudarmantojp.github.io &nbsp;&bull;&nbsp; がんばって！
          </p>
          <div className="flex items-center justify-center gap-1 mt-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className="font-mono text-matrix-dim text-xs animate-pulse"
                style={{ animationDelay: `${i * 0.15}s` }}
                aria-hidden="true"
              >
                {["ア", "イ", "ウ", "エ", "オ"][i]}
              </span>
            ))}
          </div>
        </footer>
      </div>
    </main>
  )
}
