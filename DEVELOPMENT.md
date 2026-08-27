# Development Guide

## Project Structure

```
.
├── app/                    # Next.js App Router (main application)
│   ├── api/               # API routes
│   │   └── bookings/      # Booking endpoints
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page with booking form
│   └── globals.css        # Global styles
├── components/            # Reusable React components
├── lib/                   # Utility functions and database
│   └── db.ts             # Prisma singleton
├── prisma/               # Database schema and migrations
│   ├── schema.prisma     # Data models
│   └── migrations/       # Migration history
├── public/               # Static assets
├── scripts/              # Build and utility scripts
│   └── extract-docx.js  # Extract from Word documents
├── .env.example          # Environment variables template
├── .github/
│   └── workflows/        # CI/CD workflows
├── Dockerfile            # Docker build configuration
├── docker-compose.yml    # Docker Compose for local development
├── next.config.js        # Next.js configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Project dependencies
```

## Technology Stack

- **Framework:** Next.js 13 (App Router)
- **Language:** TypeScript
- **Database:** SQLite (Prisma ORM)
- **Styling:** CSS
- **Package Manager:** npm

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/sufuritatu234-svg/New-trinity.git
cd New-trinity
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment

```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:

```dotenv
DATABASE_URL="file:./prisma/dev.db"
NEXT_PUBLIC_WHATSAPP_NUMBER="1234567890"  # E.164 format, without +
```

### 4. Initialize Database

```bash
# Generate Prisma Client
npm run prisma:generate

# Run migrations (creates database)
npm run prisma:migrate

# (Optional) Open Prisma Studio to view database
npx prisma studio
```

### 5. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- **`npm run dev`** - Start development server with hot reload
- **`npm run build`** - Create optimized production build
- **`npm start`** - Run production server
- **`npm run prisma:generate`** - Generate Prisma Client after schema changes
- **`npm run prisma:migrate`** - Create and apply database migrations
- **`npm run extract-docx`** - Extract content from `.docx` files

## Database Schema

The project uses Prisma with SQLite. Current schema:

```prisma
model Booking {
  id        Int     @id @default(autoincrement())
  name      String
  email     String
  phone     String
  date      String
  service   String
  time      String
  notes     String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Making Schema Changes

1. Edit `prisma/schema.prisma`
2. Run: `npm run prisma:migrate`
3. Name the migration (e.g., "add_status_field")
4. Migration files are auto-generated in `prisma/migrations/`

## API Routes

### POST /api/bookings

Create a new booking.

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1 (555) 123-4567",
  "service": "Consultation",
  "date": "2024-12-25",
  "time": "14:30",
  "notes": "Optional special requests"
}
```

**Response:**
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1 (555) 123-4567",
  "service": "Consultation",
  "date": "2024-12-25",
  "time": "14:30",
  "notes": "Optional special requests",
  "createdAt": "2024-08-27T10:00:00Z",
  "updatedAt": "2024-08-27T10:00:00Z"
}
```

### GET /api/bookings

Retrieve all bookings.

**Response:**
```json
[
  {
    "id": 1,
    "name": "John Doe",
    ...
  }
]
```

## Component Development

### Creating a New Component

1. Create file in `components/` directory
2. Use TypeScript and React hooks

Example:

```typescript
// components/BookingForm.tsx
"use client";

import { useState } from "react";

interface BookingFormProps {
  onSubmit: (data: BookingData) => void;
}

export default function BookingForm({ onSubmit }: BookingFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      onSubmit(formData);
    }}>
      {/* Form JSX */}
    </form>
  );
}
```

## Styling

The project uses vanilla CSS with a global stylesheet (`app/globals.css`). 

### Adding Styles

1. For global styles: Edit `app/globals.css`
2. For component-specific styles: Use CSS Modules or inline styles

Example CSS Module:
```css
/* components/BookingForm.module.css */
.form {
  max-width: 600px;
  margin: 0 auto;
}
```

Use in component:
```typescript
import styles from './BookingForm.module.css';

export default function BookingForm() {
  return <form className={styles.form}>...</form>;
}
```

## Adding Features

### 1. Add API Endpoint

Create `app/api/feature/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // Implementation
  return NextResponse.json({ message: "Hello" });
}
```

### 2. Add Database Model

Edit `prisma/schema.prisma`:

```prisma
model NewModel {
  id    Int     @id @default(autoincrement())
  // ... fields
}
```

Run migration:
```bash
npm run prisma:migrate
```

### 3. Create UI Page

Create `app/new-feature/page.tsx`:

```typescript
"use client";

export default function NewFeature() {
  return <div>Feature content</div>;
}
```

## Testing

### Manual Testing

1. Use browser DevTools
2. Test form submissions
3. Verify database entries

### Debug Modes

- Open `/api/bookings` in browser to view all bookings
- Use Prisma Studio: `npx prisma studio`

## Common Issues

### "Prisma Client not generated"

```bash
npm run prisma:generate
```

### Database locked error

The SQLite database may be locked. Stop all running servers and try again:

```bash
npm run dev
```

### Port 3000 already in use

Use a different port:

```bash
npm run dev -- -p 3001
```

### Environment variables not loading

Make sure `.env.local` is in the root directory and has been edited with your values.

## Code Style

- Use TypeScript for all files
- Use functional components with hooks
- Follow React best practices
- Use meaningful variable and function names

## Debugging

### Browser DevTools

1. Open DevTools (F12)
2. Check Console for errors
3. Use Network tab to inspect API calls

### Server Logs

Check terminal where `npm run dev` is running for server-side errors.

### Prisma Debugging

```bash
# Enable query logging
export DEBUG="prisma:*"
npm run dev
```

## Git Workflow

```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Make changes and commit
git add .
git commit -m "feat: describe your changes"

# Push to GitHub
git push origin feature/your-feature-name

# Create Pull Request on GitHub
```

## Performance Tips

1. Use React's `memo()` for expensive components
2. Implement lazy loading for routes
3. Optimize database queries with Prisma's `include` and `select`
4. Use CSS caching and minification

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Documentation](https://react.dev)

## Getting Help

1. Check existing issues on GitHub
2. Review error messages in console
3. Consult documentation for dependencies
4. Ask in project discussions
