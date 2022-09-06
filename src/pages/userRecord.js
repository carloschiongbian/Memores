import UserNavigationMenu from '../components/userNavigationMenu';
import '../public/css/pages/PatientRecord/patientRecord.css';
import { useState } from 'react';


const UserRecord = () => {
    return (
        <div className="patient-records-container">
            <UserNavigationMenu />
            <h1>Hello</h1>
        </div>
    );
}

export default UserRecord;