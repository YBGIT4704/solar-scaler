'use client'

import { useEffect, useState, useRef, type FormEvent } from 'react'
import { useForm } from '@formspree/react'

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

const TOTAL_STEPS = 8

type FormData = {
  name: string
  company: string
  email: string
  phone: string
  referral: string
  installs: string
  revenue: string
  'sales-team': string
  accreditations: string[]
  'lead-sources': string[]
  challenge: string
}

function OptionCard({ label, selected, onSelect }: { label: string; selected: boolean; onSelect: () => void }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full text-left rounded-xl border px-4 py-3.5 text-[15px] font-medium transition-all ${
        selected
          ? 'border-[var(--sky)] bg-[rgba(74,189,232,0.08)] text-[var(--tx)]'
          : 'border-[var(--bd2)] bg-[var(--sf2)] text-[var(--tx)] hover:border-[var(--sky)]/40'
      }`}
    >
      {label}
    </button>
  )
}

function CheckCard({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`w-full text-left rounded-xl border px-4 py-3.5 text-[15px] font-medium transition-all flex items-center gap-3 ${
        checked
          ? 'border-[var(--sky)] bg-[rgba(74,189,232,0.08)] text-[var(--tx)]'
          : 'border-[var(--bd2)] bg-[var(--sf2)] text-[var(--tx)] hover:border-[var(--sky)]/40'
      }`}
    >
      <span className={`shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
        checked ? 'border-[var(--sky)] bg-[var(--sky)]' : 'border-[var(--bd2)]'
      }`}>
        {checked && (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2.5 6l2.5 2.5L9.5 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </span>
      {label}
    </button>
  )
}

export default function ApplyForm() {
  const [formspreeState, handleFormspreeSubmit] = useForm('mlgopnvl')
  const [step, setStep] = useState(1)
  const [data, setData] = useState<FormData>({
    name: '',
    company: '',
    email: '',
    phone: '',
    referral: '',
    installs: '',
    revenue: '',
    'sales-team': '',
    accreditations: [],
    'lead-sources': [],
    challenge: '',
  })
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (formspreeState.succeeded && window.fbq) {
      window.fbq('track', 'Lead')
    }
  }, [formspreeState.succeeded])

  useEffect(() => {
    containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [step])

  const canProceed = (): boolean => {
    switch (step) {
      case 1: return data.name.trim() !== '' && data.company.trim() !== ''
      case 2: return data.email.trim() !== '' && data.phone.trim() !== ''
      case 3: return data.referral !== ''
      case 4: return data.installs !== ''
      case 5: return data.revenue !== '' && data['sales-team'] !== ''
      case 6: return data.accreditations.length > 0
      case 7: return data['lead-sources'].length > 0
      case 8: return data.challenge !== ''
      default: return false
    }
  }

  const next = () => {
    if (!canProceed()) return
    setStep(s => Math.min(s + 1, TOTAL_STEPS))
  }

  const back = () => {
    setStep(s => Math.max(s - 1, 1))
  }

  const submitForm = (e: FormEvent) => {
    e.preventDefault()
    if (!canProceed()) return

    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('company', data.company)
    formData.append('email', data.email)
    formData.append('phone', data.phone)
    formData.append('referral', data.referral)
    formData.append('installs', data.installs)
    formData.append('revenue', data.revenue)
    formData.append('sales-team', data['sales-team'])
    data.accreditations.forEach(v => formData.append('accreditations', v))
    data['lead-sources'].forEach(v => formData.append('lead-sources', v))
    formData.append('challenge', data.challenge)

    handleFormspreeSubmit(formData)
  }

  const toggleArray = (field: 'accreditations' | 'lead-sources', value: string) => {
    setData(prev => {
      const arr = prev[field]
      return {
        ...prev,
        [field]: arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value],
      }
    })
  }

  if (formspreeState.succeeded) {
    return (
      <section className="w-full bg-white py-16 px-6">
        <div className="max-w-lg mx-auto text-center flex flex-col items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-[var(--grn)] flex items-center justify-center mb-2">
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
              <path d="M5 13l6 6L21 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-[var(--tx)] tracking-tight">Application received.</h2>
          <p className="text-[var(--tx2)] text-base leading-relaxed">
            We&apos;ll review your details and be in touch within one business day.
          </p>
        </div>
      </section>
    )
  }

  const progress = ((step - 1) / (TOTAL_STEPS - 1)) * 100

  const inputClass = 'w-full rounded-xl border border-[var(--bd2)] bg-[var(--sf2)] px-4 py-3.5 text-[15px] text-[var(--tx)] placeholder-[var(--tx3)] outline-none focus:border-[var(--sky)] focus:ring-2 focus:ring-[var(--sky)]/20 transition'

  return (
    <section ref={containerRef} className="w-full bg-white py-10 px-6 min-h-[60vh] flex flex-col">
      <div className="max-w-lg mx-auto w-full flex-1 flex flex-col">

        {/* Progress bar */}
        <div className="mb-2">
          <div className="w-full h-1.5 rounded-full bg-[var(--sf2)]">
            <div
              className="h-full rounded-full bg-[var(--sky)] transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <form onSubmit={submitForm} className="flex-1 flex flex-col pt-6">

          {/* Step content */}
          <div className="flex-1">

            {step === 1 && (
              <div className="flex flex-col gap-5">
                <div>
                  <h2 className="text-xl font-bold text-[var(--tx)] tracking-tight mb-1">Let&apos;s start with your details.</h2>
                  <p className="text-sm text-[var(--tx3)]">Who are we speaking with?</p>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-xs font-semibold text-[var(--tx2)] uppercase tracking-[0.08em]">Your name</label>
                  <input
                    id="name"
                    type="text"
                    autoFocus
                    value={data.name}
                    onChange={e => setData(d => ({ ...d, name: e.target.value }))}
                    placeholder="Dave Smith"
                    className={inputClass}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="company" className="text-xs font-semibold text-[var(--tx2)] uppercase tracking-[0.08em]">Business name</label>
                  <input
                    id="company"
                    type="text"
                    value={data.company}
                    onChange={e => setData(d => ({ ...d, company: e.target.value }))}
                    placeholder="Dave's Solar Ltd"
                    className={inputClass}
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="flex flex-col gap-5">
                <div>
                  <h2 className="text-xl font-bold text-[var(--tx)] tracking-tight mb-1">How can we reach you?</h2>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-xs font-semibold text-[var(--tx2)] uppercase tracking-[0.08em]">Email</label>
                  <input
                    id="email"
                    type="email"
                    autoFocus
                    value={data.email}
                    onChange={e => setData(d => ({ ...d, email: e.target.value }))}
                    placeholder="dave@davessolar.co.uk"
                    className={inputClass}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="phone" className="text-xs font-semibold text-[var(--tx2)] uppercase tracking-[0.08em]">Best number to call you on</label>
                  <input
                    id="phone"
                    type="tel"
                    value={data.phone}
                    onChange={e => setData(d => ({ ...d, phone: e.target.value }))}
                    placeholder="07700 900000"
                    className={inputClass}
                  />
                  <div className="mt-3 rounded-xl bg-[rgba(74,189,232,0.08)] border border-[rgba(74,189,232,0.2)] px-4 py-3 flex items-start gap-3">
                    <span className="text-lg leading-none mt-0.5">📞</span>
                    <p className="text-sm text-[var(--sky-d)] font-medium leading-snug">We aim to call you same-day.<br />Double-check your number.</p>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="flex flex-col gap-5">
                <div>
                  <h2 className="text-xl font-bold text-[var(--tx)] tracking-tight mb-1">How did you hear about us?</h2>
                </div>
                <div className="flex flex-col gap-2.5">
                  {[
                    { value: 'wttj', label: 'Welcome to the Jungle\u2019s 2025 list of high-growth, purpose-led UK companies \u2013 \u201CBuilding for Better\u201D' },
                    { value: 'facebook', label: 'Facebook / Instagram' },
                    { value: 'google', label: 'Google' },
                    { value: 'referral', label: 'Word of mouth / referral' },
                    { value: 'linkedin', label: 'LinkedIn' },
                    { value: 'other', label: 'Other' },
                  ].map(({ value, label }) => (
                    <OptionCard
                      key={value}
                      label={label}
                      selected={data.referral === value}
                      onSelect={() => setData(d => ({ ...d, referral: value }))}
                    />
                  ))}
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="flex flex-col gap-5">
                <div>
                  <h2 className="text-xl font-bold text-[var(--tx)] tracking-tight mb-1">How many installs per month?</h2>
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { value: '1-5', label: '1 \u2013 5' },
                    { value: '6-15', label: '6 \u2013 15' },
                    { value: '16-30', label: '16 \u2013 30' },
                    { value: '31-50', label: '31 \u2013 50' },
                    { value: '51-100', label: '51 \u2013 100' },
                    { value: '101-200', label: '101 \u2013 200' },
                    { value: '201-300', label: '201 \u2013 300' },
                    { value: '300+', label: '300+' },
                  ].map(({ value, label }) => (
                    <OptionCard
                      key={value}
                      label={label}
                      selected={data.installs === value}
                      onSelect={() => setData(d => ({ ...d, installs: value }))}
                    />
                  ))}
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="flex flex-col gap-6">
                <div>
                  <h2 className="text-xl font-bold text-[var(--tx)] tracking-tight mb-1">Tell us about your business.</h2>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-xs font-semibold text-[var(--tx2)] uppercase tracking-[0.08em]">Annual turnover</p>
                  <div className="grid grid-cols-2 gap-2.5">
                    {[
                      { value: 'under-100k', label: 'Under \u00a3100k' },
                      { value: '100k-250k', label: '\u00a3100k \u2013 \u00a3250k' },
                      { value: '250k-500k', label: '\u00a3250k \u2013 \u00a3500k' },
                      { value: '500k-1m', label: '\u00a3500k \u2013 \u00a31m' },
                      { value: '1m-3m', label: '\u00a31m \u2013 \u00a33m' },
                      { value: '3m+', label: '\u00a33m+' },
                    ].map(({ value, label }) => (
                      <OptionCard
                        key={value}
                        label={label}
                        selected={data.revenue === value}
                        onSelect={() => setData(d => ({ ...d, revenue: value }))}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-xs font-semibold text-[var(--tx2)] uppercase tracking-[0.08em]">Sales team size</p>
                  <div className="grid grid-cols-2 gap-2.5">
                    {[
                      { value: 'just-me', label: 'Just me' },
                      { value: '2-5', label: '2 \u2013 5 people' },
                      { value: '6-10', label: '6 \u2013 10 people' },
                      { value: '10+', label: '10+ people' },
                    ].map(({ value, label }) => (
                      <OptionCard
                        key={value}
                        label={label}
                        selected={data['sales-team'] === value}
                        onSelect={() => setData(d => ({ ...d, 'sales-team': value }))}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 6 && (
              <div className="flex flex-col gap-5">
                <div>
                  <h2 className="text-xl font-bold text-[var(--tx)] tracking-tight mb-1">Which accreditations do you have?</h2>
                  <p className="text-sm text-[var(--tx3)]">Select all that apply.</p>
                </div>
                <div className="flex flex-col gap-2.5">
                  {[
                    { id: 'mcs', label: 'MCS' },
                    { id: 'trustmark', label: 'TrustMark' },
                    { id: 'niceic', label: 'NICEIC' },
                    { id: 'napit', label: 'NAPIT' },
                    { id: 'recc', label: 'RECC / HIES / other consumer code' },
                    { id: 'none', label: 'None yet' },
                    { id: 'in-progress', label: 'In progress' },
                  ].map(({ id, label }) => (
                    <CheckCard
                      key={id}
                      label={label}
                      checked={data.accreditations.includes(id)}
                      onChange={() => toggleArray('accreditations', id)}
                    />
                  ))}
                </div>
              </div>
            )}

            {step === 7 && (
              <div className="flex flex-col gap-5">
                <div>
                  <h2 className="text-xl font-bold text-[var(--tx)] tracking-tight mb-1">Where do your leads come from today?</h2>
                  <p className="text-sm text-[var(--tx3)]">Select all that apply.</p>
                </div>
                <div className="flex flex-col gap-2.5">
                  {[
                    { id: 'word-of-mouth', label: 'Word of mouth / referrals' },
                    { id: 'directories', label: 'Directories (Checkatrade, MyBuilder, etc.)' },
                    { id: 'google-ads', label: 'Google ads' },
                    { id: 'facebook-ads', label: 'Facebook / Instagram ads' },
                    { id: 'door-knocking', label: 'Door knocking' },
                    { id: 'other', label: 'Other' },
                  ].map(({ id, label }) => (
                    <CheckCard
                      key={id}
                      label={label}
                      checked={data['lead-sources'].includes(id)}
                      onChange={() => toggleArray('lead-sources', id)}
                    />
                  ))}
                </div>
              </div>
            )}

            {step === 8 && (
              <div className="flex flex-col gap-5">
                <div>
                  <h2 className="text-xl font-bold text-[var(--tx)] tracking-tight mb-1">What&apos;s stopping you from growing?</h2>
                  <p className="text-sm text-[var(--tx3)]">Pick the biggest one.</p>
                </div>
                <div className="flex flex-col gap-2.5">
                  {[
                    { value: 'not-enough-leads', label: 'Not enough leads' },
                    { value: 'leads-too-expensive', label: 'Leads cost too much' },
                    { value: 'cant-close', label: 'Can\'t close enough of them' },
                    { value: 'too-much-admin', label: 'Too much admin / chasing' },
                    { value: 'install-capacity', label: 'Need more install capacity' },
                  ].map(({ value, label }) => (
                    <OptionCard
                      key={value}
                      label={label}
                      selected={data.challenge === value}
                      onSelect={() => setData(d => ({ ...d, challenge: value }))}
                    />
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Navigation */}
          <div className="flex gap-3 mt-8 pt-4 border-t border-[var(--bd)]">
            {step > 1 && (
              <button
                type="button"
                onClick={back}
                className="px-6 py-3.5 rounded-xl border border-[var(--bd2)] text-[var(--tx2)] font-semibold text-sm hover:bg-[var(--sf2)] transition"
              >
                Back
              </button>
            )}
            {step < TOTAL_STEPS ? (
              <button
                type="button"
                onClick={canProceed() ? next : undefined}
                className={`flex-1 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 shadow-sm ${
                  canProceed()
                    ? 'bg-[var(--sky)] text-white hover:bg-[var(--sky-d)] cursor-pointer scale-100'
                    : 'bg-[var(--sf2)] text-[var(--tx3)] cursor-not-allowed'
                }`}
              >
                Continue
              </button>
            ) : (
              <button
                type="submit"
                disabled={formspreeState.submitting || !canProceed()}
                className={`flex-1 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 shadow-sm ${
                  canProceed() && !formspreeState.submitting
                    ? 'bg-[var(--sky)] text-white hover:bg-[var(--sky-d)] cursor-pointer'
                    : 'bg-[var(--sf2)] text-[var(--tx3)] cursor-not-allowed'
                }`}
              >
                {formspreeState.submitting ? 'Sending\u2026' : 'Submit application'}
              </button>
            )}
          </div>

        </form>
      </div>
    </section>
  )
}
