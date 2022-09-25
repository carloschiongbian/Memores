import '../public/css/pages/PatientRecord/patientRecord.css';
import PatientInformation from '../components/patientInformation';
import UserNavigationMenu from '../components/userNavigationMenu';
import { useState, useEffect } from 'react';

import PatientDataTable from '../components/patientDataTable';

const PatientRecord = () => {
    const [patientRecords, setPatientRecords] = useState([]);
    const [pageCount, setPageCount] = useState(0);

    const columns = [
        { field: 'id', headerName: 'Patient ID', width: 250, headerAlign: 'center'},
        {
          field: 'firstName',
          headerName: 'First name',
          width: 300,
          fontSize: 23,
          editable: true,
          headerAlign: 'center',
        },
        {
          field: 'lastName',
          headerName: 'Last name',
          width: 300,
          editable: true,
          headerAlign: 'center',
        },
        {
          field: 'age',
          headerName: 'Age',
          type: 'number',
          width: 231,
          editable: true,
          headerAlign: 'center',
        },
        {
          field: 'actions',
          headerName: 'Actions',
          sortable: false,
          width: 300,
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

    //sql query for inserting data
    //INSERT INTO `patients`(`id`, `fname`, `lname`, `age`, `email`, `phone`, `bday`, `gender`, `street`, `city`, `country`, `zip`, `created_at`, `updated_at`) VALUES ('','Robin','Hood','25','robinhood@mail.com','09170910917','May 13, 1994','Male','Cameolot','Camelot','Camelot','0000','','')

    const updatePatientRecords = (data) => {    
        data.forEach(data => {
            let patientRecord = {
                id: data.id,
                firstName: data.fname,
               lastName: data.lname,
                age: data.age
            }
            setPatientRecords(patientRecords => [...patientRecords, patientRecord])
        });
    }

    useEffect(() => {
        fetch('/patientRecord', {
            methods: 'GET',
            headers: {
                'Access-Control-Allow-Origin':'*',
                "Content-Type": "application/json"
            }
        }).then((response) =>
            response.json()
        ).then((response) =>
            // console.log(response[0])
            // objVariable = response[0]
            // objVariable.id = response[0].id
            // response[0]
            // setPatientRecords([...patientRecords, response[0]])
            updatePatientRecords(response)
        ).catch((error) => 
            console.log(error)
        )
    },[])

    return (
        <div className="patient-records-container">

            {/* <div className="patient-records-navbar"> */}
                <UserNavigationMenu />
                {/* <h1>LOGO</h1> */}
            {/* </div> */}

            {/* <Box sx={{ height: 400, width: '100%' }}> */}
            <div className="test" style={{paddingInline: '5%', backgroundImage: 'linear-gradient(to right,#8860D0, #A79BFF)'}}>
            <div className="data-table">
                <PatientDataTable 
                    data={patientRecords} 
                    header={columns} 
                />
            </div>
            </div>

                {/* <div className="test" style={{backgroundColor: 'white', height: '200px', width: '100px'}}>
                    {patientRecords.map(data => (
                        <p>{data.fname}</p>
                    ))}
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