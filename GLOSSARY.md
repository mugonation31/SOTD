# Predict3 - Project Glossary

> Comprehensive terminology and definitions for the Predict3 (Song of the Day) project.

---

## Project Overview

**Predict3 (Song of the Day):** A cross-platform mobile and web application for managing predictions, group competitions, and leaderboards.

---

## Architecture & Technical Terms

### Frontend

**Ionic Framework**
- Cross-platform UI framework for building mobile and web applications
- Version: 8.0.0
- Provides pre-built UI components for iOS, Android, and web

**Angular**
- TypeScript-based frontend framework
- Version: 18.0.0
- Uses standalone components architecture

**Capacitor**
- Native runtime for web apps
- Version: 6.2.0
- Bridges web code with native iOS/Android APIs

**Standalone Components**
- Angular 18+ pattern that doesn't require NgModules
- Improves tree-shaking and reduces bundle size

**RxJS (Reactive Extensions for JavaScript)**
- Library for reactive programming using Observables
- Version: 7.8.0
- Core to Angular's change detection and state management

**BehaviorSubject**
- RxJS observable that stores current value and emits it to new subscribers
- Used extensively in AuthService and state management

### Backend

**Supabase**
- Backend-as-a-Service (BaaS) platform
- Provides PostgreSQL database, authentication, storage, and real-time features
- URL: `https://lmybyfrhzarxmantttki.supabase.co`

**RLS (Row Level Security)**
- PostgreSQL security feature
- Ensures users can only access data they're authorized to see
- Implemented on `public.profiles` table

**JWT (JSON Web Token)**
- Token-based authentication standard
- Supabase uses JWT for session management
- Auto-refreshed every hour

### Services

**AuthService**
- Core authentication service
- Manages login, logout, session persistence, and user state
- Located: `frontend/src/app/core/services/auth.service.ts`

**SupabaseService**
- Supabase client wrapper
- Handles database queries and authentication state
- Located: `frontend/src/app/services/supabase.service.ts`

**CrossPlatformStorageService**
- Storage abstraction layer
- Uses localStorage on web, Capacitor Preferences on native
- Located: `frontend/src/app/core/services/cross-platform-storage.service.ts`

**ScoringService**
- Handles point calculations and leaderboard logic
- Located: `frontend/src/app/core/services/scoring.service.ts`

**GroupService**
- Manages group creation, membership, and administration
- Located: `frontend/src/app/core/services/group.service.ts`

**MockDataService**
- Provides fake data for development and testing
- Used when Supabase is unavailable
- Located: `frontend/src/app/core/services/mock-data.service.ts`

### Security

**Crypto-js**
- JavaScript cryptography library
- Version: 4.2.0
- Used for password hashing (SHA256) and encryption (AES)

**Session Lock**
- Mechanism to prevent concurrent logins across tabs/devices
- Uses Navigator locks API and localStorage events
- Can cause `NavigatorLockAcquireTimeoutError`

**Auth Guards**
- Route protection mechanisms
- `AuthGuard`: Ensures user is authenticated
- `NoAuthGuard`: Prevents authenticated users from accessing auth pages
- Located: `frontend/src/app/core/guards/`

---

## User Roles & Permissions

### Roles

**Player**
- Basic user role
- Can join groups, make predictions, view standings
- Default role for new users

**Group Admin**
- Can create and manage groups
- Invites members and configures group settings
- Views group analytics

**Super Admin**
- System administrator
- Full access to all features
- Manages users, groups, and system settings

### Role Hierarchy
```
Super Admin > Group Admin > Player
```

---

## Application Features

### Platforms

**Platform (in code context)**
- Separate feature modules for different user roles
- Located in: `frontend/src/app/platforms/`
- Includes: auth, welcome, player, group-admin, super-admin

**Auth Platform**
- Login, signup, password reset pages
- Available to unauthenticated users

**Welcome Platform**
- Role selection and onboarding
- First page after login

**Player Platform**
- Player dashboard, predictions, standings
- Role: player, group-admin, super-admin

**Group Admin Platform**
- Group creation, member management
- Role: group-admin, super-admin

**Super Admin Platform**
- System overview, user management, metrics
- Role: super-admin only

### Core Features

**Predictions**
- User submissions for match/event outcomes
- Stored encrypted in database
- Contribute to user scores

**Standings/Leaderboard**
- Ranked list of users by points
- Can be global or group-specific
- Updated in real-time

**Groups**
- Collections of users competing together
- Managed by group admins
- Can have custom rules and scoring

**Dashboard**
- User's home page showing predictions, stats, and upcoming events
- Role-specific content

---

## Database Schema

### Tables

**auth.users**
- Supabase built-in authentication table
- Stores email, encrypted password, metadata

