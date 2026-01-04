# SOTD - Task Tracking

> **Last Updated:** 2026-01-04
> **Current Phase:** MVP V1 Alignment - Critical Features Implementation
> **Status:** Gap Analysis Complete - 70% MVP V1 Ready
> **MVP V1 Spec:** Aligned with updated specification requirements

---

## Current Position
- **Last Completed Phase:** Phase 1 (Project Setup & Documentation)
- **Current Phase:** MVP V1 Critical Features Implementation
- **MVP V1 Readiness:** 70% (UI/UX Complete, Business Logic Gaps Identified)
- **Next Phase:** Phase 2 (Critical Business Logic Enforcement)
- **Progress:** Gap analysis complete, prioritized action plan ready

### Gap Analysis Summary
**What's Working (70%):**
- ✅ User authentication and role management
- ✅ Group creation and joining (instant join with codes)
- ✅ Prediction entry UI and validation
- ✅ Scoring calculation logic (100% complete)
- ✅ Leaderboards and standings
- ✅ Super admin analytics dashboard

**Critical Gaps (Must Fix for MVP V1):**
- ❌ Deadline enforcement (predictions locked 1 hour before kickoff)
- ❌ Prediction visibility controls (show after deadline only)
- ❌ Joker auto-assignment enforcement
- ❌ Player leave group functionality
- ❌ System-wide announcements (super admin)
- ❌ Backend integration (currently localStorage only)

---

## Phase 1: Project Setup & Documentation

**Status:** 🟢 Completed
**Goal:** Establish Flowwwly workflow, documentation structure, and baseline architecture

### Design
- [x] Document current architecture in `docs/architecture/`
- [x] Create design system documentation in `docs/design-system/`
- [x] Document UX flows in `docs/ux/`

### Implementation
- [x] Set up Flowwwly workflow structure
- [x] Create GLOSSARY.md with project terminology
- [x] Organize existing codebase documentation

### Testing
- [x] Verify all documentation is accessible
- [x] Test Flowwwly workflow commands
- [x] Ensure TODO.md tracking works correctly

### Deployment
- [x] Commit Flowwwly structure to repository

---

## Phase 2: Critical Business Logic Enforcement (MVP V1 Blockers)

**Status:** ⚪ Not Started
**Goal:** Implement critical game rules and business logic required for MVP V1
**Priority:** 🔴 CRITICAL - Blocks MVP V1 Launch

### 0. Legal Pages (Terms & Privacy) - PREREQUISITE
**Status:** ⚪ Not Started | **Impact:** Legal requirement & user trust
- [ ] Create Terms and Conditions page component
- [ ] Create Privacy Policy page component
- [ ] Write comprehensive Terms and Conditions content (use agreement, liability, user conduct)
- [ ] Write comprehensive Privacy Policy content (GDPR compliant, data collection, cookies)
- [ ] Add routes to auth.routes.ts for /terms and /privacy
- [ ] Wire up links in signup.page.ts (openTerms and openPrivacy methods)
- [ ] Wire up links in super-admin register.page.ts
- [ ] Add navigation with back button to return to signup
- [ ] Style pages professionally with proper formatting
- [ ] Test links from all signup forms (player, super-admin)
- [ ] Add "Last Updated" date to both pages
- **Files:** `auth/pages/terms/`, `auth/pages/privacy/`, `signup.page.ts`, `auth.routes.ts`

### 1. Deadline Enforcement System
**Status:** ⚪ Not Started | **Impact:** Game-breaking without this
- [ ] Create countdown timer component showing time until deadline
- [ ] Implement `canSubmitPrediction()` method with real-time deadline checking
- [ ] Auto-disable prediction form inputs when deadline passes
- [ ] Add visual indicators (locked icon, deadline passed message)
- [ ] Prevent form submission after deadline (client-side)
- [ ] Show "Predictions locked" message after deadline
- [ ] Add backend validation for deadline (requires Phase 6)
- **Files:** `matches.page.ts`, `matches.page.html`, `predictions.page.ts`

