# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
npm run dev          # Start Next.js development server on localhost:3000

# Build & Production
npm run build        # Build for production
npm run start        # Start production server

# Linting
npm run lint         # Run ESLint

# Database
npx prisma generate  # Generate Prisma client (also runs on postinstall)
npx prisma db push   # Push schema changes to MongoDB
npx ts-node --skipProject scripts/seeds.ts  # Seed categories
```

## Architecture

This is a **Next.js 14 job portal** with MongoDB, Clerk authentication, and Firebase storage.

### Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Database**: MongoDB via Prisma ORM
- **Auth**: Clerk (`@clerk/nextjs`)
- **Storage**: Firebase Storage for file uploads (images, resumes, attachments)
- **AI**: Google Gemini API for AI features
- **Email**: Nodemailer with Handlebars templates
- **UI**: Radix UI components + Tailwind CSS + shadcn/ui pattern

### Route Groups
- `app/(auth)/` - Clerk sign-in/sign-up pages
- `app/(dashboard)/` - Main app with sidebar layout
  - `/admin/` - Recruiter routes (create/manage jobs, companies, applicants, analytics)
  - `/search/` - Job seeker routes (browse jobs, job details)
  - `/user/` - User profile management
  - `/companies/[companyId]` - Public company pages
  - `/savedJobs/` - Saved jobs list

### Key Directories
- `actions/` - Server actions for data fetching (e.g., `get-jobs.ts`)
- `components/` - Reusable components (shadcn/ui in `components/ui/`)
- `config/` - Firebase configuration
- `lib/` - Utilities: `db.ts` (Prisma client), `mail.ts` (email), `utils.ts` (cn helper)
- `lib/designs/` - Handlebars email templates
- `providers/` - Context providers (toast)

### Data Models (Prisma/MongoDB)
- **Job** - Job postings with category, company, attachments, savedUsers array
- **Company** - Company profiles with followers array
- **Category** - Job categories
- **UserProfile** - User data with applied jobs and resumes
- **Resumes** - User resume files
- **Attachment** - Job attachments

### API Routes Pattern
API routes follow RESTful structure under `app/api/`:
- `/api/jobs/` - CRUD for jobs
- `/api/jobs/[jobId]/publish` and `/unpublish` - Toggle job visibility
- `/api/jobs/[jobId]/saveJobToCollection` - Save/unsave jobs for users
- `/api/companies/` - CRUD for companies
- `/api/users/[userId]/` - User profile and resumes
- `/api/sendSelected/` and `/api/sendRejection/` - Email notifications to applicants

## Environment Variables

Required in `.env`:
- `CLERK_*` - Clerk auth keys
- `DATABASE_URL` - MongoDB connection string
- `NEXT_PUBLIC_FIREBASE_*` - Firebase config for storage
- `GEMINI_API_KEY` - Google Gemini API
- `SMTP_EMAIL`, `SMTP_PASSWORD` - Email credentials
