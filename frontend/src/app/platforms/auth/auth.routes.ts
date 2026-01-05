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
        path: 'reset-password',
        loadComponent: () =>
          import('./pages/reset-password/reset-password.page').then(
            (m) => m.ResetPasswordPage
          ),
      },
      {
        path: 'email-confirmed',
        loadComponent: () => import('./pages/email-confirmed/email-confirmed.page').then( m => m.EmailConfirmedPage)
      },
      {
        path: 'terms',
        loadComponent: () =>
          import('./pages/terms/terms.page').then((m) => m.TermsPage),
      },
      {
        path: 'privacy',
        loadComponent: () =>
          import('./pages/privacy/privacy.page').then((m) => m.PrivacyPage),
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
    ],
  },
];
