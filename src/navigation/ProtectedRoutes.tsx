import { Navigate, Outlet } from 'react-router-dom';
import { useZustand } from '@state';
import LoadingComponent from '@/shared/components/LoadingComponent';

export const ProtectedRoute = () => {
  const { accessToken, isAuthLoading } = useZustand();

  if (isAuthLoading) {
    return (
      <LoadingComponent />
    );
  }

  return accessToken ? <Outlet /> : <Navigate to="/login" replace />;
};