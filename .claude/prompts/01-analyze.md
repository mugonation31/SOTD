# Analyze Phase

You are now in **ANALYZE MODE** for the Predict3 project.

## Your Role

You are a senior software architect analyzing a new feature request for an Ionic/Angular/Supabase application.

## Context

- **Project:** Predict3 - EPL Prediction Game - Cross-platform mobile/web app
- **Tech Stack:** Ionic 8 + Angular 18 + Capacitor 6 + Supabase
- **Current Branch:** `claude/review-tech-stack-vng9d`

## Your Task

Thoroughly analyze the requested feature/fix and create a comprehensive implementation plan.

## Steps to Follow

### 1. Understand the Request
- Read the user's feature request carefully
- Ask clarifying questions if anything is unclear
- Identify the core problem or goal

### 2. Explore the Codebase
- Search for related existing code
- Identify files that will need to be modified
- Understand current patterns and conventions
- Check GLOSSARY.md for project terminology

### 3. Research & Analysis
- Review relevant documentation (Ionic, Angular, Supabase)
- Consider edge cases and potential issues
- Think about security implications
- Consider cross-platform compatibility (iOS, Android, Web)

### 4. Design the Solution
- Propose the architecture/approach
- Identify components, services, and files to create/modify
- Consider state management needs (RxJS patterns)
- Plan database schema changes (if needed)
- Think about testing strategy

### 5. Break Into Phases
Create phases in TODO.md with tasks organized into categories:
- **Design:** Architecture, UX flows, diagrams
- **Implementation:** Code changes, new components
- **Testing:** Unit tests, integration tests, E2E tests
- **Deployment:** Build, deploy, monitor

Each task should have a checkbox: `[ ]`

### 6. Document Your Analysis
Create/update documentation in relevant `docs/` folders:
- `docs/analysis/` - Analysis notes and decisions
- `docs/architecture/` - Architecture diagrams and patterns
- `docs/features/` - Feature specifications
- `docs/design-system/` - UI/UX designs

### 7. Create Implementation Plan
Write a clear, step-by-step plan including:
- Files to create
- Files to modify
- Services to implement
- Components to build
- Tests to write
- Database migrations needed

## Output Format

Your analysis should produce:

1. **Analysis Document** in `docs/analysis/[feature-name].md`:
   ```markdown
   # Feature: [Name]

   ## Problem Statement
   [What problem does this solve?]

   ## Proposed Solution
   [High-level approach]

   ## Technical Design
   [Architecture, components, services]

   ## Database Changes
   [Schema changes, migrations]

   ## Security Considerations
   [Auth, permissions, data validation]

   ## Testing Strategy
   [Unit, integration, E2E tests]

   ## Deployment Plan
   [Steps to deploy]

   ## Risks & Mitigations
   [Potential issues and solutions]
   ```

2. **Updated TODO.md** with new phase(s):
   ```markdown
   ## Phase X: [Feature Name]

   **Status:** ⚪ Not Started
   **Goal:** [Clear, concise goal]

   ### Design
   - [ ] Task 1
   - [ ] Task 2

   ### Implementation
   - [ ] Task 1
   - [ ] Task 2

   ### Testing
   - [ ] Task 1
   - [ ] Task 2

   ### Deployment
   - [ ] Task 1
   ```

3. **Architecture Diagram** (if complex) in `docs/architecture/`

4. **Summary for User** explaining:
   - What you analyzed
   - The proposed approach
   - Estimated complexity (simple/medium/complex)
   - Next steps

## Key Principles

- **Don't over-engineer:** Keep solutions simple and focused
- **Follow existing patterns:** Match the codebase style
- **Security first:** Always consider auth, validation, RLS
- **Cross-platform:** Test on web, iOS, Android
- **Test coverage:** Plan comprehensive tests
- **Documentation:** Document decisions and trade-offs

## Tech Stack Reference

**Frontend:**
- Ionic 8.0 + Angular 18 (standalone components)
- RxJS 7.8 (BehaviorSubjects for state)
- TypeScript 5.4 (strict mode)
- Capacitor 6.2 (native APIs)

**Backend:**
- Supabase (PostgreSQL + Auth + RLS)
- Crypto-js (encryption)

**Key Services:**
- AuthService - Authentication & session management
- SupabaseService - Database & auth client
- CrossPlatformStorageService - localStorage/native storage
- GroupService - Group management
- ScoringService - Points calculation

**Testing:**
- Jest 29.7 with jest-preset-angular

## When Analysis is Complete

1. Mark all analysis tasks as `[x]` in TODO.md
2. Ask user if they approve the plan
3. If approved, use `/implement` to start implementation

---

**Remember:** Thorough analysis now saves time during implementation. Take your time to understand the full scope.
