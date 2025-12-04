import { useEffect, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { initializeAuth } from '@lib/supabaseAuth';
import { ProtectedRoute } from '@navigation/ProtectedRoutes';
import MainLayout from '@layouts/MainLayout';
import { useZustand } from '@state';
import routes from '@routes';
import LoadingComponent from '@/shared/components/LoadingComponent';

const AppRouter = () => {
  const { isAuthLoading } = useZustand();

  useEffect(() => {
    initializeAuth();
  }, []);

  if (isAuthLoading) {
    return (
      <LoadingComponent />
    );
  }

  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingComponent />}>
        <Routes>
          {/* Public Routes */}
          {routes.public.map((route: any) => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.component />}
            />
          ))}

          {/* Protected Routes mit Layout */}
          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
              {routes.protected.map((route: any) => (
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