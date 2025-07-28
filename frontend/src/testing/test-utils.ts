import { ComponentFixture } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ToastService } from '@core/services/toast.service';
import { AuthService } from '@core/services/auth.service';
import { GroupService } from '@core/services/group.service';
import { MockDataService } from '@core/services/mock-data.service';

// Mock services for testing
export const createMockRouter = () => ({
  navigate: jest.fn(),
  navigateByUrl: jest.fn(),
  url: '/test',
  events: {
    pipe: jest.fn().mockReturnValue({
      subscribe: jest.fn()
    })
  }
} as any);

export const createMockToastService = () => ({
  showToast: jest.fn(),
  showSuccess: jest.fn(),
  showError: jest.fn(),
  showWarning: jest.fn(),
  showInfo: jest.fn(),
  toastController: {
    create: jest.fn().mockResolvedValue({
      present: jest.fn(),
      dismiss: jest.fn()
    })
  }
} as any);

export const createMockAuthService = () => ({
  login: jest.fn(),
  logout: jest.fn(),
  register: jest.fn(),
  getCurrentUser: jest.fn(),
  isAuthenticated: jest.fn(),
  markFirstLoginComplete: jest.fn(),
  currentUser: {
    subscribe: jest.fn()
  }
} as any);

export const createMockGroupService = () => ({
  getGroups: jest.fn(),
  createGroup: jest.fn(),
  joinGroup: jest.fn(),
  getGroupMembers: jest.fn(),
  getGroupStandings: jest.fn(),
  groups$: {
    subscribe: jest.fn()
  }
} as any);

export const createMockMockDataService = () => ({
  getGameWeeks: jest.fn(),
  getMatches: jest.fn(),
  getPredictions: jest.fn(),
  getUsers: jest.fn(),
  getGroups: jest.fn(),
  getCurrentGameweek: jest.fn(),
  getMatchesForGameweek: jest.fn(),
  getCurrentGameweekData: jest.fn()
} as any);

// Component testing utilities
export const createComponentFixture = <T>(component: T): ComponentFixture<T> => {
  return {
    componentInstance: component,
    debugElement: {
      nativeElement: document.createElement('div'),
      query: jest.fn(),
      queryAll: jest.fn(),
      triggerEventHandler: jest.fn(),
      componentInstance: component
    },
    detectChanges: jest.fn(),
    whenStable: jest.fn().mockResolvedValue(undefined),
    destroy: jest.fn()
  } as unknown as ComponentFixture<T>;
};

// DOM testing utilities
export const createMockElement = (tagName: string = 'div') => {
  const element = document.createElement(tagName);
  element.querySelector = jest.fn();
  element.querySelectorAll = jest.fn();
  element.getAttribute = jest.fn();
  element.setAttribute = jest.fn();
  (element as any).classList = {
    add: jest.fn(),
    remove: jest.fn(),
    toggle: jest.fn(),
    contains: jest.fn()
  };
  return element;
};

// Async testing utilities
export const waitForAsync = (fn: () => void | Promise<void>) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      fn();
      resolve();
    }, 0);
  });
};

// Form testing utilities
export const createMockFormControl = (value: any = '') => ({
  value,
  setValue: jest.fn(),
  patchValue: jest.fn(),
  reset: jest.fn(),
  markAsTouched: jest.fn(),
  markAsUntouched: jest.fn(),
  markAsDirty: jest.fn(),
  markAsPristine: jest.fn(),
  updateValueAndValidity: jest.fn(),
  valid: true,
  invalid: false,
  pristine: true,
  dirty: false,
  touched: false,
  untouched: true,
  errors: null
});

// Event testing utilities
export const createMockEvent = (type: string, target?: any) => ({
  type,
  target: target || createMockElement(),
  preventDefault: jest.fn(),
  stopPropagation: jest.fn(),
  bubbles: true,
  cancelable: true
});

// Ionic component testing utilities
export const createMockIonicElement = () => ({
  present: jest.fn().mockResolvedValue(undefined),
  dismiss: jest.fn().mockResolvedValue(undefined),
  onDidDismiss: jest.fn().mockReturnValue({
    then: jest.fn().mockResolvedValue({ data: null, role: 'cancel' })
  }),
  onWillDismiss: jest.fn().mockReturnValue({
    then: jest.fn().mockResolvedValue({ data: null, role: 'cancel' })
  })
});

// Test data factories
export const createMockUser = () => ({
  id: 'test-user-id',
  email: 'test@example.com',
  name: 'Test User',
  role: 'player',
  joinedAt: new Date('2024-01-01')
});

export const createMockGroup = () => ({
  id: 'test-group-id',
  name: 'Test Group',
  code: 'TEST123',
  adminId: 'test-admin-id',
  createdAt: new Date('2024-01-01'),
  members: []
});

export const createMockMatch = () => ({
  id: 'test-match-id',
  homeTeam: 'Arsenal',
  awayTeam: 'Chelsea',
  kickoff: new Date('2024-01-01T15:00:00Z'),
  venue: 'Emirates Stadium',
  status: 'scheduled'
}); 