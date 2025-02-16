import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./pages/login/login.page').then((m) => m.LoginPage),
      },
      {
        path: 'signup',
        loadComponent: () =>
          import('./pages/signup/signup.page').then((m) => m.SignupPage),
      },
      {
        path: 'forgot-password',
        loadComponent: () =>
          import('./pages/forgot-password/forgot-password.page').then(
            (m) => m.ForgotPasswordPage
          ),
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
    ],
  },
];
