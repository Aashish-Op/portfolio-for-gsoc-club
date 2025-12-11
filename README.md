# Ashish Gupta Portfolio

A modern, high-performance personal portfolio website with Clerk authentication.

## 🚀 Tech Stack

### Backend
- **FastAPI** - High-performance Python web framework
- **SQLAlchemy 2.0** - Async ORM with PostgreSQL
- **Pydantic v2** - Data validation
- **Clerk** - Authentication

### Frontend
- **React** - UI library with TypeScript
- **Vite** - Build tool
- **Tailwind CSS v4** - Styling
- **Framer Motion** - Animations
- **Clerk React** - Auth components

## 📁 Project Structure

```
portfolio/
├── backend/
│   ├── app/
│   │   ├── core/           # Config, database, auth
│   │   ├── models/         # User, Project, Contact models
│   │   ├── schemas/        # Pydantic schemas
│   │   ├── routers/        # API endpoints
│   │   ├── services/       # Business logic
│   │   └── main.py
│   ├── requirements.txt
│   └── .env.example
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── ui/         # Reusable UI components
    │   │   └── sections/   # Page sections
    │   ├── hooks/
    │   ├── services/
    │   ├── types/
    │   └── utils/
    ├── .env.example
    └── package.json
```

## 🔐 Authentication Flow

1. **Sign In Required** for:
   - Sending contact messages ("Hire Me" button)
   - Contact form submission

2. **Visitor Tracking**:
   - All page visits are tracked in PostgreSQL
   - Authenticated vs anonymous visitors

3. **User Creation**:
   - Users are auto-created on first sign-in via Clerk

## 🛠️ Setup

### 1. Clerk Setup
1. Go to [Clerk Dashboard](https://dashboard.clerk.dev)
2. Create a new application
3. Copy your **Publishable Key** and **Secret Key**
4. Get your JWKS URL from Settings > JWT Templates

### 2. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Linux/Mac

# Install dependencies
pip install -r requirements.txt

# Configure environment
copy .env.example .env
# Edit .env with your Clerk keys and database URL

# Run the server
uvicorn app.main:app --reload --port 8000
```

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Configure environment
copy .env.example .env
# Edit .env with your Clerk Publishable Key

# Run development server
npm run dev
```

### 4. Database Setup

1. Install PostgreSQL
2. Create database: `CREATE DATABASE portfolio_db;`
3. Tables are auto-created on first run

## 🔗 API Endpoints

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/v1/portfolio/profile` | GET | No | Get profile info |
| `/api/v1/portfolio/projects` | GET | No | Get all projects |
| `/api/v1/portfolio/skills` | GET | No | Get skills |
| `/api/v1/portfolio/stats` | GET | No | Get stats |
| `/api/v1/portfolio/track-visit` | POST | No | Track page visit |
| `/api/v1/contact/submit` | POST | **Yes** | Submit contact form |
| `/api/v1/contact/me` | GET | **Yes** | Get current user |
| `/health` | GET | No | Health check |

## ✨ Features

- **Clerk Authentication** - Sign in/up with email, Google, GitHub
- **Contact Form** - Requires authentication
- **Visitor Analytics** - Track page visits
- **User Storage** - Auto-create users from Clerk
- **Bento Grid Layout** - Modern dashboard design
- **Dark Mode** - Sleek slate theme
- **Responsive** - Mobile-first approach

## 📄 Environment Variables

### Backend (.env)
```
DATABASE_URL=postgresql+asyncpg://user:pass@localhost:5432/portfolio_db
CLERK_SECRET_KEY=sk_test_...
CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_JWKS_URL=https://your-app.clerk.accounts.dev/.well-known/jwks.json
```

### Frontend (.env)
```
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
```

## 👤 Author

**Ashish Prasad Gupta**
- GitHub: [@Aashish-Op](https://github.com/Aashish-Op)
- LinkedIn: [Ashish Gupta](https://linkedin.com/in/ashish-gupta)
- Email: ashishguptaop195@gmail.com
