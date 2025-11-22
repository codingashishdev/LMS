-- Enrollments Table Migration
-- Run this SQL in your Supabase SQL Editor to create the enrollments table

-- Create the enrollments table
CREATE TABLE IF NOT EXISTS enrollments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  course_id INTEGER NOT NULL,
  enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  progress DECIMAL DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMP WITH TIME ZONE,
  certificate_issued BOOLEAN DEFAULT false,
  last_accessed TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Ensure a user can only enroll once per course
  UNIQUE(user_id, course_id)
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_enrollments_user ON enrollments(user_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_course ON enrollments(course_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_progress ON enrollments(progress);
CREATE INDEX IF NOT EXISTS idx_enrollments_completed ON enrollments(completed);

-- Create a trigger to update the updated_at timestamp
DROP TRIGGER IF EXISTS update_enrollments_updated_at ON enrollments;
CREATE TRIGGER update_enrollments_updated_at
    BEFORE UPDATE ON enrollments
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own enrollments
CREATE POLICY "Users can view own enrollments" ON enrollments
    FOR SELECT
    USING (auth.uid() = user_id);

-- Policy: Users can create their own enrollments
CREATE POLICY "Users can create own enrollments" ON enrollments
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own enrollments
CREATE POLICY "Users can update own enrollments" ON enrollments
    FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Policy: Users can delete their own enrollments (unenroll)
CREATE POLICY "Users can delete own enrollments" ON enrollments
    FOR DELETE
    USING (auth.uid() = user_id);

-- Create a view for enrollment statistics (accessible to course instructors)
CREATE OR REPLACE VIEW enrollment_stats AS
SELECT 
  course_id,
  COUNT(*) as total_enrollments,
  COUNT(*) FILTER (WHERE completed = true) as completed_count,
  COUNT(*) FILTER (WHERE completed = false) as in_progress_count,
  AVG(progress) as avg_progress,
  COUNT(*) FILTER (WHERE certificate_issued = true) as certificates_issued
FROM enrollments
GROUP BY course_id;

-- Grant access to the view
GRANT SELECT ON enrollment_stats TO authenticated;
