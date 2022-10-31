import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";

import BreadCrumbs from "../components/BreadCrumbs";
import EditPatientModal from "../components/editPatientModal";
import "../public/css/pages/PatientDetails/patientDetails.scss";

const PatientDetails = () => {
  const { id } = useParams();
  const [isScreened, setIsScreened] = useState(false);
  const [open, setOpen] = useState(false);
  const [patientDetails, setPatientDetails] = useState([]);

  const parseDate = (date) => {
    if (date.length < 20) {
      const [dateValue, timeValue] = date.split(" ");
      return {'dateValue': dateValue};
    } else {
      const [dayValue, day, dateNum, month, year, timeValue] = date.split(" ");
      return {
        'monthFirst': {
          'date': day, 
          'month': dateNum, 
          'year': month
        }
      };
    }
  };
  
  const setData = async (data) => {
    setPatientDetails(data);
    setIsScreened(data.is_screened);
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
      .then((response) => setData(response[0]))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getPatientDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      {patientDetails.length !== 0 && (
        <div className="patient-details-page-container">
          <div className="patient-details-path-bar">
            <BreadCrumbs />
          </div>

          <div className="patient-details-container">
            <div className="patient-details">
              <div className="patient-name">
                {patientDetails.fname + " " + patientDetails.lname}
              </div>

              <div className="patient-information">
                <div className="patient-gender">
                  <label htmlFor="gender">Gender</label>
                  <span>{patientDetails.gender}</span>
                </div>

                <div className="patient-birthday">
                  <label htmlFor="birthday">Birthday</label>
                  <span>{ parseDate(patientDetails.bday).monthFirst.month +", "+ parseDate(patientDetails.bday).monthFirst.date +", "+ parseDate(patientDetails.bday).monthFirst.year}</span>
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
                  <span>{ parseDate(patientDetails.registered_date).monthFirst.month +", "+ parseDate(patientDetails.registered_date).monthFirst.date +", "+ parseDate(patientDetails.registered_date).monthFirst.year}</span>
                </div>

                <div className="patient-screened-time">
                  <label htmlFor="screened-time">Date Taken</label>
                  {patientDetails.is_screened === false && (
                    <span style={{ color: "gray", fontSize: "15px" }}>
                      Not available. Patient must be screened first
                    </span>
                  )}
                  {patientDetails.is_screened === true && (
                    <span>{ parseDate(patientDetails.date_taken).monthFirst.month +", "+ parseDate(patientDetails.date_taken).monthFirst.date +", "+ parseDate(patientDetails.date_taken).monthFirst.year}</span>
                  )}
                </div>

                <div className="patient-screened-date">
                  <label htmlFor="screened-date">Date Finished</label>
                  {!patientDetails.is_screened && (
                    <span style={{ color: "gray", fontSize: "15px" }}>
                      Not available. Patient must be screened first
                    </span>
                  )}
                  {patientDetails.is_screened && (
                    <span>{ parseDate(patientDetails.date_finished).monthFirst.month +", "+ parseDate(patientDetails.date_finished).monthFirst.date +", "+ parseDate(patientDetails.date_finished).monthFirst.year}</span>
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
                    {!patientDetails.is_screened && (
                      <span style={{ color: "gray", fontSize: "15px" }}>
                        Not available. Patient must be screened first
                      </span>
                    )}
                    {patientDetails.is_screened && (
                      <h6>Description: {patientDetails.result_description}</h6>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="patient-notes-section">
              <div className="patient-notes-container">
                <label htmlFor="patient-notes-label">Notes</label>

                <div className="patient-notes">
                  {!patientDetails.is_screened && (
                    <span style={{ color: "gray", fontSize: "15px" }}>
                      Not available. Patient must be screened first
                    </span>
                  )}
                  {patientDetails.is_screened && (
                    <span>{patientDetails.patient_notes}</span>
                  )}
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
                    getPatientDetails={getPatientDetails}
                    openModal={open}
                    setOpen={setOpen}
                    isScreened={isScreened}
                    parseDate={parseDate}
                  />
                </div>

                <div className="patient-notes-status">
                  <div className="patient-notes-editor">
                    <label htmlFor="notes-edited-by">Last Edited By:</label>
                    <p>{patientDetails.last_edited_by}</p>
                  </div>

                  <div className="patient-notes-edited-date">
                    <label htmlFor="date-edited-on">Last Edited On:</label>
                    <span>{ parseDate(patientDetails.date_taken).monthFirst.month +", "+ parseDate(patientDetails.date_taken).monthFirst.date +", "+ parseDate(patientDetails.date_taken).monthFirst.year}</span>
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
