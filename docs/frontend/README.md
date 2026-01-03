# Frontend Documentation

Frontend-specific technical documentation for the SOTD application.

## Contents

### Architecture
- Component structure
- Service patterns
- State management
- Routing

### Development
- Setup instructions
- Coding standards
- Best practices
- Common patterns

### Performance
- Bundle optimization
- Lazy loading
- Caching strategies

### Testing
- Unit testing patterns
- Component testing
- E2E testing

## Tech Stack

**Framework:** Angular 18 (Standalone Components)
**UI Library:** Ionic 8
**Language:** TypeScript 5.4
**State Management:** RxJS 7.8
**Testing:** Jest 29.7

## Project Structure

```
frontend/src/app/
├── core/                    # Core module (singleton services)
│   ├── services/            # Core services
│   │   ├── auth.service.ts
│   │   ├── cross-platform-storage.service.ts
│   │   └── ...
│   ├── guards/              # Route guards
│   │   ├── auth.guard.ts
│   │   └── no-auth.guard.ts
│   ├── interceptors/        # HTTP interceptors
│   ├── interfaces/          # TypeScript interfaces
│   ├── types/               # Type definitions
│   └── utils/               # Utility functions
│
├── platforms/               # Feature modules by role
│   ├── auth/                # Authentication pages
│   │   ├── login/
│   │   ├── signup/
│   │   └── reset-password/
│   ├── welcome/             # Welcome/onboarding
│   ├── player/              # Player features
│   ├── group-admin/         # Group admin features
│   └── super-admin/         # System admin features
│
├── shared/                  # Shared components
│   ├── components/
│   └── pipes/
│
└── services/                # Global services
    └── supabase.service.ts
```

## Coding Standards

### TypeScript
- Use strict mode
- Avoid `any` type
- Use interfaces for data structures
- Use enums for constants
- Prefer `const` over `let`

### Angular
- Use standalone components
- Inject services via `inject()` function
- Use signals for reactive state (Angular 16+)
- Implement `OnDestroy` for cleanup
- Use `takeUntilDestroyed()` for subscriptions

### Naming Conventions
- **Components:** PascalCase + Component suffix
  - `UserProfileComponent`
- **Services:** PascalCase + Service suffix
  - `AuthService`
- **Interfaces:** PascalCase
  - `UserProfile`
- **Variables:** camelCase
  - `currentUser`
- **Constants:** UPPER_SNAKE_CASE
  - `MAX_LOGIN_ATTEMPTS`

## Common Patterns

### Service Pattern

```typescript
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dataSubject = new BehaviorSubject<Data[]>([]);
  public data$: Observable<Data[]> = this.dataSubject.asObservable();

  constructor(private supabase: SupabaseService) {}

  async loadData(): Promise<void> {
    try {
      const { data, error } = await this.supabase
        .from('table')
        .select('*');

      if (error) throw error;
      this.dataSubject.next(data);
    } catch (error) {
      console.error('Error loading data:', error);
      throw error;
    }
  }
}
```

### Component Pattern

```typescript
import { Component, OnInit, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss']
})
export class ExampleComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  private dataService = inject(DataService);

  data$ = this.dataService.data$;

  ngOnInit() {
    this.loadData();
  }

  private loadData() {
    this.data$.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: (data) => console.log('Data loaded:', data),
      error: (error) => console.error('Error:', error)
    });
  }
}
```

### Route Guard Pattern

```typescript
import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }

  return router.createUrlTree(['/auth/login'], {
    queryParams: { returnUrl: state.url }
  });
};
```

## Performance Best Practices

### Bundle Optimization
- Use lazy loading for routes
- Import only needed Ionic components
- Tree-shake unused code
- Use production builds for deployment

### Change Detection
- Use `OnPush` change detection strategy
- Avoid heavy computations in templates
- Use `trackBy` with `*ngFor`

### Memory Management
- Unsubscribe from observables
- Use `takeUntilDestroyed()` helper
- Clean up in `ngOnDestroy`

## Testing

### Unit Tests
```typescript
describe('DataService', () => {
  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataService);
  });

  it('should load data', async () => {
    await service.loadData();
    service.data$.subscribe(data => {
      expect(data).toBeDefined();
    });
  });
});
```

### Component Tests
```typescript
describe('ExampleComponent', () => {
  let component: ExampleComponent;
  let fixture: ComponentFixture<ExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExampleComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

## Build Commands

```bash
# Development server
npm start

# Production build
npm run build:prod

# Run tests
npm test

# Test with coverage
npm run test:coverage

# Lint code
npm run lint
```

---

_Last Updated: 2026-01-03_
