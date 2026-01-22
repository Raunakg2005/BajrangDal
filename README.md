# Bajrang Dal Membership Application

A secure, full-stack web application for managing Bajrang Dal membership applications with an administrative dashboard.

**Live Demo:** https://bajrangdal.quantyxio.cloud

## Features

### Public Application Form
- Bilingual interface (English/Hindi)
- Personal information collection
- Address management (Present & Permanent)
- Document upload (Aadhar Card - Front & Back)
- Client-side image compression
- Real-time form validation

### Admin Dashboard
- Password-protected authentication
- View all membership applications
- Application status management (Approve/Reject/Pending)
- Detailed application review
- Print functionality
- Responsive design (Desktop & Mobile)

## Technology Stack

- **Frontend:** Next.js 16.1.4, React 19, TypeScript
- **Styling:** TailwindCSS with custom Saffron theme
- **Animation:** Framer Motion
- **Database:** MongoDB
- **Deployment:** Docker, Nginx, Let's Encrypt SSL
- **Icons:** Lucide React

## Project Structure

```
bhajrang-dal/
├── src/
│   ├── app/
│   │   ├── admin/          # Admin dashboard
│   │   ├── api/            # API routes
│   │   ├── join/           # Membership form
│   │   └── page.tsx        # Landing page
│   ├── models/             # MongoDB schemas
│   └── lib/                # Utilities (DB connection)
├── public/                 # Static assets
├── Dockerfile              # Docker configuration
├── docker-compose.yml      # Docker compose setup
└── next.config.ts          # Next.js configuration
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB
- Docker (for containerized deployment)

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/Raunakg2005/BajrangDal.git
cd BajrangDal
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file:
```env
MONGODB_URI=mongodb://localhost:27017/bajrang_dal
ADMIN_PASSWORD=your_password_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open http://localhost:3000

### Docker Deployment

1. Build the Docker image:
```bash
docker build -t bajrang-dal:latest .
```

2. Run with Docker Compose:
```bash
docker-compose up -d
```

The application will be available at http://localhost:3000.

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URI` | MongoDB connection string | Yes |
| `ADMIN_PASSWORD` | Admin dashboard password | Yes |

## API Routes

- `POST /api/applications` - Submit new membership application
- `GET /api/applications` - Retrieve all applications (admin)
- `PATCH /api/applications/[id]` - Update application status
- `POST /api/auth` - Admin authentication

## Security Features

- Server-side authentication
- Environment variable protection
- Image compression (prevents large payload attacks)
- HTTPS/SSL encryption (production)
- Input validation and sanitization

## Admin Access

**URL:** https://bajrangdal.quantyxio.cloud/admin

Default password is set via `ADMIN_PASSWORD` environment variable.

## Production Deployment

The application is deployed with:
- Docker containers (isolated network)
- Nginx reverse proxy
- Let's Encrypt SSL certificate
- Auto-renewal configuration

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is private and proprietary.
