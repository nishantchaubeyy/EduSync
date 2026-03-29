# ✅ Configuration Verification Checklist

Use this checklist to verify everything is properly configured.

---

## 📋 Pre-Configuration (Before Starting)

- [ ] I have a Convex account (https://dashboard.convex.dev)
- [ ] I have a Clerk account (https://dashboard.clerk.com)
- [ ] I have Git installed (to avoid committing secrets)
- [ ] I have `.env.local` in my project root

---

## 🔧 Configuration Steps

### Convex Setup
- [ ] Created a Convex project
- [ ] Copied my Deployment URL (format: `https://xxxxx.convex.cloud`)
- [ ] URL is pasted in `.env.local` as `NEXT_PUBLIC_CONVEX_URL`
- [ ] URL does **NOT** contain "bigname-123"

### Clerk Setup
- [ ] Created a Clerk application
- [ ] Selected Email as authentication method
- [ ] (Optional) Added Google OAuth
- [ ] Went to Settings → API Keys
- [ ] Copied Publishable Key (starts with `pk_`)
- [ ] Copied Secret Key (starts with `sk_`)
- [ ] Both keys pasted in `.env.local`
- [ ] Keys do **NOT** contain "your_"

### Environment File
- [ ] `.env.local` exists in project root
- [ ] `NEXT_PUBLIC_CONVEX_URL` is filled in (not "https://your-deployment.convex.cloud")
- [ ] `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` is filled in
- [ ] `CLERK_SECRET_KEY` is filled in
- [ ] File is in `.gitignore` (don't commit secrets!)
- [ ] All environment variables have valid values

---

## 🚀 Development Server

### Installation & Setup
- [ ] Ran `npm install` successfully
- [ ] No dependency errors in console
- [ ] Convex code generated (`convex/_generated/` exists)

### Server Startup
- [ ] Deleted `.next` folder (if existed)
- [ ] Ran `npm run dev`
- [ ] Dev server started without crashing
- [ ] No "bigname-123" errors in console
- [ ] Can access `http://localhost:3000`

---

## 🧪 Runtime Tests

### Console Errors
- [ ] ✅ No `[CONVEX FATAL ERROR]` messages
- [ ] ✅ No `Couldn't parse deployment name` errors
- [ ] ✅ No Clerk token 404 errors
- [ ] ✅ No `NEXT_PUBLIC_CONVEX_URL is not set` errors

### Authentication
- [ ] Can visit `/sign-up` page without errors
- [ ] Can visit `/sign-in` page without errors
- [ ] Clerk sign-up form loads properly
- [ ] Email input field is visible
- [ ] Can click sign-up without JavaScript errors
- [ ] After signing up, redirects to dashboard

### Dashboard Access
- [ ] Authenticated user can access `/dashboard`
- [ ] Dashboard loads without errors
- [ ] User name displays correctly
- [ ] "Your Courses" section is visible
- [ ] Course cards display (even if empty)

### Data Sync
- [ ] Open browser DevTools → Network tab
- [ ] Refresh dashboard
- [ ] Look for requests to your Convex deployment URL
- [ ] Requests should return 200 status code
- [ ] No failed requests to "bigname-123"

### Instructor Features
- [ ] Can navigate to `/instructor` without errors
- [ ] Instructor dashboard loads
- [ ] "Create Course" button is visible
- [ ] Stats cards display properly

---

## 📊 Browser DevTools Checks

### Network Tab
- [ ] Requests to real Convex URL (not bigname-123)
- [ ] Convex requests return HTTP 200
- [ ] No CORS errors
- [ ] No 404 errors from Clerk

### Console Tab
- [ ] No red errors 🔴
- [ ] No warnings about missing env variables 🟡
- [ ] Clerk logs showing proper initialization
- [ ] Convex client initialized successfully

### Application Tab (Local Storage)
- [ ] Clerk session data stored
- [ ] No errors indicating auth failure
- [ ] User ID should be present after login

---

## 🚦 Quick Verification Command

Run this to check your environment setup:
```bash
# Check if .env.local exists
ls -la .env.local

# Check if it contains valid URLs
grep "convex.cloud" .env.local
grep "pk_" .env.local
grep "sk_" .env.local
```

All three `grep` commands should return results without "bigname-123" or "your_".

---

## ✨ Success Indicators

When everything is configured correctly:

```
✅ Sign-up works → Create account successfully
✅ Sign-in works → Access your dashboard  
✅ Dashboard loads → See "Your Courses" section
✅ Create course → Navigate to /instructor/courses/new
✅ Console clean → No deployment name errors
✅ DevTools Network → Real Convex URLs (not bigname-123)
```

---

## 🔄 If Something Failed

- [ ] Go back to [SETUP_GUIDE.md](SETUP_GUIDE.md)
- [ ] Double-check your Convex deployment URL
- [ ] Verify Clerk API keys in dashboard (they haven't changed)
- [ ] Clear `.next` folder: `rm -rf .next`
- [ ] Restart dev server: `npm run dev`
- [ ] Clear browser cache: `Ctrl+Shift+Delete`
- [ ] Check troubleshooting section in SETUP_GUIDE.md

---

## 📞 Need Help?

- Check [SETUP_GUIDE.md - Troubleshooting](SETUP_GUIDE.md#-troubleshooting)
- Visit [Convex Docs](https://docs.convex.dev)
- Visit [Clerk Docs](https://clerk.com/docs)

---

**Checklist Status**: 
- Total Items: 50+
- All checked = ✅ You're ready to develop!
