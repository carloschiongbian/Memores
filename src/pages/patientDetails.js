import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Avatar from "@mui/material/Avatar";

import BreadCrumbs from "../components/BreadCrumbs";
import EditPatientModal from "../components/editPatientModal";
import "../public/css/pages/PatientDetails/patientDetails.scss";

const PatientDetails = () => {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [isScreened, setIsScreened] = useState(false);
  const [patientDetails, setPatientDetails] = useState([]);
  const [assessmentDetails, setAssessmentDetails] = useState([]);
  const [screeningDetails, setScreeningDetails] = useState([]);

  const parseDate = (date) => {
    const [dateValue, timeValue] = date.split(/[T ]/);
    return dateValue;
  };

  const setData = async (data) => {
    setPatientDetails(data.patients[0]);
    setScreeningDetails(data.screeningDetails[0]);
    setAssessmentDetails(data.assessment.length > 0 ? data.assessment[0] : []);

    setIsScreened((data.assessment.length > 0) ? true : false);
  };

  const getPatientDetails = () => {
    fetch("/patient-details/id=" + id, {
      methods: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => setData(response))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getPatientDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stringAvatar = (name) => {
    return {
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  };

  return (
    <Layout>
      {patientDetails.length !== 0 && (
        <div className="patient-details-page-container">
          <div className="patient-details-path-bar">
            <BreadCrumbs />
          </div>

          <div className="patient-details-container">
            <div className="patient-details">
              <div
                className="patient-name-container"
                style={{
                  backgroundColor: "white",
                  padding: "20px 10px 20px 10px",
                  borderRadius: "10px",
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  rowGap: "20px",
                  alignItems: "center",
                }}
              >
                <Avatar
                  sx={{ width: 100, height: 100, fontSize: "30px" }}
                  {...stringAvatar(
                    patientDetails.fname + " " + patientDetails.lname
                  )}
                />

                <div className="patient-name" style={{display: 'flex', flexDirection: 'column', rowGap: '10px', padding: '10px 0'}}>
                  First Name: <h4>{patientDetails.fname}</h4>
                  Last Name: <h4>{patientDetails.lname}</h4>
                  Country: {patientDetails.country}
                </div>

                {/* <div className="country">
                </div> */}
              </div>

              <div className="patient-information">
                <div className="patient-gender">
                  <label htmlFor="gender">Gender</label>
                  <span>{patientDetails.gender}</span>
                </div>

                <div className="patient-birthday">
                  <label htmlFor="birthday">Birthday</label>
                  <span>{parseDate(patientDetails.bday)}</span>
                </div>

                <div className="patient-contact-number">
                  <label htmlFor="contact-number">Contact Number</label>
                  <span>{patientDetails.phone}</span>
                </div>

                <div className="patient-street-address">
                  <label htmlFor="street-address">Street Address</label>
                  <span>{patientDetails.street}</span>
                </div>

                <div className="patient-address-city">
                  <label htmlFor="city-address">City</label>
                  <span>{patientDetails.city}</span>
                </div>

                <div className="patient-zip-code">
                  <label htmlFor="zip-code">Zip Code</label>
                  <span>{patientDetails.zip}</span>
                </div>

                <div className="patient-registered-date">
                  <label htmlFor="registered-date">Registered Date</label>
                  <span>{parseDate(patientDetails.registered_date)}</span>
                </div>

                <div className="patient-date-taken">
                  <label htmlFor="date-taken">Date Taken</label>
                  {isScreened === false && (
                    <span style={{ color: "gray", fontSize: "15px" }}>
                      Not available. Patient must be screened first
                    </span>
                  )}
                  {isScreened === true && (
                    <span>{parseDate(assessmentDetails.date_taken)}</span>
                  )}
                </div>

                <div className="patient-date-finished">
                  <label htmlFor="date-finished">Date Finished</label>
                  {isScreened === false && (
                    <span style={{ color: "gray", fontSize: "15px" }}>
                      Not available. Patient must be screened first
                    </span>
                  )}
                  {isScreened === true && (
                    <span>{parseDate(assessmentDetails.date_finished)}</span>
                  )}
                </div>
              </div>

              <div className="patient-screening-details">
                <div className="patient-screening-details-bottom-section">
                  <div className="patient-screening-results-label">
                    <label>Results</label>
                  </div>

                  <div
                    className="patient-screening-results"
                    style={{ padding: "10px 0" }}
                  >
                    {isScreened === false && (
                      <span style={{ color: "gray", fontSize: "15px" }}>
                        Not available. Patient must be screened first
                      </span>
                    )}
                    {isScreened === true && (
                      <h6>
                        Description: {assessmentDetails.result_description}
                      </h6>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="patient-notes-section">
              <div className="patient-notes-container">
                <label htmlFor="patient-notes-label">Notes</label>

                <div className="patient-notes">
                    <span>{screeningDetails.patient_notes}</span>
                </div>

                <div className="patient-notes-actions">
                  <button
                    name="patient-notes-edit-button"
                    onClick={() => setOpen(true)}
                  >
                    Edit
                  </button>
                  <EditPatientModal
                    patientDetails={patientDetails}
                    screeningDetails={screeningDetails}
                    assessmentDetails={assessmentDetails}
                    getPatientDetails={getPatientDetails}
                    openModal={open}
                    setOpen={setOpen}
                    isScreened={isScreened}
                  />
                </div>

                <div className="patient-notes-status">
                  {/* I decided to comment this out for the meantime since it */}
                  {/* wouldn't make sense if a record were to be edited by any other */}
                  {/* person since only this clinician can see this record */}
                  
                  {/* <div className="patient-notes-editor">
                    <label htmlFor="notes-edited-by">Last Edited By:</label>
                    {isScreened === true && (
                      <p>{screeningDetails.last_edited_by}</p>
                    )}
                  </div> */}

                  <div className="patient-notes-edited-date">
                    <label htmlFor="date-edited-on">Last Edited On:</label>
                    
                      <p>{parseDate(screeningDetails.last_edited_on)}</p>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default PatientDetails;
