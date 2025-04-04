# HackWell 2.0

A Next.js-based task management application with authentication, dashboard functionality, and a component-based architecture.

## Project Structure

```
├── .next                    # Next.js build output
├── node_modules             # Dependencies
├── public                   # Static assets
├── src                      # Source code
│   ├── app                  # Next.js App Router structure
│   │   ├── auth             # Authentication routes
│   │   │   ├── login        # Login functionality
│   │   │   │   └── page.tsx # Login page
│   │   │   └── sign-up      # Sign-up functionality
│   │   │       └── page.tsx # Sign-up page
│   │   ├── (pages)          # Group for standard pages
│   │   │   ├── dashboard    # Dashboard routes
│   │   │   │   └── page.tsx # Dashboard page
│   │   │   └── tasks        # Task management routes
│   │   │       ├── create-task  # Task creation
│   │   │       └── page.tsx # Tasks listing page
│   │   ├── api              # API routes
│   │   │   └── auth         # Authentication API
│   │   │       └── [...nextauth] # NextAuth.js configuration
│   │   │           ├── route.ts  # API route handler
│   │   │           └── actions.ts # Server actions
│   │   ├── layout.tsx       # Root layout
│   │   ├── page.tsx         # Home page
│   │   └── providers.tsx    # React context providers
│   ├── components           # Reusable components
│   │   ├── admin            # Admin interface components
│   │   │   ├── Dashboard    # Dashboard components
│   │   │   │   ├── DashboardContent.tsx
│   │   │   │   └── Sidebar.tsx
│   │   │   └── tasks        # Task components
│   │   │       ├── form.tsx # Task form
│   │   │       └── taskDetails.tsx # Task details view
│   │   ├── LandingPage      # Landing page components
│   │   │   ├── Footer.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── LoginCard.tsx
│   │   │   └── main.tsx
│   │   ├── LoginPage        # Login page components
│   │   │   └── LoginForm.tsx
│   │   └── ui               # UI component library
│   ├── hooks                # Custom React hooks
│   │   └── use-mobile.ts    # Mobile detection hook
│   ├── lib                  # Library code
│   │   └── firebase         # Firebase integration
│   │       ├── FirebaseAuth.ts # Firebase auth methods
│   │       └── FirebaseConfig.ts # Firebase configuration
│   ├── server               # Server-side code
│   │   └── auth             # Authentication logic
│   │       ├── config.ts    # Auth configuration
│   │       └── index.ts     # Auth exports
│   └── styles               # Global styles
│       └── globals.css      # Global CSS
├── .env                     # Environment variables
├── .env.example             # Example environment variables
├── .gitignore               # Git ignore file
├── components.json          # UI components configuration
├── next-env.d.ts            # Next.js TypeScript declarations
├── next.config.js           # Next.js configuration
├── package-lock.json        # Dependency lock file
├── package.json             # Project metadata and dependencies
├── postcss.config.js        # PostCSS configuration
├── prettier.config.js       # Prettier configuration
├── README.md                # Project documentation
└── tsconfig.json            # TypeScript configuration
```

## Getting Started

### Prerequisites
- Node.js (v16 or later)
- npm or yarn
- Firebase account (for authentication)

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/hackwell2.0.git
cd hackwell2.0
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Set up environment variables
Create a `.env.local` file in the root directory based on `.env.example`:
```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

# Firebase Configuration
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
FIREBASE_APP_ID=your_firebase_app_id
```

4. Run the development server
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Features

- **User Authentication**
  - Login and signup functionality
  - Integration with Firebase Authentication
  - Secure authentication flow with NextAuth.js

- **Task Management**
  - Create, view, and manage tasks
  - Task listing with details view
  - Dashboard for task overview

- **Responsive Design**
  - Mobile-friendly interface using custom hooks
  - Consistent UI across devices

## Application Architecture

### Frontend Layer
- **Next.js App Router** - Modern routing with file-based routing system
- **Authentication Pages** - Dedicated login and sign-up interfaces
- **Dashboard & Tasks** - Main application functionality
- **Component Structure** - Modular, reusable components

### API & Backend
- **NextAuth API Endpoint** - Authentication service implementation
- **Server Auth Logic** - Server-side authentication processing
- **Firebase Integration** - External service for user management

### UI Components
- **Admin Components** - Dashboard and task management interfaces
- **Landing Page** - Public-facing marketing page
- **Login Page** - Authentication interface
- **UI Library** - Shared UI components

## Authentication Flow

1. User accesses the Login or Sign-up page
2. Credentials are submitted to NextAuth API endpoint
3. Server Auth Logic processes the request
4. Firebase Auth verifies the credentials
5. Upon successful authentication, user is redirected to the Dashboard

## Development

### Component Structure
The project follows a component-based architecture with:
- Reusable UI components in `src/components/ui`
- Page-specific components organized by feature
- Admin components for dashboard and task management

### Styling
- Global styles in `src/styles/globals.css`
- Component-level styling using CSS modules or inline Tailwind classes

## Deployment

The application is configured for easy deployment on Vercel:

```bash
npm run build
# or
yarn build
```

## Technologies Used

- **Frontend**:
  - Next.js (App Router)
  - React
  - TypeScript
  - Tailwind CSS

- **Authentication**:
  - NextAuth.js
  - Firebase Authentication

- **Development Tools**:
  - ESLint
  - Prettier
  - PostCSS

## License

This project is licensed under the MIT License - see the LICENSE file for details.