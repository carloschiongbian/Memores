import { useContext } from 'react';
import AuthContext from './AuthContext';
import { Navigate } from 'react-router-dom';
const LandingRoute = ({ children }) => {
    const authUser = useContext(AuthContext)

    if (authUser.user.role === 'user') {
      return <Navigate to="/dashboard" replace />;
    }
  
    return children;
  };

export default LandingRoute