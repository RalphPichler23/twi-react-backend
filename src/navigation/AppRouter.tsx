// AppRouter.tsx
import { useEffect, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useStore } from '@state';
import { initializeAuth } from '@lib/supabaseAuth';
import { ProtectedRoute } from '@components/auth/ProtectedRoute';
import MainLayout from '@components/layout/MainLayout';
import routes from '@routes';

const AppRouter = () => {
  const { isAuthLoading } = useStore();

  useEffect(() => {
    initializeAuth();
  }, []);

  if (isAuthLoading) {
    return (
      <div className="app-loading">
        <p>Loading App...</p>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading page...</div>}>
        <Routes>
          {/* Public Routes */}
          {routes.public.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.component />}
            />
          ))}

          {/* Protected Routes mit Layout */}
          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
              {routes.protected.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={<route.component />}
                />
              ))}
            </Route>
          </Route>

          {/* Redirects */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRouter;