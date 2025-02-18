import { Routes } from '@angular/router';
import { SuperAdminRegistrationGuard } from './guards/super-admin-registration.guard';
import { SuperAdminAuthGuard } from './guards/super-admin-auth.guard';
import { SuperAdminLayoutPage } from './layout/super-admin-layout.page';

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
    component: SuperAdminLayoutPage,
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
        path: 'metrics',
        loadComponent: () =>
          import('./pages/metrics/metrics.page').then((m) => m.MetricsPage),
      },
      {
        path: 'groups',
        loadComponent: () =>
          import('./pages/groups/groups.page').then((m) => m.GroupsPage),
        data: { preload: true },
      },
      {
        path: 'predictions',
        loadComponent: () =>
          import('./pages/predictions/predictions.page').then(
            (m) => m.PredictionsPage
          ),
        data: { preload: true },
      },
      {
        path: 'group-admins',
        loadComponent: () =>
          import('./pages/group-admin-invites/group-admin-invites.page').then(
            (m) => m.GroupAdminInvitesPage
          ),
        data: { preload: true },
      },
      {
        path: 'users',
        loadComponent: () =>
          import('./pages/users/users.page').then((m) => m.UsersPage),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./pages/settings/settings.page').then((m) => m.SettingsPage),
        data: { preload: true },
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
];
