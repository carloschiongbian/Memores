import "../public/css/pages/PatientDetails/patientDetails.scss";
import EditPatientModal from "../components/editPatientModal";

import BreadCrumbs from "../components/BreadCrumbs";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";

const PatientDetails = () => {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [patientDetails, setPatientDetails] = useState([]);

  const setData = async (data) => {
    setPatientDetails(data);

    // if(!patientDetails.is_screened){
    //   console.log('not screened')
    //   setPatientDetails({...patientDetails, patient_notes: 'Patient not screened'})
    // }

    // const assessmentDetails = [
    //   'patient_notes',
    //   'sad_category',
    // 'last_edited_by',
    //   'last_edited_on',
    //   'responses',
    //   'date_taken',
    //   'assessor_id',
    //   'date_finished',
    //   'prediction_result',
    //   'result_description'
    // ]

    // assessmentDetails.map(detail => {
    //   // console.log(detail)
    //   if(patientDetails[detail] === false){
    //     setPatientDetails({...patientDetails, patient_notes: 'Patient Not Screened'})
    //     setPatientDetails({...patientDetails, sad_category: 'Patient Not Screened'})
    //     // setPatientDetails({...patientDetails, last_edited_by: 'Patient Not Screened'})
    //     setPatientDetails({...patientDetails, last_edited_on: 'Patient Not Screened'})
    //     setPatientDetails({...patientDetails, responses: 'Patient Not Screened'})
    //     setPatientDetails({...patientDetails, date_taken: 'Patient Not Screened'})
    //     setPatientDetails({...patientDetails, assessor_id: 'Patient Not Screened'})
    //     setPatientDetails({...patientDetails, date_finished: 'Patient Not Screened'})
    //     setPatientDetails({...patientDetails, prediction_result: 'Patient Not Screened'})
    //     setPatientDetails({...patientDetails, result_description: 'Patient Not Screened'})
    //   }
    //   return true
    // })
  };

  // const checkIfAssessed = () => {
  //   const assessmentDetails = [
  //     'patient_notes',
  //     'sad_category',
  //     'last_edited_by',
  //     'last_edited_on',
  //     'responses',
  //     'date_taken',
  //     'assessor_id',
  //     'date_finished',
  //     'prediction_result',
  //     'result_description'
  //   ]

  //   assessmentDetails.map(detail => {
  //     if(patientDetails[detail] === false){
  //       setPatientDetails({...patientDetails, patient_notes: 'Patient Not Screened'})
  //       setPatientDetails({...patientDetails, sad_category: 'Patient Not Screened'})
  //       setPatientDetails({...patientDetails, last_edited_by: 'Patient Not Screened'})
  //       setPatientDetails({...patientDetails, last_edited_on: 'Patient Not Screened'})
  //       setPatientDetails({...patientDetails, responses: 'Patient Not Screened'})
  //       setPatientDetails({...patientDetails, date_taken: 'Patient Not Screened'})
  //       setPatientDetails({...patientDetails, assessor_id: 'Patient Not Screened'})
  //       setPatientDetails({...patientDetails, date_finished: 'Patient Not Screened'})
  //       setPatientDetails({...patientDetails, prediction_result: 'Patient Not Screened'})
  //       setPatientDetails({...patientDetails, result_description: 'Patient Not Screened'})
  //     }
  //     return true
  //   })
  // }

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

  const test = (test) => {
    console.log(test)
  }

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
                  <span>{patientDetails.bday}</span>
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
                  <span>{patientDetails.registered_date}</span>
                </div>

                <div className="patient-screened-time">
                  <label htmlFor="screened-time">Date Taken</label>
                  {patientDetails.is_screened === false && <span style={{color: 'gray', fontSize: '15px'}}>Not available. Patient must be screened first</span>}
                  {patientDetails.is_screened === true && <span>{patientDetails.date_taken}</span>}
                </div>

                <div className="patient-screened-date">
                  <label htmlFor="screened-date">Date Finished</label>
                  {!patientDetails.is_screened && <span style={{color: 'gray', fontSize: '15px'}}>Not available. Patient must be screened first</span>}
                  {patientDetails.is_screened && <span>{patientDetails.date_finished}</span>}
                </div>
              </div>

              <div className="patient-screening-details">
                <div className="patient-screening-details-bottom-section">
                  <div className="patient-screening-results-label">
                    <label>Results</label>
                  </div>

                  <div className="patient-screening-results" style={{padding:'10px 0'}}>
                  {!patientDetails.is_screened && <span style={{color: 'gray', fontSize: '15px'}}>Not available. Patient must be screened first</span>}
                  {patientDetails.is_screened && <h6>Description: {patientDetails.result_description}</h6>}
                  </div>
                </div>
              </div>
            </div>

            <div className="patient-notes-section">
              <div className="patient-notes-container">
                <label htmlFor="patient-notes-label">Notes</label>

                <div className="patient-notes">
                {!patientDetails.is_screened && <span style={{color: 'gray', fontSize: '15px'}}>Not available. Patient must be screened first</span>}
                {patientDetails.is_screened && <span>{patientDetails.patient_notes}</span>}
                  
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
                  />
                </div>

                <div className="patient-notes-status">
                  <div className="patient-notes-editor">
                    <label htmlFor="notes-edited-by">Last Edited By:</label>
                    <p>{patientDetails.last_edited_by}</p>
                  </div>

                  <div className="patient-notes-edited-date">
                    <label htmlFor="date-edited-on">Last Edited On:</label>
                    <p>{patientDetails.last_edited_on}</p>
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
