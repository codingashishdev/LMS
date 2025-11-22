#!/bin/bash

# Create Course Feature - Setup Script
# This script helps you set up the database for the create course feature

echo "🎓 LMS - Create Course Feature Setup"
echo "======================================"
echo ""

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "⚠️  .env.local not found. Creating from env.example..."
    cp env.example .env.local
    echo "✅ Created .env.local"
    echo ""
    echo "📝 Please edit .env.local and add your Supabase credentials:"
    echo "   - NEXT_PUBLIC_SUPABASE_URL"
    echo "   - NEXT_PUBLIC_SUPABASE_ANON_KEY"
    echo ""
    echo "   You can find these in your Supabase project settings → API"
    echo ""
else
    echo "✅ .env.local exists"
fi

# Check if environment variables are set
if grep -q "your_supabase_url_here" .env.local 2>/dev/null; then
    echo "⚠️  Supabase URL not configured in .env.local"
    echo "   Please update NEXT_PUBLIC_SUPABASE_URL"
    echo ""
else
    echo "✅ Supabase URL configured"
fi

if grep -q "your_supabase_anon_key_here" .env.local 2>/dev/null; then
    echo "⚠️  Supabase Anon Key not configured in .env.local"
    echo "   Please update NEXT_PUBLIC_SUPABASE_ANON_KEY"
    echo ""
else
    echo "✅ Supabase Anon Key configured"
fi

echo ""
echo "📋 Next Steps:"
echo ""
echo "1. Configure Supabase credentials in .env.local (if not done)"
echo ""
echo "2. Run the database migration in your Supabase SQL Editor:"
echo "   → Open: https://app.supabase.com/project/_/sql"
echo "   → Copy contents of: database/migrations/001_enhanced_courses_table.sql"
echo "   → Paste and click 'Run'"
echo ""
echo "3. Start the development server:"
echo "   npm run dev"
echo ""
echo "4. Navigate to the instructor dashboard:"
echo "   http://localhost:3000/instructor"
echo ""
echo "5. Test creating a course!"
echo ""
echo "📖 For detailed documentation, see:"
echo "   - docs/README.md"
echo "   - docs/QUICK_SETUP.md"
echo "   - docs/CREATE_COURSE_FEATURE.md"
echo ""
echo "✨ Happy course creating!"
