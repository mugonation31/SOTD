import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'signup',
    loadComponent: () =>
      import('./pages/signup/signup.page').then((m) => m.SignupPage),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'signin',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'forgot-password',
    loadComponent: () =>
      import('./pages/forgot-password/forgot-password.page').then(
        (m) => m.ForgotPasswordPage
      ),
  },
  {
    path: 'otp',
    loadComponent: () => import('./pages/otp/otp.page').then((m) => m.OtpPage),
  },
];
