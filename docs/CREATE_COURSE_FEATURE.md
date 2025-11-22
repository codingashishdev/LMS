# Create New Course Feature

This feature allows instructors to create new courses through the instructor dashboard.

## Components

### 1. CreateCourseDialog (`/components/create-course-dialog.tsx`)

A modal dialog component that provides a form for creating new courses.

**Features:**
- Complete course creation form with validation
- Integration with Supabase for data persistence
- Real-time feedback with toast notifications
- Loading states and error handling
- Automatic slug generation from course title
- Support for course tags (comma-separated)
- Price and discount price fields

**Props:**
- `onCourseCreated?: () => void` - Optional callback function called after successful course creation

### 2. Dialog UI Component (`/components/ui/dialog.tsx`)

Reusable dialog component built with Radix UI primitives.

**Exports:**
- `Dialog` - Root dialog component
- `DialogTrigger` - Trigger button
- `DialogContent` - Content wrapper
- `DialogHeader` - Header section
- `DialogTitle` - Title text
- `DialogDescription` - Description text
- `DialogFooter` - Footer section for actions

## Database Schema

The enhanced courses table includes the following fields:

```sql
CREATE TABLE courses (
  id UUID PRIMARY KEY,
  slug VARCHAR UNIQUE,
  title VARCHAR NOT NULL,
  description TEXT,
  category VARCHAR,
  level VARCHAR ('Beginner' | 'Intermediate' | 'Advanced'),
  duration VARCHAR,
  rating DECIMAL,
  students INTEGER,
  lessons INTEGER,
  image_url TEXT,
  instructor_id UUID (references auth.users),
  instructor_name VARCHAR,
  price DECIMAL,
  original_price DECIMAL,
  tags TEXT[],
  language VARCHAR,
  status VARCHAR ('Draft' | 'Published' | 'Archived'),
  featured BOOLEAN,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

### Automatic Features

1. **Slug Generation**: Automatically generates a URL-friendly slug from the course title
2. **Updated At**: Automatically updates the `updated_at` timestamp on modifications
3. **Row Level Security (RLS)**: 
   - Anyone can view published courses
   - Only course instructors can view their draft courses
   - Only authenticated users can create courses
   - Only course instructors can update/delete their courses

## Setup Instructions

### 1. Database Setup

Run the migration script to create/update the courses table:

```bash
# In Supabase SQL Editor, run:
database/migrations/001_enhanced_courses_table.sql
```

### 2. Install Required Dependencies

The following packages are required:

```bash
npm install @radix-ui/react-dialog lucide-react
```

### 3. Environment Variables

Make sure your `.env.local` has the correct Supabase credentials:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Usage

### In Instructor Dashboard

The create course dialog is already integrated into the instructor dashboard:

```tsx
import { CreateCourseDialog } from "@/components/create-course-dialog"

export function InstructorDashboard() {
  return (
    <div>
      <CreateCourseDialog />
    </div>
  )
}
```

### With Callback

You can provide a callback to refresh data after course creation:

```tsx
<CreateCourseDialog 
  onCourseCreated={() => {
    // Refresh courses list
    fetchCourses()
  }} 
/>
```

## Form Fields

### Required Fields
- **Course Title**: The name of the course
- **Description**: Detailed description of what students will learn
- **Category**: Course category (e.g., Web Development, Design)
- **Level**: Beginner, Intermediate, or Advanced
- **Price**: Course price in USD

### Optional Fields
- **Duration**: Course duration (e.g., "24 hours")
- **Language**: Course language (defaults to "English")
- **Original Price**: Original price for showing discounts
- **Tags**: Comma-separated tags for categorization
- **Image URL**: URL to course thumbnail image

## Features in Detail

### 1. Form Validation

The form includes HTML5 validation for required fields. Additional validation ensures:
- Price is a valid number
- Tags are properly formatted
- All required fields are filled before submission

### 2. Loading States

The dialog shows loading indicators during:
- Course creation process
- Form submission
- Database operations

### 3. Error Handling

Comprehensive error handling for:
- Authentication errors (user not logged in)
- Database errors
- Network errors
- Validation errors

### 4. User Feedback

Toast notifications inform users of:
- Successful course creation
- Error messages with specific details
- Authentication requirements

## Security

### Authentication

- Users must be authenticated to create courses
- The `instructor_id` is automatically set from the authenticated user
- Unauthenticated users receive a clear error message

### Row Level Security (RLS)

Database policies ensure:
- Only course owners can edit their courses
- Draft courses are only visible to their creators
- Published courses are visible to everyone

## Future Enhancements

Potential improvements for the create course feature:

1. **Image Upload**: Direct file upload instead of URL input
2. **Rich Text Editor**: Enhanced description editor with formatting
3. **Course Curriculum**: Add lessons and modules during creation
4. **Draft Save**: Auto-save form as draft
5. **Validation Messages**: More detailed inline validation
6. **Bulk Tag Input**: Tag picker/autocomplete component
7. **Price Templates**: Quick price selection options
8. **Course Preview**: Preview how the course will look
9. **Duplicate Course**: Create new course from existing template
10. **Multi-step Form**: Break into multiple steps for easier input

## Troubleshooting

### Course not appearing in database

1. Check Supabase console for errors
2. Verify RLS policies are correctly set
3. Ensure user is authenticated
4. Check browser console for errors

### Authentication errors

1. Verify environment variables are set
2. Check if user session is valid
3. Try logging out and back in

### Form not submitting

1. Check all required fields are filled
2. Verify price is a valid number
3. Check browser console for validation errors

## Related Files

- `/components/create-course-dialog.tsx` - Main dialog component
- `/components/ui/dialog.tsx` - Dialog UI primitives
- `/components/instructor-dashboard.tsx` - Dashboard integration
- `/database/migrations/001_enhanced_courses_table.sql` - Database schema
- `/lib/supabase.ts` - Supabase client configuration
