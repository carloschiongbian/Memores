import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Modal, Button  } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import MaterialReactTable from 'material-react-table';
import FindInPageIcon from '@mui/icons-material/FindInPage';

import Layout from '../components/Layout';
import '../public/css/pages/PatientRecord/patientRecord.scss';
// import PatientDataTable from '../components/patientDataTable';
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
        { accessorKey: 'id', header: 'Patient ID'},
        {
            accessorKey: 'firstName',
            header: 'First name',
        },
        {
            accessorKey: 'lastName',
            header: 'Last name',
        },
        {
            accessorKey: 'age',
            header: 'Age',
        },
        {
            accessorKey: 'screened_by',
            header: 'Screened By',            
        },
        {
            accessorKey: 'actions',
            header: 'Actions',
            enableSorting: false,
            enableColumnFilter: false,
            enableColumnActions: false,
            Cell: (cell) => {
                return (
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4rem',
                        }}
                    >
                        <FindInPageIcon style={{color: '#8860D0'}} onClick={() => handleRecordAction(cell.row, recordActions.EDIT)} />
                        <DeleteIcon style={{color: 'red'}} onClick={() => handleRecordAction(cell.row, recordActions.DELETE)} />
                    </Box>
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

    // const retrieveRecords = () => {
    //     fetch('/patient-records', {
    //         methods: 'GET',
    //         headers: {
    //             'Access-Control-Allow-Origin':'*',
    //             'Content-Type': 'application/json'
    //         }
    //     }).then((response) =>
    //         response.json()
    //     ).then((response) =>
    //         updatePatientRecords(response)
    //     ).catch((error) => 
    //         console.log(error)
    //     )
    // }

    // const handlePatientFilter = () => {

    //     let value = document.getElementById('search-patient').value
        
    //     if(value.trim().length !== 0){
    //         let newArr = patientRecords.filter((record) => record.firstName.includes(value) || record.lastName.includes(value))
    //         console.log(newArr)
    //         setPatientRecords(newArr)
    //     } else {
    //         retrieveRecords()
    //     }
        
        
    // }

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
            console.log(response)
            // updatePatientRecords(response)
        ).catch((error) =>
            console.log(error)
        )
    }, [])

    return (
        <Layout>

            <div className="patient-records-container">
                <div className="data-table-container">
                    <div className="data-table">
                        <MaterialReactTable
                            columns={columns}
                            data={patientRecords}
                            enableDensityToggle={false}
                            renderTopToolbarCustomActions={() => (
                                <Button
                                  variant="contained"
                                  color="primary"
                                  size="large"
                                  onClick={() => navigate('/createPatient')}
                                >
                                  Create New Patient
                                </Button>
                            )}
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