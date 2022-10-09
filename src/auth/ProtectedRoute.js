import { useContext } from 'react';
import AuthContext from './AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const authUser = useContext(AuthContext)
    
    if (authUser.user.role !== 'admin') {
      return <Navigate to="/error404" replace />;
    }
  
    return children;
  };

export default ProtectedRoute