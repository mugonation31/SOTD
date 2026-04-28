import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layout/player-layout.page').then((m) => m.PlayerLayoutPage),
    children: [
      {
        // /player/home is the merged landing — leaderboard preview at top,
        // then the prediction surface (matches list with score inputs and
        // submit) inline below. Loads matches.page because the merged
        // content lives there now.
        path: 'home',
        loadComponent: () =>
          import('./pages/matches/matches.page').then((m) => m.MatchesPage),
      },
      {
        // Legacy — kept until Phase 1 (delete dead pages). Default
        // redirect now points at /home; this route stays only so any
        // bookmarked /player/dashboard URLs still resolve.
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/dashboard/dashboard.page').then(
            (m) => m.DashboardPage
          ),
      },
      {
        // Legacy URL — same content as /home now lives there. Redirect
        // so any bookmarked /matches URL still resolves.
        path: 'matches',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'predictions',
        loadComponent: () =>
          import('./pages/predictions/predictions.page').then(
            (m) => m.PredictionsPage
          ),
      },
      {
        path: 'standings',
        loadComponent: () =>
          import('./pages/standings/standings.page').then(
            (m) => m.StandingsPage
          ),
      },
      {
        path: 'group-standings/:groupId',
        loadComponent: () =>
          import('./pages/group-standings/group-standings.page').then(
            (m) => m.GroupStandingsPage
          ),
      },
      {
        path: 'join-group',
        loadComponent: () =>
          import('./pages/join-group/join-group.page').then(
            (m) => m.JoinGroupPage
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
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
];
