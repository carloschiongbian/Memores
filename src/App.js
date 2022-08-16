import './public/css/App/App.css';
import HomePage from './homePage';
import PatientRecord from './patientRecord';
import { useState, useEffect } from 'react';
import { Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';

function App() {

  // this state variable accepts an array of objects
  const [data, setData] = useState([{}]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
