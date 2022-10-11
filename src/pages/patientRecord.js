import '../public/css/pages/PatientRecord/patientRecord.scss';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

import PatientDataTable from '../components/patientDataTable';
import Layout from '../components/Layout';

const recordActions = {
    EDIT: 'EDIT',
    DELETE: 'DELETE'
}

const PatientRecord = () => {

    const navigate = useNavigate()
    const [getRecord, setGetRecord] = useState({});
    const [patientRecords, setPatientRecords] = useState([]);


    const columns = [
        { field: 'id', headerName: 'Patient ID', width: 150, headerAlign: 'center' },
        {
            field: 'firstName',
            headerName: 'First name',
            width: 250,
            fontSize: 93,
            headerAlign: 'center',
        },
        {
            field: 'lastName',
            headerName: 'Last name',
            width: 240,
            editable: true,
            headerAlign: 'center',
        },
        {
            field: 'age',
            headerName: 'Age',
            type: 'number',
            width: 150,
            headerAlign: 'center',
        },
        {
            field: 'screened_by',
            headerName: 'Screened By',            
            width: 250,
            editable: true,
            headerAlign: 'center',
        },
        {
            field: 'actions',
            headerName: 'Actions',
            sortable: false,
            width: 250,
            headerAlign: 'center',
            renderCell: (cellData) => {
                return (
                    <>
                        <button style={{ width: '100%' }} onClick={() => handleRecordAction(cellData.row, recordActions.EDIT)}>View</button>
                        <button style={{ width: '100%' }} onClick={() => handleRecordAction(cellData.row, recordActions.DELETE)}>Delete</button>
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
                screened_by: data.screened_by,
                action: DeleteIcon
            }
            setPatientRecords(patientRecords => [...patientRecords, patientRecord])
        });
    }

    const retrieveRecords = () => {
        fetch('/patient-records', {
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
    }

    const handlePatientFilter = () => {

        let value = document.getElementById('search-patient').value
        
        if(value.trim().length !== 0){
            let newArr = patientRecords.filter((record) => record.firstName.includes(value) || record.lastName.includes(value))
            console.log(newArr)
            setPatientRecords(newArr)
        } else {
            retrieveRecords()
        }
        
        
    }

    const handleModalEvent = () => {
        let display = document.getElementById('modal-container').style.display;
        document.getElementById('modal-container').style.display = (display === "none") ? "block" : "none";
    }

    const handleRecordAction = (data, action) => {
        switch (action) {
            case recordActions.EDIT:
                navigate('/patient-details/id=' + data.id)
                break;

            case recordActions.DELETE:
                handleModalEvent()
                setGetRecord(data)
                break;

            default:
                break;
        }
    }

    useEffect(() => {
        fetch('/patient-records', {
            methods: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
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
        <Layout>

            <div className="patient-records-container">
                <div className="data-table-search-bar">
                    <Button component={Link} to="/createPatient" variant="contained" color="success">
                        Create New Patient
                    </Button>

                    <div className="patient-search-bar">
                        <input type="text" id='search-patient' placeholder='Search for a Patient' onChange={() => handlePatientFilter()} />
                    </div>
                </div>
                
                <div className="data-table-container">
                    <div className="data-table">
                        <PatientDataTable
                            data={patientRecords}
                            header={columns}
                        />
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default PatientRecord;