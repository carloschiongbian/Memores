import { useState } from "react";
import Select from "react-select";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import countriesSelect from "./countriesSelect";
import "../public/css/components/editModal/editModal.scss";

const genders = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
];

let editValues = {
  fname: "",
  lname: "",
  gender: "",
  bday: "",
  city: "",
  country: "",
  zip: "",
  phone: "",
  street: "",
  patient_notes: "",
  date_taken: "",
  date_finished: "",
  result_description: "",
};

const EditPatientModal = ({
  patientDetails,
  screeningDetails,
  assessmentDetails,
  getPatientDetails,
  openModal,
  setOpen,
  isScreened,
}) => {
  const [editForm, setEditForm] = useState(editValues);

  const handleUpdateEvent = async () => {
    let formValues = editForm;

    let values = {
      fname: "",
      lname: "",
      fullname: "",
      gender: "",
      bday: "",
      city: "",
      country: "",
      zip: "",
      phone: "",
      street: "",
      patient_notes: "",
      date_taken: "",
      date_finished: "",
      result_description: "",
    };

    for (let key in formValues) {
      if (editForm[key] === "") {
        if (patientDetails[key] !== undefined) {
          values[key] = patientDetails[key];
        } else if (assessmentDetails[key] !== undefined) {
          values[key] = assessmentDetails[key];
        } else if (screeningDetails[key] !== undefined) {
          values[key] = screeningDetails[key];
        }
      } else {
        values[key] = editForm[key];
        values["fullname"] = values["fname"] + " " + values["lname"];
      }
    }

    await fetch("/patient-details/id=" + patientDetails.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    }).then((response) => response.json());

    getPatientDetails();
    setOpen(false);
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
          <span style={{ color: "red", fontSize: "14px" }}>
            Patient screening details fields are 'disabled' unless the patient
            was already screened.
          </span>
        </div>

        <div className="edit-modal-content">
          <form method="PUT" action="#" form="edit-form">
            <div className="patient-profile">
              <TextField
                id="fname"
                defaultValue={patientDetails.fname}
                onChange={(e) =>
                  setEditForm({ ...editForm, fname: e.target.value })
                }
                label="First Name"
                placeholder={patientDetails.fname}
                variant="outlined"
              />

              <TextField
                id="lname"
                defaultValue={patientDetails.lname}
                onChange={(e) =>
                  setEditForm({ ...editForm, lname: e.target.value })
                }
                label="Last Name"
                placeholder={patientDetails.lname}
                variant="outlined"
              />

              <div className="birthday">
                <label style={{ fontSize: "14px" }}>Birthday</label>
                <TextField
                  id="bday"
                  style={{ width: "100%" }}
                  onChange={(e) =>
                    setEditForm({ ...editForm, bday: e.target.value })
                  }
                  type="date"
                  variant="outlined"
                />
              </div>

              <TextField
                id="city"
                onChange={(e) =>
                  setEditForm({ ...editForm, city: e.target.value })
                }
                label="City"
                defaultValue={patientDetails.city}
                placeholder={patientDetails.city}
                variant="outlined"
              />

              <div className="country">
                <label style={{ fontSize: "14px" }}>Country</label>
                <Select
                  options={countriesSelect}
                  required={true}
                  placeholder={patientDetails.country}
                  onChange={(choice) =>
                    setEditForm({ ...editForm, country: choice.label })
                  }
                />
              </div>

              <div className="gender">
                <label style={{ fontSize: "14px" }}>Gender</label>
                <Select
                  options={genders}
                  required={true}
                  placeholder={patientDetails.gender}
                  onChange={(choice) =>
                    setEditForm({ ...editForm, gender: choice.label })
                  }
                />
              </div>

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
                rows={5.0}
                required={true}
                label="Patient Notes"
                defaultValue={screeningDetails.patient_notes}
                className="patient-notes"
                onChange={(e) =>
                  setEditForm({ ...editForm, patient_notes: e.target.value })
                }
                placeholder={screeningDetails.patient_notes}
              />

              <div className="date-taken">
                <label style={{ fontSize: "14px" }}>Date Taken</label>
                <TextField
                  type="date"
                  id="screened_by"
                  onChange={(e) =>
                    setEditForm({ ...editForm, date_taken: e.target.value })
                  }
                  disabled={isScreened ? false : true}
                  variant="outlined"
                  style={{ width: "100%" }}
                />
              </div>

              <div className="date-finished">
                <label style={{ fontSize: "14px" }}>Date Finished</label>
                <TextField
                  disabled={isScreened ? false : true}
                  variant="outlined"
                  style={{ width: "100%" }}
                  className="screened_on"
                  onChange={(e) =>
                    setEditForm({ ...editForm, date_finished: e.target.value })
                  }
                  type="date"
                  defaultValue={assessmentDetails.date_finished}
                />
              </div>

              <TextField
                className="results"
                disabled={isScreened ? false : true}
                multiline
                defaultValue={assessmentDetails.result_description}
                rows={4.3}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    result_description: e.target.value,
                  })
                }
                label={isScreened ? "Results" : "Disabled"}
                placeholder={assessmentDetails.result_description}
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
