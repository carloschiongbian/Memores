import { useState } from "react";
import Select from "react-select";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import countriesSelect from "./countriesSelect";
import "../public/css/components/editModal/editModal.scss";
import Api from '../services/api';

const genders = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
];

let editValues = {
  fname: "",
  lname: "",
  age: "",
  gender: "",
  email: "",
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
  parseDate
}) => {
  const [patientAge, setPatientAge] = useState(patientDetails.age);
  const [firstHasSpecial, setFirstHasSpecial] = useState(false);
  const [lastHasSpecial, setLastHasSpecial] = useState(false);
  const [editForm, setEditForm] = useState(editValues);

  const getAge = (dateString) => {
    setEditForm({ ...editForm, bday: dateString });

    let today = new Date();
    let birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    let month = today.getMonth - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    setPatientAge(age);
    setEditForm({ ...editForm, age: age });
  };

  const handleUpdateEvent = async () => {
    let formValues = editForm;

    let values = {
      fname: "",
      lname: "",
      age: "",
      fullname: "",
      email: "",
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
      last_edited_on: "",
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
        values["last_edited_on"] = new Date();
      }
    }

    const response = await Api().put("/patient-details/id=" + patientDetails.id, values);
    if(response.status === 200){
      getPatientDetails();
      setOpen(false);
    }

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
                  setFirstHasSpecial(() => {
                    let char = e.target.value;
                    if (char.match(/[!@#$%*^~`'":;><.,?0-9_-]/)) {
                      return true;
                    } else {
                      setEditForm({ ...editForm, fname: e.target.value });
                      return false;
                    }
                  })
                }
                label="First Name"
                autoFocus
                error={firstHasSpecial}
                helperText={
                  firstHasSpecial ? "Please remove special characters." : null
                }
                placeholder={patientDetails.fname}
                variant="outlined"
              />

              <TextField
                id="lname"
                autoFocus
                defaultValue={patientDetails.lname}
                onChange={(e) =>
                  setLastHasSpecial(() => {
                    let char = e.target.value;
                    if (char.match(/[!@#$%*^~`'":;><.,?0-9_-]/)) {
                      return true;
                    } else {
                      setEditForm({ ...editForm, lname: e.target.value });
                      return false;
                    }
                  })
                }
                label="Last Name"
                error={lastHasSpecial}
                helperText={
                  lastHasSpecial ? "Please remove special characters." : null
                }
                placeholder={patientDetails.lname}
                variant="outlined"
              />

              <div className="birthday">
                <label style={{ fontSize: "14px" }}>Birthday</label>
                <TextField
                  id="bday"
                  InputProps={{
                    inputProps: { min: "1940-01-01", max: "2020-01-01" },
                  }}
                  defaultValue={patientDetails.bday}
                  style={{ width: "100%" }}
                  onChange={(e) => getAge(e.target.value)}
                  type="date"
                  variant="outlined"
                />
              </div>

              <div className="age">
                <label style={{ fontSize: "14px" }}>Age</label>
                <TextField
                  id="age"
                  placeholder={patientAge.toString()}
                  disabled
                  variant="outlined"
                />
              </div>

              <TextField
                id="phone"
                defaultValue={patientDetails.phone}
                onChange={(e) =>
                  setEditForm({ ...editForm, phone: e.target.value })
                }
                label="Contact Number"
                placeholder={patientDetails.phone}
                type="number"
                inputProps={{ maxLength: 11 }}
                onInput = {(e) => {
                  e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0,11)
                }}
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

              <div className="gender">
                <label style={{ fontSize: "14px" }}>Gender</label>
                <Select
                  options={genders}
                  required={true}
                  placeholder={patientDetails.gender}
                  defaultValue={patientDetails.gender}
                  onChange={(choice) =>
                    setEditForm({ ...editForm, gender: choice.label })
                  }
                />
              </div>

              <div className="country">
                <label style={{ fontSize: "14px" }}>Country</label>
                <Select
                  options={countriesSelect}
                  required={true}
                  defaultValue={patientDetails.country}
                  placeholder={patientDetails.country}
                  onChange={(choice) =>
                    setEditForm({ ...editForm, country: choice.label })
                  }
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

              <TextField
                id="email"
                onChange={(e) =>
                  setEditForm({ ...editForm, email: e.target.value })
                }
                label="Email"
                defaultValue={patientDetails.email}
                placeholder={patientDetails.email}
                type="email"
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
                rows={5.4}
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
                  defaultValue={assessmentDetails.date_taken}
                  placeholder={assessmentDetails.date_taken}
                  onChange={(e) =>
                    setEditForm({ ...editForm, date_taken: e.target.value })
                  }
                  disabled={isScreened ? false : true}
                  InputProps={{
                    inputProps: { min: "1940-01-01", max: new Date() },
                  }}
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
                  InputProps={{
                    inputProps: { min: "1940-01-01", max: new Date() },
                  }}
                  defaultValue={assessmentDetails.date_finished}
                  placeholder={assessmentDetails.date_finished}
                  onChange={(e) =>
                    setEditForm({ ...editForm, date_finished: e.target.value })
                  }
                  type="date"
                />
              </div>

              <TextField
                className="results"
                disabled={isScreened ? false : true}
                multiline
                defaultValue={assessmentDetails.result_description}
                rows={6.0}
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
