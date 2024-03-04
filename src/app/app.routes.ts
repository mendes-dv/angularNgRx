import { Route, Routes } from '@angular/router';

export const routes: Route[] = [
  {
    path: 'register',
    loadChildren: () =>
      import('./auth/auth.routes').then((m) => m.registerRoutes)
  }
];