### 2. Prediction Visibility Controls
**Status:** ⚪ Not Started | **Impact:** MVP V1 requirement
- [ ] Create `canViewPredictions(gameweek)` method checking deadline status
- [ ] Hide other players' predictions until deadline passes
- [ ] Add "Predictions will be visible after [deadline]" placeholder
- [ ] Show predictions after deadline in group standings
- [ ] Show predictions after deadline in group admin predictions view
- [ ] Add toggle in group settings: "Show predictions after deadline"
- **Files:** `group-standings.page.ts`, `predictions.page.ts`, `group.service.ts`

### 3. Joker System Integration & Auto-Assignment
**Status:** ⚪ Not Started | **Impact:** Core game mechanic
- [ ] Call `shouldForceJokerUse()` during prediction submission flow
- [ ] Add joker selection UI to prediction form
- [ ] Show warning banner: "You must use 1st joker before Boxing Day"
- [ ] Auto-assign 1st joker if not used by Boxing Day gameweek
- [ ] Auto-assign 2nd joker if not used by Final Day gameweek
- [ ] Block joker usage on Boxing Day matches
- [ ] Block joker usage on Final Day matches
- [ ] Add "Joker automatically assigned" notification
- [ ] Track joker usage in user profile: `jokersUsed: number`
- **Files:** `matches.page.ts`, `scoring.service.ts`, `season.service.ts`

### 4. Player Leave Group Functionality
**Status:** ⚪ Not Started | **Impact:** User freedom requirement
- [ ] Add "Leave Group" button to player groups page
- [ ] Create confirmation dialog: "Are you sure you want to leave [Group Name]?"
- [ ] Implement `GroupService.leaveGroup(groupId)` method
- [ ] Remove player from group members array
- [ ] Update group member count
- [ ] Clear group from player's joined groups
- [ ] Update leaderboard after player leaves
- [ ] Show success toast: "You have left [Group Name]"
- [ ] Prevent leaving if player is group admin (show warning)
- **Files:** `player/pages/groups/groups.page.ts`, `group.service.ts`

### Testing
- [ ] Unit tests for deadline enforcement logic
- [ ] Unit tests for joker auto-assignment rules
- [ ] Unit tests for leave group functionality
- [ ] Integration tests for prediction visibility
- [ ] E2E test: Complete prediction flow with deadline
- [ ] E2E test: Joker usage and auto-assignment
- [ ] Test deadline countdown accuracy

### Deployment
- [ ] Deploy to staging environment
- [ ] Test deadline enforcement with real-time scenarios
- [ ] Verify joker auto-assignment timing
- [ ] Smoke test all critical paths

---

## Phase 3: System Features & Communication (MVP V1 Completion)

**Status:** ⚪ Not Started
**Goal:** Complete system-wide features required for MVP V1
**Priority:** 🟡 HIGH - Required for MVP V1

### 1. System-Wide Announcement System (Super Admin)
**Status:** ⚪ Not Started | **Impact:** Communication requirement
- [ ] Create `AnnouncementService` with CRUD methods
- [ ] Design announcement data model (id, title, message, type, priority, startDate, endDate)
- [ ] Build announcement banner component (dismissible, persistent)
- [ ] Add announcement management page in super admin
- [ ] Create announcement modal/form (create/edit/delete)
- [ ] Implement announcement types: info, warning, critical, maintenance
- [ ] Add priority levels: low, medium, high, critical
- [ ] Show active announcements on all platform dashboards
- [ ] Store announcements in backend (localStorage for now)
- [ ] Add "New Announcement" badge for unread announcements
- **Files:** `announcement.service.ts`, `announcement-banner.component.ts`, `super-admin/pages/announcements/`

### 2. Boxing Day & Final Day Joker Restrictions
**Status:** ⚪ Not Started | **Impact:** Game rule enforcement
- [ ] Add `canUseJokerOnGameweek(gameweekNumber)` validation method
- [ ] Block joker checkbox on special gameweeks (Boxing Day, Final Day)
- [ ] Show tooltip: "Jokers cannot be used on Boxing Day/Final Day"
- [ ] Add validation error if joker selected on restricted gameweek
- [ ] Update mock data to include `specialType: 'boxing-day' | 'final-day'`
- [ ] Display special gameweek badge in UI
- **Files:** `matches.page.ts`, `scoring.service.ts`, `mock-data.service.ts`

