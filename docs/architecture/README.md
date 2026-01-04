# Architecture Documentation

System architecture, design patterns, and technical specifications for the Predict3 application.

## Contents

### System Architecture
- High-level system diagrams
- Component relationships
- Data flow diagrams
- Deployment architecture

### Design Patterns
- Service layer patterns
- State management patterns (RxJS)
- Component composition patterns
- Error handling patterns

### Database Design
- Schema diagrams
- Table relationships
- RLS (Row Level Security) policies
- Migration strategy

### API Specifications
- Supabase API usage
- Custom backend endpoints (if any)
- WebSocket/real-time patterns

## Current Architecture Overview

### Tech Stack
- **Frontend:** Ionic 8 + Angular 18 + TypeScript 5.4
- **Backend:** Supabase (PostgreSQL + Auth)
- **Mobile:** Capacitor 6.2
- **State:** RxJS 7.8 (Observable patterns)

### High-Level Architecture

```
┌─────────────────────────────────────────┐
│          Web / iOS / Android            │
│    (Ionic + Angular + Capacitor)        │
└──────────────────┬──────────────────────┘
                   │
                   │ HTTP / WebSocket
                   │
┌──────────────────▼──────────────────────┐
│           Supabase Backend              │
│  ┌──────────┐  ┌──────────┐            │
│  │   Auth   │  │ Realtime │            │
│  └──────────┘  └──────────┘            │
│  ┌──────────────────────────┐          │
│  │   PostgreSQL Database    │          │
│  │   (with RLS policies)    │          │
│  └──────────────────────────┘          │
└─────────────────────────────────────────┘
```

### Layer Architecture

```
┌─────────────────────────────────────┐
│      Presentation Layer             │
│  (Components, Pages, UI)            │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│      Business Logic Layer           │
│  (Services, Guards, Interceptors)   │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│      Data Access Layer              │
│  (SupabaseService, Storage)         │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│      Backend (Supabase)             │
│  (Database, Auth, Storage)          │
└─────────────────────────────────────┘
```

### Directory Structure

```
frontend/src/app/
├── core/                  # Core services, guards, utilities
│   ├── services/          # Singleton services
│   ├── guards/            # Route guards
│   ├── interceptors/      # HTTP interceptors
│   └── utils/             # Helper functions
├── platforms/             # Role-based feature modules
│   ├── auth/              # Authentication
│   ├── player/            # Player features
│   ├── group-admin/       # Group admin features
│   └── super-admin/       # System admin features
└── shared/                # Shared components
```

## Design Principles

1. **Separation of Concerns:** Clear layer boundaries
2. **Single Responsibility:** Each service has one purpose
3. **Dependency Injection:** Angular DI for loose coupling
4. **Reactive Programming:** RxJS for state management
5. **Security First:** RLS, auth guards, input validation
6. **Cross-Platform:** Web, iOS, Android support

## Key Architectural Decisions

### State Management
- **Pattern:** Observable Services with BehaviorSubject
- **Rationale:** Simpler than NgRx for current scale, built into Angular
- **Example:** AuthService exposes `currentUser$` observable

### Authentication
- **Pattern:** Supabase Auth with JWT tokens
- **Storage:** CrossPlatformStorageService (localStorage + Capacitor)
- **Session:** Auto-refresh, cross-tab sync

### Database Access
- **Pattern:** Supabase client via SupabaseService
- **Security:** Row Level Security (RLS) policies
- **Caching:** BehaviorSubject caches in services

### Routing
- **Pattern:** Angular Router with lazy loading
- **Guards:** AuthGuard, NoAuthGuard for protection
- **Structure:** Role-based platform modules

## Adding New Documentation

When documenting architecture:
1. Create a new `.md` file with descriptive name
2. Include diagrams (use Mermaid)
3. Explain rationale for decisions
4. Link to related code files
5. Update this README

---

_Last Updated: 2026-01-03_
