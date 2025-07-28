# Testing Guide for Predict 3

## Overview

This project uses **Jest** as the testing framework with **jest-preset-angular** for Angular/Ionic testing support. The testing setup is configured to work with TypeScript, Ionic components, and Supabase services.

## Test Setup

### Configuration Files

- **`jest.config.js`** - Main Jest configuration
- **`tsconfig.spec.json`** - TypeScript configuration for tests
- **`src/setup-jest.ts`** - Global test setup and mocks
- **`src/testing/`** - Test utilities and mocks

### Key Features

✅ **Jest + Angular/Ionic Support**
- Configured with `jest-preset-angular`
- Supports TypeScript, HTML templates, and SCSS
- Handles Ionic components and services

✅ **Path Aliases**
- `@/` → `src/`
- `@app/` → `src/app/`
- `@environments/` → `src/environments/`
- `@assets/` → `src/assets/`

✅ **Mock Support**
- Static assets (images, CSS, etc.)
- Supabase services
- Ionic components
- Browser APIs (ResizeObserver, IntersectionObserver, etc.)

## Running Tests

### Commands

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run tests for CI
npm run test:ci

# Run specific test file
npm test -- --testPathPattern=service.spec.ts

# Run tests with verbose output
npm test -- --verbose
```

### Test File Naming

- **Service Tests**: `*.service.spec.ts`
- **Component Tests**: `*.component.spec.ts`
- **Page Tests**: `*.page.spec.ts`
- **Utility Tests**: `*.utils.spec.ts`

## Writing Tests

### Service Testing Example

```typescript
import { TestBed } from '@angular/core/testing';
import { ToastController } from '@ionic/angular/standalone';
import { ToastService } from './toast.service';

describe('ToastService', () => {
  let service: ToastService;
  let mockToastController: any;

  beforeEach(() => {
    mockToastController = {
      create: jest.fn().mockResolvedValue({
        present: jest.fn()
      })
    };

    TestBed.configureTestingModule({
      providers: [
        ToastService,
        { provide: ToastController, useValue: mockToastController }
      ]
    });
    service = TestBed.inject(ToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call toastController.create when showToast is called', async () => {
    await service.showToast('Test message', 'success');
    
    expect(mockToastController.create).toHaveBeenCalledWith({
      message: 'Test message',
      color: 'success',
      duration: 3000,
      position: 'bottom'
    });
  });
});
```

### Component Testing Example

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular/standalone';
import { YourComponent } from './your.component';

describe('YourComponent', () => {
  let component: YourComponent;
  let fixture: ComponentFixture<YourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonicModule, YourComponent],
      providers: [
        // Add your service mocks here
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(YourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display correct title', () => {
    const titleElement = fixture.nativeElement.querySelector('h1');
    expect(titleElement.textContent).toContain('Expected Title');
  });
});
```

## Test Utilities

### Available Utilities (`src/testing/test-utils.ts`)

```typescript
// Mock services
createMockRouter()
createMockToastService()
createMockAuthService()
createMockGroupService()
createMockMockDataService()

// Component testing
createComponentFixture<T>(component: T)

// DOM utilities
createMockElement(tagName?: string)
createMockEvent(type: string, target?: any)

// Form utilities
createMockFormControl(value?: any)

// Ionic utilities
createMockIonicElement()

// Test data factories
createMockUser()
createMockGroup()
createMockMatch()
```

### Supabase Mock (`src/testing/supabase.mock.ts`)

```typescript
import { createMockUser } from './supabase.mock';

// Use in tests
const mockUser = createMockUser({
  email: 'test@example.com',
  role: 'player'
});
```

## Best Practices

### 1. Test Structure
```typescript
describe('ServiceName', () => {
  let service: ServiceName;
  let mockDependencies: any;

  beforeEach(() => {
    // Setup mocks and TestBed
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('methodName', () => {
    it('should do something specific', () => {
      // Test specific behavior
    });
  });
});
```

### 2. Mocking Dependencies
```typescript
const mockService = {
  method: jest.fn().mockReturnValue('expected value'),
  asyncMethod: jest.fn().mockResolvedValue('async result')
};

TestBed.configureTestingModule({
  providers: [
    { provide: RealService, useValue: mockService }
  ]
});
```

### 3. Testing Async Operations
```typescript
it('should handle async operations', async () => {
  const result = await service.asyncMethod();
  expect(result).toBe('expected');
});
```

### 4. Testing Ionic Components
```typescript
// Mock Ionic elements
const mockAlert = {
  present: jest.fn().mockResolvedValue(undefined),
  dismiss: jest.fn().mockResolvedValue(undefined),
  onDidDismiss: jest.fn().mockReturnValue({
    then: jest.fn().mockResolvedValue({ data: null, role: 'cancel' })
  })
};
```

## Coverage

The project is configured to collect coverage from:
- All TypeScript files in `src/app/`
- Excludes: `.d.ts`, `index.ts`, `main.ts`, `polyfills.ts`
- Excludes: `*.module.ts`, `*.routing.ts`
- Excludes: `*.interface.ts`, `*.type.ts`, `*.enum.ts`, `*.constant.ts`

## Troubleshooting

### Common Issues

1. **Supabase ESM Modules**: The Jest config includes Supabase packages in `transformIgnorePatterns`
2. **Ionic Components**: Use `IonicModule` in test imports
3. **Path Aliases**: Configured in `jest.config.js` under `moduleNameMapper`
4. **TypeScript Errors**: Ensure `tsconfig.spec.json` includes Jest types

### Debugging

```bash
# Run with verbose output
npm test -- --verbose

# Run specific test with debugging
npm test -- --testPathPattern=your.test.ts --verbose --no-cache
```

## Next Steps

1. **Write Tests for Core Services**: Start with `AuthService`, `GroupService`, `MockDataService`
2. **Component Tests**: Test key components like forms, lists, and navigation
3. **Page Tests**: Test page components with routing and user interactions
4. **Integration Tests**: Test service interactions and data flow
5. **E2E Tests**: Consider adding Playwright or Cypress for end-to-end testing

## Test Commands Reference

| Command | Description |
|---------|-------------|
| `npm test` | Run all tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run test:ci` | Run tests for CI environment |
| `npm test -- --testPathPattern=pattern` | Run specific tests |
| `npm test -- --verbose` | Run with verbose output | 