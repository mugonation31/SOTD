import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layout/player-layout.page').then((m) => m.PlayerLayoutPage),
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/dashboard/dashboard.page').then(
            (m) => m.DashboardPage
          ),
      },
      {
        path: 'matches',
        loadComponent: () =>
          import('./pages/matches/matches.page').then((m) => m.MatchesPage),
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
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
];
