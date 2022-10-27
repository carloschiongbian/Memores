import { useState } from "react";
import Select from "react-select";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { FormControl } from '@mui/material';

import countriesSelect from "./countriesSelect";
import "../public/css/components/editModal/editModal.scss";

let editValues = {
  fname: " ",
  lname: " ",
  gender: " ",
  bday: " ",
  city: " ",
  country: " ",
  zip: " ",
  phone: " ",
  street: " ",
  patient_notes: " ",
  screened_time: " ",
  screened_date: " ",
  screened_by: " ",
  screened_on: " ",
  results: " ",
};

const EditPatientModal = ({ patientDetails, getPatientDetails, openModal, setOpen }) => {
  const [editForm, setEditForm] = useState(editValues);

  const handleUpdateEvent = async () => {
    console.log(patientDetails.id)
    await fetch("/patient-details/id=" + patientDetails.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editForm),
    }).then((response) => response.json());

    getPatientDetails()
    setOpen(false)
    
  };

  return (
    <Modal
      open={openModal}
      onClose={setOpen}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="edit-patient-modal">
        <div className="edit-modal-header">
          <h3>Edit Patient Details</h3>
        </div>

        <div className="edit-modal-content">
          <form method="PUT" action="#" form="edit-form">
            <div className="patient-profile">
              <TextField
                id="fname"
                required={true}
                onChange={(e) =>
                  setEditForm({ ...editForm, fname: e.target.value })
                }
                label="First Name"
                placeholder={patientDetails.fname}
                variant="outlined"
              />

              <TextField
                id="lname"
                required={true}
                onChange={(e) =>
                  setEditForm({ ...editForm, lname: e.target.value })
                }
                label="Last Name"
                placeholder={patientDetails.lname}
                variant="outlined"
              />

              <TextField
                id="gender"
                required={true}
                onChange={(e) =>
                  setEditForm({ ...editForm, gender: e.target.value })
                }
                label="Gender"
                placeholder={patientDetails.gender}
                variant="outlined"
              />

              <TextField
                id="bday"
                required={true}
                onChange={(e) =>
                  setEditForm({ ...editForm, bday: e.target.value })
                }
                label="Birthday"
                placeholder={patientDetails.bday}
                variant="outlined"
              />

              <Select
                options={countriesSelect}
                required={true}
                onChange={(choice) =>
                  setEditForm({ ...editForm, country: choice.label })
                }
                // onChange={(choice) => console.log(choice.label)}
              />

              <TextField
                id="city"
                defaultValue={patientDetails.city}
                onChange={(e) =>
                  setEditForm({ ...editForm, city: e.target.value })
                }
                label="City"
                placeholder={patientDetails.city}
                variant="outlined"
              />

              <TextField
                id="zip"
                defaultValue={patientDetails.zip}
                onChange={(e) =>
                  setEditForm({ ...editForm, zip: e.target.value })
                }
                label="Zip Code"
                placeholder={patientDetails.zip}
                variant="outlined"
              />
              {/* <TextField id="registered-date-field" value={editForm.registered_date} label="Registered Time" placeholder={patientDetails.bday} variant="outlined" /> */}

              <TextField
                id="phone"
                defaultValue={patientDetails.phone}
                onChange={(e) =>
                  setEditForm({ ...editForm, phone: e.target.value })
                }
                label="Contact Number"
                placeholder={patientDetails.phone}
                variant="outlined"
              />

              <TextField
                className="street"
                defaultValue={patientDetails.street}
                onChange={(e) =>
                  setEditForm({ ...editForm, street: e.target.value })
                }
                label="Street Address"
                placeholder={patientDetails.street}
                variant="outlined"
              />
            </div>

            <div className="screening-details">
              <TextField
                multiline
                rows={4.3}
                defaultValue={patientDetails.patient_notes}
                label="Patient Notes"
                className="patient-notes"
                onChange={(e) =>
                  setEditForm({ ...editForm, patient_notes: e.target.value })
                }
                placeholder={patientDetails.patient_notes}
              />

              {/* <TextField id="screened-time-field" value={editForm.screened} label="Screened Time" placeholder={patientDetails.city} variant="outlined" /> */}
              {/* <TextField className="screened-date-field" type='date' label="Screened Date" placeholder={patientDetails.screened_date} variant="outlined" /> */}

              <TextField
                id="screened_by"
                defaultValue={patientDetails.screened_by}
                onChange={(e) =>
                  setEditForm({ ...editForm, screened_by: e.target.value })
                }
                label="Screened By"
                placeholder={patientDetails.screened_by}
                variant="outlined"
              />

              <TextField
                className="screened_on"
                defaultValue={patientDetails.screened_on}
                onChange={(e) =>
                  setEditForm({ ...editForm, screened_on: e.target.value })
                }
                label="Screened On"
                type="date"
                placeholder={patientDetails.screened_on}
                variant="outlined"
              />

              <TextField
                className="results"
                multiline
                defaultValue={patientDetails.results}
                rows={4.3}
                onChange={(e) =>
                  setEditForm({ ...editForm, results: e.target.value })
                }
                label="Results"
                placeholder={patientDetails.results}
                variant="outlined"
              />
            </div>
          </form>
        </div>

        <div className="modal-actions">
          <Button
            variant="outlined"
            size="large"
            onClick={() => {
              setOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            size="large"
            variant="contained"
            onClick={() => {
              handleUpdateEvent();
            }}
          >
            Save
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default EditPatientModal;
