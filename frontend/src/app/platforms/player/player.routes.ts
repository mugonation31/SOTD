import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layout/player-layout.page').then((m) => m.PlayerLayoutPage),
    children: [
      {
        // /player/home is the merged landing — leaderboard preview at top,
        // then the prediction surface (matches list with score inputs +
        // submit) inline below. Loads matches.page because the merged
        // content lives there now.
        path: 'home',
        loadComponent: () =>
          import('./pages/matches/matches.page').then((m) => m.MatchesPage),
      },
      {
        // Legacy URLs — redirected to /home so any bookmarked links still
        // resolve. The corresponding page directories are deleted in
        // Phase 1 of mvp-cut. Removing these redirects too would 404
        // anyone with a stale link, so they stay.
        path: 'matches',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'group-standings/:groupId',
        redirectTo: 'standings',
        pathMatch: 'full',
      },
      {
        path: 'groups',
        redirectTo: 'standings',
        pathMatch: 'full',
      },
      {
        path: 'predictions',
        loadComponent: () =>
          import('./pages/predictions/predictions.page').then(
            (m) => m.PredictionsPage,
          ),
      },
      {
        path: 'standings',
        loadComponent: () =>
          import('./pages/standings/standings.page').then(
            (m) => m.StandingsPage,
          ),
      },
      {
        // First-login flow routes new players here. Kept intentionally —
        // see mvp-cut.md notes on why we don't collapse it into an
        // empty-state on /home.
        path: 'join-group',
        loadComponent: () =>
          import('./pages/join-group/join-group.page').then(
            (m) => m.JoinGroupPage,
          ),
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
