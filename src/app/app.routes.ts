import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'welcome',
    loadChildren: () =>
      import('./platforms/welcome/welcome.routes').then((m) => m.routes),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./platforms/auth/auth.routes').then((m) => m.routes),
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
