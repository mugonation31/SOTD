# Continue Flowwwly Implementation

You are in **CONTINUE MODE** for the SOTD project.

## Your Role

Resume work on the current phase, picking up where you left off.

## Quick Start

1. Read `/docs/TODO.md`
2. Find the first unchecked `[ ]` item in the current phase
3. Identify which phase it belongs to (Design, Implementation, Testing, Deployment)
4. Continue implementing that phase
5. Follow the guidelines from `/implement` prompt

## Steps

### 1. Check Current Position

```bash
# View current phase
grep -A 30 "🟡 In Progress" TODO.md

# Count remaining tasks
grep "^- \[ \]" TODO.md | wc -l
```

### 2. Identify Next Task

Look for the first `[ ]` in the current phase:
- Is it a Design task? → Create diagrams, flows, or architecture docs
- Is it an Implementation task? → Write code following patterns
- Is it a Testing task? → Write and run tests
- Is it a Deployment task? → Build, test, and prepare for deploy

### 3. Verify Phase Completion

**Design Phase Complete When:**
- [ ] All architecture documented in `docs/architecture/`
- [ ] All UX flows documented in `docs/ux/`
- [ ] All UI designs documented in `docs/design-system/`
- [ ] All design tasks marked `[x]`

**Implementation Phase Complete When:**
- [ ] All files created/modified
- [ ] Code follows existing patterns
- [ ] No linting errors
- [ ] All implementation tasks marked `[x]`

**Testing Phase Complete When:**
- [ ] All unit tests written and passing
- [ ] All integration tests written and passing
- [ ] Coverage > 80% for new code
- [ ] Manual testing completed on all platforms
- [ ] All testing tasks marked `[x]`

**Deployment Phase Complete When:**
- [ ] Build succeeds: `npm run build`
- [ ] All tests pass: `npm test`
- [ ] No lint errors: `npm run lint`
- [ ] Changes committed to git
- [ ] All deployment tasks marked `[x]`

### 4. Update TODO.md

**As You Work:**
```markdown
# Before starting a task
- [ ] Task to do

# While working (optional)
- [~] Task in progress

# After completing
- [x] Task completed
```

**When Phase Completes:**
```markdown
# Change status
**Status:** 🟢 Completed

# Update Current Position
- **Last Completed Phase:** Phase X (Feature Name)
- **Current Phase:** Phase Y (Next Feature)
- **Progress:** 0/N tasks in current phase
```

### 5. Follow Implementation Guidelines

**See `/implement` prompt for:**
- Code patterns (Service, Component, Guard)
- Testing patterns
- Security checklist
- Performance checklist

**Key Principles:**
- ✅ Read files before modifying
- ✅ Follow existing patterns
- ✅ Write tests for all code
- ✅ Update TODO.md immediately
- ✅ Commit after each completed task
- ❌ Don't over-engineer
- ❌ Don't skip tests
- ❌ Don't ignore security

### 6. Tech Stack Reference

**Frontend:**
- Ionic 8.0 + Angular 18 (standalone components)
- RxJS 7.8 (observables, BehaviorSubject)
- TypeScript 5.4 (strict mode)
- Capacitor 6.2 (native APIs)

**Backend:**
- Supabase (PostgreSQL + Auth + RLS)

**Key Files:**
- `TODO.md` - Task tracking
- `GLOSSARY.md` - Terminology
- `docs/analysis/` - Feature analysis
- `docs/architecture/` - Architecture docs

**Key Services:**
- AuthService - `frontend/src/app/core/services/auth.service.ts`
- SupabaseService - `frontend/src/app/services/supabase.service.ts`
- CrossPlatformStorageService - `frontend/src/app/core/services/cross-platform-storage.service.ts`

### 7. When Blocked

**If you encounter issues:**

1. **Check existing code:**
   - Search for similar implementations
   - Read GLOSSARY.md for context

2. **Check documentation:**
   - Ionic docs: https://ionicframework.com/docs
   - Angular docs: https://angular.dev
   - Supabase docs: https://supabase.com/docs

3. **Check TODO.md:**
   - Is there a blocker noted?
   - Mark as blocked: `[!]`

4. **Ask user:**
   - Explain the blocker
   - Suggest potential solutions
   - Get clarification

### 8. Common Next Tasks

**After completing Design:**
→ Start Implementation tasks

**After completing Implementation:**
→ Start Testing tasks

**After completing Testing:**
→ Start Deployment tasks

**After completing Deployment:**
→ Move to next phase or ask user what's next

### 9. Reporting Progress

**After Each Task:**
```
✓ Completed: [Task description]
- Files modified: [list]
- Tests added: [count]
- Status: [passing/failing]

Next: [Next task description]
```

**After Each Phase:**
```
✓ Phase X Completed: [Phase name]

Summary:
- Files created: [count]
- Files modified: [count]
- Tests added: [count]
- Test coverage: [percentage]

Next Phase: Phase Y - [Next phase name]
Ready to proceed? (yes/no)
```

## Quick Commands

```bash
# View current phase
grep -A 30 "🟡 In Progress" TODO.md

# Count remaining tasks
grep -c "^- \[ \]" TODO.md

# Run tests
npm test

# Run build
npm run build

# Run linter
npm run lint

# Start dev server
npm start
```

## Workflow Summary

```
┌─────────────────┐
│  /continue      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Read TODO.md   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Find next [ ]   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Implement task  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Mark as [x]     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Commit changes  │
└────────┬────────┘
         │
         ▼
    Phase done?
         │
    ┌────┴────┐
   No        Yes
    │          │
    │          ▼
    │    Update TODO
    │          │
    │          ▼
    │    Next phase
    │          │
    └──────────┘
```

---

**Remember:**
- Update TODO.md after every task
- Commit frequently
- Test thoroughly
- Ask when unclear
- One task at a time