### 3. Special Gameweek Handling (All 10 Matches)
**Status:** ⚪ Not Started | **Impact:** MVP V1 requirement verified
- [ ] Verify all 10 matches displayed for Boxing Day
- [ ] Verify all 10 matches displayed for Final Day
- [ ] Enforce 10/10 prediction requirement before submission
- [ ] Show progress indicator: "7/10 predictions complete"
- [ ] Perfect round bonus applies to 3+ correct scores (not all 10)
- [ ] Test scoring calculation for special gameweeks
- **Files:** `matches.page.ts`, `scoring.service.ts`

### Testing
- [ ] Unit tests for announcement service CRUD
- [ ] Component tests for announcement banner
- [ ] Test joker restrictions on special gameweeks
- [ ] Test special gameweek 10-match requirement
- [ ] E2E test: Super admin creates announcement
- [ ] E2E test: Announcement displays across all platforms
- [ ] Test announcement persistence and dismissal

### Deployment
- [ ] Deploy announcement system to staging
- [ ] Test announcements across all user roles
- [ ] Verify joker restrictions work correctly
- [ ] Smoke test special gameweek flows

---

## Phase 4: Group Admin & Member Management Completion

**Status:** ⚪ Not Started
**Goal:** Polish and complete group administration features for MVP V1
**Priority:** 🟢 MEDIUM - Enhancement for MVP V1

### 1. Group Admin Promotion/Demotion (Verification)
**Status:** ⚪ Not Started | **Impact:** Multi-admin support
- [ ] Test existing `manageMemberRole()` method with real data
- [ ] Verify promotion: player → admin works correctly
- [ ] Verify demotion: admin → player works correctly
- [ ] Test multiple admins per group scenario
- [ ] Ensure promoted admins get full admin permissions
- [ ] Update group admin list when roles change
- [ ] Add permission check: only admins can promote/demote
- [ ] Show admin badge on member list
- **Files:** `group-admin/pages/members/members.page.ts`, `group.service.ts`

### 2. Group Admin Dual Role (Admin + Player)
**Status:** ⚪ Not Started | **Impact:** User experience
- [ ] Verify group admins can also be players in their own group
- [ ] Test: Admin creates group → automatically joins as player
- [ ] Ensure admin appears in group leaderboard
- [ ] Admin can make predictions like regular players
- [ ] Admin scores counted in group standings
- [ ] Test switching between admin view and player view
- **Files:** `group.service.ts`, `create-group.page.ts`

### 3. Member Status Management
**Status:** ⚪ Not Started | **Impact:** Group management
- [ ] Test activate/deactivate member functionality
- [ ] Inactive members hidden from leaderboard
- [ ] Inactive members cannot submit predictions
- [ ] Show inactive badge in member list
- [ ] Add "Reactivate Member" button for inactive members
- [ ] Confirm deactivation with dialog
- **Files:** `group-admin/pages/members/members.page.ts`

### 4. Group Settings & Privacy Controls
**Status:** ⚪ Not Started | **Impact:** Group customization
- [ ] Implement `showLeaderboard` toggle
- [ ] Implement `allowPlayerInvites` toggle (future: let players invite others)
- [ ] Implement `allowMemberChat` toggle (future feature)
- [ ] Add "Lock Group" option (prevent new joins)
- [ ] Add "Max Members" limit setting
- [ ] Update group settings in real-time
- **Files:** `group-admin/pages/settings/settings.page.ts`, `group.service.ts`

### Testing
- [ ] Test group admin promotion/demotion flow
- [ ] Test admin as player in own group
- [ ] Test member activation/deactivation
- [ ] Test group settings persistence
- [ ] Verify permissions for all actions
- [ ] Test edge cases: last admin, self-demotion

### Deployment
- [ ] Deploy group admin features to staging
- [ ] Test with multiple test groups
- [ ] Verify multi-admin scenarios work
- [ ] Monitor group management operations

---

## Phase 5: Super Admin Polish & Audit Features

**Status:** ⚪ Not Started
**Goal:** Complete super admin oversight tools for MVP V1
**Priority:** 🟢 MEDIUM - Non-intrusive oversight

### 1. User Suspension (vs Deletion)
**Status:** ⚪ Not Started | **Impact:** Less destructive moderation
- [ ] Add "Suspend User" option alongside "Delete User"
- [ ] Create user status field: active, suspended, deleted
- [ ] Suspended users cannot login
- [ ] Suspended users shown in user list with badge
- [ ] Add "Unsuspend" button for suspended users
- [ ] Add suspension reason field (optional)
- [ ] Send notification to suspended user (future: email)
- **Files:** `super-admin/pages/users/users.page.ts`, `auth.service.ts`

