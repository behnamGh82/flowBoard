# FlowBoard

A production-ready project management application inspired by Jira and Trello.

## Stack

### Frontend (`client/`)
- React 19 + Vite + TypeScript
- Material UI with custom dark/light theme
- React Router, TanStack Query, React Hook Form + Zod
- @dnd-kit for Kanban drag & drop
- Recharts for analytics
- Zustand for auth state

### Backend (`server/`)
- Node.js + Express + TypeScript
- MongoDB + Mongoose
- JWT authentication + bcrypt
- Multer for file uploads
- Socket.io (real-time architecture prepared)

## Architecture

Feature-based structure on both frontend and backend:

```
client/src/
├── api/              # Axios client & interceptors
├── components/       # common, layout, ui
├── features/         # auth, dashboard, projects, boards, tasks, ...
├── hooks/
├── layouts/
├── pages/
├── routes/
├── services/         # socket client
├── theme/
├── types/
└── utils/

server/src/
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── services/
├── socket/
├── types/
└── utils/
```

## Getting Started

### Prerequisites
- Node.js 20+
- MongoDB running locally (or update `MONGODB_URI`)

### Backend

```bash
cd server
cp .env.example .env
npm install
npm run dev
```

API runs at `http://localhost:5000`

### Frontend

```bash
cd client
cp .env.example .env
npm install
npm run dev
```

App runs at `http://localhost:5173`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/login` | Login |
| GET | `/api/auth/me` | Current user |
| GET/POST | `/api/projects` | List/create projects |
| GET/POST | `/api/boards` | Boards |
| GET/POST/PATCH | `/api/tasks` | Tasks & move |
| GET/POST | `/api/comments` | Comments |
| GET | `/api/users` | Users |
| GET | `/api/notifications` | Notifications |

## Real-time (Socket.io)

Socket.io is wired on the server with JWT auth and room-based events (`project:`, `board:`, `user:`). The client includes `socket.service.ts` ready to connect when real-time features are implemented.

## License

ISC
