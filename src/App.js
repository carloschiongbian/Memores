import HomePage from './pages/homePage';
import PatientRecord from './pages/patientRecord';
import PatientDetails from './pages/patientDetails';
import Dashboard from './pages/dashboard';
import UserRecord from './pages/userRecord';
import { useState } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import ScreeningPage from './pages/screeningPage';

function App() {

  // this state variable accepts an array of objects
  const [data, setData] = useState([{}]);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   fetch("/members").then(
  //     res => res.json()
  //   ).then(
  //     data => {
  //       setData(data)
  //     }
  //   )
  // })

  return (
    <div className="App"> 

      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <HomePage /> } />
          <Route path="/patientRecord" element={ <PatientRecord /> } />
          <Route path="/patientDetails" element={ <PatientDetails /> } />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/userRecord" element={ <UserRecord/> } />
          <Route path="/screening" element={ <ScreeningPage/> } />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
