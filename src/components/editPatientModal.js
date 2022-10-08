import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import '../public/css/components/editPatientModal/editPatientModal.scss'

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
                            <TextField id="gender-field" label="Gender" placeholder={patientDetails.gender} variant="outlined" />

                            <TextField id="birth-date-field" label="Birthday" placeholder={patientDetails.bday} variant="outlined" />
                            <TextField id="city-field" label="City" placeholder={patientDetails.city} variant="outlined" />
                            <TextField id="zip-code-field" label="Zip Code" placeholder={patientDetails.zip} variant="outlined" />

                            <TextField id="registered-date-field" label="Registered Time" placeholder={patientDetails.bday} variant="outlined" />
                            <TextField id="contact-number-field" label="Contact Number" placeholder={patientDetails.phone} variant="outlined" />
                            {/* <TextField id="screened-time-field" label="Screened Time" placeholder={patientDetails.city} variant="outlined" />
                            <TextField id="screened-date-field" label="Screened Date" placeholder={patientDetails.zip} variant="outlined" /> */}

                            <TextField className="street-address-field" label="Street Address" placeholder={patientDetails.street} variant="outlined" />
                        </div>

                        <div className="screening-details">
                            <TextField
                                multiline
                                rows={4.3}
                                label="Patient Notes"
                                className='patient-notes-field'
                                placeholder={patientDetails.patient_notes}
                            />

                            <TextField id="screened-time-field" label="Screened Time" placeholder={patientDetails.city} variant="outlined" />
                            <TextField className="screened-date-field" type='date' label="Screened Date" placeholder={patientDetails.zip} variant="outlined" />

                            <TextField id="screened-by-field" label="Screened By" placeholder={patientDetails.screened_by} variant="outlined" />
                            <TextField className="screened-on-field" label="Screened On" type='date' placeholder={patientDetails.screened_on} variant="outlined" />

                            <TextField className="results-field" label="Results" placeholder={patientDetails.results} variant="outlined" />
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