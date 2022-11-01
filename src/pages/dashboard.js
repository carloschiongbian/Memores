import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { List, ListItem, Skeleton } from "@mui/material";

import GroupIcon from "@mui/icons-material/Group";
import HealingIcon from "@mui/icons-material/Healing";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";

import Layout from "../components/Layout";
import "../public/css/pages/Dashboard/Dashboard.scss";
import CommonModal from "../components/modal/CommonModal";
import DashboardChart from "../components/dashboard/DashboardChart.js";
import { useContext } from "react";
import AuthContext from "../auth/AuthContext";
import Api from "../services/api";

const SAD_CATEGORIES = {
  NORMAL: "Normal",
  MILD: "Mild",
  MODERATE: "Moderate",
  SEVERE: "Severe",
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [sadCategories, setSADCategories] = useState({
    normal: 0,
    mild: 0,
    moderate: 0,
    severe: 0,
  });
  const [patients, setPatients] = useState([]);
  const [assessedPatients, setAssessedPatients] = useState([]);
  const [screeningDetails, setScreeningDetails] = useState([]);
  const [openScreenedModal, setOpenScreenedModal] = useState(false);
  const authUser = useContext(AuthContext);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await Api().get("/@me");
        if (response.status === 200) {
          authUser.setUser(response.data);
          localStorage.setItem("isLogin", true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
    getDashboardData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let patientRecordsPath = "../patient-records";
  let patientDetailsPath = "../patient-details/id=";

  const getDashboardData = () => {
    fetch("/dashboard", {
      methods: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.log(error));
  };

  const setData = (data) => {
    setPatients(data.patients);
    setAssessedPatients(data.assessed_patients);
    getCategoryCount(data.screeningDetails);
  };

  const getCategoryCount = (data) => {

    //will fix the naming convention but the code works

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

  // const countScreenedPatients = (data) => {
  //   const is_screened = data.map((data) => data.is_screened === true);
  //   return is_screened.filter((data) => data === true);
  // };

  const handleModal = () => {
    setOpenScreenedModal(!openScreenedModal ? true : false);
  };

  return (
    <Layout>
      <div className="dashboard-container">
        <div className="dashboard">
          <div className="top-section">
            <div
              className="number-of-patients-container"
              onClick={() => navigate(patientRecordsPath)}
            >
              <h4>
                <GroupIcon /> Patients
              </h4>
              <h1>{patients.length}</h1>
            </div>

            <div
              onClick={() => handleModal()}
              className="number-of-patients-screened-container"
            >
              <h4>
                <MedicalServicesIcon /> Screened
              </h4>
              <h1>{assessedPatients.length}</h1>

              <CommonModal
                dialogTitle="Your Screened Patients"
                btnPrimaryText="Okay"
                width="800"
                handleSubmit={handleModal}
                openModal={openScreenedModal}
                handleClose={handleModal}
              >
                {assessedPatients.length !== 0 &&
                  assessedPatients.map((patient, index) => (
                      <ListItem
                        key={index}
                        divider={true}
                        button={true}
                        onClick={() => {
                          navigate(patientDetailsPath + patient.id);
                        }}
                        className="patient-information-item"
                      >
                        <div className="patient-name">
                          <h5>
                            {index + 1}) {patient.fname + " " + patient.lname}{" "}
                          </h5>
                        </div>
                      </ListItem>
                    )
                  )}
                {assessedPatients.length === 0 && (
                  <span style={{ color: "gray", fontSize: "15px" }}>
                    "No patients were screened yet"
                  </span>
                )}
              </CommonModal>
            </div>

            <div className="average-time-duration-of-screening-container">
              <h3>
                {" "}
                <HourglassBottomIcon /> Average screening time duration:{" "}
              </h3>
              {/* <h2 style={{float: 'left'}}>{patients.length !== 0 && patients[patients.length - 1].avg_time_duration}</h2>
              <span style={{fontSize: '14px'}}>Hours / minutes / seconds</span> */}
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
                {assessedPatients.length === 0 && (
                  <ListItem
                    style={{
                      margin: 0,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Skeleton height={100} width={"100%"} />
                    <Skeleton height={100} width={"100%"} />
                    <Skeleton height={100} width={"100%"} />
                  </ListItem>
                )}
                {assessedPatients.length !== 0 &&
                  assessedPatients.slice(0, 3).map((patient, index) => (
                    <ListItem
                      key={index}
                      divider={true}
                      button={true}
                      onClick={() => {
                        navigate(patientDetailsPath + patient.id);
                      }}
                      className="patient-information-item"
                    >
                      <div className="patient-name">
                        <NavigateNextIcon />

                        <h5> {patient.fname + " " + patient.lname} </h5>
                      </div>
                    </ListItem>
                  ))}

                {patients.length !== 0 && assessedPatients.length === 0 && (
                  <div
                    className="no-data"
                    style={{
                      display: "flex",
                      columnGap: "10px",
                      padding: "100px 0",
                      lineHeight: "normal",
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    <HealingIcon style={{ float: "left" }} />
                    <h6 style={{ color: "gray" }}>
                      None of your patients have been screened yet
                    </h6>
                  </div>
                )}
              </List>
            </div>

            <div className="graph-container">
              <DashboardChart
                normal={sadCategories.normal}
                mild={sadCategories.mild}
                moderate={sadCategories.moderate}
                severe={sadCategories.severe}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
