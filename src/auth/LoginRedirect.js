import { useContext } from 'react';
import AuthContext from './AuthContext';
import { Navigate } from 'react-router-dom';
import routes from '../routes/routes';

const LoginRedirect = ({ children }) => {
    const authUser = useContext(AuthContext)

    if (authUser.user.role === 'admin'){
        return <Navigate to={routes.admin.USER_RECORDS} replace />;
    }

    if (authUser.user.role === 'user') {
      return <Navigate to={routes.user.DASHBOARD} replace />;
    }
  
    return children;
  };

export default LoginRedirect