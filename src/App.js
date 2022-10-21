import HomePage from './pages/homePage';
import PatientRecord from './pages/patientRecord';
import PatientDetails from './pages/patientDetails';
import UserRecord from './pages/userRecord';
// import CreateUser from './pages/createUser';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import ScreeningPage from './pages/screeningPage';
import UserPage from './pages/userPage';
import { useState, useEffect } from 'react'
import Error404 from './pages/error404';
import AuthContext from './auth/AuthContext';
import ProtectedRoute from './auth/ProtectedRoute';
import UserRoute from './auth/UserRoute';
import LoginRedirect from './auth/LoginRedirect';
import Api, { BaseApi }  from './services/api';
import Dashboard from './pages/dashboard';
import routes from './routes/routes';



const App = () => {
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
   const getUser = async ()=>{
    try{
      const response = await BaseApi.get("/@me")
      setUser(response.data)
      setLoading(true)
    } catch(error){
      console.log(error)
    }
   }
   getUser()
  },[])

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
            <Route path={routes.shared.INDEX} element={<LoginRedirect><HomePage/></LoginRedirect>} />
            <Route path={routes.shared.ERROR_404} element={<Error404 />} />

            <Route path={routes.user.SCREENING} element={<UserRoute><ScreeningPage /></UserRoute>} />
            <Route path={routes.user.DASHBOARD} element={<UserRoute><Dashboard /></UserRoute>} />
            <Route path={routes.user.PATIENT_RECORDS} element={<UserRoute><PatientRecord /></UserRoute>} />
            <Route path={routes.user.PATIENT_DETAILS} element={<UserRoute><PatientDetails /></UserRoute>} />

            <Route path={routes.admin.USER_RECORDS} element={<ProtectedRoute isLoading={loading}><UserRecord /></ProtectedRoute>} />
            <Route path={routes.admin.USER_DETAILS} element={<ProtectedRoute><UserPage /></ProtectedRoute>} />
            {/* <Route path={routes.admin.CREATE_USER} element={<ProtectedRoute><CreateUser /></ProtectedRoute>} /> */}
          </Routes>
        </BrowserRouter>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
