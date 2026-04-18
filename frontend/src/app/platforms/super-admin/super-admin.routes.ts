import { Routes } from '@angular/router';
import { SuperAdminLayoutPage } from './layout/super-admin-layout.page';
import { AuthGuard } from '../../core/guards/auth.guard';

export const routes: Routes = [
  // Protected routes - require super-admin authentication
  {
    path: '',
    component: SuperAdminLayoutPage,
    canActivate: [AuthGuard],
    data: { expectedRole: 'super-admin' },
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/dashboard/dashboard.page').then(
            (m) => m.DashboardPage
          ),
        data: { preload: true },
      },
      {
        path: 'users-groups',
        loadComponent: () =>
          import('./pages/users-groups/users-groups.page').then(
            (m) => m.UsersGroupsPage,
          ),
      },
      // Backward-compat: the old `users` route now redirects to the
      // combined Users & Groups page (Task 4.0.9).
      {
        path: 'users',
        redirectTo: 'users-groups',
        pathMatch: 'full',
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
];
