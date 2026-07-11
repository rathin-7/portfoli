# Radhin - MERN Stack Developer Portfolio

A world-class, immersive 3D portfolio website built with the MERN stack, featuring stunning Three.js scenes, GSAP animations, glassmorphism UI, and a full admin panel.

## Features

- **Immersive 3D Scenes** - Five interactive Three.js/R3F scenes (Hero, About, Skills, Projects, Contact)
- **Premium Animations** - GSAP-powered cursor, Framer Motion page transitions, 60 FPS scroll animations
- **Glassmorphism UI** - Modern dark theme with aurora backgrounds and animated gradients
- **Full Admin Panel** - JWT-authenticated dashboard for managing projects, skills, experience, messages, files, and resume
- **Document Manager** - Drag-and-drop upload, preview, categorize, replace files with progress tracking
- **Dynamic Resume System** - Upload, download, preview resume with auto-detection on hero section
- **Contact Form** - Real-time message submission with email notifications
- **SEO Optimized** - Meta tags, Open Graph, sitemap.xml, robots.txt, semantic HTML
- **Responsive Design** - Fully responsive across all devices with touch-friendly interactions
- **Custom Cursor** - GSAP-powered sub-frame interpolated cursor with multiple states and ripple effects

## Tech Stack

### Frontend
- React 19 + Vite 8
- Tailwind CSS v4
- Three.js / React Three Fiber / Drei
- GSAP + Framer Motion
- React Router v7
- React Helmet Async (SEO)
- React Icons

### Backend
- Node.js + Express 4
- MongoDB + Mongoose 8
- JWT Authentication (bcryptjs + jsonwebtoken)
- Multer (file uploads)
- Nodemailer (email)
- Helmet + Compression + Rate Limiting

## Folder Structure

```
portfolio/
├── backend/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js   # Login, JWT, admin setup
│   │   ├── projectController.js
│   │   ├── skillController.js
│   │   ├── experienceController.js
│   │   ├── educationController.js
│   │   ├── certificateController.js
│   │   ├── messageController.js
│   │   ├── resumeController.js
│   │   ├── fileController.js
│   │   ├── settingsController.js
│   │   ├── socialController.js
│   │   └── uploadController.js
│   ├── middleware/
│   │   ├── auth.js             # JWT protect + adminOnly
│   │   └── upload.js           # Multer config
│   ├── models/                 # 11 Mongoose models
│   ├── routes/                 # 12 route files
│   ├── uploads/                # User uploaded files
│   ├── .env                    # Environment variables
│   ├── .env.example
│   ├── seed.js                 # Database seeder
│   ├── server.js               # Express entry point
│   └── package.json
├── client/
│   ├── public/
│   │   ├── favicon.svg
│   │   ├── robots.txt
│   │   └── sitemap.xml
│   ├── src/
│   │   ├── components/
│   │   │   ├── cursor/         # Custom cursor
│   │   │   ├── footer/         # Footer
│   │   │   ├── loader/         # Loading screen
│   │   │   ├── navbar/         # Navigation
│   │   │   ├── scroll/         # Scroll progress
│   │   │   ├── sections/       # 9 homepage sections
│   │   │   └── three/          # 5 Three.js scenes
│   │   ├── config/             # Profile data
│   │   ├── context/            # React context
│   │   ├── hooks/              # Custom hooks
│   │   ├── layouts/            # Admin layout
│   │   ├── pages/              # Route pages
│   │   ├── services/           # API services
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── vercel.json
│   ├── vite.config.js
│   └── package.json
├── .gitignore
└── README.md
```

## Installation

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- npm or yarn

### Clone & Setup

```bash
git clone https://github.com/radhinraj/portfolio.git
cd portfolio
```

### Backend Setup

```bash
cd backend
cp .env.example .env    # Configure your environment variables
npm install
npm run seed             # Seed database with sample data
npm run dev              # Start backend on port 5000
```

### Frontend Setup

```bash
cd client
cp .env.example .env
npm install
npm run dev              # Start frontend on port 5173
```

## Environment Variables

