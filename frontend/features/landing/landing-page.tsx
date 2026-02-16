'use client';

import Link from 'next/link';
import { ArrowRight, BarChart2, Zap, Shield } from 'lucide-react';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary selection:text-white">
      {/* Navbar */}
      <header className="fixed w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="text-2xl font-bold tracking-tighter flex items-center gap-2">
            <span className="text-primary">EVALON</span>
          </div>
          <div className="flex items-center gap-6">
            <Link
              href="/login"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Log In
            </Link>
            <Link
              href="/signup"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-[0_0_20px_-5px_rgba(41,98,255,0.5)]"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col pt-32 pb-16">
        <section className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h1 className="text-6xl md:text-7xl font-bold leading-tight tracking-tight text-foreground">
              Trade Smarter <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#089981]">
                Not Harder.
              </span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
              The first AI-powered platform that bridges the gap between emotional trading and systematic execution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href="/signup"
                className="bg-foreground text-background px-8 py-4 rounded-full font-bold text-lg hover:bg-foreground/90 transition-colors flex items-center justify-center gap-2"
              >
                Launch App <ArrowRight size={20} />
              </Link>
              <Link
                href="/features"
                className="bg-card text-foreground border border-border px-8 py-4 rounded-full font-bold text-lg hover:border-muted-foreground transition-colors flex items-center justify-center"
              >
                Explore Features
              </Link>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary to-[#089981] rounded-[2rem] opacity-20 blur-3xl animate-pulse-glow" />
            <div className="relative bg-background border border-border rounded-[2rem] p-6 shadow-2xl overflow-hidden aspect-square flex items-center justify-center">
              {/* Abstract UI representation */}
              <div className="grid grid-cols-2 gap-4 w-full h-full opacity-80">
                <div className="bg-card rounded-xl p-4 flex flex-col gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    <BarChart2 size={24} />
                  </div>
                  <div className="h-2 w-20 bg-secondary rounded-full" />
                  <div className="h-2 w-12 bg-secondary rounded-full" />
                  <div className="mt-auto h-24 bg-gradient-to-t from-primary/10 to-transparent rounded-lg" />
                </div>
                <div className="bg-card rounded-xl p-4 flex flex-col gap-3 translate-y-8">
                  <div className="w-10 h-10 rounded-full bg-[#089981]/20 flex items-center justify-center text-[#089981]">
                    <Zap size={24} />
                  </div>
                  <div className="h-2 w-24 bg-secondary rounded-full" />
                  <div className="h-2 w-16 bg-secondary rounded-full" />
                  <div className="mt-auto h-24 bg-gradient-to-t from-[#089981]/10 to-transparent rounded-lg" />
                </div>
                <div className="bg-card rounded-xl p-4 flex flex-col gap-3 -translate-y-8">
                  <div className="w-10 h-10 rounded-full bg-destructive/20 flex items-center justify-center text-destructive">
                    <Shield size={24} />
                  </div>
                  <div className="h-2 w-16 bg-secondary rounded-full" />
                  <div className="mt-auto h-24 bg-gradient-to-t from-destructive/10 to-transparent rounded-lg" />
                </div>
                <div className="bg-card rounded-xl p-4 flex flex-col gap-3">
                  <div className="h-2 w-20 bg-secondary rounded-full" />
                  <div className="flex-1 bg-background rounded-lg border border-border flex items-center justify-center text-xs text-muted-foreground">
                    AI Analysis
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Strip */}
        <section className="mt-24 border-t border-border bg-background py-12">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Real-time Data", value: "0ms Latency" },
              { label: "Markets Covered", value: "BIST & Crypto" },
              { label: "AI Predictions", value: "85% Accuracy" },
              { label: "Active Traders", value: "10k+" },
            ].map((stat, i) => (
              <div key={i} className="text-center md:text-left">
                <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
