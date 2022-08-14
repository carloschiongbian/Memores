import './App.css';
import {useState, useEffect} from 'react';

function App() {

  // this state variable accepts an array of objects
  const [data, setData] = useState([{}]);

  useEffect(() => {
    fetch("/members").then(
      res => res.json()
    ).then(
      data => {
        setData(data)
      }
    )
  })

  return (
    <div className="App">
      {
        data.members.map((member, index) => (
          <h1 key={index}> {member} </h1>
        ))
      }
    </div>
  );
}

export default App;
