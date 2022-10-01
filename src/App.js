import HomePage from './pages/homePage';
import PatientRecord from './pages/patientRecord';
import PatientDetails from './pages/patientDetails';
import Dashboard from './pages/dashboard';
import UserRecord from './pages/userRecord';
import CreateUser from './pages/createUser';
import { useState } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import ScreeningPage from './pages/screeningPage';
import UserPage from './pages/userPage';
import Footer from './components/footer';

const App = () => {
  return (
    <>
      <div className="App wrapper">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/patientRecord" element={<PatientRecord />} />
            <Route path="/patientDetails/id=:id" element={<PatientDetails />} />
            {/* <Route path="/patientRecord/delete/:id" element={<PatientRecord />} /> */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/userRecord" element={<UserRecord />} />
            <Route path="/userRecord/user/:id" element={<UserPage></UserPage>} />
            <Route path="/screening" element={<ScreeningPage />} />
            <Route path="/userRecord" element={<UserRecord />} />
            <Route path="/createUser" element={<CreateUser />} />
          </Routes>
        </BrowserRouter>
      </div>
      <Footer></Footer>
    </>
  );
}

export default App;
