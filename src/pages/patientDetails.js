import UserNavigationMenu from "../components/userNavigationMenu";
import '../public/css/pages/PatientDetails/patientDetails.css';

const PatientDetails = () => {
    return (
        <div className="patient-details-page-container">
            <UserNavigationMenu />

            <div className="patient-details-path-bar">
                path bar
            </div>

            <div className="patient-details-container">
                <div className="patient-details">
                    <div className="patient-name">
                        patient name
                    </div>

                    <div className="patient-information">
                        <div className="patient-gender">
                            <label htmlFor="gender">Gender</label>
                            <span>Male</span>
                        </div>

                        <div className="patient-birthday">
                            <label htmlFor="birthday">Birthday</label>
                            <span>January 1, 2022</span>
                        </div>

                        <div className="patient-contact-number">
                            <label htmlFor="contact-number">Contact Number</label>
                            <span>0917-777-7777</span>
                        </div>

                        <div className="patient-street-address">
                            <label htmlFor="street-address">Street Address</label>
                            <span>123 Maple Street</span>
                        </div>

                        <div className="patient-address-city">
                            <label htmlFor="city-address">City</label>
                            <span>Cebu City</span>
                        </div>

                        <div className="patient-zip-code">
                            <label htmlFor="zip-code">Zip Code</label>
                            <span>1234</span>
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
                                <label>Screened by:</label>
                            </div>

                            <div className="screened-on">
                                <label>Screened on:</label>
                            </div>
                        </div>

                        <div className="patient-screening-details-bottom-section">
                            <div className="patient-screening-results-label">
                                <label>Results</label>
                            </div>

                            <div className="patient-screening-results">
                                <p>lorem lorem</p>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="patient-notes-section">
                    <div className="patient-notes-container">
                        <label htmlFor="patient-notes-label">Notes</label>

                        <div className="patient-notes">
                            notes
                        </div>

                        <div className="patient-notes-actions">
                            <button name="patient-notes-edit-button">Edit</button>
                        </div>

                        <div className="patient-notes-status">
                            <div className="patient-notes-editor">
                                <label htmlFor="notes-edited-by">Last Edited By:</label>
                                Greg
                            </div>

                            <div className="patient-notes-edited-date">
                            <label htmlFor="date-edited-on">Last Edited On:</label>
                                08 / 20 / 2022
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default PatientDetails;