import '../public/css/pages/PatientRecord/patientRecord.css';
import PatientInformation from '../components/patientInformation';
import UserNavigationMenu from '../components/userNavigationMenu';
import { useState, useEffect } from 'react';

import PatientDataTable from '../components/patientDataTable';

const PatientRecord = () => {
    const [data, setData] = useState([]);
    const [pageCount, setPageCount] = useState(0);

    const columns = [
        { field: 'id', headerName: 'Patient ID', width: 200, headerAlign: 'center'},
        {
          field: 'firstName',
          headerName: 'First name',
          width: 200,
          fontSize: 23,
          editable: true,
          headerAlign: 'center',
        },
        {
          field: 'lastName',
          headerName: 'Last name',
          width: 200,
          editable: true,
          headerAlign: 'center',
        },
        {
          field: 'age',
          headerName: 'Age',
          type: 'number',
          width: 150,
          editable: true,
          headerAlign: 'center',
        },
        {
          field: 'actions',
          headerName: 'Actions',
          sortable: false,
          width: 200,
          headerAlign: 'center',
        },
      ];
    const rows = [
        { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
        { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
        { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
        { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
        { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
        { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
        { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    ];

    const sampleNavigationDisplay = (action) => {
        switch (action) {
            case 'Prev':
                if(pageCount > 0){
                    setPageCount(pageCount - 1);
                }
                break;

            case 'Next':
                setPageCount(pageCount + 1);                
                break;

            default:
                break;
        }
    }


    useEffect(() => {
        var test;
        const fetchData = async () => {
            test = await fetch("http://localhost:5000/patientRecord",{
                mode: 'no-cors',
                headers: {
                  'Access-Control-Allow-Origin':'*'
                }
              })
              console.log(test)
            }

        fetchData().catch(console.error)
        // fetch("https://localhost:5000/test").then(
        //     res => res.json()
        // ).then(
        //     data => {
        //         console.log(data)
        //     }
        // )
    }, [])

    return (
        <div className="patient-records-container">

            {/* <div className="patient-records-navbar"> */}
                <UserNavigationMenu />
                {/* <h1>LOGO</h1> */}
            {/* </div> */}

            {/* <Box sx={{ height: 400, width: '100%' }}> */}
                <PatientDataTable 
                    data={rows} 
                    header={columns} 
                />

                {/* <div className="test">
                    data.map(data => (
                        <div className="testtest">
                            <p> {data} </p>
                        </div>
                    ))
                </div> */}
            {/* </Box> */}

            {/* <div className="patient-records-header">
                <div className="patient-search-bar-container">
                    <h2>Manage Patients</h2>

                    <div className="patient-search-bar">
                        <input type="text" name="search-patient" id="search-patient" placeholder="Search a Patient" />
                        <button name="new-patient-button">New Patient</button>
                    </div>
                </div>
            </div>

            <div className="patient-records-modal">
                <div className="patient-classifiers">                    
                    <h3>Patient ID</h3>
                    <h3>Name</h3>
                    <h3>Age</h3>
                    <h3>Screened On</h3>
                    <h3>Actions</h3>
                </div>
                <PatientInformation />
            </div>

            <div className="patient-records-navigation">
                <button onClick={() => sampleNavigationDisplay('Prev')}>Prev</button>
                <div className="patient-records-page-display">
                    { pageCount }
                </div>
                <button onClick={() => sampleNavigationDisplay('Next')}>Next</button>
            </div> */}
        </div>
    );
}
 
export default PatientRecord;