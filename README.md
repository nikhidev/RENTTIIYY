# 🏠 RENTTIIYY

A modern, full-stack rental property management application built with Next.js and Node.js, featuring role-based authentication for both property managers and tenants.

## 📸 Screenshot
<img width="1920" height="974" alt="RENTTIIYY Dashboard" src="https://github.com/user-attachments/assets/6aa71822-ff61-45de-b662-c8a19fb5a700" />

## 🚀 Features

### For Property Managers
- 📋 **Property Management**: Add, edit, and manage rental properties
- 📝 **Application Review**: Review and approve/reject tenant applications
- 💰 **Lease Management**: Create and manage lease agreements
- 📊 **Dashboard Analytics**: View property performance and tenant data
- ⚙️ **Settings Management**: Update profile and preferences

### For Tenants
- 🔍 **Property Search**: Advanced search with filters and map integration
- ❤️ **Favorites**: Save and manage favorite properties
- 📄 **Application Submission**: Apply for properties with document upload
- 🏡 **Residence Management**: View current and past residences
- 💳 **Payment Tracking**: View lease details and payment history

### General Features
- 🔐 **AWS Cognito Authentication**: Secure user authentication with role-based access
- 🗺️ **Interactive Maps**: Mapbox integration for property locations
- 📱 **Responsive Design**: Mobile-first design with Tailwind CSS
- 🎨 **Modern UI**: Clean interface with shadcn/ui components
- 🔄 **Real-time Updates**: RTK Query for efficient data fetching
- 📤 **File Upload**: Secure document and image uploads

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15.1.6 (React 19)
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: Redux Toolkit + RTK Query
- **Authentication**: AWS Amplify + Cognito
- **Maps**: Mapbox GL JS
- **File Upload**: FilePond
- **Icons**: Lucide React + FontAwesome
- **Language**: TypeScript

### Backend
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT with AWS Cognito integration
- **File Storage**: AWS S3
- **Development**: Nodemon + Concurrently

### Infrastructure
- **Frontend Hosting**: Vercel
- **Database**: Neon PostgreSQL
- **Authentication**: AWS Cognito User Pool
- **File Storage**: AWS S3

## 📁 Project Structure

```
RENTTIIYY/
├── client/                 # Next.js Frontend
│   ├── src/
│   │   ├── app/           # App router pages
│   │   │   ├── (auth)/    # Authentication pages
│   │   │   ├── (dashboard)/ # Protected dashboard routes
│   │   │   └── (nondashboard)/ # Public pages
│   │   ├── components/    # Reusable UI components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utility functions
│   │   ├── state/         # Redux store and API
│   │   └── types/         # TypeScript definitions
│   ├── public/            # Static assets
│   └── ...config files
└── server/                # Node.js Backend
    ├── src/
    │   ├── controllers/   # Request handlers
    │   ├── middleware/    # Authentication & validation
    │   ├── routes/        # API routes
    │   └── index.ts       # Server entry point
    ├── prisma/            # Database schema & migrations
    └── ...config files
```

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- PostgreSQL database (Neon recommended)
- AWS account for Cognito and S3

### Environment Setup

#### 1. Clone the Repository
```bash
git clone https://github.com/nikhidev/RENTTIIYY.git
cd RENTTIIYY
```

#### 2. Backend Setup
```bash
cd server
npm install

# Create .env file
echo "DATABASE_URL='your-postgresql-connection-string'" > .env

# Generate Prisma client
npm run prisma:generate

# Run database migrations
npx prisma migrate deploy

# Seed the database (optional)
npm run seed

# Start development server
npm run dev
```

#### 3. Frontend Setup
```bash
cd client
npm install

# Create .env file
cat > .env << EOF
# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:3002

# AWS Cognito Configuration
NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID=your-user-pool-id
NEXT_PUBLIC_AWS_COGNITO_USER_POOL_CLIENT_ID=your-client-id

# Mapbox Configuration  
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=your-mapbox-token
EOF

# Start development server
npm run dev
```

### 🔧 AWS Cognito Setup

1. **Create User Pool** in AWS Cognito
2. **Add Custom Attribute**: `custom:role` (String, Mutable)
3. **Configure App Client** with appropriate settings
4. **Set User Pool Domain** for hosted UI (optional)
5. **Add the User Pool ID and Client ID** to your `.env` file

### 📦 Database Setup

The project uses Prisma with PostgreSQL. The schema includes:
- **Users**: Tenants and Managers
- **Properties**: Rental property listings
- **Applications**: Tenant applications for properties
- **Leases**: Rental agreements
- **Payments**: Payment records

## 🎯 API Endpoints

### Authentication
- All endpoints require JWT authentication via `Authorization: Bearer <token>`
- Role-based access control (manager/tenant)

### Main Routes
- `GET /properties` - List properties with filters
- `POST /properties` - Create new property (managers only)
- `GET /applications` - List applications
- `POST /applications` - Submit application (tenants only)
- `PUT /applications/:id/status` - Update application status (managers only)
- `GET /leases` - List leases
- `POST /leases` - Create lease (managers only)

## 🚀 Deployment

### Frontend (Vercel)
```bash
# Build for production
npm run build:vercel

# The project includes vercel.json for automatic deployment
```

### Backend
The backend can be deployed to any Node.js hosting service:
```bash
npm run build
npm start
```

## 🧪 Development Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run build:vercel` - Build without linting (for deployment)

### Backend
- `npm run dev` - Start development server with hot reload
- `npm run build` - Compile TypeScript
- `npm run start` - Start production server
- `npm run seed` - Seed database with sample data

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Role-based Access Control**: Different permissions for managers and tenants
- **Input Validation**: Server-side validation for all endpoints
- **CORS Configuration**: Proper cross-origin resource sharing setup
- **Environment Variables**: Sensitive data stored in environment variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **nikhidev** - *Initial work* - [GitHub](https://github.com/nikhidev)

## 🙏 Acknowledgments

- AWS Amplify for authentication infrastructure
- Vercel for seamless deployment
- Neon for managed PostgreSQL
- shadcn/ui for beautiful UI components
- Mapbox for mapping functionality

## 🐛 Known Issues & Troubleshooting

### Common Issues

1. **ESLint errors during deployment**: Use `npm run build:vercel` which skips linting
2. **403 Forbidden errors**: Ensure you're using `idToken` not `accessToken` for API calls
3. **Route 404 errors**: Check that routes use `/managers` not `/manager`

### Development Mode Authentication

For local development without AWS setup, the app provides mock authentication. See `DEPLOYMENT_FIX.md` for details.

---

## 🌟 Live Demo

Visit the live application: [https://renttiiyy.vercel.app](https://renttiiyy.vercel.app)

**Test Credentials:**
- Manager: Use sign-up to create a manager account
- Tenant: Use sign-up to create a tenant account 