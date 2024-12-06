import { Routes } from '@angular/router';

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
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'auth/login',
  },
];
