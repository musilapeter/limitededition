import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../app/store/authStore';

export const RequireAuth = ({ children, adminOnly = false }) => {
  const location = useLocation();
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
};
