import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./platforms/auth/auth.routes').then((m) => m.routes),
  },
  {
    path: 'welcome',
    loadComponent: () =>
      import('./platforms/welcome/welcome.page').then((m) => m.WelcomePage),
  },
  {
    path: 'join-group',
    loadComponent: () =>
      import('./platforms/join-group/join-group.page').then(
        (m) => m.JoinGroupPage
      ),
  },
  {
    path: 'player',
    loadChildren: () =>
      import('./platforms/player/player.routes').then((m) => m.routes),
  },
  {
    path: 'group-admin',
    loadChildren: () =>
      import('./platforms/group-admin/group-admin.routes').then(
        (m) => m.routes
      ),
  },
  {
    path: 'super-admin',
    loadChildren: () =>
      import('./platforms/super-admin/super-admin.routes').then(
        (m) => m.routes
      ),
  },
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full',
  },
];
