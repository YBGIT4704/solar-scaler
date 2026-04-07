'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const VP = { once: true, margin: '0px 0px -120px 0px' } as const

const fadeUp = {
  hidden: { opacity: 0, y: 48 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
}

const rawLeads = [
  { name: 'James T.',   time: 'just now',   src: 'Google' },
  { name: 'Sarah M.',   time: '14 min ago', src: 'Meta' },
  { name: 'David P.',   time: '32 min ago', src: 'Google' },
  { name: 'Emma W.',    time: '1h ago',     src: 'Door knock' },
  { name: 'Marcus B.',  time: '1h ago',     src: 'Referral' },
  { name: 'Claire H.',  time: '2h ago',     src: 'Marketplace' },
  { name: 'Tom R.',     time: '2h ago',     src: 'Meta' },
  { name: 'Priya K.',   time: '3h ago',     src: 'Google' },
  { name: 'Lee S.',     time: '4h ago',     src: 'Door knock' },
  { name: 'Anna F.',    time: '5h ago',     src: 'Referral' },
  { name: 'Dean W.',    time: '6h ago',     src: 'Meta' },
  { name: 'Yusuf A.',   time: 'Yesterday',  src: 'Google' },
]

const rankedQueue = [
  {
    rank: 1, name: 'James T.', value: '£8,400',
    intent: 'Wants install before school holidays',
    context: 'Requested callback · no answer in 6h',
    proximity: '1.4 mi away',
    urgency: 'Call now', color: '#e05a4a', bg: 'rgba(224,90,74,0.09)', border: '#e05a4a',
  },
  {
    rank: 2, name: 'Sarah M.', value: '£6,200',
    intent: 'Comparing 3 quotes right now',
    context: 'Submitted form 14 min ago',
    proximity: '2.1 mi away',
    urgency: 'Call now', color: '#f4ab3a', bg: 'rgba(244,171,58,0.09)', border: '#f4ab3a',
  },
  {
    rank: 3, name: 'David P.', value: '£4,800',
    intent: 'Waiting on revised quote from Dan',
    context: 'Spoke 2 days ago · still interested',
    proximity: '3.8 mi away',
    urgency: 'Follow up', color: '#4abde8', bg: 'rgba(74,189,232,0.09)', border: '#4abde8',
  },
]

const scoringFactors = ['Intent signals', 'Urgency flags', 'Response window', 'Proximity to you', 'Conversation history']

const labelStyle = { fontSize: 12, fontWeight: 700, color: '#2a9bc8', textTransform: 'uppercase' as const, letterSpacing: '0.06em' }

const ArrowRight = () => (
  <svg width="28" height="16" viewBox="0 0 28 16" fill="none" style={{ flexShrink: 0 }}>
    <line x1="0" y1="8" x2="22" y2="8" stroke="rgba(74,189,232,0.5)" strokeWidth="1.5" strokeDasharray="4 3"/>
    <path d="M18 3l5 5-5 5" stroke="rgba(74,189,232,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const ArrowDown = () => (
  <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
    <line x1="8" y1="0" x2="8" y2="18" stroke="rgba(74,189,232,0.5)" strokeWidth="1.5" strokeDasharray="4 3"/>
    <path d="M3 14l5 5 5-5" stroke="rgba(74,189,232,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export default function Section03() {
  return (
    <section className="px-6 py-6 md:py-12 max-w-5xl mx-auto">
      <div className="bg-white border border-[var(--bd)] rounded-2xl p-5 md:p-12 shadow-sm">

        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={VP} className="mb-6">
          <p className="text-xs font-mono font-semibold tracking-[0.12em] uppercase text-[var(--sky-d)] mb-3">02</p>
          <h2 className="text-[clamp(26px,3.5vw,44px)] leading-tight tracking-tight text-[var(--tx)]">
            <span className="font-bold">Your team. Same headcount. <span style={{ color: 'var(--sky)' }}>3x</span> the output.</span>
          </h2>
        </motion.div>

        <div className="space-y-3 text-[var(--tx2)] text-base leading-relaxed mb-8">
          <ul className="space-y-2.5 pl-0">
            {[
              'AI ranks every lead. Your team knows exactly who to call first.',
              'No long lists, no guessing. Every hour of their day goes on the leads most likely to close.',
              'Every call recorded, every note saved. Nothing falls through.',
            ].map((point) => (
              <li key={point} className="flex items-start gap-3">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--sky)] shrink-0" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VP}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="md:hidden flex flex-col gap-0 items-start w-full"
        >
          <span style={{ ...labelStyle, marginBottom: 8 }}>All leads in</span>
          <div style={{ border: '1px solid rgba(15,29,42,0.08)', borderRadius: 12, width: '100%', overflow: 'hidden', background: '#fff' }}>
            <div style={{ background: '#f4f7f9', borderBottom: '1px solid rgba(15,29,42,0.06)', padding: '7px 12px', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 9, fontWeight: 700, color: '#7a8d9e', textTransform: 'uppercase', letterSpacing: '0.08em' }}>This week</span>
              <span style={{ fontSize: 9, fontWeight: 700, color: '#e05a4a' }}>143 leads</span>
            </div>
            <div style={{ position: 'relative', height: 160, overflow: 'hidden' }}>
              {rawLeads.map((l, i) => (
                <div key={i} style={{ padding: '7px 12px', borderBottom: '1px solid rgba(15,29,42,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ fontSize: 10, fontWeight: 600, color: '#0f1d2a' }}>{l.name}</span>
                    <span style={{ fontSize: 9, color: '#7a8d9e', marginLeft: 5 }}>· {l.src}</span>
                  </div>
                  <span style={{ fontSize: 9, color: '#7a8d9e' }}>{l.time}</span>
                </div>
              ))}
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 48, background: 'linear-gradient(to bottom, transparent, #fff)', pointerEvents: 'none' }} />
            </div>
            <div style={{ padding: '5px 12px', borderTop: '1px solid rgba(15,29,42,0.05)', background: '#f4f7f9' }}>
              <span style={{ fontSize: 8, color: '#7a8d9e' }}>↓ 137 more unsorted</span>
            </div>
          </div>

          <div className="flex justify-center w-full py-3"><ArrowDown /></div>

          {/* AI scoring — mobile */}
          <span style={{ ...labelStyle, marginBottom: 8 }}>Solar Scaler AI</span>
          <div style={{ background: '#fff', border: '1.5px solid rgba(74,189,232,0.35)', borderRadius: 12, padding: '14px 16px', boxShadow: '0 2px 12px rgba(74,189,232,0.1)', width: '100%', display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg, #0c1d2e 0%, #0f2640 100%)', border: '1.5px solid rgba(74,189,232,0.5)', boxShadow: '0 4px 16px rgba(74,189,232,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'white', fontSize: 7, letterSpacing: '0.04em' }}>SS</span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 12px' }}>
              {scoringFactors.map(f => (
                <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#4abde8', flexShrink: 0 }} />
                  <span style={{ fontSize: 12, color: '#3a4d5e' }}>{f}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center w-full py-3"><ArrowDown /></div>

          <span style={{ ...labelStyle, marginBottom: 8 }}>Your call queue</span>
          <div style={{ background: '#fff', border: '1.5px solid rgba(74,189,232,0.35)', borderRadius: 12, overflow: 'hidden', width: '100%', boxShadow: '0 2px 12px rgba(74,189,232,0.1)' }}>
            <div style={{ background: '#f4f7f9', borderBottom: '1px solid rgba(15,29,42,0.06)', padding: '7px 14px', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: '#0f1d2a' }}>Today's 3 calls</span>
              <span style={{ fontSize: 9, color: '#7a8d9e', background: 'rgba(15,29,42,0.05)', borderRadius: 100, padding: '2px 8px' }}>Sorted by AI</span>
            </div>
            {rankedQueue.map((item) => (
              <div key={item.rank} style={{ padding: '10px 14px', borderBottom: item.rank < rankedQueue.length ? '1px solid rgba(15,29,42,0.05)' : undefined, borderLeft: `3px solid ${item.border}` }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: 9, fontWeight: 800, color: '#7a8d9e' }}>#{item.rank}</span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: '#0f1d2a' }}>{item.name}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#2a9bc8' }}>{item.value}</span>
                    <span style={{ fontSize: 9, fontWeight: 700, color: item.color, background: item.bg, borderRadius: 100, padding: '2px 8px', whiteSpace: 'nowrap' }}>{item.urgency}</span>
                  </div>
                </div>
                <div style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: '#3a4d5e' }}>{item.intent}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 10, color: '#7a8d9e' }}>{item.context}</span>
                    <span style={{ fontSize: 10, color: '#4abde8', fontWeight: 600, whiteSpace: 'nowrap' }}>📍 {item.proximity}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Desktop: 3-column flow */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VP}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="hidden md:block"
        >
          <div style={{ background: '#f4f7f9', border: '1px solid rgba(15,29,42,0.08)', borderRadius: 16, padding: 20, boxShadow: '0 4px 24px rgba(0,0,0,0.04)', overflowX: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24, minWidth: 620, width: '100%' }}>

              {/* Col 1: Raw unranked leads */}
              <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <span style={labelStyle}>All leads in</span>
                <div style={{ border: '1px solid rgba(15,29,42,0.08)', borderRadius: 12, width: 188, overflow: 'hidden', background: '#fff' }}>
                  <div style={{ background: '#f4f7f9', borderBottom: '1px solid rgba(15,29,42,0.06)', padding: '6px 10px', display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: '#7a8d9e', textTransform: 'uppercase', letterSpacing: '0.08em' }}>This week</span>
                    <span style={{ fontSize: 10, fontWeight: 700, color: '#e05a4a' }}>143 leads</span>
                  </div>
                  <div style={{ position: 'relative', height: 168, overflow: 'hidden' }}>
                    {rawLeads.map((l, i) => (
                      <div key={i} style={{ padding: '5px 10px', borderBottom: '1px solid rgba(15,29,42,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 4 }}>
                        <div>
                          <span style={{ fontSize: 10, fontWeight: 600, color: '#0f1d2a' }}>{l.name}</span>
                          <span style={{ fontSize: 9, color: '#7a8d9e', marginLeft: 4 }}>· {l.src}</span>
                        </div>
                        <span style={{ fontSize: 9, color: '#7a8d9e', flexShrink: 0 }}>{l.time}</span>
                      </div>
                    ))}
                    {/* Fade out — implies endless list */}
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 48, background: 'linear-gradient(to bottom, transparent, #fff)', pointerEvents: 'none' }} />
                  </div>
                  <div style={{ padding: '5px 10px', borderTop: '1px solid rgba(15,29,42,0.05)', background: '#f4f7f9' }}>
                    <span style={{ fontSize: 7.5, color: '#7a8d9e' }}>↓ 137 more unsorted</span>
                  </div>
                </div>
              </div>

              <ArrowRight />

              {/* Col 2: AI scoring */}
              <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <span style={labelStyle}>Solar Scaler AI</span>
                <div style={{ background: '#fff', border: '1.5px solid rgba(74,189,232,0.35)', borderRadius: 12, padding: '14px 16px', boxShadow: '0 2px 12px rgba(74,189,232,0.1)', width: 145, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'linear-gradient(135deg, #0c1d2e 0%, #0f2640 100%)', border: '1.5px solid rgba(74,189,232,0.5)', boxShadow: '0 4px 16px rgba(74,189,232,0.3), inset 0 1px 0 rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'white', fontSize: 7, letterSpacing: '0.04em' }}>SS</span>
                  </div>
                  <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 5 }}>
                    {scoringFactors.map(f => (
                      <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                        <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#4abde8', flexShrink: 0 }} />
                        <span style={{ fontSize: 12, color: '#3a4d5e' }}>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <ArrowRight />

              {/* Col 3: Ranked call queue */}
              <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <span style={labelStyle}>Your call queue</span>
                <div style={{ background: '#fff', border: '1.5px solid rgba(74,189,232,0.35)', borderRadius: 12, overflow: 'hidden', width: 255, boxShadow: '0 2px 12px rgba(74,189,232,0.1)' }}>
                  <div style={{ background: '#f4f7f9', borderBottom: '1px solid rgba(15,29,42,0.06)', padding: '6px 12px', display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: '#0f1d2a' }}>Today's 3 calls</span>
                    <span style={{ fontSize: 10, color: '#7a8d9e' }}>Sorted by AI</span>
                  </div>
                  {rankedQueue.map((item) => (
                    <div key={item.rank} style={{ padding: '8px 12px', borderBottom: item.rank < rankedQueue.length ? '1px solid rgba(15,29,42,0.05)' : undefined, borderLeft: `3px solid ${item.border}` }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 3 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                          <span style={{ fontSize: 9, fontWeight: 800, color: '#7a8d9e' }}>#{item.rank}</span>
                          <span style={{ fontSize: 11, fontWeight: 700, color: '#0f1d2a' }}>{item.name}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                          <span style={{ fontSize: 11, fontWeight: 700, color: '#2a9bc8' }}>{item.value}</span>
                          <span style={{ fontSize: 10, fontWeight: 700, color: item.color, background: item.bg, borderRadius: 100, padding: '1px 6px', whiteSpace: 'nowrap' }}>{item.urgency}</span>
                        </div>
                      </div>
                      <div style={{ paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <span style={{ fontSize: 10, fontWeight: 600, color: '#3a4d5e' }}>{item.intent}</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <span style={{ fontSize: 9, color: '#7a8d9e', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.context}</span>
                          <span style={{ fontSize: 9, color: '#4abde8', fontWeight: 600, whiteSpace: 'nowrap', flexShrink: 0 }}>📍 {item.proximity}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
