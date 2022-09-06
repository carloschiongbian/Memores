import UserNavigationMenu from '../components/userNavigationMenu';
import '../public/css/pages/PatientRecord/patientRecord.css';
import { useState, useEffect } from 'react';
import DataTable from '../components/dataTable';

const UserRecord = () => {

    const sampleHeader = [
        {
            field: 'id',
            headerName: 'id',
            width: 300,
        },
        {
            field: 'name',
            headerName: 'name',
            width: 300,
            editable: true,
        },
        {
            field: 'email',
            headerName: 'email',
            width: 300,
            editable: true,
        },
        {
            field: 'phone',
            headerName: 'phone',
            width: 300,
            editable: true,
        }
    ];
    const randomData = [
        { id: "1", name: "Joshua", email: "sample@gmail.com", phone: "099238" },
        { id: "2", name: "Joshua", email: "sample@gmail.com", phone: "099238" },
        { id: "3", name: "Joshua", email: "sample@gmail.com", phone: "099238" },
        { id: "4", name: "Joshua", email: "sample@gmail.com", phone: "099238" },
        { id: "5", name: "Joshua", email: "sample@gmail.com", phone: "099238" },
        { id: "6", name: "Joshua", email: "sample@gmail.com", phone: "099238" },
        { id: "7", name: "Joshua", email: "sample@gmail.com", phone: "099238" },
        { id: "8", name: "Joshua", email: "sample@gmail.com", phone: "099238" },
        { id: "9", name: "Joshua", email: "sample@gmail.com", phone: "099238" },
        { id: "10", name: "Joshua", email: "sample@gmail.com", phone: "099238" },
        { id: "11", name: "Joshua", email: "sample@gmail.com", phone: "099238" },
        { id: "12", name: "Joshua", email: "sample@gmail.com", phone: "099238" },
        { id: "13", name: "Joshua", email: "sample@gmail.com", phone: "099238" },
        { id: "14", name: "Joshua", email: "sample@gmail.com", phone: "099238" },
        { id: "15", name: "Joshua", email: "sample@gmail.com", phone: "099238" },
        { id: "16", name: "Joshua", email: "sample@gmail.com", phone: "099238" },
        { id: "17", name: "Joshua", email: "sample@gmail.com", phone: "099238" },
        { id: "18", name: "Joshua", email: "sample@gmail.com", phone: "099238" },
        { id: "19", name: "Joshua", email: "sample@gmail.com", phone: "099238" },
        { id: "20", name: "Joshua", email: "sample@gmail.com", phone: "099238" },
        {id: "21", name: "Joshua", email: "sample@gmail.com", phone: "099238" },
    ];

    return (
        <div className="patient-records-container">
            <UserNavigationMenu />
            <DataTable data={ randomData } header={ sampleHeader } />
        </div>
    );
}

export default UserRecord;