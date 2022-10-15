import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { List, ListItem } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import GroupIcon from '@mui/icons-material/Group';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';

import Layout from '../components/Layout';
import '../public/css/pages/Dashboard/Dashboard.scss';

const Dashboard = () => {

    const navigate = useNavigate()
    const [dashboardContent, setDashboardContent] = useState([])
    
    let path = '../patient-details/id='

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
                        <h4><GroupIcon />  Patients</h4>
                        <h1>{ dashboardContent.length }</h1>
                    </div>

                        <div className="number-of-patients-screened-container">
                            <h4><MedicalServicesIcon /> Screened</h4>
                            <h1>100</h1>
                        </div>

                        <div className="average-time-duration-of-screening-container">
                            <h4>Average Time Duration of Screening</h4>
                            <div className="average-time">
                                <div className="hours-number-format">
                                    <h2>0</h2>
                                </div>

                                <div className="minutes-number-format">
                                    <h2>46</h2>
                                </div>

                                <div className="seconds-number-format">
                                    <h2>21</h2>
                                </div>

                                <div className="hours-string-format">
                                    <h3>Hour(s)</h3>
                                </div>

                                <div className="minutes-string-format">
                                    <h3>Minute(s)</h3>
                                </div>

                                <div className="seconds-string-format">
                                    <h3>Second(s)</h3>
                                </div>
                            </div>
                        </div> 
                    </div>

                    <div 
                        className="recently-screened-patients-container" 
                        style={{
                            display: 'grid',
                            borderRadius: '10px',
                            margin: '0 20px 90px 20px', 
                            columnGap: '10px',
                            gridTemplateColumns: '1fr 1fr',
                            paddingBottom: '20px'
                        }}
                    >
                        
                        <div 
                            className="recently-screened-patients-body" 
                            style={{
                                borderRadius: '10px', 
                                backgroundColor: 'white',
                            }}
                        >

                            {/* <div 
                                className="recently-screened-patients-header"
                                style={{
                                    padding: '20px',
                                    display: 'flex',
                                    borderBottom: '1px solid grey',
                                    justifyContent: 'space-between',
                                }}
                            > */}
                            <List style={{padding: '0'}}>
                                <ListItem
                                    divider={true}
                                    style={{display: 'flex', justifyContent: 'space-between', padding: '20px'}}
                                > 
                                    <h5 style={{margin: '0'}}>Recently Screened Patients</h5>
                                    <h5 style={{margin: '0'}}><Link to="/patient-records" style={{textDecoration: 'none'}}>View All</Link></h5>
                                </ListItem>
                            {/* </div> */}
                                {dashboardContent &&
                                    dashboardContent.map((patient) => (
                                        <ListItem 
                                            style={{display: 'flex', justifyContent: 'space-between', padding: '15px 10px'}}
                                            divider={true}
                                            button={true}
                                            onClick={() => {
                                                navigate(path + patient.id)
                                            }}
                                        >
                                            <div className="patient-name" style={{display: 'flex', columnGap: '5px', justifyContent: 'center'}}>                                                
                                                <NavigateNextIcon />
                                                <h5 style={{margin: '0'}}>{ patient.fname + " " + patient.lname }</h5>
                                            </div>   
                                            <div 
                                                className="screening-information-summary"
                                                style={{display: 'flex', flexDirection: 'row'}}
                                            >
                                                <div className="screening-information-summary-date">
                                                    <h6 style={{margin: '0'}}> { patient.screened_date } </h6>
                                                </div>

                                                <div className="screening-information-summary-time">
                                                    { patient.screened_time }
                                                </div>
                                                
                                            </div> 
                                        </ListItem>
                                        // <div 
                                        //     className="recently-screened-patient-data" 
                                        //     key={ index }
                                        //     style={{
                                        //         display: 'flex',                    
                                        //         flexDirection: 'row',
                                        //         justifyContent: 'space-between',
                                        //         alignItems: 'center',
                                        //         padding: '15px 35px 15px 35px',
                                        //         borderBottom: '1px solid rgb(167, 165, 165)'
                                        //     }}
                                        // >
                                        //     <div className="patient-profile">
                                        //         <div className="patient-name">
                                        //             { patient.fname + " " + patient.lname }
                                        //         </div>
                                        //     </div>
                                        // </div>
                                    ))
                                }     
                            </List>                       
                        </div>
                        
                        <div 
                            className="graphical-representation-of-data-container" 
                            style={{
                                backgroundColor: 'white',
                                borderRadius: '10px'
                            }}
                        >
                            <p>graphical-representation-of-data</p>
                        </div>
                    </div>
                    
                </div>
            </div>
        </Layout>
    );
}

export default Dashboard;