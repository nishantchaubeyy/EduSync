# EduSync - The Digital Curator of Higher Learning

A modern e-learning platform built with Next.js 16, Convex, and Clerk that enables instructors to create courses and students to learn at their own pace.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Convex account (https://dashboard.convex.dev)
- Clerk account (https://dashboard.clerk.com)

### ⚠️ Important: Setup Required First!

**Before running the development server, you MUST:**

1. Follow [SETUP_GUIDE.md](SETUP_GUIDE.md) to configure Convex and Clerk
2. Create `.env.local` with your API keys
3. This fixes the "bigname-123" and Clerk token errors

**Without this setup, you'll see authentication errors. See [ERROR_FIX_SUMMARY.md](ERROR_FIX_SUMMARY.md) for details.**

### Installation

```bash
# Install dependencies
npm install

# Configure environment variables
# Follow: SETUP_GUIDE.md (required!)

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 📚 Documentation

- **[SETUP_GUIDE.md](SETUP_GUIDE.md)** - Complete setup instructions (START HERE!)
- **[ERROR_FIX_SUMMARY.md](ERROR_FIX_SUMMARY.md)** - Explains the errors and fixes
- **[VERIFICATION_CHECKLIST.md](VERIFICATION_CHECKLIST.md)** - Verify your setup is correct
- **[BACKEND_REQUIREMENTS.md](BACKEND_REQUIREMENTS.md)** - API specifications and data models
- **[AGENTS.md](AGENTS.md)** - AI agent guidelines

## 🏗️ Tech Stack

- **Frontend**: Next.js 16 (App Router, Turbopack)
- **Backend**: Convex (serverless backend)
- **Authentication**: Clerk
- **Database**: Convex Database
- **Styling**: Tailwind CSS 4
- **UI Icons**: Material Symbols & Lucide React

## 📁 Project Structure

```
src/
├── app/                    # Next.js app router
│   ├── dashboard/         # Student dashboard
│   ├── instructor/        # Instructor dashboard
│   ├── admin/            # Admin panel
│   ├── courses/          # Course catalog
│   └── sign-in/          # Authentication pages
├── components/           # Reusable React components
├── actions/             # Next.js server actions
└── types/              # TypeScript type definitions

convex/
├── schema.ts           # Convex database schema
├── users.ts           # User management
├── courses.ts         # Course operations
├── enrollments.ts     # Enrollment logic
├── lessons.ts         # Lesson management
├── quizzes.ts         # Quiz handling
└── questions.ts       # Question management
```

## ✨ Features

### 👨‍🎓 Student Features
- Browse and enroll in courses
- Track learning progress
- Complete lessons and quizzes
- View achievements and certificates
- Access learning resources

### 👨‍🏫 Instructor Features
- Create and manage courses
- Add lessons and quizzes
- Track student progress
- View analytics and engagement metrics
- Manage course content

### 📊 Dashboard
- Real-time progress tracking
- Course recommendations
- Activity feed
- Performance analytics

## 🔧 Available Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm start         # Run production build
npm run lint      # Run ESLint
```

## 🐛 Common Issues & Solutions

### Error: `Couldn't parse deployment name bigname-123`
- Your `.env.local` is not configured
- Follow [SETUP_GUIDE.md](SETUP_GUIDE.md)
- See [ERROR_FIX_SUMMARY.md](ERROR_FIX_SUMMARY.md)

### Error: Clerk token 404
- Your Convex deployment isn't set up
- Check your `NEXT_PUBLIC_CONVEX_URL`
- Restart dev server after updating `.env.local`

### Can't sign in
- Verify Clerk keys in `.env.local`
- Check Clerk application is active in dashboard
- Clear browser cache and try again

**For more troubleshooting, see [SETUP_GUIDE.md - Troubleshooting](SETUP_GUIDE.md#-troubleshooting)**

## 📚 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Convex Documentation](https://docs.convex.dev)
- [Clerk Documentation](https://clerk.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Connect to Vercel: https://vercel.com
3. Set environment variables in Vercel dashboard:
   ```
   NEXT_PUBLIC_CONVEX_URL=your-deployment-url
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-key
   CLERK_SECRET_KEY=your-key
   ```
4. Deploy!

See [Vercel Deployment Docs](https://vercel.com/docs/deployments/overview)

## 📋 Development Checklist

- [ ] Follow [SETUP_GUIDE.md](SETUP_GUIDE.md) setup
- [ ] Run `.env.local` through [VERIFICATION_CHECKLIST.md](VERIFICATION_CHECKLIST.md)
- [ ] Test student dashboard
- [ ] Test instructor dashboard
- [ ] Test authentication flows
- [ ] Review [BACKEND_REQUIREMENTS.md](BACKEND_REQUIREMENTS.md)

## 📄 License

This project is Part of an educational platform. All rights reserved.

## 🤝 Contributing

1. Follow the setup guide
2. Check [AGENTS.md](AGENTS.md) for AI guidelines
3. Review [BACKEND_REQUIREMENTS.md](BACKEND_REQUIREMENTS.md)
4. Submit pull requests with clear descriptions

---

**Status**: 🟢 Ready After Setup Configuration

**Next Step**: Follow [SETUP_GUIDE.md](SETUP_GUIDE.md) to configure Convex and Clerk!
