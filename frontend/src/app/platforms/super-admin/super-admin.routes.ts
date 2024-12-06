import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
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
