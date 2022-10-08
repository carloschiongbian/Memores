import HomePage from './pages/homePage';
import PatientRecord from './pages/patientRecord';
import PatientDetails from './pages/patientDetails';
import Dashboard from './pages/dashboard';
import UserRecord from './pages/userRecord';
import CreateUser from './pages/createUser';
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import ScreeningPage from './pages/screeningPage';
import UserPage from './pages/userPage';
import Footer from './components/footer';
import { useState } from 'react'
import Error404 from './pages/error404';
import AuthContext from './auth/AuthContext';

const App = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  
  console.log(user)

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
              element={user!== null && user.role === 'admin'? <UserRecord/>:<Dashboard/>}
            />
            <Route path="/patientRecord" element={user!== null && user.role === 'user'? <PatientRecord/>:<Navigate to="/error404" replace />} />
            <Route path="/patientDetails" element={user!== null && user.role === 'user'? <PatientDetails/>:<Navigate to="/error404" replace />} />
            <Route path="/userRecord/user/:id" element={user!== null && user.role === 'admin'? <UserPage/>:<Navigate to="/error404" replace />} />
            <Route path="/screening" element={user!== null && user.role === 'user'? <ScreeningPage/>:<Navigate to="/error404" replace />} />
            <Route path="/createUser" element={user!== null && user.role === 'admin'? <CreateUser/>:<Navigate to="/error404" replace />} />
            <Route path="/error404" element={<Error404/>}/>
          </Routes>
        </BrowserRouter>
      </div>
      <Footer></Footer>
    </AuthContext.Provider>
  );
}

export default App;
