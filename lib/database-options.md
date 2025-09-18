# Database Options for LMS

## 1. Supabase (Recommended - Easiest)
- **Free tier**: 500MB database, 50,000 monthly active users
- **Features**: PostgreSQL, Auth, Real-time, Storage
- **Setup**: 5 minutes
- **Best for**: Quick start, full-featured

## 2. Firebase (Google)
- **Free tier**: 1GB storage, 20,000 reads/day
- **Features**: NoSQL, Auth, Real-time, Hosting
- **Setup**: 10 minutes
- **Best for**: Real-time features, mobile apps

## 3. PlanetScale (MySQL)
- **Free tier**: 1GB storage, 1 billion reads/month
- **Features**: MySQL, Branching, Serverless
- **Setup**: 15 minutes
- **Best for**: High performance, scaling

## 4. Neon (PostgreSQL)
- **Free tier**: 3GB storage, 10GB transfer
- **Features**: PostgreSQL, Serverless, Branching
- **Setup**: 10 minutes
- **Best for**: PostgreSQL with modern features

## 5. Vercel Postgres
- **Free tier**: 3GB storage, 60 hours compute
- **Features**: PostgreSQL, Edge functions
- **Setup**: 5 minutes (if using Vercel)
- **Best for**: Vercel deployments

## Quick Start Guide

### Option 1: Supabase (Recommended)
1. Go to https://supabase.com
2. Create new project
3. Get your URL and anon key
4. Add to `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
```

### Option 2: Firebase
1. Go to https://console.firebase.google.com
2. Create new project
3. Enable Authentication and Firestore
4. Get config and add to `.env.local`

### Option 3: PlanetScale
1. Go to https://planetscale.com
2. Create new database
3. Get connection string
4. Add to `.env.local`

## Database Schema

```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR UNIQUE NOT NULL,
  name VARCHAR,
  avatar_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Courses table
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR NOT NULL,
  description TEXT,
  instructor VARCHAR,
  duration INTEGER, -- in minutes
  level VARCHAR,
  price DECIMAL,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- User progress table
CREATE TABLE user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  course_id UUID REFERENCES courses(id),
  progress_percentage INTEGER DEFAULT 0,
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, course_id)
);

-- Wishlist table
CREATE TABLE wishlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  course_id UUID REFERENCES courses(id),
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, course_id)
);
```

