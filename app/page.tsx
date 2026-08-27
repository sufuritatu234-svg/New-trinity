import BookingForm from '../components/BookingForm'

export default function Page() {
  return (
    <div style={{ maxWidth: 760, margin: '0 auto' }}>
      <h1>Trinity Express Bookings</h1>
      <p>Fill the form below to create a booking. Payments and confirmations are handled via WhatsApp and email.</p>
      <BookingForm />
    </div>
  )
}
