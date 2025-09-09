import { Routes } from '@angular/router';
import { AuthGuard, NoAuthGuard } from './core/guards/auth.guard';
import { DebugAuthPage } from './debug-auth.page';

export const routes: Routes = [
  {
    path: 'debug-auth',
    component: DebugAuthPage,
  },
  {
    path: 'welcome',
    canActivate: [NoAuthGuard],
    loadChildren: () =>
      import('./platforms/welcome/welcome.routes').then((m) => m.routes),
  },
  {
    path: 'auth',
    canActivate: [NoAuthGuard],
    loadChildren: () =>
      import('./platforms/auth/auth.routes').then((m) => m.routes),
  },
  {
    path: 'player',
    canActivate: [AuthGuard],
    data: { expectedRole: 'player' },
    loadChildren: () =>
      import('./platforms/player/player.routes').then((m) => m.routes),
  },
  {
    path: 'group-admin',
    canActivate: [AuthGuard],
    data: { expectedRole: 'group-admin' },
    loadChildren: () =>
      import('./platforms/group-admin/group-admin.routes').then(
        (m) => m.routes
      ),
  },
  // Super-admin routes - split into public and protected
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
  // Fallback route for any unmatched paths
  { 
    path: '**', 
    redirectTo: 'auth/login' 
  }
];
