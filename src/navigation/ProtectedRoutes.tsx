// components/auth/ProtectedRoute.tsx
import { Navigate, Outlet } from 'react-router-dom';
import { useStore } from '@state';

export const ProtectedRoute = () => {
  const { accessToken, isAuthLoading } = useStore();

  if (isAuthLoading) {
    return (
      <div className="loading-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return accessToken ? <Outlet /> : <Navigate to="/login" replace />;
};