### Backend `.env`

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/portfolio` |
| `JWT_SECRET` | JWT signing secret | `your-super-secret-key` |
| `JWT_EXPIRE` | Token expiry | `7d` |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | `your-cloud-name` |
| `CLOUDINARY_API_KEY` | Cloudinary API key | `your-api-key` |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | `your-api-secret` |
| `EMAIL_USER` | Gmail for notifications | `your-email@gmail.com` |
| `EMAIL_PASS` | Gmail app password | `your-app-password` |
| `ADMIN_EMAIL` | Admin login email | `your-email@gmail.com` |
| `ADMIN_PASSWORD` | Admin login password | `your-secure-password` |
| `CLIENT_URL` | Frontend URL (comma-separated for multiple) | `http://localhost:5173` |
| `NODE_ENV` | Environment | `development` or `production` |

## Running Locally

1. Start MongoDB: `mongod` or use MongoDB Atlas
2. Backend: `cd backend && npm run dev`
3. Frontend: `cd client && npm run dev`
4. Seed data: `cd backend && npm run seed`
5. Admin login: Navigate to `/admin/login`

**Default admin credentials** (after seeding):
- Email: as configured in `ADMIN_EMAIL`
- Password: as configured in `ADMIN_PASSWORD`

## Production Deployment

### Frontend (Vercel)

1. Push to GitHub
2. Import repo on [Vercel](https://vercel.com)
3. Set root directory to `client`
4. Framework: Vite
5. Build command: `npm run build`
6. Output directory: `dist`
7. Add environment variable if needed

### Backend (Render)

1. Create a new Web Service on [Render](https://render.com)
2. Connect your GitHub repo
3. Root directory: `backend`
4. Build command: `npm install`
5. Start command: `node server.js`
6. Add all environment variables from `.env.example`
7. Set `CLIENT_URL` to your Vercel frontend URL

### MongoDB (Atlas)

1. Create a free cluster on [MongoDB Atlas](https://cloud.mongodb.com)
2. Create a database user
3. Whitelist your IP (or `0.0.0.0/0` for all)
4. Get the connection string
5. Set `MONGODB_URI` in Render environment variables
6. Run `npm run seed` to populate initial data

## Admin Panel

| Route | Description |
|-------|-------------|
| `/admin/login` | Admin authentication |
| `/admin` | Dashboard overview with stats |
| `/admin/projects` | CRUD projects |
| `/admin/skills` | CRUD skills |
| `/admin/experience` | CRUD work experience |
| `/admin/files` | Document manager (upload, preview, categorize) |
| `/admin/resume` | Resume upload/download/preview |
| `/admin/messages` | View and manage contact messages |

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/login` | No | Admin login |
| POST | `/api/auth/setup` | No | Create admin user |
| GET | `/api/auth/me` | Yes | Get current user |
| GET | `/api/projects` | No | List projects |
| GET | `/api/projects/:slug` | No | Get project by slug |
| POST | `/api/projects` | Admin | Create project |
| PUT | `/api/projects/:id` | Admin | Update project |
| DELETE | `/api/projects/:id` | Admin | Delete project |
| GET | `/api/skills` | No | List skills |
| POST | `/api/skills` | Admin | Create skill |
| PUT | `/api/skills/:id` | Admin | Update skill |
| DELETE | `/api/skills/:id` | Admin | Delete skill |
| GET | `/api/experiences` | No | List experiences |
| POST | `/api/experiences` | Admin | Create experience |
| PUT | `/api/experiences/:id` | Admin | Update experience |
| DELETE | `/api/experiences/:id` | Admin | Delete experience |
| POST | `/api/messages` | No | Send message |
| GET | `/api/messages` | Admin | List messages |
| PUT | `/api/messages/:id/read` | Admin | Mark as read |
| DELETE | `/api/messages/:id` | Admin | Delete message |
| GET | `/api/resume` | No | Get resume info |
| GET | `/api/resume/latest` | No | Get latest resume |
| GET | `/api/resume/download` | No | Download resume PDF |
| GET | `/api/resume/preview` | No | Preview resume PDF |
| POST | `/api/resume` | Admin | Upload resume |
| DELETE | `/api/resume` | Admin | Delete resume |
| GET | `/api/files` | Admin | List files |
| POST | `/api/files` | Admin | Upload file |
| PUT | `/api/files/:id` | Admin | Update file |
| PUT | `/api/files/:id/replace` | Admin | Replace file |
| DELETE | `/api/files/:id` | Admin | Delete file |
| GET | `/api/settings` | No | Get settings |
| PUT | `/api/settings` | Admin | Update settings |
| GET | `/api/socials` | No | Get social links |
| PUT | `/api/socials` | Admin | Update social links |
| GET | `/api/health` | No | Health check |

## License

MIT License

Copyright (c) 2024 Radhin

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
