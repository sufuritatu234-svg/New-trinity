# Deployment Guide for Trinity Express Bookings

This guide covers how to build, test, and deploy the Trinity Express Bookings application.

## Prerequisites

- Node.js 18+ and npm
- Docker (optional, for containerized deployment)
- A hosting platform (Vercel, AWS, Heroku, DigitalOcean, etc.)

## Local Development

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Copy `.env.example` to `.env.local` and configure:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```dotenv
DATABASE_URL="file:./prisma/dev.db"
NEXT_PUBLIC_WHATSAPP_NUMBER="your_whatsapp_number"
```

### 3. Initialize Database

```bash
npm run prisma:generate
npm run prisma:migrate
```

### 4. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000`

## Building for Production

### Build the Application

```bash
npm run build
npm start
```

### Type Checking

```bash
npx tsc --noEmit
```

## Docker Deployment

### Build Docker Image

```bash
docker build -t trinity-bookings:latest .
```

### Run with Docker Compose

```bash
docker-compose up -d
```

### Push to Docker Registry

```bash
docker tag trinity-bookings:latest your-registry/trinity-bookings:latest
docker push your-registry/trinity-bookings:latest
```

## Cloud Deployment Options

### Vercel (Recommended for Next.js)

1. Push your code to GitHub
2. Import the repository at https://vercel.com/new
3. Set environment variables in Vercel dashboard
4. Deploy with one click

```bash
vercel deploy
```

**Note:** Vercel has limitations with SQLite. For production, consider:
- Using Vercel KV for caching
- Migrating to PostgreSQL (update `prisma/schema.prisma`)
- Using a serverless database like Neon or PlanetScale

### Railway.app

1. Connect your GitHub repository
2. Set environment variables:
   - `DATABASE_URL` - Railway provides this automatically
   - `NEXT_PUBLIC_WHATSAPP_NUMBER`
3. Railway auto-deploys on push

### AWS (via Elastic Container Service)

```bash
# Build image
docker build -t trinity-bookings:latest .

# Push to ECR
aws ecr get-login-password | docker login --username AWS --password-stdin <your-ecr-uri>
docker tag trinity-bookings:latest <your-ecr-uri>/trinity-bookings:latest
docker push <your-ecr-uri>/trinity-bookings:latest

# Deploy to ECS (requires ECS cluster setup)
```

### Heroku

```bash
# Install Heroku CLI
npm install -g heroku

# Login
heroku login

# Create app
heroku create trinity-express-bookings

# Add buildpack
heroku buildpacks:add heroku/nodejs

# Set environment variables
heroku config:set NEXT_PUBLIC_WHATSAPP_NUMBER=your_number

# Deploy
git push heroku main
```

### DigitalOcean (via App Platform)

1. Connect GitHub repository
2. Specify build command: `npm run build`
3. Specify start command: `npm start`
4. Set environment variables in the UI
5. Deploy

## Production Database Setup

### Migrate from SQLite to PostgreSQL

Update `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

Run migrations:

```bash
npx prisma generate
npx prisma migrate deploy
```

## GitHub Actions CI/CD

The `.github/workflows/deploy.yml` file automatically:
- Runs on every push to `main` branch
- Installs dependencies
- Generates Prisma Client
- Builds the application
- Performs type checking

To deploy after build completes, add a deployment step to the workflow.

## Environment Variables Checklist

- [ ] `DATABASE_URL` - Set to your database connection string
- [ ] `NEXT_PUBLIC_WHATSAPP_NUMBER` - Set to your WhatsApp number (E.164 format, no +)
- [ ] `NODE_ENV` - Set to "production" on production servers

## Monitoring and Logging

### View Deployment Logs

- **Vercel:** Dashboard > Deployments > Logs
- **Railway:** Dashboard > Logs
- **Docker:** `docker logs <container-id>`
- **Heroku:** `heroku logs --tail`

### Database Debugging

```bash
# View database with Prisma Studio
npx prisma studio
```

## Rollback Procedures

### Vercel
- Go to Deployments tab and click "Rollback" on previous deployment

### Railway
- Click on previous deployment and select "Redeploy"

### Docker
- Re-tag and push previous image:
```bash
docker tag previous-image:tag your-registry/trinity-bookings:latest
docker push your-registry/trinity-bookings:latest
```

## Performance Optimization

1. Enable caching headers in `next.config.js`
2. Use CDN for static assets
3. Implement database connection pooling for PostgreSQL
4. Add API rate limiting

## Security Checklist

- [ ] Set `NEXT_PUBLIC_WHATSAPP_NUMBER` (public is fine, number is public anyway)
- [ ] Never commit `.env.local` file
- [ ] Use strong database passwords
- [ ] Enable HTTPS/SSL certificate
- [ ] Keep dependencies updated: `npm audit fix`
- [ ] Review Prisma security best practices

## Troubleshooting

### Database Connection Errors

```bash
# Test database connection
npx prisma db push
```

### Build Fails

```bash
# Clear build cache
rm -rf .next
npm ci
npm run build
```

### Deployment Hangs

- Check memory limits in container/server
- Verify database is accessible from deployment environment
- Check for circular dependencies in code

For more help: Review logs and check platform-specific documentation.