### 2. Audit Trail & Activity Logging
**Status:** ⚪ Not Started | **Impact:** Accountability
- [ ] Create `AuditService` for logging all admin actions
- [ ] Log format: timestamp, user, action, target, details
- [ ] Log user deletions/suspensions
- [ ] Log group deletions
- [ ] Log member removals
- [ ] Log role changes
- [ ] Create audit log viewer page in super admin
- [ ] Filter logs by: date, user, action type
- [ ] Export audit logs to CSV
- **Files:** `audit.service.ts`, `super-admin/pages/audit-logs/`

### 3. Special Event Management (TODO Completion)
**Status:** ⚪ Not Started | **Impact:** System administration
- [ ] Implement `manageSpecialEvent()` modal/page
- [ ] Create/edit Boxing Day gameweek settings
- [ ] Create/edit Final Day gameweek settings
- [ ] Set special gameweek dates
- [ ] Configure special gameweek match requirements (10 matches)
- [ ] Test special event configuration flow
- **Files:** `super-admin/pages/dashboard/dashboard.page.ts`, `season.service.ts`

### 4. Enhanced Intervention Tools
**Status:** ⚪ Not Started | **Impact:** Admin support
- [ ] Complete "Manage Jokers" functionality (view joker usage across all users)
- [ ] Complete "Manage Payments" functionality (view/track prize group payments)
- [ ] Add bulk operations: message multiple users, mass suspend
- [ ] Add user search with advanced filters
- [ ] Add group health score algorithm refinement
- **Files:** `super-admin/pages/dashboard/dashboard.page.ts`

### Testing
- [ ] Test user suspension/unsuspension flow
- [ ] Test audit log capture for all actions
- [ ] Test audit log filtering and search
- [ ] Verify special event management works
- [ ] Test intervention tools accuracy
- [ ] Security testing for admin actions

### Deployment
- [ ] Deploy super admin polish to staging
- [ ] Review audit logs for completeness
- [ ] Test special event configuration
- [ ] Verify intervention tools work correctly

---

## Phase 6: Backend Integration & API Development

**Status:** ⚪ Not Started
**Goal:** Replace localStorage with Supabase backend for production
**Priority:** 🔴 CRITICAL - Required for MVP V1 Launch

### 1. Supabase Database Schema
**Status:** ⚪ Not Started | **Impact:** Data persistence
- [ ] Design database schema for all tables
- [ ] Create `profiles` table (extends auth.users)
- [ ] Create `groups` table with code, settings, admin references
- [ ] Create `group_members` table (many-to-many relationship)
- [ ] Create `gameweeks` table with deadlines, special flags
- [ ] Create `matches` table with fixtures, results, status
- [ ] Create `predictions` table with scores, joker usage, points
- [ ] Create `leaderboards` table (or compute on-demand)
- [ ] Create `announcements` table for system messages
- [ ] Create `audit_logs` table for admin actions
- [ ] Set up Row Level Security (RLS) policies
- [ ] Create indexes for performance
- **Files:** SQL migration files in `supabase/migrations/`

### 2. EPL Match Data Integration
**Status:** ⚪ Not Started | **Impact:** Real match data
- [ ] Research EPL API providers (API-Football, TheSportsDB, etc.)
- [ ] Set up API key and authentication
- [ ] Create `MatchDataService` to fetch fixtures
- [ ] Create scheduled job to import upcoming fixtures
- [ ] Create scheduled job to fetch live scores (every 60 seconds)
- [ ] Create scheduled job to import final results
- [ ] Map API data to SOTD match format
- [ ] Handle API rate limits and errors
- [ ] Add caching layer for API responses
- **Files:** `match-data.service.ts`, backend scheduled functions

### 3. Automatic Point Calculation Trigger
**Status:** ⚪ Not Started | **Impact:** Scoring automation
- [ ] Create backend function: `calculatePointsForGameweek(gameweekId)`
- [ ] Trigger function when match results finalized
- [ ] Fetch all predictions for completed matches
- [ ] Use existing `ScoringService.calculatePoints()` logic
- [ ] Update predictions table with calculated points
- [ ] Recalculate leaderboards after scoring
- [ ] Send notifications to players about points earned
- [ ] Log scoring events to audit trail
- **Files:** Backend Edge Functions or Supabase Functions

