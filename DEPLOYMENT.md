# 🚀 Jimmi Project - Vercel Deployment Guide

This guide walks you through deploying the complete Jimmi franchise management system to Vercel.

## 📋 Overview
Your project has three parts to deploy:
1. **Frontend** (Customer-facing React app)
2. **Admin Dashboard** (Admin React app)
3. **Backend** (Express.js API)

---

## 🔑 Step 1: Prepare Your Credentials

Before starting, gather these credentials:

### For Backend (API):
- **MongoDB URI** - From MongoDB Atlas
- **JWT Secret** - Any strong random string
- **Email Credentials** - Gmail SMTP details
- **Session Secret** - Any strong random string

### Example Credentials Setup:
```
MONGODB_URI: mongodb+srv://username:password@cluster.mongodb.net/jimmi
JWT_SECRET: your_super_secret_jwt_key_12345
SMTP_USER: your-email@gmail.com
SMTP_PASS: your_app_specific_password (enable Gmail App Passwords)
```

---

## 🌍 Step 2: Deploy Backend to Vercel

### 2.1 Go to Vercel
1. Visit [vercel.com](https://vercel.com)
2. Sign in with your GitHub account (or create account)
3. Click **"Add New..." → "Project"**

### 2.2 Import Backend Repository
1. Select **"jimmis-burger"** repository
2. Click **"Import"**

### 2.3 Configure Backend
In the configuration screen:
- **Project Name**: `jimmis-burger-backend` (or your choice)
- **Framework Preset**: Select **"Other"**
- **Root Directory**: Select **`backend`** from dropdown
- **Build Command**: Leave empty or `npm run build` (if you have build script)
- **Output Directory**: Leave empty
- **Install Command**: `npm install`
- **Start Command**: `node index.mjs`

### 2.4 Add Environment Variables
Click **"Environment Variables"** and add:
```
NODE_ENV                production
MONGODB_URI             mongodb+srv://user:pass@cluster.mongodb.net/jimmi
JWT_SECRET              your_jwt_secret_key
JWT_EXPIRE              7d
SMTP_HOST               smtp.gmail.com
SMTP_PORT               587
SMTP_USER               your-email@gmail.com
SMTP_PASS               your_app_password
SESSION_SECRET          your_session_secret
```

### 2.5 Deploy
1. Click **"Deploy"**
2. Wait for deployment to complete
3. Copy your **Backend URL** (e.g., `https://jimmis-burger-backend.vercel.app`)

---

## 🎨 Step 3: Deploy Frontend to Vercel

### 3.1 In Vercel Dashboard
1. Click **"Add New..." → "Project"**
2. Select **"jimmis-burger"** repository again
3. Click **"Import"**

### 3.2 Configure Frontend
- **Project Name**: `jimmis-burger-frontend`
- **Framework Preset**: Select **"React"**
- **Root Directory**: Select **`frontend`** from dropdown
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### 3.3 Add Environment Variables
Click **"Environment Variables"** and add:
```
VITE_API_URL    https://jimmis-burger-backend.vercel.app/api
```
*(Replace with your actual backend URL from Step 2)*

### 3.4 Deploy
1. Click **"Deploy"**
2. Wait for completion
3. Copy your **Frontend URL** (e.g., `https://jimmis-burger-frontend.vercel.app`)

---

## 👨‍💼 Step 4: Deploy Admin Dashboard to Vercel

### 4.1 In Vercel Dashboard
1. Click **"Add New..." → "Project"**
2. Select **"jimmis-burger"** repository again
3. Click **"Import"**

### 4.2 Configure Admin
- **Project Name**: `jimmis-burger-admin`
- **Framework Preset**: Select **"React"**
- **Root Directory**: Select **`Admin`** from dropdown
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### 4.3 Add Environment Variables
Click **"Environment Variables"** and add:
```
VITE_API_URL    https://jimmis-burger-backend.vercel.app/api
```
*(Same backend URL)*

### 4.4 Deploy
1. Click **"Deploy"**
2. Wait for completion

---

## 🔗 Step 5: Update Backend CORS

Now that you have all three URLs, update your backend:

1. Go to backend project in Vercel
2. Go to **Settings → Environment Variables**
3. Update `CORS_ORIGIN`:
```
CORS_ORIGIN    https://jimmis-burger-frontend.vercel.app,https://jimmis-burger-admin.vercel.app
```
4. The backend will automatically redeploy

---

## ✅ Deployment Complete!

Your live URLs:
- **Frontend**: https://jimmis-burger-frontend.vercel.app
- **Admin**: https://jimmis-burger-admin.vercel.app
- **Backend API**: https://jimmis-burger-backend.vercel.app/api

---

## 🔧 Troubleshooting

### Backend Not Working
- Check **Logs** in Vercel dashboard
- Verify **Environment Variables** are set correctly
- Make sure **MongoDB Atlas** IP whitelist includes Vercel's IPs (0.0.0.0/0)

### Frontend Shows "Cannot Connect to API"
- Check `VITE_API_URL` environment variable
- Verify backend CORS includes your frontend URL
- Check browser console for errors

### MongoDB Connection Fails
- Get MongoDB Atlas connection string
- Add Vercel IP to MongoDB whitelist: Settings → IP Access List → Add Entry: 0.0.0.0/0

---

## 📝 Commands Reference

```bash
# Test backend locally
cd backend
npm install
npm run dev

# Test frontend locally
cd frontend
npm install
npm run dev

# Test admin locally
cd Admin
npm install
npm run dev
```

---

## 🎉 Done!
Your Jimmi project is now live on Vercel! 🚀