**public.profiles**
- User profile data
- Links to `auth.users` via `id` foreign key
- Columns: id, email, username, first_name, last_name, role, first_login, created_at, updated_at

### Relationships

**User → Profile (1:1)**
- Each auth.users record has one profiles record
- Enforced by foreign key constraint

---

## Development Workflow

### Flowwwly

**Flowwwly**
- Custom Claude Code workflow for structured development
- Phases: Analyze → Implement → Continue
- Uses TODO.md for tracking

**Phase**
- Distinct development stage with specific goals
- Contains tasks grouped by: Design, Implementation, Testing, Deployment
- Must be completed before moving to next phase

**Task Checkbox Notation**
- `[ ]` - Not started
- `[x]` - Completed
- `[~]` - In progress (optional)
- `[!]` - Blocked (optional)

### Commands

**Slash Commands**
- Custom Claude Code commands
- Located in: `.claude/commands/`
- Examples: `/analyze`, `/implement`, `/continue`

**Prompts**
- Structured instructions for Claude
- Located in: `.claude/prompts/`
- Guide development workflow

---

## Testing

### Jest
- JavaScript testing framework
- Version: 29.7.0
- Used for unit and integration tests

**Test Suite**
- Collection of related tests
- Example: `auth.service.spec.ts` (42+ tests)

**Coverage**
- Percentage of code executed by tests
- Goal: 80%+ for critical services

**Mock Services**
- Fake implementations for testing
- Example: MockDataService, MockSupabaseService

### Testing Types

**Unit Tests**
- Test individual functions/methods
- Run in isolation with mocked dependencies

**Integration Tests**
- Test interaction between components/services
- Example: AuthService + SupabaseService

**E2E (End-to-End) Tests**
- Test complete user flows
- Example: Login → Dashboard → Logout

---

## Build & Deployment

### Environments

**Development**
- Local development server
- URL: http://localhost:8100
- Uses `environment.ts`

**Production**
- Live public application
- Optimized builds
- Uses `environment.prod.ts`

**Staging**
- Pre-production testing environment
- Mirrors production setup

### Build Artifacts

**www/ Directory**
- Output folder for compiled application
- Contains optimized HTML, CSS, JS bundles

**Bundle Size Budgets**
- Initial: 2MB max
- Total: 5MB max
- Ensures fast load times

---

## Common Issues & Solutions

### NavigatorLockAcquireTimeoutError
- **Cause:** Session lock not released from previous login
- **Solution:** Clear locks before authentication
- **Prevention:** Proper cleanup in logout flow

### Session Persistence Issues
- **Cause:** Token not saved to storage correctly
- **Solution:** Use CrossPlatformStorageService
- **Prevention:** Test on both web and native platforms

### firstLogin Flag
- **Purpose:** Determines if user needs onboarding
- **Location:** `public.profiles.first_login`
- **Reset:** Set to `false` after welcome page

---

## Code Patterns

### Service Pattern
```typescript
@Injectable({ providedIn: 'root' })
export class SomeService {
  private stateSubject = new BehaviorSubject<State>(initialState);
  public state$ = this.stateSubject.asObservable();
}
```

### Guard Pattern
```typescript
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  return authService.isAuthenticated() ? true :
    inject(Router).createUrlTree(['/auth/login']);
};
```

### Observable Subscription Pattern
```typescript
this.authService.currentUser$.pipe(
  takeUntilDestroyed(this.destroyRef)
).subscribe(user => {
  // Handle user changes
});
```

---

## Abbreviations

- **API:** Application Programming Interface
- **BaaS:** Backend as a Service
- **CLI:** Command Line Interface
- **CRUD:** Create, Read, Update, Delete
- **CSP:** Content Security Policy
- **E2E:** End-to-End
- **HTTP:** Hypertext Transfer Protocol
- **JWT:** JSON Web Token
- **MVC:** Model-View-Controller
- **RLS:** Row Level Security
- **RxJS:** Reactive Extensions for JavaScript
- **SPA:** Single Page Application
- **UI:** User Interface
- **UX:** User Experience
- **WCAG:** Web Content Accessibility Guidelines

---

## External References

### Documentation
- [Ionic Framework Docs](https://ionicframework.com/docs)
- [Angular Docs](https://angular.dev)
- [Supabase Docs](https://supabase.com/docs)
- [Capacitor Docs](https://capacitorjs.com/docs)
- [RxJS Docs](https://rxjs.dev)

### Tools
- [Angular CLI](https://angular.dev/cli)
- [Ionic CLI](https://ionicframework.com/docs/cli)
- [Capacitor CLI](https://capacitorjs.com/docs/cli)
- [Jest](https://jestjs.io)

---

_Last Updated: 2026-01-03_