### 4. Replace Service Methods with API Calls
**Status:** ⚪ Not Started | **Impact:** Production data flow
- [ ] Replace `GroupService` localStorage methods with Supabase queries
- [ ] Replace `AuthService` mock mode with full Supabase auth
- [ ] Replace `MockDataService` with real `MatchDataService`
- [ ] Update `createGroup()` to insert into database
- [ ] Update `joinGroup()` to insert group_member record
- [ ] Update prediction submission to insert into database
- [ ] Add server-side deadline validation
- [ ] Add server-side joker validation
- [ ] Add error handling for all API calls
- [ ] Add loading states during API operations
- **Files:** All service files in `core/services/`

### 5. Server-Side Validation
**Status:** ⚪ Not Started | **Impact:** Security & integrity
- [ ] Validate predictions submitted before deadline (server-side)
- [ ] Validate joker usage rules (server-side)
- [ ] Validate group codes are unique (server-side)
- [ ] Validate user permissions for all operations
- [ ] Prevent duplicate predictions for same gameweek
- [ ] Validate prediction scores (0-99 range)
- [ ] Prevent tampering with points/scores
- **Files:** Supabase RLS policies, Edge Functions

### Testing
- [ ] Integration tests for all API endpoints
- [ ] Test database migrations and rollbacks
- [ ] Test EPL API integration with real data
- [ ] Test automatic point calculation accuracy
- [ ] Test server-side validations
- [ ] Test error handling and edge cases
- [ ] Load testing for concurrent users

### Deployment
- [ ] Deploy Supabase project to production
- [ ] Configure environment variables
- [ ] Set up EPL API credentials
- [ ] Deploy scheduled functions for match data
- [ ] Deploy Edge Functions for validation
- [ ] Migrate test data to production schema
- [ ] Monitor API usage and costs

---

## Phase 7: Production Hardening & Polish

**Status:** ⚪ Not Started
**Goal:** Prepare application for public launch with production-grade quality
**Priority:** 🟡 HIGH - Pre-launch requirements

### 1. Error Handling & User Feedback
**Status:** ⚪ Not Started | **Impact:** User experience
- [ ] Implement global error handler
- [ ] Add user-friendly error messages for all failures
- [ ] Create error boundary components
- [ ] Add retry logic for failed API calls
- [ ] Add offline detection and messaging
- [ ] Design loading and skeleton states for all pages
- [ ] Add toast notifications for all operations
- **Files:** `error-handler.service.ts`, global interceptors

### 2. Performance Optimization
**Status:** ⚪ Not Started | **Impact:** User experience
- [ ] Optimize bundle size (tree shaking, lazy loading)
- [ ] Add caching for API responses
- [ ] Optimize images (compression, WebP format)
- [ ] Add pagination for long lists (leaderboards, members)
- [ ] Implement virtual scrolling for large datasets
- [ ] Optimize database queries with indexes
- [ ] Run Lighthouse audit (target score > 90)
- **Files:** Build config, service workers, component optimization

### 3. Security Hardening
**Status:** ⚪ Not Started | **Impact:** Security
- [ ] Implement rate limiting for API endpoints
- [ ] Add CSRF protection
- [ ] Configure security headers (CSP, HSTS, etc.)
- [ ] Sanitize user inputs to prevent XSS
- [ ] Implement proper password hashing (Supabase handles this)
- [ ] Add API key rotation mechanism
- [ ] Set up security monitoring and alerts
- [ ] Conduct security audit/penetration testing
- **Files:** Backend configuration, security policies

### 4. Analytics & Monitoring
**Status:** ⚪ Not Started | **Impact:** Observability
- [ ] Set up Sentry for error tracking
- [ ] Add Google Analytics or similar for usage tracking
- [ ] Track key events: signups, predictions, group joins
- [ ] Set up performance monitoring (response times, load times)
- [ ] Add custom dashboards for metrics
- [ ] Configure alerts for critical errors
- [ ] Set up uptime monitoring (Pingdom, UptimeRobot)
- **Files:** Analytics service, monitoring configuration

