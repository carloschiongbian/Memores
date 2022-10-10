import HomePage from './pages/homePage';
import PatientRecord from './pages/patientRecord';
import PatientDetails from './pages/patientDetails';
import UserRecord from './pages/userRecord';
import CreateUser from './pages/createUser';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import ScreeningPage from './pages/screeningPage';
import UserPage from './pages/userPage';
import { useState, useEffect } from 'react'
import Error404 from './pages/error404';
import AuthContext from './auth/AuthContext';
import ProtectedRoute from './auth/ProtectedRoute';
import UserRoute from './auth/UserRoute';
import LandingRoute from './auth/LandingRoute';
import { Api } from './services/api';
import Dashboard from './pages/dashboard';

import routes from './routes/routes';



const App = () => {
  // I HAD TO ADD THIS, REMOVE LANG NYA
  const [user, setUser] = useState({
    "role": "user"
  })

  // useEffect(()=>{
  //  const getUser = async ()=>{
  //   try{
  //     const response = await Api().get("/@me")
  //     setUser(response.data)
  //   } catch(error){
  //     console.log(error)
  //   }
  //  }
  //  getUser()
  // },[])

  // if(!user) {
  //   return  <div className="App wrapper"><HomePage setUser={setUser} /></div>
  // }

  return (
    /** 
     *      NOTICE IN THE ELEMENT, THERE ARE NO ProtectedRoute, UserRoute, LandingRoute,
     *        ADD LANG NYA WHEN YOU CONTINUE REDO THE AUTHENTICATION
     *
     */
    <AuthContext.Provider value={{ user, setUser }}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path={routes.shared.INDEX} element={<HomePage />} />
            <Route path={routes.shared.ERROR_404} element={<Error404 />} />

            <Route path={routes.user.SCREENING} element={<ScreeningPage />} />
            <Route path={routes.user.DASHBOARD} element={<Dashboard />} />
            <Route path={routes.user.PATIENT_RECORDS} element={<PatientRecord />} />
            <Route path={routes.user.PATIENT_DETAILS} element={<PatientDetails />} />

            <Route path={routes.admin.USER_RECORDS} element={<UserRecord />} />
            <Route path={routes.admin.USER_DETAILS} element={<UserPage />} />
            <Route path={routes.admin.CREATE_USER} element={<CreateUser />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
