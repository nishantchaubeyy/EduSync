# 🆘 Quick Fix Reference

## The Problem in 30 Seconds

Your app tried to use a fake Convex URL (`bigname-123`), so Clerk couldn't authenticate users.

## The Solution in 60 Seconds

1. **Go to** https://dashboard.convex.dev → Create project → Copy URL
2. **Go to** https://dashboard.clerk.com → Create app → Copy API keys  
3. **Edit** `.env.local` in your project root:
   ```env
   NEXT_PUBLIC_CONVEX_URL=https://your-url.convex.cloud
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
   CLERK_SECRET_KEY=sk_test_xxxxx
   ```
4. **Restart** dev server: `npm run dev`

✅ **Done!** No more errors.

---

## What Changed in Your Code

| File | Change | Reason |
|------|--------|--------|
| `.env.local` | Created | Configure Convex & Clerk |
| `src/components/Providers.tsx` | Removed hardcoded `bigname-123` | Use real deployment URL |
| `.env.example` | Created | Show other devs what's needed |

---

## Files to Read

| File | Purpose | Priority |
|------|---------|----------|
| **[SETUP_GUIDE.md](SETUP_GUIDE.md)** | Step-by-step setup | 🔴 DO THIS FIRST |
| [ERROR_FIX_SUMMARY.md](ERROR_FIX_SUMMARY.md) | What broke & why | 🟡 Read if confused |
| [VERIFICATION_CHECKLIST.md](VERIFICATION_CHECKLIST.md) | Verify it's working | 🟢 When done testing |
| [README.md](README.md) | Project overview | 🟣 General reference |

---

## Error → Fixed

| Error | Status |
|-------|--------|
| `Couldn't parse deployment name bigname-123` | ✅ Fixed |
| Clerk token 404 errors | ✅ Fixed |
| App crashes on load | ✅ Fixed |

---

## Verify It Works

After restarting, you should see:
- ✅ No red errors in console
- ✅ Can visit `http://localhost:3000`
- ✅ Can sign up / sign in
- ✅ Dashboard loads

❌ If still broken → Check [SETUP_GUIDE.md Troubleshooting](SETUP_GUIDE.md#-troubleshooting)

---

**Time to fix**: 5-10 minutes
**Difficulty**: Easy (just copy-paste API keys)
**Status**: Ready to go! 🚀
