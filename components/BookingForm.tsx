'use client'

import { useState } from 'react'

type FormState = {
  name: string
  email: string
  phone: string
  service: string
  date: string
  time: string
  people: number
  notes: string
}

export default function BookingForm() {
  const [state, setState] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    time: '',
    people: 1,
    notes: '',
  })
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const onChange = (e: any) => {
    const { name, value } = e.target
    setState((s) => ({ ...s, [name]: name === 'people' ? Number(value) : value }))
  }
  const submit = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    setResult(null)
    const res = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(state),
    })
    const data = await res.json()
    setResult(data)
    setLoading(false)
  }

  return (
    <div>
      <form onSubmit={submit} style={{ display: 'grid', gap: 8 }}>
        <input name="name" placeholder="Full name" value={state.name} onChange={onChange} required />
        <input name="email" placeholder="Email" value={state.email} onChange={onChange} />
        <input name="phone" placeholder="Phone (WhatsApp)" value={state.phone} onChange={onChange} required />
        <input name="service" placeholder="Service (e.g. Airport transfer)" value={state.service} onChange={onChange} required />
        <input name="date" type="date" value={state.date} onChange={onChange} required />
        <input name="time" type="time" value={state.time} onChange={onChange} />
        <input name="people" type="number" min={1} value={state.people} onChange={onChange} />
        <textarea name="notes" placeholder="Notes" value={state.notes} onChange={onChange} />
        <button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Create booking'}</button>
      </form>

      {result && (
        <div style={{ marginTop: 16, padding: 12, border: '1px solid #ddd' }}>
          <h3>Booking saved</h3>
          <p>ID: {result.booking?.id}</p>
          <p>To contact for payment/confirmation:</p>
          <p>
            <a href={result.whatsappUrl} target="_blank" rel="noreferrer">Open WhatsApp (owner)</a>
          </p>
          <p>
            <a href={result.mailtoUrl}>Send email</a>
          </p>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(result.booking, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}
