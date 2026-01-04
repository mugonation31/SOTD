# Implement Phase

You are now in **IMPLEMENT MODE** for the Predict3 project.

## Your Role

You are a senior software engineer implementing a feature according to an approved plan.

## Context

- **Project:** Predict3 (Song of the Day) - Cross-platform mobile/web app
- **Tech Stack:** Ionic 8 + Angular 18 + Capacitor 6 + Supabase
- **Current Branch:** `claude/review-tech-stack-vng9d`

## Your Task

Implement the current phase from TODO.md following the approved plan.

## Before You Start

1. **Read TODO.md** - Find the current phase marked as 🟡 In Progress
2. **Read the analysis** - Review docs/analysis/[feature-name].md
3. **Understand the plan** - Know what files to create/modify
4. **Check existing code** - Read relevant files first

## Steps to Follow

### 1. Verify Current Phase
```bash
# Check TODO.md for current phase
grep -A 30 "🟡 In Progress" TODO.md
```

### 2. Start with Design Tasks
- [ ] Create architecture diagrams (if needed)
- [ ] Design UI/UX flows
- [ ] Plan component structure
- [ ] Mark design tasks as `[x]` when done

### 3. Implementation Tasks

**For Each Task:**
1. Mark as in-progress: `[~]` (optional)
2. Implement the feature
3. Follow existing patterns
4. Mark as complete: `[x]`
5. Update TODO.md immediately

**Code Quality Checklist:**
- [ ] Follows Angular/Ionic best practices
- [ ] Uses TypeScript strict types
- [ ] Implements proper error handling
- [ ] Uses RxJS observables correctly
- [ ] Follows existing service patterns
- [ ] No security vulnerabilities
- [ ] Works cross-platform (web/mobile)
- [ ] Includes JSDoc comments for complex logic

**Common Patterns:**

**Service Pattern:**
```typescript
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyService {
  private dataSubject = new BehaviorSubject<Data | null>(null);
  public data$: Observable<Data | null> = this.dataSubject.asObservable();

  constructor(private supabase: SupabaseService) {}

  async loadData(): Promise<void> {
    const data = await this.supabase.from('table').select('*');
    this.dataSubject.next(data);
  }
}
```

**Component Pattern:**
```typescript
import { Component, OnInit, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-component',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './my-component.component.html',
  styleUrls: ['./my-component.component.scss']
})
export class MyComponentComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  private myService = inject(MyService);

  data$ = this.myService.data$;

  ngOnInit() {
    this.loadData();
  }

  private loadData() {
    this.data$.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(data => {
      // Handle data
    });
  }
}
```

**Auth Guard Pattern:**
```typescript
import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const myGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }

  return router.createUrlTree(['/auth/login']);
};
```

### 4. Testing Tasks

**For Each Implementation:**
1. Write unit tests
2. Write integration tests (if needed)
3. Run tests: `npm test`
4. Ensure coverage > 80%
5. Mark test tasks as `[x]`

**Test Pattern:**
```typescript
import { TestBed } from '@angular/core/testing';
import { MyService } from './my.service';

describe('MyService', () => {
  let service: MyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyService]
    });
    service = TestBed.inject(MyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load data', async () => {
    await service.loadData();
    service.data$.subscribe(data => {
      expect(data).toBeDefined();
    });
  });
});
```

### 5. Manual Testing
- [ ] Test on web (http://localhost:8100)
- [ ] Test on iOS (if applicable)
- [ ] Test on Android (if applicable)
- [ ] Test edge cases
- [ ] Test error scenarios

### 6. Deployment Tasks
- [ ] Build passes: `npm run build`
- [ ] All tests pass: `npm test`
- [ ] No linting errors: `npm run lint`
- [ ] Mark deployment tasks as `[x]`

## Security Checklist

Before marking phase complete, verify:
- [ ] No SQL injection vulnerabilities
- [ ] No XSS vulnerabilities
- [ ] Input validation on all user inputs
- [ ] RLS policies protect data
- [ ] Auth checks on protected routes
- [ ] Sensitive data is encrypted
- [ ] No secrets in code

## Performance Checklist

- [ ] Bundle size within budget (2MB initial, 5MB max)
- [ ] No memory leaks (use takeUntilDestroyed)
- [ ] Efficient database queries
- [ ] Lazy loading for routes
- [ ] Images optimized

## When Implementation is Complete

1. **Update TODO.md:**
   - Mark all tasks in phase as `[x]`
   - Change phase status to 🟢 Completed
   - Update "Current Position" section

2. **Commit Changes:**
   ```bash
   git add .
   git commit -m "feat: [description of feature]"
   ```

3. **Document Changes:**
   - Update relevant docs in `docs/features/`
   - Add to GLOSSARY.md if new terms introduced

4. **Report to User:**
   - Summary of what was implemented
   - Files created/modified
   - Test results
   - Next steps

5. **Ask for Approval:**
   - Should we proceed to next phase?
   - Or use `/continue` to resume work

## Common Issues & Solutions

**NavigatorLockAcquireTimeoutError:**
- Clear locks before auth: `navigator.locks.query()`

**Session not persisting:**
- Use CrossPlatformStorageService, not localStorage directly

**Tests failing:**
- Check mock services are configured
- Verify imports in test files

**RLS blocking queries:**
- Check user is authenticated
- Verify RLS policies allow operation

## Tech Stack Quick Reference

**Ionic Components:**
```html
<ion-header>
<ion-content>
<ion-button>
<ion-card>
<ion-list>
<ion-item>
```

**Angular Directives:**
```html
*ngIf="condition"
*ngFor="let item of items"
[property]="value"
(event)="handler()"
```

**RxJS Operators:**
```typescript
import { map, filter, tap, catchError, switchMap } from 'rxjs/operators';
```

---

**Remember:** Follow existing patterns, write tests, and update TODO.md as you go.
