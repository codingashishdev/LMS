# Learning Management System

*Automatically synced with your [v0.app](https://v0.app) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/ashish-prajapatis-projects/v0-learning-management-system)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/projects/ZKtmBlSrLvF)

## Overview

A modern, full-featured Learning Management System built with Next.js, TypeScript, and Supabase. This LMS enables instructors to create and manage courses, while students can browse, enroll, and track their learning progress.

This repository will stay in sync with your deployed chats on [v0.app](https://v0.app).
Any changes you make to your deployed app will be automatically pushed to this repository from [v0.app](https://v0.app).

## ✨ Features

### For Instructors
- ✅ **Create New Courses** - Comprehensive course creation with all details
- ✅ **Manage Courses** - Publish, unpublish, archive, and delete courses
- ✅ **Dashboard Analytics** - Track student enrollment and course performance
- ✅ **Student Management** - View and interact with enrolled students

### For Students
- 📚 Browse course catalog
- 🎯 Track learning progress
- ⭐ Rate and review courses
- 💾 Save courses to wishlist

### Platform Features
- 🔐 Secure authentication with Supabase
- 🎨 Modern, responsive UI with Tailwind CSS
- ⚡ Fast performance with Next.js 15
- 🌓 Dark/Light mode support
- ⌨️ Command palette for quick navigation
- 📱 Mobile-friendly design

## Deployment

Your project is live at:

**[https://vercel.com/ashish-prajapatis-projects/v0-learning-management-system](https://vercel.com/ashish-prajapatis-projects/v0-learning-management-system)**

## Build your app

Continue building your app on:

**[https://v0.app/chat/projects/ZKtmBlSrLvF](https://v0.app/chat/projects/ZKtmBlSrLvF)**

## How It Works

1. Create and modify your project using [v0.app](https://v0.app)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm/pnpm
- Supabase account (free tier works)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd LMS
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Edit `.env.local` and add your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```

4. **Run database migrations**
   - Open your Supabase SQL Editor
   - Run the migration file: `database/migrations/001_enhanced_courses_table.sql`

5. **Start the development server**
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:3000](http://localhost:3000)

## 📖 Documentation

- **[Create Course Feature](docs/README.md)** - Complete guide to the course creation feature
- **[Quick Setup Guide](docs/QUICK_SETUP.md)** - Get started in minutes
- **[Database Setup](DATABASE_SETUP.md)** - Detailed database configuration
- **[API Reference](docs/CREATE_COURSE_FEATURE.md)** - Course service API docs

## 🏗️ Project Structure

```
LMS/
├── app/                    # Next.js app directory
│   ├── auth/              # Authentication pages
│   ├── instructor/        # Instructor dashboard
│   ├── course/            # Course pages
│   └── ...
├── components/            # React components
│   ├── ui/               # UI primitives
│   ├── create-course-dialog.tsx
│   ├── instructor-courses-list.tsx
│   └── ...
├── lib/                   # Utilities and services
│   ├── services/         # API services
│   │   └── courses.ts    # Course management API
│   ├── supabase.ts       # Supabase client
│   └── utils.ts
├── database/             # Database migrations
│   └── migrations/
├── docs/                 # Documentation
└── public/              # Static assets
```

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI primitives
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Icons**: Lucide React
- **Charts**: Recharts
- **Deployment**: Vercel

## 🎯 Key Features Implementation

### Create Course Feature

Instructors can create comprehensive courses with:
- Title, description, and category
- Skill level (Beginner/Intermediate/Advanced)
- Pricing with optional discounts
- Tags for better discoverability
- Custom course images
- Automatic slug generation

**Components:**
- `CreateCourseDialog` - Course creation form
- `InstructorCoursesList` - Course management interface
- Course service API with full CRUD operations

[Learn more about the Create Course feature →](docs/README.md)

## 🔐 Security

- Row Level Security (RLS) policies on all tables
- Authentication required for course creation
- Course ownership verification for updates/deletes
- Secure API routes with authentication checks

## 📱 Command Palette

The app includes a global command palette powered by `cmdk`:

- Open with `Ctrl+K` (Windows/Linux) or `⌘+K` (macOS)
- Quick open with `/` when not focused in an input field
- Search for pages and actions, then hit `Enter` to navigate/execute

The palette is mounted once globally in `app/layout.tsx` and can also be opened via the header buttons in both the marketing header and dashboard header.

## 🧪 Testing

To test the create course feature:

1. Navigate to `/instructor`
2. Log in with your account
3. Click "Create New Course"
4. Fill in the form and submit
5. Verify the course appears in your courses list
6. Check Supabase to confirm database entry

## 🤝 Contributing

Contributions are welcome! Please read the documentation before making changes to understand the architecture.

## 📄 License

This project is part of the v0.app ecosystem.