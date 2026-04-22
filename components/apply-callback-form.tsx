'use client'

import { useEffect, useState, type FormEvent } from 'react'
import { useForm } from '@formspree/react'
import Image from 'next/image'
import ProofTicker from './proof-ticker'

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
    gtag?: (...args: unknown[]) => void
  }
}

const timeOptions = [
  { value: 'morning', label: 'Morning', time: '9am – 12pm' },
  { value: 'afternoon', label: 'Afternoon', time: '12pm – 5pm' },
  { value: 'evening', label: 'Evening', time: '5pm – 7pm' },
]

const inputClass = 'w-full rounded-lg md:rounded-xl border border-[var(--bd2)] bg-[var(--sf2)] px-3.5 py-2.5 md:px-4 md:py-3.5 text-[14px] md:text-[15px] text-[var(--tx)] placeholder-[var(--tx3)] outline-none focus:border-[var(--sky)] focus:ring-2 focus:ring-[var(--sky)]/20 transition'

export default function ApplyCallbackForm() {
  const [formspreeState, handleFormspreeSubmit] = useForm('mlgopnvl')
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [phone, setPhone] = useState('')
  const [callTime, setCallTime] = useState('')

  useEffect(() => {
    if (formspreeState.succeeded) {
      if (window.fbq) window.fbq('track', 'Lead')
      if (window.gtag) window.gtag('event', 'generate_lead')
    }
  }, [formspreeState.succeeded])

  const canSubmit = name.trim() && company.trim() && phone.trim() && callTime

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!canSubmit) return

    const formData = new FormData()
    formData.append('name', name)
    formData.append('company', company)
    formData.append('phone', phone)
    formData.append('preferred-call-time', callTime)

    handleFormspreeSubmit(formData)
  }

  if (formspreeState.succeeded) {
    return (
      <div className="w-full max-w-lg mx-auto flex flex-col items-center text-center h-full flex-1">
        {/* Spacer */}
        <div className="flex-1" />

        {/* Photo */}
        <div
          className="w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden mb-5"
          style={{ boxShadow: '0 0 0 4px rgba(58,184,112,0.3), 0 0 24px rgba(58,184,112,0.15)' }}
        >
          <Image
            src="/matt.jpg"
            alt="Matt Ussher"
            width={288}
            height={288}
            className="w-full h-full object-cover"
            style={{ objectPosition: '45% 45%', transform: 'scale(1.75)' }}
          />
        </div>

        {/* Headline */}
        <h2 className="text-[34px] md:text-[44px] font-bold text-[var(--tx)] tracking-tight mb-3">
          You&apos;re all set
          <span className="inline-block ml-2 text-[var(--grn)]">
            <svg width="32" height="32" viewBox="0 0 20 20" fill="none" className="inline -mt-1.5 md:w-[40px] md:h-[40px]">
              <circle cx="10" cy="10" r="10" fill="currentColor"/>
              <path d="M6 10l3 3L14 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </h2>

        {/* Copy */}
        <p className="text-[var(--tx)] text-[19px] md:text-[22px] leading-snug">
          <strong>Matt</strong> has been assigned to you.
        </p>
        <p className="text-[var(--tx2)] text-[19px] md:text-[22px] leading-snug mt-1.5">
          Expect a call soon at your preferred time.
        </p>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Trust logos */}
        <div className="w-full border-t border-[var(--bd)]">
          <ProofTicker />
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-lg mx-auto">

      {/* Headline */}
      <div className="text-center mb-4 md:mb-8">
        <h1 className="text-[18px] md:text-[clamp(22px,3.5vw,34px)] font-bold tracking-tight text-[var(--tx)] mb-1 md:mb-2">
          Get a free call with our team.
        </h1>
        <p className="text-[var(--tx2)] text-[13px] md:text-base leading-snug md:leading-relaxed max-w-md mx-auto">
          Leave your details. We&apos;ll call you for a quick chat about your setup and how we can help.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div className="rounded-xl md:rounded-2xl border border-[var(--bd)] bg-white p-4 md:p-7 flex flex-col gap-3 md:gap-4 shadow-sm">

          {/* Name + Company side by side on mobile to save vertical space */}
          <div className="grid grid-cols-2 gap-2.5 md:grid-cols-1 md:gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="name" className="text-[10px] md:text-xs font-semibold text-[var(--tx2)] uppercase tracking-[0.08em]">Your name</label>
              <input
                id="name"
                type="text"
                autoFocus
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Dave Smith"
                className={inputClass}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="company" className="text-[10px] md:text-xs font-semibold text-[var(--tx2)] uppercase tracking-[0.08em]">Company</label>
              <input
                id="company"
                type="text"
                value={company}
                onChange={e => setCompany(e.target.value)}
                placeholder="Dave's Solar Ltd"
                className={inputClass}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="phone" className="text-[10px] md:text-xs font-semibold text-[var(--tx2)] uppercase tracking-[0.08em]">Phone number</label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="07700 900000"
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <p className="text-[10px] md:text-xs font-semibold text-[var(--tx2)] uppercase tracking-[0.08em]">Best time to call</p>
            <div className="grid grid-cols-3 gap-1.5 md:gap-2">
              {timeOptions.map(opt => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setCallTime(opt.value)}
                  className={`rounded-lg md:rounded-xl border px-2 py-2 md:px-3 md:py-2.5 font-medium transition-all text-center ${
                    callTime === opt.value
                      ? 'border-[var(--sky)] bg-[rgba(74,189,232,0.08)] text-[var(--tx)]'
                      : 'border-[var(--bd2)] bg-[var(--sf2)] text-[var(--tx2)] hover:border-[var(--sky)]/40'
                  }`}
                >
                  <span className="block text-[13px] md:text-[14px] leading-none">{opt.label}</span>
                  <span className="block text-[10px] md:text-[11px] text-[var(--tx3)] mt-0.5 leading-none">{opt.time}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={formspreeState.submitting || !canSubmit}
            className={`w-full py-3 md:py-4 rounded-lg md:rounded-xl font-bold text-[14px] md:text-[15px] transition-all duration-300 shadow-sm mt-1 ${
              canSubmit && !formspreeState.submitting
                ? 'bg-[var(--sky)] text-white hover:bg-[var(--sky-d)] cursor-pointer'
                : 'bg-[var(--sf2)] text-[var(--tx3)] cursor-not-allowed'
            }`}
          >
            {formspreeState.submitting ? 'Sending…' : 'Request a callback'}
          </button>
        </div>
      </form>

      {/* What happens next */}
      <div className="mt-6 md:mt-8 px-1">
        <p className="text-[10px] md:text-xs font-semibold text-[var(--tx2)] uppercase tracking-[0.08em] mb-3 md:mb-4">What happens next</p>
        <div className="flex flex-col gap-3 md:gap-4">
          {[
            { num: '1', title: 'We call you today', desc: 'Quick chat. No pressure.' },
            { num: '2', title: 'We get you set up', desc: 'Ads, website, CRM. All done for you.' },
            { num: '3', title: 'Leads start coming in', desc: 'You focus on installs.' },
          ].map(step => (
            <div key={step.num} className="flex items-start gap-3">
              <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-[var(--sky)] flex items-center justify-center shrink-0">
                <span className="text-white text-[11px] md:text-sm font-bold">{step.num}</span>
              </div>
              <div>
                <p className="text-[var(--tx)] font-semibold text-[13px] md:text-[15px]">{step.title}</p>
                <p className="text-[var(--tx3)] text-[12px] md:text-[13px] leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trust logos — same ticker as landing page */}
      <div className="mt-6 md:mt-10 border-t border-[var(--bd)]">
        <ProofTicker />
      </div>

    </div>
  )
}
