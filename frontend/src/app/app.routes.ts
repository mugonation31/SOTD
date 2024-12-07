import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./platforms/auth/auth.routes').then((m) => m.routes),
  },
  {
    path: 'group-admin',
    loadChildren: () =>
      import('./platforms/group-admin/group-admin.routes').then(
        (m) => m.routes
      ),
    canActivate: [AuthGuard],
    data: { role: 'group-admin' },
  },
  {
    path: 'super-admin',
    loadChildren: () =>
      import('./platforms/super-admin/super-admin.routes').then(
        (m) => m.routes
      ),
    canActivate: [AuthGuard],
    data: { role: 'super-admin' },
  },
  {
    path: 'player',
    loadChildren: () =>
      import('./platforms/player/player.routes').then((m) => m.routes),
    canActivate: [AuthGuard],
    data: { role: 'player' },
  },
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'auth/login',
  },
];
