'use client'

import Link from 'next/link'

// Pre-computed star positions to avoid hydration mismatch
const stars = [
  { x: 5, y: 8, s: 1, d: 0 }, { x: 12, y: 15, s: 1.5, d: 0.5 }, { x: 25, y: 5, s: 1, d: 1.2 },
  { x: 35, y: 20, s: 2, d: 0.3 }, { x: 45, y: 8, s: 1, d: 1.8 }, { x: 55, y: 18, s: 1.5, d: 0.7 },
  { x: 65, y: 3, s: 1, d: 2.1 }, { x: 75, y: 12, s: 2, d: 0.1 }, { x: 85, y: 6, s: 1, d: 1.5 },
  { x: 92, y: 22, s: 1.5, d: 0.9 }, { x: 8, y: 35, s: 1, d: 2.5 }, { x: 18, y: 42, s: 1.5, d: 0.4 },
  { x: 30, y: 38, s: 1, d: 1.1 }, { x: 42, y: 30, s: 2, d: 1.7 }, { x: 58, y: 35, s: 1, d: 0.2 },
  { x: 68, y: 28, s: 1.5, d: 2.3 }, { x: 78, y: 40, s: 1, d: 0.6 }, { x: 88, y: 32, s: 2, d: 1.4 },
  { x: 3, y: 55, s: 1, d: 1.9 }, { x: 15, y: 60, s: 1.5, d: 0.8 }, { x: 22, y: 48, s: 1, d: 2.7 },
  { x: 38, y: 52, s: 2, d: 0.2 }, { x: 48, y: 58, s: 1, d: 1.6 }, { x: 60, y: 50, s: 1.5, d: 2.0 },
  { x: 72, y: 55, s: 1, d: 0.5 }, { x: 82, y: 48, s: 2, d: 1.3 }, { x: 95, y: 52, s: 1, d: 2.8 },
  { x: 10, y: 70, s: 1.5, d: 0.3 }, { x: 28, y: 65, s: 1, d: 1.0 }, { x: 50, y: 72, s: 2, d: 2.2 },
  { x: 70, y: 68, s: 1, d: 0.7 }, { x: 90, y: 75, s: 1.5, d: 1.8 }, { x: 40, y: 78, s: 1, d: 2.4 },
  { x: 16, y: 82, s: 2, d: 0.1 }, { x: 62, y: 80, s: 1, d: 1.5 }, { x: 80, y: 85, s: 1.5, d: 2.6 },
]

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* === Background Layers === */}

      {/* Base gradient */}
      <div className="absolute inset-0 bg-[#0d1117]" />

      {/* Nebula / Aurora gradients */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% 0%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 70% 20%, rgba(236, 72, 153, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse 70% 50% at 30% 30%, rgba(41, 98, 255, 0.12) 0%, transparent 50%),
            radial-gradient(ellipse 50% 60% at 50% 100%, rgba(41, 98, 255, 0.08) 0%, transparent 50%)
          `,
        }}
      />

      {/* Aurora bands */}
      <div className="absolute top-0 left-0 right-0 h-[400px] opacity-30">
        <div
          className="absolute inset-0 animate-aurora"
          style={{
            background: `
              linear-gradient(180deg,
                transparent 0%,
                rgba(139, 92, 246, 0.12) 15%,
                rgba(236, 72, 153, 0.08) 30%,
                rgba(41, 98, 255, 0.06) 50%,
                transparent 70%
              )
            `,
          }}
        />
      </div>

      {/* Stars */}
      <div className="absolute inset-0">
        {stars.map((star, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-twinkle"
            style={{
              width: star.s + 'px',
              height: star.s + 'px',
              left: star.x + '%',
              top: star.y + '%',
              animationDelay: star.d + 's',
              animationDuration: '3s',
              opacity: 0.6,
            }}
          />
        ))}
      </div>

      {/* Cosmic ring / portal glow effect */}
      <div className="absolute bottom-[5%] left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-20">
        <div className="absolute inset-0 rounded-[50%] border border-purple-500/30 blur-sm" />
        <div className="absolute inset-4 rounded-[50%] border border-blue-500/20 blur-md" />
        <div className="absolute inset-8 rounded-[50%] border border-pink-500/20 blur-lg" />
      </div>

      {/* Earth-like gradient at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[40%]"
        style={{
          background: `
            radial-gradient(ellipse 120% 80% at 50% 120%,
              rgba(30, 80, 180, 0.15) 0%,
              rgba(20, 60, 140, 0.08) 30%,
              transparent 70%
            )
          `,
        }}
      />

      {/* Bottom fade to page bg */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#131722] to-transparent" />

      {/* === Content === */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center pt-20">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8">
          <div className="h-2 w-2 rounded-full bg-[#089981] animate-pulse" />
          <span className="text-xs text-[#d1d4dc] font-medium tracking-wide">
            AI-Powered Trading Platform
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[80px] font-bold text-white leading-[1.1] tracking-tight mb-6">
          <span className="block">Analyze first</span>
          <span className="block text-[#787b86] font-light italic">/ Then trade.</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-[#787b86] max-w-xl mx-auto mb-10 leading-relaxed">
          The best trades require research, then commitment.
          Let AI guide your financial decisions.
        </p>

        {/* CTA */}
        <div className="flex flex-col items-center gap-4">
          <Link
            href="/signup"
            className="inline-flex items-center px-8 py-3.5 text-base font-semibold text-[#131722] bg-white rounded-full hover:bg-white/90 transition-all duration-200 shadow-lg shadow-white/10 hover:shadow-white/20 hover:scale-[1.02] active:scale-[0.98]"
          >
            Get started for free
          </Link>
          <p className="text-sm text-[#787b86]">$0 forever, no credit card needed</p>
        </div>

        {/* Trust metrics */}
        <div className="flex items-center justify-center gap-8 sm:gap-12 mt-16 pt-8 border-t border-[#2a2e39]/50">
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-white">90M+</div>
            <div className="text-xs text-[#787b86] mt-1">Traders worldwide</div>
          </div>
          <div className="h-8 w-px bg-[#2a2e39]" />
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-white">15.7M</div>
            <div className="text-xs text-[#787b86] mt-1">Price data rows</div>
          </div>
          <div className="h-8 w-px bg-[#2a2e39]" />
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-white">94%</div>
            <div className="text-xs text-[#787b86] mt-1">AI accuracy</div>
          </div>
        </div>
      </div>
    </section>
  )
}
