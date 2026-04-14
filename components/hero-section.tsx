'use client'

import { useEffect, useRef, useState } from 'react'
import ProofTicker from './proof-ticker'

/**
 * Measures each [data-headline-line] child and shrinks the h1 font-size
 * until no line overflows its container. ResizeObserver re-runs on every
 * viewport/layout change so the headline can never word-wrap.
 */
function useFitHeadline() {
  const ref = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const h1 = ref.current
    if (!h1) return

    const fit = () => {
      const lines = h1.querySelectorAll<HTMLElement>('[data-headline-line]')
      let size = 54
      h1.style.fontSize = size + 'px'
      while (size > 10) {
        const overflows = Array.from(lines).some(l => l.scrollWidth > l.clientWidth + 1)
        if (!overflows) break
        size -= 0.5
        h1.style.fontSize = size + 'px'
      }
    }

    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(h1)
    return () => ro.disconnect()
  }, [])

  return ref
}

function badgeColor(remaining: number, total: number): string {
  const frac = remaining / total
  if (frac > 0.7) return '#3ab870'
  if (frac > 0.45) return '#e8a020'
  return '#e01010'
}

function SpotsBadge() {
  const TOTAL = 5, TARGET = 2
  const [remaining, setRemaining] = useState(TOTAL)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      const duration = 900
      const t0 = performance.now()
      const tick = (now: number) => {
        const p = Math.min((now - t0) / duration, 1)
        const eased = 1 - Math.pow(1 - p, 3)
        setRemaining(Math.round(TOTAL - (TOTAL - TARGET) * eased))
        if (p < 1) rafRef.current = requestAnimationFrame(tick)
      }
      rafRef.current = requestAnimationFrame(tick)
    }, 800)
    return () => { clearTimeout(timer); cancelAnimationFrame(rafRef.current) }
  }, [])

  return (
    <div
      className="inline-flex items-center gap-2 px-5 py-2 rounded-sm text-white text-xs font-bold tracking-widest uppercase mb-6"
      style={{ background: badgeColor(remaining, TOTAL) }}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-white/70 animate-pulse" />
      <span style={{ fontVariantNumeric: 'tabular-nums' }}>{remaining}/{TOTAL} Spots Remaining</span>
    </div>
  )
}

// Revenue anchored to Apr 1 2026, grows £847/day
const REFERENCE_MS  = new Date('2026-04-01').getTime()
const REFERENCE_VAL = 2_130_654
const DAILY_INC     = 35

function getLiveRevenue() {
  const days = Math.floor((Date.now() - REFERENCE_MS) / 86_400_000)
  return REFERENCE_VAL + Math.max(0, days * DAILY_INC)
}

function useCountUp(target: number, duration = 3800, startFraction = 0.5) {
  const [val, setVal] = useState(Math.floor(target * startFraction))
  const raf = useRef<number>(0)
  useEffect(() => {
    const start = Math.floor(target * startFraction)
    const t0 = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setVal(Math.floor(start + (target - start) * eased))
      if (p < 1) raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf.current)
  }, [target, duration, startFraction])
  return val
}

function ProofStats() {
  const revenue = getLiveRevenue()
  const revenueCount = useCountUp(revenue)
  const installerCount = useCountUp(50, 2800, 0.15)
  const formatted = '£' + (Math.round(revenueCount / 100) * 100).toLocaleString('en-GB') + '+'

  return (
    <div className="flex items-center justify-center gap-0 w-full">
      <div className="flex flex-col items-center px-6 md:px-12" style={{ minWidth: 72 }}>
        <span className="text-white font-bold leading-none tracking-tight" style={{ fontSize: 'clamp(30px, 4vw, 42px)', fontVariantNumeric: 'tabular-nums' }}>
          {installerCount}+
        </span>
        <span className="text-white/80 text-[13px] uppercase tracking-[0.08em] mt-2">
          <strong className="text-white font-bold">Partner</strong> installers
        </span>
      </div>
      <div className="w-px self-stretch bg-white/20" />
      <div className="flex flex-col items-center px-6 md:px-12" style={{ minWidth: 160 }}>
        <span className="text-white font-bold leading-none tracking-tight" style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontVariantNumeric: 'tabular-nums' }}>
          {formatted}
        </span>
        <span className="text-white/80 text-[13px] uppercase tracking-[0.08em] mt-2">
          Installer <strong className="text-white font-bold">revenue</strong> generated
        </span>
      </div>
    </div>
  )
}

export default function HeroSection() {
  const h1Ref = useFitHeadline()

  return (
    <section
      className="flex flex-col items-center relative"
      style={{
        background: 'linear-gradient(180deg, #4ABDE8 0%, #4ABDE8 65%, #ffffff 100%)',
      }}
    >
      {/* Wordmark */}
      <div className="w-full flex justify-center pt-5 md:pt-10 pb-0">
        <span className="text-white font-black uppercase tracking-[0.12em] select-none" style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(16px, 2vw, 24px)' }}>
          SOLAR SCALER
        </span>
      </div>

      {/* Centred content column */}
      <div className="w-full max-w-2xl mx-auto px-6 pt-10 md:pt-14 pb-8 flex flex-col items-center text-center">

        {/* Urgency badge */}
        <SpotsBadge />

        {/* Headline — each line has white-space:nowrap; useFitHeadline shrinks
            font-size until neither line overflows, so wrapping is impossible. */}
        <h1
          ref={h1Ref}
          className="font-sans font-[700] leading-[1.1] tracking-[-0.03em] text-white mb-7 w-full"
          style={{ fontSize: 54 }}
        >
          <span data-headline-line className="block whitespace-nowrap text-white">
            More installs. Less chasing.
          </span>
          <span data-headline-line className="block whitespace-nowrap text-white/70">
            No long-term contracts.
          </span>
        </h1>


        {/* Proof stats */}
        <div className="mb-10 w-full">
          <ProofStats />
        </div>

        {/* CTA */}
        <a
          href="/solar-scaler/apply"
          className="inline-flex items-center gap-3 tracking-wide px-5 md:px-10 py-[20px] rounded-full hover:opacity-90 transition-opacity shadow-lg w-full justify-center mb-5"
          style={{ background: '#ffffff', color: '#0f2337', fontWeight: 700, fontSize: 'clamp(16px, 1.2vw, 17px)' }}
        >
          Apply for our SOLAR SCALER program
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="#0f2337" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>

        {/* Trust line */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
          {['No setup fees', 'No lock-in', 'Cancel anytime'].map((item) => (
            <span key={item} className="inline-flex items-center gap-2 text-[15px] font-semibold text-white/90">
              <svg width="15" height="15" viewBox="0 0 10 10" fill="none">
                <circle cx="5" cy="5" r="5" fill="#3ab870"/>
                <path d="M3 5l1.5 1.5L7 3.5" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {item}
            </span>
          ))}
        </div>

      </div>

      <div className="w-full">
        <ProofTicker />
      </div>
    </section>
  )
}
