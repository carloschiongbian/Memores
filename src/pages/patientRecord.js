import '../public/css/pages/PatientRecord/patientRecord.scss';
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
    

    const columns = [
        { field: 'id', headerName: 'Patient ID', width: 250, headerAlign: 'center'},
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
            width: 250,
            editable: true,
            headerAlign: 'center',
        },
        {
            field: 'age',
            headerName: 'Age',
            type: 'number',
            width: 200,
            headerAlign: 'center',
        },
        {
            field: 'actions',
            headerName: 'Actions',
            sortable: false,
            width: 304,
            headerAlign: 'center',
            renderCell: (cellData) => {
                return(
                    <>
                        <button style={{width: '100%'}} onClick={() => handleRecordAction(cellData.row, recordActions.EDIT)}>View</button>
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
        });
    }

    const handleModalEvent = () => {
        let display = document.getElementById('modal-container').style.display;
        document.getElementById('modal-container').style.display=(display === "none") ? "block" : "none";
    }

    const handleRecordAction = (data, action) => {
        switch (action) {
            case recordActions.EDIT:
                navigate('/patientDetails/id=' + data.id)
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
                            <button id="delete">Delete</button>    
                            {/* <a href={"/patientRecord/delete=" + getRecord.id}  id="delete">Delete</a> */}
                            <button id="cancel" onClick={() => handleModalEvent()}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div> 
        </div>
    );
}
 
export default PatientRecord;