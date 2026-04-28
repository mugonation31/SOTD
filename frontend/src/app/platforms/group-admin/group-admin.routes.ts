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
        // Unified group-management page from Phase 6 (mvp-cut). Combines
        // members + promote/demote + group code + create-group
        // empty-state into a single route.
        path: 'group',
        loadComponent: () =>
          import('./pages/group/group.page').then((m) => m.GroupAdminGroupPage),
      },
      {
        path: 'predictions',
        loadComponent: () =>
          import('./pages/predictions/predictions.page').then(
            (m) => m.PredictionsPage,
          ),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./pages/settings/settings.page').then((m) => m.SettingsPage),
      },
      // Legacy redirects — keep so bookmarked URLs from before the Phase 1
      // cleanup still land on something useful instead of 404. The
      // corresponding page directories were deleted.
      { path: 'dashboard', redirectTo: 'home', pathMatch: 'full' },
      { path: 'live', redirectTo: 'home', pathMatch: 'full' },
      { path: 'members', redirectTo: 'group', pathMatch: 'full' },
      { path: 'groups', redirectTo: 'group', pathMatch: 'full' },
      { path: 'leaderboard', redirectTo: 'group', pathMatch: 'full' },
      { path: 'create-group', redirectTo: 'group', pathMatch: 'full' },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
];
