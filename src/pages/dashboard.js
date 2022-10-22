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

const SAD_CATEGORIES = {
  NORMAL: "Normal",
  MILD: "Mild",
  MODERATE: "Moderate",
  SEVERE: "Severe",
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [sadCategories, setSADCategories] = useState({
    normal: 1,
    mild: 1,
    moderate: 1,
    severe: 1,
  });
  const [dashboardContent, setDashboardContent] = useState([]);

  let path = "../patient-details/id=";

  const getDashboardData = () => {
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

    getCategoryCount(dashboardContent);
  };

  const getCategoryCount = (data) => {
    const countCategory = (patients, sadCategory) => {
      const categories = patients.filter((data) => {
        return data.sad_category === sadCategory;
      });
      return categories.length;
    };

    setSADCategories({
      ...sadCategories,
      normal: countCategory(data, SAD_CATEGORIES.NORMAL),
      mild: countCategory(data, SAD_CATEGORIES.MILD),
      moderate: countCategory(data, SAD_CATEGORIES.MODERATE),
      severe: countCategory(data, SAD_CATEGORIES.SEVERE),
    });
  };

  const countScreenedPatients = (data) => {
    let True = 1;
    const is_screened = data.map((data) => 
      data.is_screened === True
    );
    
    return is_screened.filter(data => data === true)
  };

  useEffect(() => {
    getDashboardData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
              <h1>{countScreenedPatients(dashboardContent).length}</h1>
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
            <div className="recently-screened-patients-body">
              <List className="patients-list-container">
                <ListItem divider={true} className="patient-list-header">
                  <h5>Recently Screened Patients</h5>

                  <h6>
                    <Link
                      to="/patient-records"
                      style={{ textDecoration: "none" }}
                    >
                      View All
                    </Link>
                  </h6>
                </ListItem>

                {dashboardContent.length === 0 && (
                  <ListItem
                    style={{
                      margin: 0,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Skeleton height={100} width={"100%"} />
                    <Skeleton height={100} width={"100%"} />
                    <Skeleton height={100} width={"100%"} />
                  </ListItem>
                )}

                {dashboardContent &&
                  dashboardContent.slice(0, 3).map((patient, index) => (
                    <ListItem
                      key={index}
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
              <DashboardChart sadCategories={sadCategories} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
