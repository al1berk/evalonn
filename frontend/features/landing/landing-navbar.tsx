'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, Globe, ChevronDown, Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Products', href: '#features' },
  { label: 'Community', href: '#community' },
  { label: 'Markets', href: '#markets' },
]

export function LandingNavbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#131722]/95 backdrop-blur-xl border-b border-[#2a2e39]/50 shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left: Logo */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#2962ff] to-[#7c3aed] flex items-center justify-center">
                <span className="text-white text-sm font-bold">E</span>
              </div>
              <span className="text-white text-xl font-bold tracking-tight">EVALON</span>
            </Link>

            {/* Desktop Search */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#1e222d]/80 border border-[#2a2e39] text-[#787b86] text-sm hover:border-[#363a45] transition-colors cursor-pointer">
              <Search className="h-4 w-4" />
              <span>Search</span>
              <kbd className="ml-4 px-1.5 py-0.5 rounded bg-[#2a2e39] text-[10px] text-[#787b86]">⌘K</kbd>
            </div>
          </div>

          {/* Center: Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-[#d1d4dc] hover:text-white transition-colors rounded-lg hover:bg-white/5"
              >
                {link.label}
              </a>
            ))}
            <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-[#d1d4dc] hover:text-white transition-colors rounded-lg hover:bg-white/5">
              More
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-3">
            <button className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-sm text-[#d1d4dc] hover:text-white transition-colors rounded-lg hover:bg-white/5">
              <Globe className="h-4 w-4" />
              <span>EN</span>
            </button>

            <Link
              href="/login"
              className="hidden sm:inline-flex px-5 py-2 text-sm font-semibold text-white bg-[#2962ff] rounded-full hover:bg-[#1e53e5] transition-all duration-200 shadow-lg shadow-[#2962ff]/20 hover:shadow-[#2962ff]/30"
            >
              Get started
            </Link>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-2 text-[#d1d4dc] hover:text-white"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#131722]/98 backdrop-blur-xl border-t border-[#2a2e39]/50">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block px-4 py-3 text-sm font-medium text-[#d1d4dc] hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Link
              href="/login"
              className="block mt-3 px-4 py-3 text-sm font-semibold text-white bg-[#2962ff] rounded-lg text-center hover:bg-[#1e53e5] transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Get started
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
