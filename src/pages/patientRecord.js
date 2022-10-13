import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import FindInPageIcon from '@mui/icons-material/FindInPage';

import Layout from '../components/Layout';
import '../public/css/pages/PatientRecord/patientRecord.scss';
import PatientDataTable from '../components/patientDataTable';
import '../public/css/components/PatientManagementModal/Modal.scss'

const recordActions = {
    EDIT: 'EDIT',
    DELETE: 'DELETE'
}

const PatientRecord = () => {

    const navigate = useNavigate()
    const [getRecord, setGetRecord] = useState({});
    const [openModal, setOpenModal] = useState(false)
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
                        <FindInPageIcon style={{width: '50%', color: '#8860D0'}} onClick={() => handleRecordAction(cellData.row, recordActions.EDIT)} />
                        <DeleteIcon style={{width: '50%', color: 'red'}} onClick={() => handleRecordAction(cellData.row, recordActions.DELETE)} />
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

    const handleRecordAction = (data, action) => {
        switch (action) {
            case recordActions.EDIT:
                navigate('/patient-details/id=' + data.id)
                break;

            case recordActions.DELETE:
                setOpenModal(true)
                setGetRecord(data)
                break;

            default:
                break;
        }
    }

    const handleDelete = () => {       

        fetch('/patient-records/delete/id='+getRecord.id, {
            method: 'DELETE'
        })

        const newArr = patientRecords.filter(record => record.id !== getRecord.id)
        setPatientRecords(newArr)
        setOpenModal(false)
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

                        <Modal
                            open={openModal}                            
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box className='modal-container-delete-modal'>
                                <div className="modal-header-delete-modal">
                                    <h3>Delete Record</h3>
                                </div>

                                <div className="modal-content-delete-modal">
                                    <h4>
                                        Once you delete this record, it cannot be recovered. Would
                                        you like to proceed?
                                    </h4>
                                </div>

                                <div className="modal-actions">
                                    <Button 
                                        variant='contained' 
                                        size='large' 
                                        onClick={() => {
                                            setOpenModal(false)
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                    <Button 
                                        type="submit"
                                        size='large'
                                        color='warning'
                                        variant='contained' 
                                        onClick={() => {
                                            handleDelete()
                                        }}
                                        >
                                        Delete
                                    </Button>
                                </div>
                            </Box>
                        </Modal>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default PatientRecord;