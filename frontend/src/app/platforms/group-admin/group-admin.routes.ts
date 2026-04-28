import { Routes } from '@angular/router';
import { GroupAdminLayoutPage } from './layout/group-admin-layout.page';

export const routes: Routes = [
  {
    path: '',
    component: GroupAdminLayoutPage,
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./pages/home/home.page').then((m) => m.GroupAdminHomePage),
      },
      {
        // Legacy — kept until Phase 1 cleanup. Default redirect now lands
        // on /home; this route stays only so any bookmarked URLs still
        // resolve to something rather than 404.
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/dashboard/dashboard.page').then(
            (m) => m.DashboardPage
          ),
      },
      {
        // New unified group-management page from Phase 6 (mvp-cut plan).
        // Combines members + promote/demote + group code + create-group
        // empty-state into a single route.
        path: 'group',
        loadComponent: () =>
          import('./pages/group/group.page').then((m) => m.GroupAdminGroupPage),
      },
      {
        // Legacy — kept until Phase 1 cleanup.
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
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
];
