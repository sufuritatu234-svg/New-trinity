import { NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const booking = await prisma.booking.create({
      data: {
        name: body.name,
        email: body.email || null,
        phone: body.phone,
        service: body.service,
        date: body.date,
        time: body.time || null,
        people: body.people ? Number(body.people) : null,
        notes: body.notes || null,
      },
    })

    // Prepare contact links
    const ownerNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ''
    const message = `New booking from ${booking.name} - Service: ${booking.service} on ${booking.date} ${booking.time || ''}. Phone: ${booking.phone}.`;
    const encoded = encodeURIComponent(message)
    const whatsappUrl = ownerNumber ? `https://wa.me/${ownerNumber}?text=${encoded}` : `https://wa.me/?text=${encoded}`

    const mailto = booking.email
      ? `mailto:${booking.email}?subject=${encodeURIComponent('Booking confirmation')}&body=${encodeURIComponent(message)}`
      : `mailto:?subject=${encodeURIComponent('New booking')}&body=${encodeURIComponent(message)}`

    return NextResponse.json({ booking, whatsappUrl, mailtoUrl: mailto })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Unable to create booking' }, { status: 500 })
  }
}
