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

  const parseDate = (date) => {
    if (date.length < 20) {
      const [dateValue, timeValue] = date.split(" ");
      return { dateValue: dateValue };
    } else {
      const [dayValue, day, dateNum, month, year, timeValue] = date.split(" ");
      return {
        monthFirst: {
          date: day,
          month: dateNum,
          year: month,
        },
      };
    }
  };

  const setData = (data) => {
    setPatients(data);
    getCategoryCount(data);
  };

  const checkIfScreened = () => {
    let count = 0;
    patients.map((patient) => (patient.is_screened === true ? count++ : null));

    return count > 0 ? true : false;
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
    const is_screened = data.map((data) => data.is_screened === true);
    return is_screened.filter((data) => data === true);
  };

  const handleModal = () => {
    setOpenScreenedModal(!openScreenedModal ? true : false);
  };

  const getScreenedPatients = () => {
    const screenedPatients = patients.filter(
      (patient) => patient.is_screened === true
    );

    if (screenedPatients.length > 0) {
      return {
        screenedPatients: screenedPatients,
        hasScreened: true,
      };
    } else {
      return {
        empty_message: "No patients were screened yet",
        hasScreened: false,
      };
    }
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
            <div
              className="number-of-patients-container"
              onClick={() => navigate(patientRecordsPath)}
            >
              <h4>
                <GroupIcon /> Patients
              </h4>
              <h1>{patients.length - 1}</h1>
            </div>

            <div
              onClick={() => handleModal()}
              className="number-of-patients-screened-container"
            >
              <h4>
                <MedicalServicesIcon /> Screened
              </h4>
              <h1>{countScreenedPatients(patients).length}</h1>

              <CommonModal
                dialogTitle="Your Screened Patients"
                btnPrimaryText="Okay"
                width="800"
                handleSubmit={handleModal}
                openModal={openScreenedModal}
                handleClose={handleModal}
              >
                {getScreenedPatients().hasScreened &&
                  getScreenedPatients().screenedPatients.map(
                    (patient, index) => (
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
                {!getScreenedPatients().hasScreened && (
                  <span style={{ color: "gray", fontSize: "15px" }}>
                    {getScreenedPatients().empty_message}
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
                {patients.length === 0 && (
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
                {patients.length !== 0 &&
                  checkIfScreened() &&
                  getScreenedPatients()
                    .screenedPatients.slice(0, 3)
                    .map((patient, index) => (
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

                        {/* <div className="screening-information-summary">
                        <div className="screening-information-summary-date"> */}
                        {/* <h6> {parseDate(patient.date_taken).dateValue} </h6> */}
                        {/* <span>{ parseDate(patient.date_taken).monthFirst.month +", "+ parseDate(patient.date_taken).monthFirst.date +", "+ parseDate(patient.date_taken).monthFirst.year}</span> */}
                        {/* </div>
                      </div> */}
                      </ListItem>
                    ))}

                {patients.length !== 0 && !checkIfScreened() && (
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
