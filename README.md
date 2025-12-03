# 🎨 Mini ERP & Client Portal - Frontend

Modern, responsive frontend application built with Next.js 14, TypeScript, and Tailwind CSS. Features role-based dashboards, real-time updates, and a seamless user experience.

![Next.js](https://img.shields.io/badge/Next.js-14+-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-3+-38B2AC?logo=tailwind-css)
![React](https://img.shields.io/badge/React-18+-61DAFB?logo=react)

---


## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Environment Variables](#environment-variables)
- [Authentication Flow](#authentication-flow)
- [Role-Based UI](#role-based-ui)
- [Components Library](#components-library)
- [State Management](#state-management)
- [API Integration](#api-integration)
- [Styling Guide](#styling-guide)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

---

![dashboard](/home/mustapha/IdeaProjects/client-portal-front-end/img/Screenshot from 2025-12-03 23-01-53.png)

## 🎯 Overview

This is the frontend application for the Mini ERP system, providing intuitive interfaces for Admins, Supervisors, Operators, and Clients. Built with Next.js 14 using the App Router for optimal performance and SEO.

**Key Highlights:**
- 🚀 **Next.js 14 App Router** - Modern routing with server components
- 🎨 **Shadcn UI** - Beautiful, accessible component library
- 🔐 **JWT Authentication** - Secure token-based auth with context API
- 📱 **Fully Responsive** - Mobile-first design approach
- ♿ **Accessible** - WCAG 2.1 compliant components
- 🎭 **Role-Based Views** - Dynamic UI based on user permissions
- ⚡ **Optimized Performance** - Fast loading with code splitting

---

## ✨ Features

### 🔐 Authentication
- Secure login with JWT tokens
- Automatic token refresh
- Protected routes based on user roles
- Session persistence with localStorage
- Logout functionality with cleanup

### 👨‍💼 Admin Dashboard
- User management (create, edit, delete staff)
- Role assignment and permissions
- Lead to client conversion
- Full CRUD operations for all entities
- System-wide analytics and reporting

### 👔 Supervisor Dashboard
- Team overview and management
- Assigned operators' performance
- Claim assignment and tracking
- Team-specific analytics

### 👷 Operator Dashboard
- Assigned leads management
- Client interaction tracking
- Claim handling interface
- Task status updates

### 👤 Client Portal
- Personal dashboard
- Create and track claims
- Upload supporting documents
- View purchased products/services
- Check claim status in real-time

### 📊 Shared Features
- Advanced data tables with sorting and filtering
- Search functionality across entities
- Modal-based forms for quick actions
- Toast notifications for user feedback
- File upload with drag-and-drop
- Responsive sidebar navigation
- Dark mode support (optional)

---

![products](/home/mustapha/IdeaProjects/client-portal-front-end/img/Screenshot from 2025-12-03 23-02-16.png)

## 🛠 Tech Stack

### Core Framework
- **Next.js 14.2+** - React framework with App Router
- **React 18.3+** - UI library
- **TypeScript 5+** - Type safety and better DX

### UI & Styling
- **Tailwind CSS 3.4+** - Utility-first CSS framework
- **Shadcn UI** - Re-usable component library built on Radix UI
- **Radix UI** - Unstyled, accessible components
- **Lucide React** - Beautiful icon library
- **clsx** - Utility for constructing className strings

### State Management
- **React Context API** - Global auth state
- **React Hooks** - Local component state (useState, useEffect)

### Form Handling
- **React Hook Form** - Performant form validation
- **Zod** - TypeScript-first schema validation

### HTTP & API
- **Axios** - Promise-based HTTP client
- **SWR** (optional) - Data fetching and caching

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Static type checking

---

![products](/home/mustapha/IdeaProjects/client-portal-front-end/img/Screenshot from 2025-12-03 23-02-27.png)
![Login](/home/mustapha/IdeaProjects/client-portal-front-end/img/Screenshot from 2025-12-03 23-14-46.png)
## 🚀 Getting Started

### Prerequisites

- **Node.js 18+** (LTS recommended)
- **npm** or **pnpm** or **yarn**
- **Backend API** running on `http://localhost:8080`

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/mustapha-moutaki/mini-erp-frontend.git
cd mini-erp-frontend
```

2. **Install dependencies**
```bash
npm install
# or
pnpm install
# or
yarn install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1

# WebSocket (Optional - for real-time features)
NEXT_PUBLIC_WS_URL=ws://localhost:8080

# App Configuration
NEXT_PUBLIC_APP_NAME="Mini ERP"
NEXT_PUBLIC_MAX_FILE_SIZE=5242880
```

4. **Run the development server**
```bash
npm run dev
```

5. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000)

### Default Login Credentials

Use these credentials to test different roles:

**Admin:**
- Email: `admin@example.com`
- Password: `Admin123!`

**Supervisor:** (Create via Admin panel)
- Email: `supervisor@example.com`
- Password: `Super123!`

**Operator:** (Create via Admin panel)
- Email: `operator@example.com`
- Password: `Oper123!`

**Client:** (Created via lead conversion)
- Email: Provided after conversion
- Password: Set during conversion

---

## 📁 Project Structure

```
mustapha-moutaki-client-portal-frontend/
├── app/                          # Next.js 14 App Router
│   ├── (auth)/                   # Auth routes group
│   │   └── login/
│   │       └── page.tsx          # Login page
│   │
│   ├── (dashboard)/              # Protected dashboard routes
│   │   ├── layout.tsx            # Dashboard layout with sidebar
│   │   ├── page.tsx              # Dashboard home
│   │   ├── leads/
│   │   │   └── page.tsx          # Leads management
│   │   ├── clients/
│   │   │   └── page.tsx          # Clients management
│   │   ├── products/
│   │   │   └── page.tsx          # Products catalog
│   │   ├── claims/
│   │   │   └── page.tsx          # Claims management
│   │   └── staff/
│   │       └── page.tsx          # Staff management (Admin only)
│   │
│   ├── (client-portal)/          # Client-specific routes
│   │   ├── layout.tsx            # Client portal layout
│   │   └── portal/
│   │       └── page.tsx          # Client dashboard
│   │
│   ├── globals.css               # Global styles & Tailwind
│   └── layout.tsx                # Root layout
│
├── components/                   # React components
│   ├── ui/                       # Shadcn UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── select.tsx
│   │   ├── table.tsx
│   │   └── ...                   # Other Shadcn components
│   │
│   ├── layout/                   # Layout components
│   │   ├── sidebar.tsx           # Navigation sidebar
│   │   └── header.tsx            # Top header bar
│   │
│   ├── leads-modal/              # Lead feature modals
│   │   ├── create-lead-modal.tsx
│   │   ├── edit-lead-modal.tsx
│   │   └── convert-lead-modal.tsx
│   │
│   ├── clients-modal/            # Client feature modals
│   │   ├── create-client-modal.tsx
│   │   └── edit-client-modal.tsx
│   │
│   ├── products-modal/           # Product feature modals
│   │   ├── create-product-modal.tsx
│   │   └── edit-product-modal.tsx
│   │
│   ├── claims-modal/             # Claim feature modals
│   │   ├── create-claim-modal.tsx
│   │   ├── edit-claim-modal.tsx
│   │   └── view-claim-modal.tsx
│   │
│   └── staff-modal/              # Staff feature modals
│       ├── create-staff-modal.tsx
│       └── edit-staff-modal.tsx
│
├── contexts/                     # React contexts
│   └── auth-context.tsx          # Authentication context & provider
│
├── hooks/                        # Custom React hooks
│   ├── use-toast.ts              # Toast notifications hook
│   └── use-mobile.ts             # Mobile detection hook
│
├── lib/                          # Utility libraries
│   └── utils.ts                  # Helper functions (cn, formatDate, etc.)
│
├── public/                       # Static assets
│   ├── favicon.ico
│   └── images/
│
├── .env.local                    # Environment variables (not in git)
├── .eslintrc.json                # ESLint configuration
├── .gitignore                    # Git ignore rules
├── components.json               # Shadcn UI configuration
├── next.config.mjs               # Next.js configuration
├── package.json                  # Dependencies & scripts
├── postcss.config.mjs            # PostCSS configuration
├── tailwind.config.ts            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
└── README.md                     # This file
```

### 📂 Directory Breakdown

#### `/app` - Next.js App Router
- **(auth)**: Route group for authentication pages
- **(dashboard)**: Protected routes for staff (Admin, Supervisor, Operator)
- **(client-portal)**: Separate portal interface for clients
- **layout.tsx**: Root layout with global providers

#### `/components`
- **ui/**: Shadcn UI primitive components
- **layout/**: Reusable layout components (sidebar, header)
- **[feature]-modal/**: Modal components organized by feature

#### `/contexts`
- Global state management using React Context API

#### `/hooks`
- Custom React hooks for reusable logic

#### `/lib`
- Utility functions and helper methods

---

## 📜 Available Scripts

```bash
# Development
npm run dev          # Start development server (http://localhost:3000)
npm run dev:turbo    # Start with Turbopack (faster)

# Building
npm run build        # Build production bundle
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors
npm run format       # Format code with Prettier

# Type Checking
npm run type-check   # Run TypeScript compiler check
```

---

## 🔐 Environment Variables

### Required Variables

```env
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1
```

### Optional Variables

```env
# WebSocket URL for real-time features
NEXT_PUBLIC_WS_URL=ws://localhost:8080

# App Configuration
NEXT_PUBLIC_APP_NAME="Mini ERP System"
NEXT_PUBLIC_APP_VERSION="1.0.0"

# File Upload
NEXT_PUBLIC_MAX_FILE_SIZE=5242880        # 5MB in bytes
NEXT_PUBLIC_ALLOWED_FILE_TYPES=.pdf,.jpg,.jpeg,.png

# Feature Flags
NEXT_PUBLIC_ENABLE_ANALYTICS=false
NEXT_PUBLIC_ENABLE_NOTIFICATIONS=false
```

### Production Variables

```env
# Production API
NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api/v1

# Analytics (Optional)
NEXT_PUBLIC_GA_TRACKING_ID=G-XXXXXXXXXX
```

---

## 🔐 Authentication Flow

### How Authentication Works

1. **Login Process**
   - User submits credentials to `/api/v1/auth/login`
   - Backend validates and returns JWT token + user data
   - Token stored in localStorage
   - User data saved in AuthContext
   - Redirect to appropriate dashboard based on role

2. **Token Management**
   - Token included in all API requests via Authorization header
   - Token expiry checked on each request
   - Auto-refresh mechanism (if implemented)
   - Clear token on logout

3. **Protected Routes**
   - Middleware checks for valid token
   - Redirects to login if unauthorized
   - Role-based route protection

### Auth Context Usage

```typescript
// In any component
import { useAuth } from '@/contexts/auth-context';

function MyComponent() {
  const { user, token, login, logout, isAuthenticated } = useAuth();

  const handleLogin = async (email: string, password: string) => {
    try {
      await login(email, password);
      // User is now authenticated
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleLogout = () => {
    logout();
    // User is logged out, token cleared
  };

  return (
    <div>
      {isAuthenticated ? (
        <p>Welcome, {user?.firstName}!</p>
      ) : (
        <button onClick={() => handleLogin('user@example.com', 'password')}>
          Login
        </button>
      )}
    </div>
  );
}
```

---

## 👥 Role-Based UI

### Role Permissions Matrix

| Feature | Admin | Supervisor | Operator | Client |
|---------|-------|------------|----------|--------|
| Dashboard | ✅ All | ✅ Team | ✅ Personal | ✅ Portal |
| Leads CRUD | ✅ | ✅ Assigned | ✅ Assigned | ❌ |
| Convert Lead | ✅ | ❌ | ❌ | ❌ |
| Clients View | ✅ All | ✅ Team | ✅ Assigned | ❌ |
| Products CRUD | ✅ | ❌ | ❌ | ❌ |
| View Products | ✅ | ✅ | ✅ | ✅ Own |
| Claims Management | ✅ All | ✅ Team | ✅ Assigned | ❌ |
| Create Claim | ❌ | ❌ | ❌ | ✅ |
| Staff Management | ✅ | ❌ | ❌ | ❌ |
| Analytics | ✅ | ✅ Team | ❌ | ❌ |

### Conditional Rendering Example

```typescript
import { useAuth } from '@/contexts/auth-context';

function NavigationMenu() {
  const { user } = useAuth();

  return (
    <nav>
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/leads">Leads</Link>
      <Link href="/clients">Clients</Link>
      
      {/* Admin only */}
      {user?.role === 'ADMIN' && (
        <>
          <Link href="/staff">Staff Management</Link>
          <Link href="/products">Products</Link>
        </>
      )}
      
      {/* Supervisor & Admin */}
      {['ADMIN', 'SUPERVISOR'].includes(user?.role) && (
        <Link href="/analytics">Analytics</Link>
      )}
      
      {/* Client portal */}
      {user?.role === 'CLIENT' && (
        <>
          <Link href="/portal">My Dashboard</Link>
          <Link href="/portal/claims">My Claims</Link>
        </>
      )}
    </nav>
  );
}
```

---

## 🎨 Components Library

### Shadcn UI Components

The project uses Shadcn UI components which are:
- ✅ **Copy-paste friendly** - Components live in your codebase
- ✅ **Fully customizable** - Modify as needed
- ✅ **Accessible** - Built on Radix UI primitives
- ✅ **Type-safe** - Full TypeScript support

### Adding New Components

```bash
# Add a new Shadcn component
npx shadcn-ui@latest add button
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add dropdown-menu

# Components are added to /components/ui/
```

### Custom Component Examples

**DataTable Component**
```typescript
// components/shared/data-table.tsx
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onRowClick?: (item: T) => void;
}

export function DataTable<T>({ data, columns, onRowClick }: DataTableProps<T>) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map(col => (
            <TableHead key={col.key}>{col.label}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, idx) => (
          <TableRow key={idx} onClick={() => onRowClick?.(item)}>
            {columns.map(col => (
              <TableCell key={col.key}>
                {col.render ? col.render(item) : item[col.key]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
```

---

## 🔄 State Management

### Auth Context

Global authentication state managed via React Context:

```typescript
// contexts/auth-context.tsx
interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}
```

### Local State

Component-level state using React hooks:

```typescript
// Using useState
const [leads, setLeads] = useState<Lead[]>([]);
const [loading, setLoading] = useState(false);

// Using useEffect
useEffect(() => {
  fetchLeads();
}, []);
```

### Form State

Form management with React Hook Form:

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const leadSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
});

function LeadForm() {
  const form = useForm({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
    }
  });

  const onSubmit = (data) => {
    // Handle submission
  };

  return <form onSubmit={form.handleSubmit(onSubmit)}>...</form>;
}
```

---

## 🌐 API Integration

### API Client Setup

```typescript
// lib/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor - Handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired, redirect to login
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

### API Service Example

```typescript
// lib/api/leads.ts
import api from '@/lib/api';
import { Lead, CreateLeadDto } from '@/types';

export const leadsApi = {
  getAll: async (): Promise<Lead[]> => {
    const { data } = await api.get('/leads');
    return data;
  },

  getById: async (id: number): Promise<Lead> => {
    const { data } = await api.get(`/leads/${id}`);
    return data;
  },

  create: async (lead: CreateLeadDto): Promise<Lead> => {
    const { data } = await api.post('/leads', lead);
    return data;
  },

  update: async (id: number, lead: Partial<Lead>): Promise<Lead> => {
    const { data } = await api.put(`/leads/${id}`, lead);
    return data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/leads/${id}`);
  },

  convertToClient: async (id: number, clientData: any): Promise<void> => {
    await api.post(`/clients/convert/${id}`, clientData);
  },
};
```

### Usage in Components

```typescript
import { leadsApi } from '@/lib/api/leads';
import { useToast } from '@/hooks/use-toast';

function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    loadLeads();
  }, []);

  const loadLeads = async () => {
    try {
      const data = await leadsApi.getAll();
      setLeads(data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load leads',
        variant: 'destructive',
      });
    }
  };

  return <div>...</div>;
}
```

---

## 🎨 Styling Guide

### Tailwind CSS Best Practices

```typescript
// Use the cn() utility for conditional classes
import { cn } from '@/lib/utils';

<button
  className={cn(
    "px-4 py-2 rounded-md font-medium",
    "hover:bg-gray-100 transition-colors",
    isActive && "bg-blue-500 text-white",
    disabled && "opacity-50 cursor-not-allowed"
  )}
>
  Click me
</button>
```

### Custom Theme Colors

```javascript
// tailwind.config.ts
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          900: '#1e3a8a',
        },
        // Status colors
        success: '#10b981',
        warning: '#f59e0b',
        danger: '#ef4444',
      },
    },
  },
};
```

### Responsive Design

```tsx
<div className="
  grid
  grid-cols-1        /* Mobile: 1 column */
  md:grid-cols-2     /* Tablet: 2 columns */
  lg:grid-cols-3     /* Desktop: 3 columns */
  gap-4
">
  {/* Cards */}
</div>
```

---

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect GitHub Repository**
   - Go to [vercel.com](https://vercel.com)
   - Import your Git repository
   - Vercel auto-detects Next.js

2. **Configure Environment Variables**
   - Add all `NEXT_PUBLIC_*` variables
   - Set `NEXT_PUBLIC_API_URL` to production API

3. **Deploy**
   ```bash
   # Or deploy via CLI
   npm install -g vercel
   vercel --prod
   ```

### Netlify

```bash
# Build command
npm run build

# Publish directory
.next
```

### Docker

```dockerfile
# Dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
CMD ["npm", "start"]
```

```bash
# Build and run
docker build -t mini-erp-frontend .
docker run -p 3000:3000 mini-erp-frontend
```

---

## 🐛 Troubleshooting

### Common Issues

**Issue: API calls failing**
```bash
# Check if backend is running
curl http://localhost:8080/api/v1/auth/login

# Verify NEXT_PUBLIC_API_URL in .env.local
echo $NEXT_PUBLIC_API_URL
```

**Issue: Authentication not persisting**
```typescript
// Check localStorage
console.log(localStorage.getItem('token'));

// Clear and retry
localStorage.clear();
```

**Issue: Tailwind styles not applying**
```bash
# Restart dev server
npm run dev

# Check tailwind.config.ts includes all content paths
content: [
  './app/**/*.{js,ts,jsx,tsx}',
  './components/**/*.{js,ts,jsx,tsx}',
]
```

**Issue: TypeScript errors**
```bash
# Run type check
npm run type-check

# If errors persist, try
rm -rf .next node_modules
npm install
npm run dev
```

---

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Shadcn UI](https://ui.shadcn.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [React Hook Form](https://react-hook-form.com)

---

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Write/update tests if applicable
4. Run linting: `npm run lint`
5. Create a pull request

---

#

## 📞 Support

For issues and questions:
- **GitHub Issues**: [Create an issue](https://github.com/mustapha-moutaki/mini-erp-frontend/issues)
- **Email**: mustaphaamoutaki@gmail.com

---

<div align="center">

**Built with ❤️ using Next.js 14 and TypeScript**

⭐ Star this repository if you find it helpful!

</div>