### 5. Testing & Quality Assurance
**Status:** ⚪ Not Started | **Impact:** Stability
- [ ] Full regression testing of all features
- [ ] Cross-browser testing (Chrome, Safari, Firefox, Edge)
- [ ] Cross-platform testing (iOS, Android, Web)
- [ ] Accessibility testing (WCAG 2.1 AA compliance)
- [ ] Load testing (simulate 1000+ concurrent users)
- [ ] Stress testing (identify breaking points)
- [ ] User acceptance testing (UAT) with beta users
- **Files:** Test suites, E2E tests

### DevOps & Infrastructure
- [ ] Set up CI/CD pipeline (GitHub Actions, GitLab CI)
- [ ] Configure staging and production environments
- [ ] Set up automated database backups (daily)
- [ ] Configure CDN for static assets (Cloudflare)
- [ ] Create disaster recovery plan and runbooks
- [ ] Set up log aggregation (Logtail, Papertrail)
- [ ] Document deployment procedures
- **Files:** CI/CD configs, infrastructure as code

### Deployment
- [ ] Deploy to production environment
- [ ] Smoke test all critical user paths
- [ ] Monitor error rates and performance metrics
- [ ] Set up on-call rotation for incidents
- [ ] Create incident response plan

---

## Phase 8: Public Launch & Go-Live

**Status:** ⚪ Not Started
**Goal:** Launch SOTD to the public and onboard first users
**Priority:** 🟢 LAUNCH - Final phase

### Pre-Launch Preparation
- [ ] Finalize marketing materials and landing page
- [ ] Prepare launch announcement for social media
- [ ] Create user onboarding tutorial/walkthrough
- [ ] Set up customer support channels (email, chat)
- [ ] Create FAQ and help documentation
- [ ] Prepare press kit and media assets
- [ ] Set up community channels (Discord, Reddit, etc.)

### Feature Flags & Gradual Rollout
- [ ] Implement feature flagging system (LaunchDarkly, Unleash)
- [ ] Configure feature toggles for new features
- [ ] Set up gradual rollout mechanism (10% → 25% → 50% → 100%)
- [ ] Add kill switch for critical features
- [ ] Test feature flag controls

### Go-Live Checklist
- [ ] Final QA pass on production environment
- [ ] Verify all integrations (EPL API, payments, emails)
- [ ] Test user registration and onboarding flow
- [ ] Verify analytics and error tracking working
- [ ] Confirm backup and recovery procedures
- [ ] Brief support team on common issues
- [ ] Prepare incident response team

### Launch Day
- [ ] Enable public access to application
- [ ] Post launch announcement on all channels
- [ ] Monitor system metrics (users, errors, performance)
- [ ] Be available for immediate bug fixes
- [ ] Respond to user feedback in real-time
- [ ] Track key metrics: signups, activations, retention

### Post-Launch (First Week)
- [ ] Gather user feedback via surveys and support tickets
- [ ] Monitor error rates and fix critical bugs
- [ ] Track conversion funnel (signup → join group → make prediction)
- [ ] Analyze user behavior patterns
- [ ] Iterate on UX issues identified by users
- [ ] Celebrate launch with team! 🎉

### Post-Launch (First Month)
- [ ] Review analytics and identify improvement areas
- [ ] Conduct user interviews for qualitative feedback
- [ ] Plan feature enhancements based on data
- [ ] Optimize performance based on real usage
- [ ] Expand marketing efforts if metrics are positive
- [ ] Begin planning Phase 9 (enhancements)

---

## Backlog / Future Phases

### Post-MVP Features (Phase 9+)
- [ ] Push notifications for match updates and reminders
- [ ] Social sharing features (share predictions, results)
- [ ] Achievement/badge system (streaks, perfect rounds)
- [ ] Multi-language support (i18n) - Spanish, French, etc.
- [ ] Dark mode enhancements and theme customization
- [ ] In-app messaging/chat between group members
- [ ] Email notifications for gameweek deadlines
- [ ] Mobile app native features (biometric auth, widgets)
- [ ] Advanced statistics (prediction accuracy trends)
- [ ] Historical season archives
- [ ] Custom scoring rules per group (admin configurable)
- [ ] Integration with other leagues (Champions League, La Liga)

