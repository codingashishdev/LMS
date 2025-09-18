# Database Setup Guide

## Quick Start with Supabase (Recommended)

### 1. Create Supabase Project
1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign up with GitHub, Google, or email
4. Click "New Project"
5. Choose your organization
6. Enter project details:
   - Name: `lms-app`
   - Database Password: (create a strong password)
   - Region: Choose closest to your users
7. Click "Create new project"
8. Wait 2-3 minutes for setup

### 2. Get Your Credentials
1. Go to Settings → API
2. Copy your:
   - Project URL
   - Anon public key

### 3. Set Up Environment Variables
1. Copy `env.example` to `.env.local`
2. Add your credentials:
```bash
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

### 4. Create Database Tables
1. Go to SQL Editor in Supabase
2. Run this SQL to create tables:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR UNIQUE NOT NULL,
  name VARCHAR,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Courses table
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR NOT NULL,
  description TEXT,
  instructor VARCHAR,
  duration INTEGER, -- in minutes
  level VARCHAR,
  price DECIMAL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User progress table
CREATE TABLE user_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  progress_percentage INTEGER DEFAULT 0,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, course_id)
);

-- Wishlist table
CREATE TABLE wishlist (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, course_id)
);

-- Insert sample courses
INSERT INTO courses (title, description, instructor, duration, level, price, image_url) VALUES
('Introduction to React', 'Learn the fundamentals of React development', 'Sarah Johnson', 480, 'Beginner', 89.99, '/react-course-thumbnail.png'),
('Advanced JavaScript', 'Master advanced JavaScript concepts and patterns', 'Mike Chen', 720, 'Advanced', 99.99, '/javascript-course-thumbnail.png'),
('UI/UX Design Principles', 'Create beautiful and functional user interfaces', 'Emily Davis', 360, 'Intermediate', 79.99, '/design-course-thumbnail.png'),
('Node.js Backend Development', 'Build scalable server-side applications', 'Alex Rodriguez', 600, 'Intermediate', 109.99, '/nodejs-course-thumbnail.png');
```

### 5. Set Up Authentication
1. Go to Authentication → Settings
2. Enable "Enable email confirmations" (optional)
3. Add your site URL: `http://localhost:3000` (for development)
4. Add redirect URLs: `http://localhost:3000/auth/callback`

### 6. Install Dependencies
```bash
npm install @supabase/supabase-js
```

### 7. Test Your Setup
1. Run `npm run dev`
2. Go to `/register` and create an account
3. Check Supabase → Authentication → Users to see your user
4. Check Supabase → Table Editor → users to see the profile

## Alternative: Firebase Setup

### 1. Create Firebase Project
1. Go to [https://console.firebase.google.com](https://console.firebase.google.com)
2. Click "Create a project"
3. Follow the setup wizard

### 2. Enable Authentication
1. Go to Authentication → Sign-in method
2. Enable "Email/Password"

### 3. Create Firestore Database
1. Go to Firestore Database
2. Click "Create database"
3. Choose "Start in test mode"
4. Select a location

### 4. Get Configuration
1. Go to Project Settings → General
2. Scroll to "Your apps"
3. Click "Web" icon
4. Register your app
5. Copy the config object

### 5. Update Environment Variables
```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## Alternative: PlanetScale Setup

### 1. Create Database
1. Go to [https://planetscale.com](https://planetscale.com)
2. Sign up and create a database
3. Get your connection string

### 2. Set Environment Variable
```bash
DATABASE_URL=mysql://username:password@host:port/database
```

### 3. Install Prisma
```bash
npm install prisma @prisma/client
npx prisma init
```

## Troubleshooting

### Common Issues

1. **"Invalid API key"**
   - Check your environment variables
   - Make sure you're using the correct keys

2. **"User not found"**
   - Check if the user exists in your database
   - Verify authentication is working

3. **"Permission denied"**
   - Check your Row Level Security (RLS) policies in Supabase
   - Make sure your user has the right permissions

### Getting Help

- Supabase: [https://supabase.com/docs](https://supabase.com/docs)
- Firebase: [https://firebase.google.com/docs](https://firebase.google.com/docs)
- PlanetScale: [https://planetscale.com/docs](https://planetscale.com/docs)

