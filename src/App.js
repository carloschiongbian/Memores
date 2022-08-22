import HomePage from './pages/homePage';
import PatientRecord from './pages/patientRecord';
import PatientDetails from './pages/patientDetails';
import { useState, useEffect } from 'react';
import { Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';

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
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
