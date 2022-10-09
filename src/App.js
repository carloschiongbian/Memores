import HomePage from './pages/homePage';
import PatientRecord from './pages/patientRecord';
import PatientDetails from './pages/patientDetails';
import UserRecord from './pages/userRecord';
import CreateUser from './pages/createUser';
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import ScreeningPage from './pages/screeningPage';
import UserPage from './pages/userPage';
import Footer from './components/footer';
import { useState } from 'react'
import Error404 from './pages/error404';
import AuthContext from './auth/AuthContext';
import ProtectedRoute from './auth/ProtectedRoute';
import UserRoute from './auth/UserRoute';
import LandingRoute from './auth/LandingRoute';

const App = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  if(!user) {
    return  <div className="App wrapper"><HomePage setUser={setUser} /></div>
  }

  return (
    <AuthContext.Provider value={{user, setUser}}>
      <div className="App wrapper">
        <BrowserRouter>
          <Routes>
            <Route 
              exact
              path="/" 
              element={<LandingRoute><UserRecord/></LandingRoute>}
            />
            <Route path="/patientRecord" element={<UserRoute><PatientRecord/></UserRoute>} />
            <Route path="/patientDetails" element={<UserRoute><PatientDetails/></UserRoute>} />
            <Route path="/userRecord/user/:id" element={<UserRoute><UserPage/></UserRoute>} />
            <Route path="/screening" element={<UserRoute><ScreeningPage/></UserRoute>} />
            <Route path="/createUser" element={<ProtectedRoute><CreateUser/></ProtectedRoute>} />
            <Route path="/error404" element={<Error404/>}/>
          </Routes>
        </BrowserRouter>
      </div>
      <Footer></Footer>
    </AuthContext.Provider>
  );
}

export default App;
