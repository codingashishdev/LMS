-- Enhanced Courses Table Migration
-- Run this SQL in your Supabase SQL Editor to update the courses table

-- First, drop the existing courses table if you want to start fresh
-- WARNING: This will delete all existing course data!
-- DROP TABLE IF EXISTS courses CASCADE;

-- Create or replace the enhanced courses table
CREATE TABLE IF NOT EXISTS courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug VARCHAR UNIQUE,
  title VARCHAR NOT NULL,
  description TEXT,
  category VARCHAR,
  level VARCHAR CHECK (level IN ('Beginner', 'Intermediate', 'Advanced')),
  duration VARCHAR, -- e.g., "24 hours"
  rating DECIMAL DEFAULT 0,
  students INTEGER DEFAULT 0,
  lessons INTEGER DEFAULT 0,
  image_url TEXT,
  instructor_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  instructor_name VARCHAR, -- Denormalized for easier display
  price DECIMAL DEFAULT 0,
  original_price DECIMAL DEFAULT 0,
  tags TEXT[], -- Array of tags
  language VARCHAR DEFAULT 'English',
  status VARCHAR DEFAULT 'Draft' CHECK (status IN ('Draft', 'Published', 'Archived')),
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_courses_instructor ON courses(instructor_id);
CREATE INDEX IF NOT EXISTS idx_courses_category ON courses(category);
CREATE INDEX IF NOT EXISTS idx_courses_level ON courses(level);
CREATE INDEX IF NOT EXISTS idx_courses_status ON courses(status);
CREATE INDEX IF NOT EXISTS idx_courses_featured ON courses(featured);

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create a trigger to call the function
DROP TRIGGER IF EXISTS update_courses_updated_at ON courses;
CREATE TRIGGER update_courses_updated_at
    BEFORE UPDATE ON courses
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Function to generate slug from title
CREATE OR REPLACE FUNCTION generate_slug_from_title()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.slug IS NULL OR NEW.slug = '' THEN
        NEW.slug = lower(regexp_replace(NEW.title, '[^a-zA-Z0-9]+', '-', 'g'));
        -- Remove leading/trailing hyphens
        NEW.slug = trim(both '-' from NEW.slug);
    END IF;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for slug generation
DROP TRIGGER IF EXISTS generate_course_slug ON courses;
CREATE TRIGGER generate_course_slug
    BEFORE INSERT OR UPDATE OF title ON courses
    FOR EACH ROW
    EXECUTE FUNCTION generate_slug_from_title();

-- Enable Row Level Security (RLS)
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read published courses
CREATE POLICY "Anyone can view published courses" ON courses
    FOR SELECT
    USING (status = 'Published' OR auth.uid() = instructor_id);

-- Policy: Only authenticated users can create courses
CREATE POLICY "Authenticated users can create courses" ON courses
    FOR INSERT
    WITH CHECK (auth.role() = 'authenticated');

-- Policy: Instructors can update their own courses
CREATE POLICY "Instructors can update their own courses" ON courses
    FOR UPDATE
    USING (auth.uid() = instructor_id)
    WITH CHECK (auth.uid() = instructor_id);

-- Policy: Instructors can delete their own courses
CREATE POLICY "Instructors can delete their own courses" ON courses
    FOR DELETE
    USING (auth.uid() = instructor_id);

-- Insert sample courses (optional - comment out if you don't want sample data)
-- Note: Replace the instructor_id with actual user IDs from your auth.users table
INSERT INTO courses (
  title, 
  description, 
  category, 
  level, 
  duration, 
  rating, 
  students, 
  lessons, 
  price, 
  original_price, 
  tags, 
  language, 
  status, 
  featured, 
  image_url
) VALUES
(
  'Complete React Developer',
  'Build production-ready React applications with hooks, context, and modern tooling.',
  'Web Development',
  'Intermediate',
  '24 hours',
  4.9,
  18230,
  96,
  129,
  189,
  ARRAY['react', 'frontend', 'hooks'],
  'English',
  'Published',
  true,
  '/react-course-thumbnail.png'
),
(
  'Advanced JavaScript Patterns',
  'Master modern JavaScript concepts, performance patterns, and architecture decisions.',
  'Web Development',
  'Advanced',
  '18 hours',
  4.8,
  14210,
  74,
  119,
  179,
  ARRAY['javascript', 'performance', 'architecture'],
  'English',
  'Published',
  true,
  '/javascript-advanced-course-thumbnail.png'
),
(
  'UI/UX Design Masterclass',
  'Create delightful user experiences with research-driven design systems.',
  'UI/UX Design',
  'Intermediate',
  '16 hours',
  4.7,
  12650,
  64,
  109,
  169,
  ARRAY['design', 'figma', 'research'],
  'English',
  'Published',
  true,
  '/ui-ux-design-course-thumbnail.png'
);
