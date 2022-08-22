import '../public/css/pages/PatientRecord/patientRecord.css';
import PatientInformation from '../components/patientInformation';
import UserNavigationMenu from '../components/userNavigationMenu';
import { useState } from 'react';

const PatientRecord = () => {

    // Data for the patients will be fetched from this page

    const [pageCount, setPageCount] = useState(0);

    //This function displays a sample of how the navigation page number would look like
    const sampleNavigationDisplay = (action) => {
        switch (action) {
            case 'Prev':
                if(pageCount > 0){
                    setPageCount(pageCount - 1);
                }
                break;

            case 'Next':
                setPageCount(pageCount + 1);                
        }
    }

    return (
        <div className="patient-records-container">

            {/* <div className="patient-records-navbar"> */}
                <UserNavigationMenu />
                {/* <h1>LOGO</h1> */}
            {/* </div> */}

            <div className="patient-records-header">
                <div className="patient-search-bar-container">
                    <h2>Manage Patients</h2>

                    <div className="patient-search-bar">
                        <input type="text" name="search-patient" id="search-patient" placeholder="Search a Patient" />
                        <button name="new-patient-button">New Patient</button>
                    </div>
                </div>
            </div>

            <div className="patient-records-modal">
                <div className="patient-classifiers">                    
                    <h3>Patient ID</h3>
                    <h3>Name</h3>
                    <h3>Age</h3>
                    <h3>Screened On</h3>
                    <h3>Actions</h3>
                </div>
                <PatientInformation />
            </div>

            <div className="patient-records-navigation">
                <button onClick={() => sampleNavigationDisplay('Prev')}>Prev</button>
                <div className="patient-records-page-display">
                    { pageCount }
                </div>
                <button onClick={() => sampleNavigationDisplay('Next')}>Next</button>
            </div>
        </div>
    );
}
 
export default PatientRecord;