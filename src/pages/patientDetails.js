import "../public/css/pages/PatientDetails/patientDetails.scss";
import EditPatientModal from "../components/editPatientModal";

import BreadCrumbs from "../components/BreadCrumbs";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";

const PatientDetails = () => {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [userDetails, setUserDetails] = useState([])
  const [patientDetails, setPatientDetails] = useState([]);
  const [screeningDetails, setScreeningDetails] = useState([]);
  const [assessmentDetails, setAssessmentDetails] = useState([])

  const setData = async (data) => {
    setUserDetails(data[0])
    setPatientDetails(data[1]);
    setAssessmentDetails(data[2]);
    setScreeningDetails(data[3]);
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
                {patientDetails[0].fname + " " + patientDetails[0].lname}
              </div>

              <div className="patient-information">
                <div className="patient-gender">
                  <label htmlFor="gender">Gender</label>
                  <span>{patientDetails[0].gender}</span>
                </div>

                <div className="patient-birthday">
                  <label htmlFor="birthday">Birthday</label>
                  <span>{patientDetails[0].bday}</span>
                </div>

                <div className="patient-contact-number">
                  <label htmlFor="contact-number">Contact Number</label>
                  <span>{patientDetails[0].phone}</span>
                </div>

                <div className="patient-street-address">
                  <label htmlFor="street-address">Street Address</label>
                  <span>{patientDetails[0].street}</span>
                </div>

                <div className="patient-address-city">
                  <label htmlFor="city-address">City</label>
                  <span>{patientDetails[0].city}</span>
                </div>

                <div className="patient-zip-code">
                  <label htmlFor="zip-code">Zip Code</label>
                  <span>{patientDetails[0].zip}</span>
                </div>

                <div className="patient-registered-date">
                  <label htmlFor="registered-date">Registered Date</label>
                  <span>{patientDetails[0].registered_date}</span>
                </div>

                <div className="patient-screened-time">
                  <label htmlFor="screened-time">Date Taken</label>
                  <span>{assessmentDetails[0].date_taken}</span>
                </div>

                <div className="patient-screened-date">
                  <label htmlFor="screened-date">Date Finished</label>
                  <span>{assessmentDetails[0].date_finished}</span>
                </div>
              </div>

              <div className="patient-screening-details">
                <div className="screening-details-label">
                  <label htmlFor="screening-details">Screening Details</label>
                </div>

                <div className="patient-screening-details-top-section">
                  <div className="screened-by">
                    {/* <label>Screened by: {patientDetails.screened_by} </label> */}
                  </div>

                  <div className="screened-on">
                    {/* <label>Screened on: {patientDetails.screened_on}</label> */}
                  </div>
                </div>

                <div className="patient-screening-details-bottom-section">
                  <div className="patient-screening-results-label">
                    <label>Results</label>
                  </div>

                  <div className="patient-screening-results">
                    <h6>{"Description: "+assessmentDetails[0].result_description}</h6>
                  </div>
                </div>
              </div>
            </div>

            <div className="patient-notes-section">
              <div className="patient-notes-container">
                <label htmlFor="patient-notes-label">Notes</label>

                <div className="patient-notes">
                  {screeningDetails[0].patient_notes}
                </div>

                <div className="patient-notes-actions">
                  <button
                    name="patient-notes-edit-button"
                    onClick={() => setOpen(true)}
                  >
                    Edit
                  </button>
                  <EditPatientModal
                    patientDetails={patientDetails[0]}
                    getPatientDetails={getPatientDetails}
                    openModal={open}
                    setOpen={setOpen}
                  />
                </div>

                <div className="patient-notes-status">
                  <div className="patient-notes-editor">
                    <label htmlFor="notes-edited-by">Last Edited By:</label>
                    <p>{screeningDetails[0].last_edited_by}</p>
                  </div>

                  <div className="patient-notes-edited-date">
                    <label htmlFor="date-edited-on">Last Edited On:</label>
                    <p>{screeningDetails[0].last_edited_on}</p>
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
