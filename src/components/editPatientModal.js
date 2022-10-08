import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import '../public/css/components/editPatientModal/editPatientModal.scss'

// const style = {
//     top: '50%',
//     width: '60%',
//     left: '50%',
//     boxShadow: 24,
//     position: 'absolute',
//     border: '1px solid #000',
//     transform: 'translate(-50%, -50%)',
//     backgroundColor: 'background.paper',
//     padding: '30px'
//   };

const EditPatientModal = ({patientDetails, openModal, setOpen}) => {

    const handleClose = () => setOpen(false);

    const handleUpdateEvent = () => {
        console.log('update')

        fetch("/patientDetails/id=<id>", {
            method: "PUT",
            headers: {
                "Content-Type" : "application/json"
            },
        });

        handleClose()
    }
    
    return (
        <div>
            <Modal
                open={openModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                
                <Box className="edit-patient-modal">
                    <div className="modal-header">
                        <h3>Edit Patient Details</h3>
                    </div>

                    <div className="modal-content">
                        <div className="patient-profile">
                            <TextField id="first-name-field" label="First Name" placeholder={patientDetails.fname} variant="outlined" />
                            <TextField id="last-name-field" label="Last Name" placeholder={patientDetails.lname} variant="outlined" />
                            <TextField id="contact-number-field" label="Contact Number" placeholder={patientDetails.phone} variant="outlined" />

                            <TextField id="birth-date-field" label="Birthday" placeholder={patientDetails.bday} variant="outlined" />
                            <TextField id="city-field" label="City" placeholder={patientDetails.city} variant="outlined" />
                            <TextField id="zip-code-field" label="Zip Code" placeholder={patientDetails.zip} variant="outlined" />

                            <TextField className="street-address-field" label="Street Address" placeholder={patientDetails.street} variant="outlined" />
                        </div>

                        <div className="patient-notes">
                            <TextField
                                className='patient-notes-field'
                                label="Multiline"
                                multiline
                                rows={5}
                                placeholder={patientDetails.patient_notes}
                            />
                        </div>
                    </div>

                    <div className="modal-actions">
                        <Button 
                            variant='outlined' 
                            size='large' 
                            onClick={() => {
                                handleUpdateEvent()
                            }}
                        >
                            Cancel
                        </Button>
                        <Button 
                            size='large'
                            variant='contained' 
                            onClick={() => {
                                handleUpdateEvent()
                            }}
                        >
                            Save
                        </Button>
                    </div>

                </Box>
                
            </Modal>
        </div>
    );
}
 
export default EditPatientModal;