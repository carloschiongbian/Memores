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
  const [recentDuration, setRecentDuration] = useState();
  const [screenedPatients, setScreenedPatients] = useState([]);
  const [nonScreenedPatients, setNonScreenedPatients] = useState([]);
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

  const getDashboardData = async () => {
    const response = await Api().get("/dashboard");
    if (response.status === 200) {
      setData(response.data);
      setIsLoading(false);
    }
  };

  const setData = (data) => {

    const patients = data.patients
    const assessments = data.assessments

    setPatients(data.patients);
    setScreenedPatients(data.screened_patients);

    const difference = [
      ...getDifference(patients, assessments)
    ]
    setNonScreenedPatients(difference)

    setAverageDuration(data.assessments);
    getCategoryCount(data.screening_details);
  };

  const getDifference = (patients, assessments) => {
    return patients.filter(patient => {
      return !assessments.some(assessment => {
        return patient.id === assessment.patient_id;
      })
    })
  }

  const formatTo2Digits = (num) => {
    return num.toString().padStart(2, '0');
  }

  const setAverageDuration = (assessments) => {
    let milliseconds = 0
    assessments.map(assessment => {
      milliseconds += ((new Date(assessment.date_finished).getTime() - new Date(assessment.date_taken).getTime()) / 1000)
    })
    
    
    let avgMilliseconds = milliseconds / assessments.length
 
    let second = Math.floor(avgMilliseconds/1000)
    let minute = Math.floor(second/60)
    let hour = Math.floor(minute/60)

    second = second % 60
    minute = minute % 60
    hour = hour % 24

    setRecentDuration(formatTo2Digits(hour) + ' : ' + formatTo2Digits(minute) + ' : ' + formatTo2Digits(second))
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
            >
              <h4>
                <GroupIcon /> Patients
              </h4>
              <h1>{patients.length}</h1>
            </div>

            <div
              className="number-of-patients-screened-container"
            >
              <h4>
                <MedicalServicesIcon /> Screened
              </h4>
              <h1>{screenedPatients.length}</h1>
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

            <List className="patients-list-container">
              <ListItem divider={true} className="patient-list-header">
                <h5>Patients To Be Screened</h5>
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
                nonScreenedPatients.length !== 0 &&
                nonScreenedPatients.map((patient, index) => (
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

              {!isLoading && nonScreenedPatients.length === 0 && (
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
                    You currently have no patients registered.
                  </h6>
                </div>
              )}
            </List>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
