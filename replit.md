# OnlyFans Chat Assistant - AI-Powered Chatting Tool

## Overview

This is an AI-powered assistant application designed to help OnlyFans chatters generate effective responses and manage client conversations. The application uses Google's Gemini AI to provide context-aware message suggestions based on the five phases of the OnlyFans chatting methodology: Relation, Qualification, Sexualisation, Chauffe, and Script.

The system analyzes client messages, detects conversation phases and client types, and generates appropriate responses with emojis and alternative suggestions to maximize engagement and revenue.

## User Preferences

Preferred communication style: Simple, everyday language.

## Replit Setup (October 6, 2025)

### Environment Configuration
- **Node.js**: Version 20 installed
- **Package Manager**: npm
- **Frontend Port**: 5000 (served by Express.js with Vite in development mode)
- **Backend Port**: 5000 (same server handles both frontend and API)

### Vite Configuration
- Configured to bind to `0.0.0.0:5000` for Replit proxy compatibility
- HMR (Hot Module Replacement) configured for Replit's SSL proxy (clientPort: 443)
- Allows all hosts to work with Replit's iframe preview

### Required Environment Variables
- **GEMINI_API_KEY**: Required for Google Gemini AI integration. Users must provide their own API key.
  - Get your API key from: https://makersuite.google.com/app/apikey
  - The hardcoded API key has been removed for security

### Database
- Currently using in-memory storage
- PostgreSQL schema is defined but database is not provisioned
- Can be upgraded to PostgreSQL when needed

### Development Workflow
- Command: `npm run dev`
- Runs on port 5000
- Vite dev server with hot module replacement

### Deployment Configuration
- Type: Autoscale (stateless web application)
- Build: `npm run build`
- Suitable for frontend applications with API endpoints

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript using Vite as the build tool

**UI Framework**: shadcn/ui components built on Radix UI primitives with Tailwind CSS for styling

**State Management**: 
- TanStack Query (React Query) for server state management
- Local React state for UI interactions
- Custom theme provider for dark/light mode support

**Routing**: Wouter for lightweight client-side routing

**Design System**:
- Linear/Material Design hybrid approach for professional minimalism
- Dark-first design with light mode support
- Custom color palette optimized for extended use
- Emphasis on information density and copy-paste workflows

**Key Components**:
- `ChatInput`: Message composition with keyboard shortcuts
- `AiResponseCard`: Displays AI-generated responses with copy functionality
- `ContextSelector`: Phase and client type selection
- `ConversationHistory`: Historical conversation view
- `PhaseBadge`, `ClientTypeTag`: Visual indicators for conversation state
- `SuggestionPill`: Quick-copy alternative responses

### Backend Architecture

**Runtime**: Node.js with Express.js framework

**API Structure**: RESTful endpoints with JSON request/response format

**Primary Endpoints**:
- `POST /api/chat`: Generate AI response based on user message and context
- `POST /api/analyze`: Analyze client message for phase and type detection
- `GET /api/conversations`: Retrieve conversation history

**Request Validation**: Zod schemas for runtime type checking and validation

**Error Handling**: Centralized error middleware with appropriate HTTP status codes

### AI Integration

**Service**: Google Gemini AI via `@google/genai` SDK

**Knowledge Base**: Comprehensive chatting methodology encoded in `server/knowledge-base.ts` covering:
- Five conversation phases (Relation, Qualification, Sexualisation, Chauffe, Script)
- Client types (Nouveau, Ancien, Timewaster, Spender)
- Best practices and conversation techniques
- Message templates and examples

**AI Service Features**:
- Context-aware response generation
- Automatic phase and client type detection
- Emoji integration based on conversation tone
- Multiple suggestion variants per response

**Prompt Engineering**: System prompts built from knowledge base to ensure consistent, methodology-aligned responses

### Data Storage

**Current Implementation**: In-memory storage via `MemStorage` class

**Schema Design** (Drizzle ORM):
- `users` table: User authentication data
- `conversations` table: Message history with phase/client type metadata

**Database Ready**: PostgreSQL schema defined with Drizzle ORM, configured for Neon Database via `@neondatabase/serverless`

**Migration Strategy**: Drizzle Kit configured for schema migrations when database is provisioned

**Data Persistence**: 
- Conversations stored with timestamps
- Phase and client type tracking
- Memory limit of 100 recent conversations in current implementation

### Session Management

**Package**: `connect-pg-simple` for PostgreSQL-backed sessions (configured but not yet active)

**Credentials**: Cookie-based session handling ready for implementation

### External Dependencies

**AI Service**:
- Google Gemini AI API (requires `GEMINI_API_KEY` environment variable)
- Model: Gemini 2.5 Flash for text generation
- API key must be provided by user (no hardcoded keys for security)

**Database**:
- Neon Database (PostgreSQL) - configured but not provisioned
- Connection via `DATABASE_URL` environment variable
- Serverless PostgreSQL driver for edge compatibility

**UI Libraries**:
- Radix UI primitives for accessible components
- Tailwind CSS for utility-first styling
- Lucide React for icons
- date-fns for date formatting

**Development Tools**:
- Vite for fast development and building
- TypeScript for type safety
- Replit plugins for development environment integration

**Build & Deployment**:
- esbuild for server bundling
- Static file serving in production
- Environment-specific configurations (development vs production)