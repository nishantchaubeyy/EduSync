# EduSync - Environment Setup & Configuration Guide

## 🚀 Quick Start

This guide will help you fix the Convex and Clerk configuration errors.

---

## ❌ Errors You're Seeing & Why

### Error 1: `Couldn't parse deployment name bigname-123`
**Cause**: The Convex URL is using a placeholder deployment name instead of your actual deployment.

**How it happened**: The code had a fallback to `https://bigname-123.convex.cloud` which doesn't exist.

### Error 2: Clerk Token 404 Error
**Cause**: Clerk can't authenticate with a non-existent Convex deployment, so it can't create Convex tokens.

**Result**: Users can't access the application because Clerk-Convex integration fails.

---

## ✅ Step-by-Step Fix

### Step 1: Create a Convex Project

1. Go to **[Convex Dashboard](https://dashboard.convex.dev)**
2. Click **"Create project"**
3. Choose a project name (e.g., "edusync-prod")
4. Select your region closest to your users
5. Click **"Create"**
6. Copy the **Deployment URL** (format: `https://xxxxx.convex.cloud`)

**Example URL**: `https://wild-chipmunk-123.convex.cloud`

---

### Step 2: Create a Clerk Application

1. Go to **[Clerk Dashboard](https://dashboard.clerk.com)**
2. Click **"Create Application"**
3. Name it "EduSync"
4. Select authentication methods:
   - ✅ Email
   - ✅ Google OAuth (recommended)
   - ✅ GitHub OAuth (optional)
5. Click **"Create Application"**

---

### Step 3: Get Your API Keys

#### From Clerk:
1. Go to **Settings → API Keys**
2. Copy these keys:
   - **Publishable Key** (starts with `pk_test_` or `pk_live_`)
   - **Secret Key** (starts with `sk_test_` or `sk_live_`)

---

### Step 4: Update `.env.local`

Open the `.env.local` file in your project root and replace the placeholders:

```env
# CONVEX CONFIGURATION
NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud

# CLERK CONFIGURATION  
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
CLERK_SECRET_KEY=sk_test_xxxxx
```

**Example** (with real-looking values):
```env
NEXT_PUBLIC_CONVEX_URL=https://wild-chipmunk-123.convex.cloud
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_d3m0n0m000d3m0123f1k3
CLERK_SECRET_KEY=sk_test_d3m0n0m000d3m0123f1k3
```

---

### Step 5: Set Up Clerk Webhooks for Convex (Optional but Recommended)

For automatic user synchronization between Clerk and Convex:

1. In Clerk Dashboard → **Webhooks**
2. Click **"+ Create Endpoint"**
3. Add endpoint URL: `https://yourapp.com/api/webhooks/clerk` (or your deployment URL)
4. Subscribe to these events:
   - `user.created`
   - `user.updated`
   - `user.deleted`

This ensures users are automatically synced to your Convex database.

---

### Step 6: Restart Your Development Server

```bash
# Stop the running dev server (Ctrl+C)

# Clear Next.js cache
rm -rf .next

# Start the dev server again
npm run dev
```

**On Windows**:
```bash
# Stop: Ctrl+C
# Clear cache: rmdir /s /q .next
# Start: npm run dev
```

---

## 🔍 Verify Configuration

After restarting, check that:

1. **No "bigname-123" errors** appear in console
2. **No Clerk token 404 errors** appear
3. **You can sign in/sign up** via Clerk
4. **Dashboard loads** without errors
5. **Convex queries work** (check DevTools Network tab)

---

## 📋 File Checklist

- ✅ `.env.local` - Created with your actual keys
- ✅ `src/components/Providers.tsx` - Fixed to require NEXT_PUBLIC_CONVEX_URL
- ✅ `convex/` - Already configured for Clerk auth

---

## 🐛 Troubleshooting

### Still seeing "bigname-123" errors?
- [ ] Check `.env.local` exists in project root
- [ ] Verify `NEXT_PUBLIC_CONVEX_URL` is set correctly
- [ ] Restart dev server completely
- [ ] Clear browser cache (Ctrl+Shift+Delete)

### Still seeing Clerk 404 errors?
- [ ] Verify `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` is correct
- [ ] Ensure Convex deployment URL is valid
- [ ] Check Clerk application is "Active" in dashboard
- [ ] Try signing out and signing back in

### Dev server won't start?
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Try starting again
npm run dev
```

---

## 🔑 Environment Variable Reference

| Variable | Source | Format | Required |
|----------|--------|--------|----------|
| `NEXT_PUBLIC_CONVEX_URL` | Convex Dashboard | `https://xxxxx.convex.cloud` | ✅ Yes |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk Dashboard → API Keys | `pk_test_xxxxx` | ✅ Yes |
| `CLERK_SECRET_KEY` | Clerk Dashboard → API Keys | `sk_test_xxxxx` | ✅ Yes |

---

## 📚 Documentation Links

- **Convex Docs**: https://docs.convex.dev
- **Clerk Docs**: https://clerk.com/docs
- **Convex + Clerk Integration**: https://docs.convex.dev/auth/clerk
- **Next.js Environment Variables**: https://nextjs.org/docs/basic-features/environment-variables

---

## 🎯 What This Fixes

| Error | Before | After |
|-------|--------|-------|
| `Couldn't parse deployment name bigname-123` | ❌ App crashes | ✅ Connects to real deployment |
| Clerk token 404 errors | ❌ Can't sign in | ✅ Auth works properly |
| Convex queries fail | ❌ No data loads | ✅ Data syncs correctly |

---

## ⏭️ Next Steps

After setup is complete:

1. Test user registration and login
2. Create a test course to verify database access
3. Check Convex dashboard to see synced data
4. Deploy to production with actual keys (not test keys)

---

## 💡 Pro Tips

1. **Development vs Production**: Use `pk_test_` keys for development, `pk_live_` for production
2. **Environment Safety**: Never commit `.env.local` to Git (it's already in `.gitignore`)
3. **Key Rotation**: Regularly rotate your Clerk and Convex keys for security
4. **Testing**: Use Clerk's test user feature in dashboard for testing

---

**Last Updated**: March 24, 2026
