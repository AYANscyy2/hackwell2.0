# Next.js Task Management Application

A full-stack task management application built with Next.js, featuring user authentication and a modern UI component library.

## Architecture Overview

This application follows a layered architecture with clear separation between frontend and backend concerns:

### Frontend Layer

- **Next.js App** - Core application built with Next.js
- **Auth Pages** - Login and Sign-up pages for user authentication
- **Dashboard & Tasks** - Main functionality for task management
- **Global Providers** - Context providers for state management
- **Reusable UI Library** - Component library for consistent UI elements

### API & Backend

- **NextAuth API Endpoint** - Authentication service integration
- **Server Auth Logic** - Authentication configuration and processing
- **Firebase Integration** - External service for authentication persistence

### UI Components

- **Landing Page UI** - Public-facing marketing page
- **Login Page UI** - User authentication interface
- **Admin Tasks UI** - Task management interface with Task Form and Details
- **Admin Dashboard UI** - Overview dashboard with content panels and sidebar

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn
- Firebase account (for authentication)

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/nextjs-task-management.git
cd nextjs-task-management
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Set up environment variables
   Create a `.env.local` file in the root directory with the following variables:

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
  - Secure authentication flow

- **Task Management**

  - Create, view, and manage tasks
  - Task listing with filtering and sorting options
  - Detailed task view with status tracking

- **Dashboard**

  - Overview of task status and progress
  - Customizable dashboard components
  - Responsive layout for all device sizes

- **Responsive Design**
  - Mobile-friendly interface
  - Consistent UI across devices

## Project Structure

```
├── components/
│   ├── ui/                   # Reusable UI components
│   ├── auth/                 # Authentication components
│   ├── dashboard/            # Dashboard components
│   └── tasks/                # Task management components
├── pages/
│   ├── api/                  # API routes
│   │   └── auth/             # NextAuth configuration
│   ├── auth/                 # Auth pages
│   ├── dashboard/            # Dashboard pages
│   └── tasks/                # Task management pages
├── hooks/                    # Custom React hooks
├── utils/                    # Utility functions
├── providers/                # Context providers
├── public/                   # Static assets
└── styles/                   # Global styles
```

## Authentication Flow

1. User accesses the Login or Sign-up page
2. Credentials are submitted to NextAuth API endpoint
3. Server Auth Logic processes the request
4. Firebase Auth verifies the credentials
5. Upon successful authentication, user is redirected to the Dashboard

## Deployment

This application can be deployed on Vercel for optimal Next.js performance:

```bash
npm run build
# or
yarn build
```

Then deploy using the Vercel CLI or connect your repository to Vercel for automatic deployments.

## Technologies Used

- **Frontend**:

  - Next.js
  - React
  - CSS Modules / Tailwind CSS

- **Authentication**:

  - NextAuth.js
  - Firebase Authentication

- **State Management**:

  - React Context API
  - Custom hooks

- **Development Tools**:
  - ESLint
  - Prettier
  - TypeScript

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
