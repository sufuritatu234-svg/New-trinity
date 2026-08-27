# Trinity Express Bookings

This is a scaffolded Next.js + TypeScript project (App Router) for the "trinityexpressbookings" website. It was created from your repository and is configured to store bookings in SQLite via Prisma. Authentication is intentionally omitted. Bookings are confirmed and payments are handled by contacting via WhatsApp or email (UI provides pre-filled WhatsApp and mailto links).

Important: The original project included a Word document `trinity new code sample.docx` at the repo root. I could not automatically convert it here; a script to extract it is included (`npm run extract-docx`) which uses the `mammoth` package.

Quick start (local):

1. Install dependencies

```bash
npm install
```

2. Generate Prisma client & run migration (creates SQLite DB)

```bash
npx prisma generate
npx prisma migrate dev --name init
```

3. Run the dev server

```bash
npm run dev
# open http://localhost:3000
```

Environment variables

Create a `.env` file in the project root. See `.env.example` for the required variables.

What the app does

- Simple booking form at `/` that stores bookings in SQLite.
- After submission, the UI shows a prefilled WhatsApp message link and a mailto link so the owner can be contacted for payment/confirmation.
- If you want automated WhatsApp messages, configure a WhatsApp API (Twilio, Meta) and add a server-side sender — instructions are in README.

Files added

- Next.js App Router pages (app/)
- Prisma schema and client
- A small script `scripts/extract-docx.js` to extract the docx to HTML/text using `mammoth` (run `npm run extract-docx`)

Next steps I can take for you (pick one):
- Run a first commit and push here (done).
- Add automated email sending (requires SMTP env vars).
- Integrate Twilio/WhatsApp for automated messages.

