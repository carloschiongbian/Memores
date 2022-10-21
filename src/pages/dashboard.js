import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { List, ListItem, Skeleton } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import GroupIcon from "@mui/icons-material/Group";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";

import Layout from "../components/Layout";
import DashboardChart from "../components/dashboard/DashboardChart.js";
import "../public/css/pages/Dashboard/Dashboard.scss";

const Dashboard = () => {
  const navigate = useNavigate();
  const [dashboardContent, setDashboardContent] = useState([]);

  let path = "../patient-details/id=";

  useEffect(() => {
    fetch("/dashboard", {
      methods: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => setDashboardContent(response))
      .catch((error) => console.log(error));
    console.log(dashboardContent);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //GRAPH SHOWS NUMBER OF PATIENTS AND NUMBER OF PATIENTS SCREENED

  return (
    <Layout>
      <div className="dashboard-container">
        <div className="dashboard">
          <div className="top-section">
            <div className="number-of-patients-container">
              <h4>
                <GroupIcon /> Patients
              </h4>
              <h1>{dashboardContent.length}</h1>
            </div>

            <div className="number-of-patients-screened-container">
              <h4>
                <MedicalServicesIcon /> Screened
              </h4>
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

          <div className="bottom-section">
            <div
              className="recently-screened-patients-body">
              <List className="patients-list-container">
                <ListItem divider={true} className="patient-list-header">
                  <h5>Recently Screened Patients</h5>

                  <h6>
                    <Link to="/patient-records" style={{ textDecoration: "none" }}>
                      View All
                    </Link>
                  </h6>
                </ListItem>

                {dashboardContent.length === 0 && (
                  <ListItem style={{ margin: 0 }}>
                    <Skeleton height={150} width={"100%"} />
                  </ListItem>
                )}

                {dashboardContent &&
                  dashboardContent.map((patient) => (
                    <ListItem
                    divider={true}
                    button={true}
                    onClick={() => {
                        navigate(path + patient.id);
                    }}
                    className="patient-information-item"
                    >
                      <div className="patient-name">
                        <NavigateNextIcon />

                        <h5> {patient.fname + " " + patient.lname} </h5>
                      </div>

                      <div className="screening-information-summary">
                        <div className="screening-information-summary-date">
                          <h6> {patient.screened_date} </h6>
                        </div>

                        <div className="screening-information-summary-time">
                          {patient.screened_time}
                        </div>
                      </div>
                    </ListItem>
                  ))}
              </List>
            </div>

            <div className="graph-container">
                {/* <div className="graph-container-header">
                    Header
                </div> */}
              <DashboardChart />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
