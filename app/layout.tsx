export const metadata = {
  title: 'Trinity Express Bookings',
  description: 'Book transports and contact via WhatsApp',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main style={{ padding: 20, fontFamily: 'Inter, system-ui, sans-serif' }}>{children}</main>
      </body>
    </html>
  )
}
