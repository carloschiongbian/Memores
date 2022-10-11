import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import '../public/css/pages/Dashboard/Dashboard.css';

const Dashboard = () => {

    const [dashboardContent, setDashboardContent] = useState([])

    useEffect(() => {
        fetch('/dashboard', {
            methods: 'GET',
            headers: {
                'Access-Control-Allow-Origin':'*',
                'Content-Type': 'application/json'
            }
        }).then((response) =>
            response.json()
        ).then((response) =>
            setDashboardContent(response)
        ).catch((error) => 
            console.log(error)
        )
        console.log(dashboardContent)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    //GRAPH SHOWS NUMBER OF PATIENTS AND NUMBER OF PATIENTS SCREENED

    return (
        <Layout>
            <div className="dashboard-container">

                <div className="dashboard">

                    <div className="dashboard-menu">

                    <div className="number-of-patients-container">
                        <h3>Patients</h3>
                        <h1>{ dashboardContent.length }</h1>
                    </div>

                        <div className="number-of-patients-screened-container">
                            <h3>Screened</h3>
                            <h1>100</h1>
                        </div>

                        <div className="average-time-duration-of-screening-container">
                            <h3>Average Time Duration of Screening</h3>
                            <div className="average-time">
                                <div className="hours-number-format">
                                    <h1>0</h1>
                                </div>

                                <div className="minutes-number-format">
                                    <h1>46</h1>
                                </div>

                                <div className="seconds-number-format">
                                    <h1>21</h1>
                                </div>

                                <div className="hours-string-format">
                                    <h3>Hour(s)</h3>
                                </div>

                                <div className="minutes-string-format">
                                    <h3>Minutes</h3>
                                </div>

                                <div className="seconds-string-format">
                                    <h3>Seconds</h3>
                                </div>
                            </div>
                        </div> 
                    </div>

                    <div className="recently-screened-patients-container">
                        <div className="recently-screened-patients-header">
                            <label htmlFor="recently-screened-label">Recently Screened Patients</label>
                            <label htmlFor="view-all-hyperlink"><Link to="/patient-records">View All</Link></label>
                        </div>
                        {
                            dashboardContent.map((patient, index) => (
                                    <div className="recently-screened-patient-data" key={ index }>
                                        <div className="patient-profile">
                                            <div className="patient-name">
                                                { patient.fname + " " + patient.lname }
                                            </div>
                                        </div>

                                        <div className="screening-information-summary">
                                            <div className="screening-information-summary-date">
                                                { patient.screened_on }
                                            </div>

                                            <div className="screening-information-summary">
                                                <div className="screening-information-summary-date">
                                                    {patient.screeningDate}
                                                </div>

                                                <div className="screening-information-summary-time">
                                                    {patient.screeningTime}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        {/* </div> */}

                        <div className="graphical-representation-of-data-container">
                            <p>graphical-representation-of-data</p>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Dashboard;