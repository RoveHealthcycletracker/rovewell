# Rove - AI-Powered Cycle-Sync Platform

## Overview

Rove is a "Coming Soon" single-page application for an AI-powered cycle-sync period tracker and supplement brand targeting Indian women. The platform aims to provide medical-grade coaching that adapts diet, exercise, and care recommendations to each phase of a user's menstrual cycle. The current implementation is a landing page with waitlist functionality, featuring a modern tech-clinical aesthetic with glassmorphism design elements, animated backgrounds, and comprehensive form handling.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The application uses a modern React-based architecture built with Vite for optimal development experience and performance:

- **Framework**: React 18 with TypeScript for type safety and enhanced developer experience
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with custom design tokens and CSS variables for a cohesive design system
- **UI Components**: Shadcn/ui component library with Radix UI primitives for accessibility
- **Animations**: Framer Motion for sophisticated micro-interactions and scroll-based animations
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Form Handling**: React Hook Form with Zod validation for type-safe form processing

### Backend Architecture
The server follows a RESTful API pattern with Express.js:

- **Runtime**: Node.js with TypeScript and ESM modules
- **Framework**: Express.js with custom middleware for logging and error handling
- **Data Layer**: Drizzle ORM with PostgreSQL for type-safe database operations
- **Storage**: Currently using in-memory storage (MemStorage) with interfaces designed for easy database migration
- **Validation**: Zod schemas for runtime type checking and API validation
- **Development**: Vite integration for seamless full-stack development experience

### Data Storage Solutions
The application uses PostgreSQL for persistent data storage:

- **Database**: PostgreSQL configured via Drizzle ORM with Neon serverless integration
- **Schema Design**: Two main entities - users and waitlist entries with proper relationships and constraints
- **Migration Strategy**: Drizzle Kit for database migrations and schema management
- **Production Storage**: DatabaseStorage class implementation with full CRUD operations for waitlist management
- **Data Persistence**: All waitlist entries are permanently stored with UUID identifiers and timestamps

### Authentication and Authorization
Currently minimal auth implementation focused on waitlist functionality:

- **User Management**: Basic user schema with username/password fields prepared for future auth implementation
- **Session Handling**: Session infrastructure prepared using connect-pg-simple for PostgreSQL session storage
- **Validation**: Comprehensive input validation using Zod schemas for all user inputs

### Design System and Theming
Sophisticated design system with tech-clinical aesthetic:

- **Color Palette**: Deep plum/ink gradients with accent colors (plum, blush, mint, ivory)
- **Typography**: Inter font family for premium, spacious feel
- **Component Design**: Glassmorphism cards with backdrop blur and soft borders
- **Animation Strategy**: Subtle micro-animations, hover effects, and scroll-triggered animations
- **Responsive Design**: Mobile-first approach with comprehensive breakpoint coverage

## External Dependencies

### Core Framework Dependencies
- **@vitejs/plugin-react**: React integration for Vite build system
- **wouter**: Lightweight routing solution for single-page navigation
- **@tanstack/react-query**: Advanced server state management and caching

### Database and ORM
- **drizzle-orm**: Type-safe SQL query builder and ORM
- **drizzle-kit**: Database migration and schema management tools
- **@neondatabase/serverless**: Serverless PostgreSQL connection handling
- **connect-pg-simple**: PostgreSQL session store for Express sessions

### UI and Design System
- **@radix-ui/***: Comprehensive set of accessible UI primitives (accordion, dialog, dropdown, etc.)
- **tailwindcss**: Utility-first CSS framework for rapid styling
- **class-variance-authority**: Type-safe variant API for component styling
- **clsx**: Conditional className utility for dynamic styling

### Form Handling and Validation
- **react-hook-form**: Performant form library with minimal re-renders
- **@hookform/resolvers**: Integration adapters for validation libraries
- **zod**: Runtime type validation and schema definition
- **drizzle-zod**: Integration between Drizzle schemas and Zod validation

### Animation and Interaction
- **framer-motion**: Production-ready motion library for React animations
- **embla-carousel-react**: Touch-friendly carousel component

### Development and Build Tools
- **typescript**: Static type checking for enhanced developer experience
- **vite**: Next-generation frontend build tool for fast development
- **esbuild**: Fast JavaScript bundler for production builds
- **@replit/vite-plugin-runtime-error-modal**: Development error handling
- **@replit/vite-plugin-cartographer**: Replit-specific development enhancements

### Utility Libraries
- **date-fns**: Modern date utility library for date manipulation
- **cmdk**: Command palette component for enhanced user experience
- **nanoid**: Secure URL-friendly unique string ID generator
- **lucide-react**: Consistent icon library with React components