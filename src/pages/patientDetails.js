import UserNavigationMenu from "../components/userNavigationMenu";
import '../public/css/pages/PatientDetails/patientDetails.scss';
import EditPatientModal from '../components/editPatientModal'

import BreadCrumbs from '../components/BreadCrumbs';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

//for dummy data, make sure that patient_id corresponds to 
//already-existing id numbers from the patients table in order to link data

//INSERT INTO `patients_screening_details`(`id`, `patient_id`, `patient_notes`, `results`, `screened_by`, `last_edited_by`, `screened_on`, `last_edited_on`, `created_at`, `updated_at`) VALUES ('','','This patient shows signs of SAD','has SAD','Dr. Strange','Dr. Murphy','April 3, 2022','May 3, 2022','','')
//INSERT INTO `patients_screening_details`(`id`, `patient_id`, `patient_notes`, `results`, `screened_by`, `last_edited_by`, `screened_on`, `last_edited_on`, `created_at`, `updated_at`) VALUES ('','','This patient shows symptoms but does not have SAD','has no SAD','Dr. Holmes','Dr. Poller','April 3, 2022','June 3, 2022','','')
//INSERT INTO `patients_screening_details`(`id`, `patient_id`, `patient_notes`, `results`, `screened_by`, `last_edited_by`, `screened_on`, `last_edited_on`, `created_at`, `updated_at`) VALUES ('','','This patient has SAD','has SAD','Dr. Scrubs','Dr. Logan','April 3, 2022','July 3, 2022','','')

const PatientDetails = () => {

    const { id } = useParams()
    const [open, setOpen] = useState(false);
    const[patientDetails, setPatientDetails] = useState({})

    useEffect(() => {
        fetch('/patientDetails/id='+id, {
            methods: 'GET',
            headers: {
                'Access-Control-Allow-Origin':'*',
                'Content-Type': 'application/json'
            }
        }).then((response) =>
            response.json()
        ).then((response) =>
            setPatientDetails(response[0])
        ).catch((error) => 
            console.log(error)
        )
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <UserNavigationMenu />
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
                                <span>{ patientDetails.gender }</span>
                            </div>

                            <div className="patient-birthday">
                                <label htmlFor="birthday">Birthday</label>
                                <span>{ patientDetails.bday }</span>
                            </div>

                            <div className="patient-contact-number">
                                <label htmlFor="contact-number">Contact Number</label>
                                <span>{ patientDetails.phone }</span>
                            </div>

                            <div className="patient-street-address">
                                <label htmlFor="street-address">Street Address</label>
                                <span>{ patientDetails.street }</span>
                            </div>

                            <div className="patient-address-city">
                                <label htmlFor="city-address">City</label>
                                <span>{ patientDetails.city }</span>
                            </div>

                            <div className="patient-zip-code">
                                <label htmlFor="zip-code">Zip Code</label>
                                <span>{ patientDetails.zip }</span>
                            </div>

                            <div className="patient-registered-date">
                                <label htmlFor="registered-date">Registered Date</label>
                                <span>March 25, 2022</span>
                            </div>

                            <div className="patient-screened-time">
                                <label htmlFor="screened-time">Screened Time</label>
                                <span>3:30 PM</span>
                            </div>

                            <div className="patient-screened-date">
                                <label htmlFor="screened-date">Screened Date</label>
                                <span>March 25, 2022</span>
                            </div>
                        </div>

                        <div className="patient-screening-details">
                            <div className="screening-details-label">
                                <label htmlFor="screening-details">Screening Details</label>
                            </div>

                            <div className="patient-screening-details-top-section">
                                <div className="screened-by">
                                    <label>Screened by: {patientDetails.screened_by} </label>
                                </div>

                                <div className="screened-on">
                                    <label>Screened on: {patientDetails.screened_on}</label>
                                </div>
                            </div>

                            <div className="patient-screening-details-bottom-section">
                                <div className="patient-screening-results-label">
                                    <label>Results</label>
                                </div>

                                <div className="patient-screening-results">
                                    <p>{patientDetails.results}</p>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="patient-notes-section">
                        <div className="patient-notes-container">
                            <label htmlFor="patient-notes-label">Notes</label>

                            <div className="patient-notes">
                                {patientDetails.patient_notes}
                            </div>

                            <div className="patient-notes-actions">
                                <button name="patient-notes-edit-button" onClick={() => setOpen(true)}>Edit</button>
                                <EditPatientModal patientDetails={patientDetails} openModal={open} setOpen={setOpen} />
                            </div>

                            <div className="patient-notes-status">
                                <div className="patient-notes-editor">
                                    <label htmlFor="notes-edited-by">Last Edited By:</label>
                                    <p>{patientDetails.last_Edited_by}</p>
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
        </>
    );
}
 
export default PatientDetails;