import { Routes } from '@angular/router';
import { SuperAdminRegistrationGuard } from './guards/super-admin-registration.guard';
import { SuperAdminAuthGuard } from './guards/super-admin-auth.guard';

export const routes: Routes = [
  {
    path: 'register',
    canActivate: [SuperAdminRegistrationGuard],
    loadComponent: () =>
      import('./pages/register/register.page').then(
        (m) => m.SuperAdminRegisterPage
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.page').then((m) => m.SuperAdminLoginPage),
  },
  {
    path: '',
    canActivate: [SuperAdminAuthGuard],
    loadComponent: () =>
      import('./layout/super-admin-layout.page').then(
        (m) => m.SuperAdminLayoutPage
      ),
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/dashboard/dashboard.page').then(
            (m) => m.DashboardPage
          ),
      },
      {
        path: 'groups',
        loadComponent: () =>
          import('./pages/groups/groups.page').then((m) => m.GroupsPage),
      },
      {
        path: 'users',
        loadComponent: () =>
          import('./pages/users/users.page').then((m) => m.UsersPage),
      },
      {
        path: 'predictions',
        loadComponent: () =>
          import('./pages/predictions/predictions.page').then(
            (m) => m.PredictionsPage
          ),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./pages/settings/settings.page').then((m) => m.SettingsPage),
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
];