### Technical Improvements
- [ ] Refactor legacy code patterns identified during launch
- [ ] Optimize database queries based on production load
- [ ] Improve test coverage to 90%+ across all modules
- [ ] Update dependencies and address security advisories
- [ ] Implement GraphQL API layer (consider if needed)
- [ ] Add Redis caching layer for frequently accessed data
- [ ] Implement real-time WebSocket updates for live scores

### Infrastructure & DevOps
- [ ] Set up blue-green deployments for zero-downtime releases
- [ ] Implement A/B testing framework for feature experiments
- [ ] Add comprehensive API documentation (OpenAPI/Swagger)
- [ ] Set up automated performance regression testing
- [ ] Implement chaos engineering practices
- [ ] Add multi-region deployment for global users
- [ ] Set up data warehouse for advanced analytics

---

## Completed Phases

### ✓ Phase 1: Project Setup & Documentation
**Completed:** 2026-01-03
**Summary:** Successfully implemented Flowwwly workflow structure with comprehensive documentation organization.

**Deliverables:**
- ✓ Custom slash commands (`/analyze`, `/implement`, `/continue`)
- ✓ Workflow prompts (01-analyze.md, 02-implement.md, 03-continue.md)
- ✓ TODO.md phase-based task tracking system
- ✓ GLOSSARY.md with project terminology
- ✓ Complete documentation structure:
  - docs/analysis/ - Feature analysis and research
  - docs/architecture/ - System architecture
  - docs/design-system/ - UI/UX design system
  - docs/devops/ - Deployment and operations
  - docs/features/ - Feature specifications
  - docs/frontend/ - Frontend technical docs
  - docs/integrations/ - Third-party integrations
  - docs/product/ - Product strategy
  - docs/ux/ - User experience flows

**Outcome:** Project now has structured workflow for production-ready development.

---

## MVP V1 Critical Path Summary

### Minimum Viable Product Requirements (Launch Blockers)
To launch MVP V1, these phases MUST be completed:

**Phase 2: Critical Business Logic** 🔴 CRITICAL
- Deadline enforcement (game-breaking without this)
- Prediction visibility controls
- Joker auto-assignment integration
- Player leave group functionality

**Phase 6: Backend Integration** 🔴 CRITICAL
- Supabase database schema and migrations
- EPL API integration for real match data
- Replace all localStorage with database calls
- Server-side validation for all operations

**Phase 7: Production Hardening** 🟡 HIGH
- Error handling and monitoring
- Performance optimization
- Security hardening
- Analytics setup

**Recommended Before Launch (High Priority):**
- Phase 3: Announcement system (super admin communication)
- Phase 3: Joker restrictions on special gameweeks
- Phase 5: Audit trail for accountability

**Can Launch Without (Medium/Low Priority):**
- Phase 4: Group admin promotion/demotion polish
- Phase 5: User suspension (can use deletion initially)
- Phase 5: Special event management UI

---

## Notes & Conventions

### Phase Priority Indicators
- 🔴 CRITICAL - Blocks MVP V1 launch, must complete
- 🟡 HIGH - Strongly recommended for MVP V1
- 🟢 MEDIUM - Nice-to-have for MVP V1, can defer
- ⚪ LOW - Post-launch enhancement

### Phase Status Indicators
- ⚪ Not Started
- 🟡 In Progress
- 🟢 Completed
- 🔴 Blocked

### Task Completion
- `[ ]` - Not started
- `[x]` - Completed
- `[~]` - In progress (optional)
- `[!]` - Blocked (optional)

### Phase Categories
Each phase should include tasks from these categories where applicable:
- **Design:** Architecture, UX flows, system design
- **Implementation:** Code and features
- **Testing:** All types of testing
- **DevOps:** Infrastructure and deployment
- **Product:** Product management and documentation
- **Deployment:** Release and monitoring

### File References
Tasks include **Files:** references to help locate relevant code:
- Service files in `frontend/src/app/core/services/`
- Platform pages in `frontend/src/app/platforms/{role}/pages/`
- Backend files in `supabase/` directory

---

## Quick Commands

```bash
# View current phase
grep -A 20 "Current Phase" TODO.md

# Count remaining tasks in current phase
grep -c "^- \[ \]" TODO.md

# Mark task as complete (manual edit)
# Change [ ] to [x] for completed tasks
```
