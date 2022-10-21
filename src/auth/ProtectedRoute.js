import { useContext } from 'react';
import AuthContext from './AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, isLoading }) => {
    const authUser = useContext(AuthContext)
    
    if (authUser.user.role !== 'admin' && isLoading === true) {
      return <Navigate to="/error-404" replace />;
    }
  
    return children;
  };

export default ProtectedRoute