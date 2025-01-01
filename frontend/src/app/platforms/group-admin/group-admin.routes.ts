import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.page').then((m) => m.GroupAdminLoginPage),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register/register.page').then(
        (m) => m.GroupAdminRegisterPage
      ),
  },
  {
    path: '',
    loadComponent: () =>
      import('./layout/group-admin-layout.page').then(
        (m) => m.GroupAdminLayoutPage
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
        path: 'members',
        loadComponent: () =>
          import('./pages/members/members.page').then((m) => m.MembersPage),
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
        path: 'groups',
        loadComponent: () =>
          import('./pages/groups/groups.page').then((m) => m.GroupsPage),
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
];
