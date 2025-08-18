# RoveWell - Development Setup

## 🚀 Quick Start

### Option 1: Run Frontend + Backend Separately (Recommended)

**Frontend on port 5173 + Backend on port 5000:**
```bash
npm run dev:full
```

**Or run them individually:**
```bash
# Terminal 1 - Backend API server
npm run dev:backend

# Terminal 2 - Frontend Vite dev server  
npm run dev:frontend
```

### Option 2: Full-stack Mode (Legacy)

**Frontend + Backend on port 5000:**
```bash
npm run dev
```

## 🌐 Access Points

- **Frontend**: http://localhost:5173 ✨
- **Backend API**: http://localhost:5000/api
- **Full-stack**: http://localhost:5000 (when using legacy mode)

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev:full` | Run both frontend and backend servers |
| `npm run dev:frontend` | Run only Vite frontend server (port 5173) |
| `npm run dev:backend` | Run only Express backend server (port 5000) |
| `npm run dev` | Run full-stack mode (frontend + backend on port 5000) |
| `npm run build` | Build for production |
| `npm run start` | Start production server |

## 🔧 Configuration

- **Frontend**: Vite config at `vite.config.ts`
- **Backend**: Express server at `server/index.ts`
- **Database**: Drizzle ORM with Supabase PostgreSQL
- **API Proxy**: Frontend `/api/*` routes proxy to backend

## 🎯 Development Workflow

1. Start development servers: `npm run dev:full`
2. Frontend auto-reloads on file changes (port 5173)
3. Backend auto-reloads with tsx (port 5000)
4. API calls from frontend automatically proxy to backend

## 📦 Tech Stack

- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **Backend**: Express + TypeScript + Drizzle ORM
- **Database**: Supabase PostgreSQL
- **UI Components**: Radix UI + shadcn/ui
