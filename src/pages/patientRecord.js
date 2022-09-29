import '../public/css/pages/PatientRecord/patientRecord.scss';
import PatientInformation from '../components/patientInformation';
import DeleteIcon from '@mui/icons-material/Delete';
import UserNavigationMenu from '../components/userNavigationMenu';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

import PatientDataTable from '../components/patientDataTable';

//sql query for inserting data
//INSERT INTO `patients`(`id`, `fname`, `lname`, `age`, `email`, `phone`, `bday`, `gender`, `street`, `city`, `country`, `zip`, `created_at`, `updated_at`) VALUES ('','Robin','Hood','25','robinhood@mail.com','09170910917','May 23, 1994','Male','Cameolot','Camelot','Camelot','0000','','')
//INSERT INTO `patients`(`id`, `fname`, `lname`, `age`, `email`, `phone`, `bday`, `gender`, `street`, `city`, `country`, `zip`, `created_at`, `updated_at`) VALUES ('','Tony','Stark','40','tonystark@mail.com','09170912567','April 14, 1994','Male','8th Street','Avenger's Tower','USA','0000','','')
//INSERT INTO `patients`(`id`, `fname`, `lname`, `age`, `email`, `phone`, `bday`, `gender`, `street`, `city`, `country`, `zip`, `created_at`, `updated_at`) VALUES ('','Peter','Parker','18','peterparker@mail.com','09172910917','March 13, 1994','Male','34th and 50th','Queens','USA','0000','','')
//INSERT INTO `patients`(`id`, `fname`, `lname`, `age`, `email`, `phone`, `bday`, `gender`, `street`, `city`, `country`, `zip`, `created_at`, `updated_at`) VALUES ('','Sara','Simsom','29','sarasimsom@mail.com','09170918927','January 17, 1994','Female','Loal's','New Jersey','USA','0000','','')
//INSERT INTO `patients`(`id`, `fname`, `lname`, `age`, `email`, `phone`, `bday`, `gender`, `street`, `city`, `country`, `zip`, `created_at`, `updated_at`) VALUES ('','Jim','Carrey','52','jimcarrey@mail.com','09170910999','June 01, 1994','Male','Highway','Los Angeles','USA','0000','','')
//INSERT INTO `patients`(`id`, `fname`, `lname`, `age`, `email`, `phone`, `bday`, `gender`, `street`, `city`, `country`, `zip`, `created_at`, `updated_at`) VALUES ('','Ethan','Hunt','39','ethanhunt@mail.com','09170938265','July 03, 1994','Male','Banilad','Cebu City','Philippines','0000','','')

const recordActions = {
    EDIT: 'EDIT',
    DELETE: 'DELETE'
}

const PatientRecord = () => {
    
    const navigate = useNavigate()
    const [getRecord, setGetRecord] = useState({});
    const [patientRecords, setPatientRecords] = useState([]);
    const [patientRecordsArray, setPatientRecordsArray] = useState([]);

    const columns = [
        { field: 'id', headerName: 'Patient ID', width: 250, headerAlign: 'center'},
        {
            field: 'firstName',
            headerName: 'First name',
            width: 300,
            fontSize: 23,          
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
            headerAlign: 'center',
        },
        {
            field: 'actions',
            headerName: 'Actions',
            sortable: false,
            width: 300,
            headerAlign: 'center',
            renderCell: (cellData) => {
                return(
                    <>
                        <button style={{width: '100%'}} onClick={() => handleRecordAction(cellData.row, recordActions.EDIT)}>Edit</button>
                        <button style={{width: '100%'}} onClick={() => handleRecordAction(cellData.row, recordActions.DELETE)}>Delete</button>
                    </>
                );
            }
        }
    ];

    const updatePatientRecords = (data) => {    
        data.forEach(data => {
            let patientRecord = {
                id: data.id,
                firstName: data.fname,
                lastName: data.lname,
                age: data.age,
                action: DeleteIcon
            }
            setPatientRecords(patientRecords => [...patientRecords, patientRecord])
            setPatientRecordsArray(patientRecordsArray => [...patientRecordsArray, data])
        });
    }

    const handleModalEvent = () => {
        let display = document.getElementById('modal-container').style.display;
        document.getElementById('modal-container').style.display=(display === "none") ? "block" : "none";
    }

    const handleRecordAction = (data, action) => {
        switch (action) {
            case recordActions.EDIT:
                setGetRecord(data)
                navigate('/patientDetails/id=' + data.id)
                break;
        
            case recordActions.DELETE:
                setGetRecord(data)
                handleModalEvent()
                break;

            default:
                break;
        }
    }

    useEffect(() => {
        fetch('/patientRecord', {
            methods: 'GET',
            headers: {
                'Access-Control-Allow-Origin':'*',
                'Content-Type': 'application/json'
            }
        }).then((response) =>
            response.json()
        ).then((response) =>
            updatePatientRecords(response)
        ).catch((error) => 
            console.log(error)
        )
    }, [])

    return (
        <div className="patient-records-container">

            {/* <div className="patient-records-navbar"> */}
            <UserNavigationMenu />
                <Button component={Link} to="/createPatient" variant="contained" color="success">
                    Create New Patient
                </Button>
                {/* <h1>LOGO</h1> */}
            {/* </div> */}

            {/* <Box sx={{ height: 400, width: '100%' }}> */}
            <div className="data-table-container" style={{paddingInline: '5%', backgroundImage: 'linear-gradient(to right,#8860D0, #A79BFF)'}}>
                <div className="data-table">
                    <PatientDataTable 
                        data={patientRecords} 
                        header={columns}
                    />
                </div>
            </div>


            <div id="modal-container">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="delete-record-modal">
                        <div className="modal-header">
                            <h4>Delete Record</h4>
                        </div>

                        <div className="modal-content">
                            <h4>
                                Are you sure that you want to delete this record? Once deleted,
                                it can't be recovered.
                            </h4>
                        </div>

                        <div className="modal-actions">
                            <a href={"/patientRecord/id=" + getRecord.id}  id="delete">Delete</a>
                            {/* <a href="/patientRecord" id="cancel">Cancel</a> */}
                            {/* <button type='button' id="delete">Delete</button> */}
                            <button id="cancel" onClick={() => handleModalEvent()}>Cancel</button>
                        </div>
                    </div>
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