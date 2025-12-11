# 🚀 Deployment Guide

## Overview
This portfolio consists of two parts:
- **Frontend**: React + Vite (deploy to Vercel/Netlify)
- **Backend**: FastAPI + Python (deploy to Railway/Render/Fly.io)

---

## 📋 Pre-Deployment Checklist

### ✅ Local Testing Complete
- [ ] Frontend runs on `http://localhost:5173`
- [ ] Backend runs on `http://localhost:8000`
- [ ] API endpoints working (`/health`, `/api/v1/portfolio/profile`)
- [ ] Contact form works
- [ ] Theme toggle works

### ✅ Environment Variables Ready
- [ ] Clerk keys obtained from dashboard
- [ ] GitHub personal access token created
- [ ] All `.env` files configured

---

## 🔧 Backend Deployment (Railway/Render)

### Option 1: Railway (Recommended)

1. **Push to GitHub** (if not already)
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Create Railway Project**
   - Go to [railway.app](https://railway.app)
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository
   - Choose the `backend` folder as root directory

3. **Add PostgreSQL Database**
   - In Railway, click "New" → "Database" → "PostgreSQL"
   - Railway auto-configures `DATABASE_URL`

4. **Set Environment Variables** (Settings → Variables)
   ```
   DEBUG=false
   CLERK_SECRET_KEY=sk_live_xxx
   CLERK_PUBLISHABLE_KEY=pk_live_xxx
   CLERK_JWKS_URL=https://xxx.clerk.accounts.dev/.well-known/jwks.json
   GITHUB_USERNAME=Aashish-Op
   GITHUB_TOKEN=ghp_xxx
   CORS_ORIGINS=https://your-frontend-domain.vercel.app
   ```

5. **Deploy Command** (Settings → Deploy)
   ```
   Start Command: uvicorn app.main:app --host 0.0.0.0 --port $PORT
   ```

### Option 2: Render

1. Go to [render.com](https://render.com) → New → Web Service
2. Connect your GitHub repository
3. Set root directory to `backend`
4. Build Command: `pip install -r requirements.txt`
5. Start Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
6. Add environment variables in dashboard

---

## 🌐 Frontend Deployment (Vercel)

1. **Push to GitHub** (same repo as backend)

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project" → Select your repo
   - Set root directory to `frontend`
   - Framework Preset: Vite

3. **Set Environment Variables**
   ```
   VITE_CLERK_PUBLISHABLE_KEY=pk_live_xxx
   VITE_API_URL=https://your-backend.railway.app
   ```

4. **Deploy!**

---

## 🔗 Post-Deployment Configuration

### Update CORS Origins (Backend)
After frontend is deployed, update backend's `CORS_ORIGINS`:
```
CORS_ORIGINS=https://your-portfolio.vercel.app,https://custom-domain.com
```

### Update Clerk Allowed Origins
1. Go to Clerk Dashboard → Settings → Paths
2. Add your production URLs to allowed origins

### Custom Domain (Optional)
- **Vercel**: Settings → Domains → Add custom domain
- **Railway**: Settings → Networking → Custom Domain

---

## 📁 Repository Structure
```
portfolio/
├── frontend/           # React + Vite frontend
│   ├── src/
│   ├── .env.example
│   ├── package.json
│   └── vite.config.ts
├── backend/            # FastAPI backend
│   ├── app/
│   ├── .env.example
│   ├── requirements.txt
│   └── venv/           # Local only, not deployed
└── README.md
```

---

## 🔐 Production Environment Variables

### Backend (.env)
| Variable | Required | Description |
|----------|----------|-------------|
| DATABASE_URL | ✅ | PostgreSQL connection string |
| CLERK_SECRET_KEY | ✅ | Clerk secret key (sk_live_xxx) |
| CLERK_PUBLISHABLE_KEY | ✅ | Clerk publishable key |
| CLERK_JWKS_URL | ✅ | Clerk JWKS URL |
| GITHUB_USERNAME | ✅ | Your GitHub username |
| GITHUB_TOKEN | ⚠️ | GitHub PAT for higher rate limits |
| CORS_ORIGINS | ✅ | Frontend URLs (comma-separated) |
| DEBUG | ❌ | Set to false in production |

### Frontend (.env)
| Variable | Required | Description |
|----------|----------|-------------|
| VITE_CLERK_PUBLISHABLE_KEY | ✅ | Clerk publishable key |
| VITE_API_URL | ✅ | Backend API URL |

---

## 🆘 Troubleshooting

### CORS Errors
- Ensure backend `CORS_ORIGINS` includes your frontend URL
- Check for trailing slashes in URLs

### API Rate Limits (GitHub)
- Add `GITHUB_TOKEN` for 5000 req/hour instead of 60

### Database Connection Failed
- Ensure `DATABASE_URL` is correctly set
- For Railway: It auto-injects the variable from PostgreSQL addon

### Clerk Auth Not Working
- Verify JWKS URL matches your Clerk app
- Ensure publishable key is the production one (pk_live_xxx)
