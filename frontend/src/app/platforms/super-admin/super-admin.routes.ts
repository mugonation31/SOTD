import { Routes } from '@angular/router';
import { SuperAdminLayoutPage } from './layout/super-admin-layout.page';
import { AuthGuard } from '../../core/guards/auth.guard';

export const routes: Routes = [
  // Public routes - no authentication required
  {
    path: 'register',
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
          import('./pages/group-admin-list/group-admin-list.page').then(
            (m) => m.GroupAdminListPage
          ),
        data: { preload: true },
      },
      {
        path: 'group-admin-invites',
        loadComponent: () =>
          import('./pages/group-admin-invites/group-admin-invites.page').then(
            (m) => m.GroupAdminInvitesPage
          ),
        data: { preload: true },
      },
      {
        path: 'invitation-management',
        loadComponent: () =>
          import('./pages/invitation-management/invitation-management.page').then(
            (m) => m.InvitationManagementPage
          ),
        data: { preload: true },
      },
      {
        path: 'members',
        loadComponent: () =>
          import('./pages/members/members.page').then((m) => m.MembersPage),
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
