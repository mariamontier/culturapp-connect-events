
import { ReactNode, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { UserType } from '@/types';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredUserType?: UserType | null; // null means any authenticated user can access
}

const ProtectedRoute = ({ children, requiredUserType = null }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();
  
  useEffect(() => {
    if (!isAuthenticated) {
      console.log('User not authenticated, redirecting to login');
    } else if (requiredUserType && user?.userType !== requiredUserType) {
      console.log(`User type ${user?.userType} not authorized to access this route, requires ${requiredUserType}`);
    }
  }, [isAuthenticated, user, requiredUserType]);

  if (!isAuthenticated) {
    // Redirect to login and remember the page they were trying to access
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }
  
  // If a specific user type is required, check it
  if (requiredUserType && user?.userType !== requiredUserType) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
