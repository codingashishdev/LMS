# Quick Setup Guide - Create Course Feature

## Prerequisites
- Supabase account and project set up
- Environment variables configured in `.env.local`
- Node.js and npm/pnpm installed
- User authentication working

## Step-by-Step Setup

### 1. Database Setup (5 minutes)

1. Open your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Create a new query
4. Copy the contents of `/database/migrations/001_enhanced_courses_table.sql`
5. Paste into the SQL Editor
6. Click **Run** to execute the migration
7. Verify the `courses` table was created in **Table Editor**

### 2. Verify Environment Variables (2 minutes)

Check that your `.env.local` file contains:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

If not configured, copy from `.env.example` and add your Supabase credentials.

### 3. Install Dependencies (Already Done)

All required dependencies are already installed. No action needed.

### 4. Test the Feature (3 minutes)

1. Start the development server:
```bash
npm run dev
# or
pnpm dev
```

2. Navigate to the instructor dashboard:
```
http://localhost:3000/instructor
```

3. Ensure you're logged in (redirect to `/login` if not)

4. Click the **"Create New Course"** button

5. Fill in the form with test data:
   - **Title**: "Test Course"
   - **Description**: "This is a test course"
   - **Category**: "Web Development"
   - **Level**: "Beginner"
   - **Price**: "99.99"

6. Click **"Create Course"**

7. Look for success toast notification

8. Check Supabase Table Editor to see the new course

### 5. Verify Database (2 minutes)

In Supabase:

1. Go to **Table Editor** → **courses**
2. You should see your test course
3. Verify these fields were auto-populated:
   - `id` (UUID)
   - `slug` (generated from title)
   - `instructor_id` (your user ID)
   - `status` (should be "Draft")
   - `created_at` and `updated_at` (timestamps)
   - `rating`, `students`, `lessons` (should be 0)

### 6. Test Row Level Security (3 minutes)

1. Create a test course as one user
2. Log out and create another user account
3. Log in as the second user
4. Go to instructor dashboard
5. You should NOT see the first user's courses
6. Create a course as second user
7. You should only see your own courses

## Troubleshooting

### Issue: "Create New Course" button doesn't work
**Check:**
- Browser console for errors
- You're logged in (check auth state)
- Dialog component is rendering

### Issue: Form submits but course doesn't appear
**Check:**
- Supabase console for errors
- RLS policies are correctly set
- Your user ID exists in `auth.users`

### Issue: "User not authenticated" error
**Check:**
- You're logged in
- Session is valid
- Environment variables are correct

### Issue: Database error when creating course
**Check:**
- Migration ran successfully
- All required fields are provided
- Field types match schema

## Next Steps

Once verified working:

1. ✅ Database migration complete
2. ✅ Create course feature working
3. ✅ RLS policies working
4. 📝 Add more instructors/courses
5. 📝 Test publishing courses
6. 📝 Test course editing
7. 📝 Build course management features

## Quick Command Reference

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Run production build
npm start

# Lint code
npm run lint
```

## Need Help?

- 📖 Read `/docs/CREATE_COURSE_FEATURE.md` for detailed docs
- 📖 Check `/docs/IMPLEMENTATION_SUMMARY.md` for overview
- 🔍 Check Supabase logs for database errors
- 🔍 Check browser console for client errors
- 💬 Review the database schema in migration file

## Success Criteria

✅ Database migration executed without errors  
✅ Course creation form opens  
✅ Form validation works  
✅ Course saves to database  
✅ Success notification appears  
✅ Course appears in Supabase table  
✅ RLS policies prevent unauthorized access  

If all criteria are met, the feature is ready to use! 🎉
