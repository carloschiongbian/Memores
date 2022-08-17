import './public/css/PatientRecord/patientRecord.css';
import PatientInformation from './components/patientInformation';

const PatientRecord = () => {

    // Data for the patients will be fetched from this page

    return (
        <div className="patient-records-container">
            <div className="patient-records-navbar">
                <h1>LOGO</h1>
            </div>

            <div className="patient-records-header">
                <div className="patient-search-bar-container">
                    <h2>Manage Patients</h2>
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
                <button>Prev</button>
                <div className="patient-records-page-display">
                    1
                </div>
                <button>Next</button>
            </div>
        </div>
    );
}
 
export default PatientRecord;