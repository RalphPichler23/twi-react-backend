// routes/index.ts
import { lazy } from 'react';
import { RouteConfig, RouteGroups } from '@utils/types';

// Protected Routes (benötigen Login)
export const protectedRoutes: RouteConfig[] = [
  {
    path: '/dashboard',
    component: lazy(() => import('')),
    title: 'Dashboard',
    showInNav: true,
  },
  {
    path: '/clients',
    component: lazy(() => import('@/pages/Clients')),
    title: 'Klienten',
    showInNav: true,
  },
  {
    path: '/clients/:id',
    component: lazy(() => import('@/pages/ClientDetail')),
    title: 'Klient Details',
    showInNav: false,
  },
  {
    path: '/appointments',
    component: lazy(() => import('@/pages/Appointments')),
    title: 'Termine',
    showInNav: true,
  },
  {
    path: '/settings',
    component: lazy(() => import('@/pages/Settings')),
    title: 'Einstellungen',
    showInNav: true,
  },
  {
    path: '/settings/profile',
    component: lazy(() => import('@/pages/settings/Profile')),
    title: 'Profil',
    showInNav: false,
  },
];

// Public Routes (kein Login nötig)
export const publicRoutes: RouteConfig[] = [
  {
    path: '/login',
    component: lazy(() => import('@/pages/auth/Login')),
    title: 'Login',
  },
  {
    path: '/signup',
    component: lazy(() => import('@/pages/auth/Signup')),
    title: 'Registrierung',
  },
  {
    path: '/forgot-password',
    component: lazy(() => import('@/pages/auth/ForgotPassword')),
    title: 'Passwort vergessen',
  },
];

const routes: RouteGroups = {
  protected: protectedRoutes,
  public: publicRoutes,
};

export default routes;