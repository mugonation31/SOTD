import { Routes } from '@angular/router';
import { GroupAdminLayoutPage } from './layout/group-admin-layout.page';

export const routes: Routes = [
  {
    path: '',
    component: GroupAdminLayoutPage,
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
        path: 'live',
        loadComponent: () =>
          import('./pages/live/live.page').then((m) => m.LivePage),
      },
      {
        path: 'groups',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./pages/groups/groups.page').then((m) => m.GroupsPage),
          },
          {
            path: ':id/leaderboard',
            loadComponent: () =>
              import(
                './pages/groups/group-leaderboard/group-leaderboard.page'
              ).then((m) => m.GroupLeaderboardPage),
          },
        ],
      },
      {
        path: 'leaderboard',
        loadComponent: () =>
          import('./pages/leaderboard/leaderboard.page').then((m) => m.LeaderboardPage),
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
