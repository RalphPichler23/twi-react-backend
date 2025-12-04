// routes/index.ts
import { lazy } from 'react';
import type { RouteConfig, RouteGroups } from '@utils/types';

// Protected Routes (benötigen Login)
export const protectedRoutes: RouteConfig[] = [
  {
    path: '/dashboard',
    component: lazy(() => import('@modules/Dashboard/pages/Dashboard')),
    title: 'Dashboard',
    showInNav: true,
  },
  {
    path: '/properties',
    component: lazy(() => import('@/modules/Properties/Overview/Overview')),
    title: 'Immobilien',
    showInNav: true,
  },
  {
    path: '/properties/:id',
    component: lazy(() => import('@/modules/Properties/Details/pages/PropertyDetails')),
    title: 'Immobilien',
    showInNav: false,
  },
  {
    path: '/properties/:id/edit',
    component: lazy(() => import('@/modules/Properties/Details/pages/PropertyEdit')),
    title: 'Immobilien',
    showInNav: false,
  },
];

// Public Routes (kein Login nötig)
export const publicRoutes: RouteConfig[] = [
  {
    path: '/login',
    component: lazy(() => import('@modules/Login/pages/Login')),
    title: 'Login',
  },
];

const routes: RouteGroups = {
  protected: protectedRoutes,
  public: publicRoutes,
};

export default routes;