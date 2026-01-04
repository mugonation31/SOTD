# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development Commands
```bash
# Development server
cd frontend && npm start

# Build for production
cd frontend && ionic build --prod

# Run tests
cd frontend && npm test

# Watch mode for tests
cd frontend && npm run test:watch

# Test coverage
cd frontend && npm run test:coverage

# Lint code
cd frontend && npm run lint
```

### Testing Commands
```bash
# Run all tests
cd frontend && npm test

# Run tests in CI mode
cd frontend && npm run test:ci

# Run tests with coverage
cd frontend && npm run test:coverage
```

### Build Commands
```bash
# Production build
cd frontend && npm run build:prod

# Cloudflare deployment build
cd frontend && npm run build:cloudflare
```

## Architecture

### Platform-Based Architecture
This is an Ionic + Angular application with a unique **multi-platform architecture**:

- **`/platforms/welcome/`** - Entry point and user role selection
- **`/platforms/auth/`** - Authentication flows (login, signup, password reset, OTP)
- **`/platforms/player/`** - Player interface (join groups, make predictions, view standings)
- **`/platforms/group-admin/`** - Group admin interface (manage groups, members, settings)
- **`/platforms/super-admin/`** - System-wide administration

Each platform is completely self-contained with its own:
- Routes (`*.routes.ts`) with lazy loading
- Layout components
- Guards for role-based access control
- Platform-specific services when needed

### Core Services Architecture
Located in `frontend/src/app/core/services/`:

- **`auth.service.ts`** - Main authentication with Supabase integration (39k+ lines, handles complex auth flows)
- **`supabase.service.ts`** - Centralized Supabase client and configuration
- **`group.service.ts`** - Group management and operations
- **`mock-data.service.ts`** - Comprehensive mock data for development
- **`cross-platform-storage.service.ts`** - Unified storage across web/mobile
- **`deep-link.service.ts`** - Deep linking and navigation handling

### Role-Based Access Control
- **Guards**: `core/guards/` contains platform-specific guards
- **Route Protection**: Each platform route protected by role-specific guards
- **Data Access**: Expected roles defined in route data (`expectedRole: 'player'`)

### State Management
- **Service-based** state management using RxJS observables
- **Centralized Storage** through `storage.service.ts` and `cross-platform-storage.service.ts`
- **Mock Data** comprehensive system for development/testing

### Authentication Flow
- **Supabase Integration** for backend auth
- **Cross-platform Session Management** with proper persistence
- **Token Management** via `token.service.ts`
- **Deep Link Support** for email confirmations and password resets

## Testing Infrastructure

### Jest Configuration
- **Preset**: `jest-preset-angular` optimized for Ionic/Angular
- **Environment**: jsdom with custom export conditions
- **Module Mapping**: Absolute imports (`@app/`, `@environments/`)
- **Transform Patterns**: Handles ESM modules including Supabase
- **Coverage**: Configured for comprehensive reporting

### Test Coverage Standards
The project has **comprehensive test coverage**, particularly for auth flows:
- **Reset Password**: 42 passing tests covering all scenarios
- **Unit, Integration, and Service Tests**
- **Mock Services** for Capacitor plugins
- **DOM Environment** configuration for component testing

**CRITICAL**: Never modify existing passing tests - update implementation to match test expectations instead.

## Key Features

### EPL Prediction System
- **Gameweek Predictions**: Players select 3 matches per gameweek
- **Scoring System**: Points for correct results/scores, bonus for perfect rounds
- **Joker System**: 2 seasonal jokers that double points
- **Special Events**: Boxing Day and Final Day predictions

### Entry and Prize Management
- **Optional Entry Fees** set by group admins
- **Prize Structure**: 1st, 2nd, 3rd place from entry fee pools
- **Group Codes** for joining groups

## Development Guidelines

### Ionic/Angular Best Practices
- **Component Organization**: Feature-based directory structure
- **Naming Conventions**: kebab-case files, camelCase variables, PascalCase classes
- **Dependency Management**: Avoid external libraries unless absolutely required
- **Performance**: Lazy loading, caching, pre-fetching for critical data
- **UI**: Prefer Ionic components, SCSS styling, responsive design

### Code Style
- **TypeScript**: Latest ES6+ features and Angular best practices
- **Error Handling**: Centralized through services and global handlers
- **API Integration**: Centralized through services
- **Storage**: Single point of entry for all storage operations

### Mobile/Capacitor Integration
- **Native Plugins**: Handle through centralized services, not directly in components
- **Fallbacks**: Proper fallbacks for web vs native platform differences
- **Device Compatibility**: Check compatibility, maintenance, and security for all plugins

## Current Status

- ✅ **Frontend Complete**: All UI/UX implemented with comprehensive auth system
- ✅ **Testing Infrastructure**: Jest setup with extensive coverage
- 🔄 **Backend Integration**: APIs and database implementation needed
- 📋 **Next Phase**: Backend core development (authentication, groups, predictions)

The frontend is ready for backend integration with mock data services providing complete functionality for development.