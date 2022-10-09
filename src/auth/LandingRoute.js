import { useContext } from 'react';
import AuthContext from './AuthContext';
import Dashboard from '../pages/dashboard';

const LandingRoute = ({ children }) => {
    const authUser = useContext(AuthContext)

    if (authUser.user.role === 'user') {
      return <Dashboard/>;
    }
  
    return children;
  };

export default LandingRoute