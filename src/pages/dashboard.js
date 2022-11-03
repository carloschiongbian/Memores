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
  const [isLoading, setIsLoading] = useState(true);
  const [screenedPatients, setScreenedPatients] = useState([]);
  const [recentDuration, setRecentDuration] = useState();
  const [screeningDetails, setScreeningDetails] = useState([]);
  const [openScreenedModal, setOpenScreenedModal] = useState(false);
  const authUser = useContext(AuthContext);

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

  useEffect(() => {
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

    setIsLoading(false);
  };

  const setData = (data) => {
    setPatients(data.patients);
    setScreenedPatients(data.screened_patients);
    setScreeningDetails(data.screening_details);

    setAverageDuration(data.assessments);
    getCategoryCount(data.screening_details);
  };

  const setAverageDuration = (assessments) => {
    let hours = assessments.map((assessment) => {
      return (
        new Date(assessment.date_finished).getHours() -
        new Date(assessment.date_taken).getHours()
      );
    });

    let minutes = assessments.map((assessment) => {
      return (
        new Date(assessment.date_finished).getMinutes() -
        new Date(assessment.date_taken).getMinutes()
      );
    });

    let seconds = assessments.map((assessment) => {
      return (
        new Date(assessment.date_finished).getSeconds() -
        new Date(assessment.date_taken).getSeconds()
      );
    });

    let hoursSum = 0;
    let minutesSum = 0;
    let secondsSum = 0;

    for (const i in hours) {
      hoursSum += hours[i];
      minutesSum += minutes[i];
      secondsSum += seconds[i];
    }

    let hoursAvg = Math.floor((hoursSum / assessments.length / 60) % 60);
    let minutesAvg = Math.abs(
      Math.floor((minutesSum / assessments.length) % 60)
    );
    let secondsAvg = Math.floor(secondsSum / assessments.length);

    setRecentDuration(
      isNaN(hoursAvg)
        ? "None of your patients have been screened yet"
        : hoursAvg + ":" + minutesAvg + ":" + secondsAvg
    );
    // setRecentDuration(hoursAvg + ":" + minutesAvg + ":" + secondsAvg);
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
              <h1>{screenedPatients.length}</h1>

              <CommonModal
                dialogTitle="Your Screened Patients"
                btnPrimaryText="Okay"
                width="300"
                handleSubmit={handleModal}
                openModal={openScreenedModal}
                handleClose={handleModal}
              >
                {screenedPatients.length !== 0 &&
                  screenedPatients.map((patient, index) => (
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
                          {index + 1} {patient.fname + " " + patient.lname}{" "}
                        </h5>
                      </div>
                    </ListItem>
                  ))}
                {screenedPatients.length === 0 && (
                  <span style={{ color: "gray", fontSize: "15px" }}>
                    "No patients were screened yet"
                  </span>
                )}
              </CommonModal>
            </div>

            <div className="average-time-duration-of-screening-container">
              <h4>
                <HourglassBottomIcon /> Average screening time duration
              </h4>
              <h5 style={{ float: "left" }}>{recentDuration}</h5>
              <span style={{ fontSize: "14px" }}>
                Hours / minutes / seconds
              </span>
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
                {isLoading && (
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
                {!isLoading &&
                  screenedPatients.slice(0, 3).map((patient, index) => (
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

                {!isLoading && screenedPatients.length === 0 && (
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
