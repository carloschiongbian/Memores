import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Api from "../services/api";
import "../public/css/pages/PatientDetails/index.css";

const PatientDetails = () => {
  // const { id } = useParams();
  // const [open, setOpen] = useState(false);
  // const [isScreened, setIsScreened] = useState(false);
  // const [patientDetails, setPatientDetails] = useState([]);
  // const [assessmentDetails, setAssessmentDetails] = useState([]);
  // const [screeningDetails, setScreeningDetails] = useState([]);

  // const parseDate = (date) => {

  //   const [year, month, day] = date.split(/[T -]/); 

  //   const dateValue = month + "/" + day + "/" + year;
  //   return dateValue;
  // };

  // const setData = async (data) => {
  //   setPatientDetails(data.patients[0]);
  //   setScreeningDetails(data.screeningDetails[0]);
  //   setAssessmentDetails(data.assessment.length > 0 ? data.assessment[0] : []);

  //   setIsScreened(data.assessment.length > 0 ? true : false);
  // };

  // const getPatientDetails = async () => {
  //   const response = await Api().get("/patient-details/id=" + id)
  //   if(response.status === 200) {
  //     console.log(response.data)
  //     setData(response.data)
  //   }
  // };

  // useEffect(() => {
  //   getPatientDetails();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // const stringAvatar = (name) => {
  //   return {
  //     children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  //   };
  // };

  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [patient, setPatient] = useState({
    id: null,
    assessment_id: null,
    fname: '',
    lname: '',
    fullname: '',
    email: '',
    phone: '',
    age: '',
    bday: '',
    gender: '',
    street: '',
    city: '',
    zip: '',
    country: '',
    registered_date: '',
    prediction_result: null,
    classification_probability: null,
    result_description: null,
    date_taken: null,
    date_finished: null,
    patient_notes: '',
    last_edited_on: null
  })

  const formatNotes = (text) => {
    let x = text.replace(/(\\r)*\\n/g, '<br>');
    return JSON.parse(x);
  }

  const formatDate = (date) => {

    if (date === null)
      return 'N/A'

    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    let d = new Date(date);
    let hours = d.getHours()
    let minutes = d.getMinutes()
    let seconds = d.getSeconds()

    let time;
    if (hours > 0 && hours <= 12) {
      time = '' + hours
    } else if (hours > 12) {
      time = '' + (hours - 12)
    } else if (hours === 0) {
      time = '12'
    }

    time += (minutes < 10) ? ':0' + minutes : ':' + minutes;  // get minutes
    time += (seconds < 10) ? ':0' + seconds : ':' + seconds;  // get seconds
    time += (hours >= 12) ? ' P.M.' : ' A.M.';  // get AM/PM

    return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()} ${time}`;
  }

  useEffect(() => {
    Api().get(`/get-patient-details/id=${id}`)
      .then((res) => {
        console.log(res.data)
        setPatient(res.data)
        setIsLoading(false)
      })
      .catch(() => {
        console.log('error getting patient details.')
        setIsLoading(false)
      })
  }, [])

  const [isEdittable, setIsEdittable] = useState(false);
  const [isNotesEdittable, setIsNotesEdittable] = useState(false);

  const handleDiscardChanges = () => {
    setIsEdittable(false);
  };

  const handleDiscardNotesChanges = () => {
    setIsNotesEdittable(false);
  }

  const handleEllipsis = (text, maxLength) => {
    if (text.length > maxLength) {
      let newText = text.slice(0, maxLength - 3);
      return newText + '...';
    }
    return text;
  }

  return (
    <Layout>
      <div className="container">

        {/* Sub Nav: Breadcrumbs + Buttons */}
        <nav
          aria-label="breadcrumb"
          className="py-4 border-bottom d-flex justify-content-between flex-grow-1 flex-wrap"
        >
          {/* Breadcrumb */}
          <div className="d-flex align-items-end">
            <nav aria-label="breadcrumb" className="breadcrumb-should-show">
              <ol className="breadcrumb mb-0">
                <li className="breadcrumb-item">
                  <Link to={'/patient-records'} className="text-decoration-none">
                    Patient Records
                  </Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  {handleEllipsis(patient.fullname, 20)}
                </li>
              </ol>
            </nav>
          </div>

          {/* Print and Edit Button */}
          <div className="d-flex">
            <button className="btn btn-outline-primary me-2">
              <span>
                <i className="bi bi-printer-fill"></i>
              </span>
            </button>

            {!isEdittable && (
              <button className="btn btn-primary ms-2" onClick={() => setIsEdittable(true)}>
                <span className="me-2">
                  <i className="bi bi-pencil-square"></i>
                </span>
                Edit Patient
              </button>
            )}

            {isEdittable && (
              <div>
                <button className="btn btn-danger ms-2" onClick={handleDiscardChanges}>
                  <span>
                    <i className="bi bi-x-lg"></i>
                  </span>
                </button>
                <button className="btn btn-success ms-2">
                  <span>
                    <i className="bi bi-check-lg"></i>
                  </span>
                </button>
              </div>
            )}
          </div>
        </nav>

        <section className="py-4 mb-4">
          <div className="row">

            {/* Left Section */}
            <div className="col-12 col-lg-8">

              {/* Image + Personal Details */}
              <div className="row bg-white rounded-4 py-2">

                <div className="col-12 col-md-4 mt-4 mt-lg-0 d-flex flex-column align-items-center justify-content-center">
                  <div className="d-flex align-items-center justify-content-center border p-1 border-primary rounded-circle bg-primary p-0" height="120" width="120" style={{ minHeight: "175px", minWidth: "175px" }}>
                    <h1 className="mb-0 text-white" style={{ 'fontSize': '4.275rem' }}>{patient.fname[0]}{patient.lname[0]}</h1>
                  </div>
                  <p className="mb-0 mt-2 fw-bold fs-4 text-center">
                    {handleEllipsis(patient.fullname, 20)}
                  </p>
                </div>

                <div className="col-12 col-md-8 px-0">
                  <form className="row mx-2 my-4">
                    <div className="col-md-6">
                      <label htmlFor="firstName" className="form-label">First Name</label>
                      <input type="text" className="form-control" id="firstName" readOnly={!isEdittable} value={patient.fname} />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="lastName" className="form-label">Last Name</label>
                      <input type="text" className="form-control" id="lastName" placeholder="test hello" readOnly={!isEdittable} value={patient.lname} />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="gender" className="form-label">Gender</label>
                      <select id="gender" className="form-select" disabled={!isEdittable} value={patient.gender}>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="birthday" className="form-label">Birthday</label>
                      <input type="date" className="form-control" id="birthday" readOnly={!isEdittable} max={new Date().toISOString().substring(0, 10)} value={patient.bday} />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="contact" className="form-label">Contact Number</label>
                      <input type="text" className="form-control" id="contact" readOnly={!isEdittable} value={patient.phone} />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="street" className="form-label">Street</label>
                      <input type="text" className="form-control" id="street" readOnly={!isEdittable} value={patient.street} />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="city" className="form-label">City</label>
                      <input type="text" className="form-control" id="city" readOnly={!isEdittable} value={patient.city} />
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="country" className="form-label">Country</label>
                      <select id="country" className="form-select" disabled={!isEdittable} value={patient.country}>
                        <option value='southKorea'>South Korea</option>
                        <option value='usa'>United States of America</option>
                        <option value='japan'>Japan</option>
                        <option value='philippines'>Philippines</option>
                      </select>
                    </div>
                    <div className="col-md-2">
                      <label htmlFor="zip" className="form-label">Zip</label>
                      <input type="text" className="form-control" id="zip" readOnly={!isEdittable} value={patient.zip} />
                    </div>
                  </form>
                </div>
              </div>

              {/* Additional Details */}
              <div className="row mt-3">
                <div className="col bg-white rounded-4 px-4 pt-4 pb-2 ">

                  <div className="border-bottom mb-4 pb-2 d-flex align-items-center justify-content-between">
                    <h5 className="fw-bold mb-0">Additional Details</h5>
                    <button className="btn btn-outline-primary">
                      <span>
                        <i className="bi bi-printer-fill"></i>
                      </span>
                    </button>
                  </div>

                  <div className="row">

                    <div className="col-12 col-md-7 pt-2">
                      <p className="fw-bold mb-3">Assessment Logs</p>

                      <div className="accordion mb-4" id="accordion">
                        <div className="accordion-item">
                          <h2 className="accordion-header" id="headingOne">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                              Section 1: Demographic
                            </button>
                          </h2>
                          <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordion">
                            <div className="accordion-body">
                              <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element.
                            </div>
                          </div>
                        </div>
                        <div className="accordion-item">
                          <h2 className="accordion-header" id="headingTwo">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                              Section 2: Emotional Symptoms
                            </button>
                          </h2>
                          <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordion">
                            <div className="accordion-body">
                              <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element.
                            </div>
                          </div>
                        </div>
                        <div className="accordion-item">
                          <h2 className="accordion-header" id="headingThree">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                              Section 3: Physical Symptoms
                            </button>
                          </h2>
                          <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordion">
                            <div className="accordion-body">
                              <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element.
                            </div>
                          </div>
                        </div>
                        <div className="accordion-item">
                          <h2 className="accordion-header" id="headingFour">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                              Section 4: Liebowitz Social Anxiety Scale
                            </button>
                          </h2>
                          <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordion">
                            <div className="accordion-body">
                              <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element.
                            </div>
                          </div>
                        </div>
                        <div className="accordion-item">
                          <h2 className="accordion-header" id="headingFive">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                              Section 5: Social Phobia Inventory
                            </button>
                          </h2>
                          <div id="collapseFive" className="accordion-collapse collapse" aria-labelledby="headingFive" data-bs-parent="#accordion">
                            <div className="accordion-body">
                              <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-122 col-md-5 pt-2">
                      <p className="fw-bold mb-1">Screening Result</p>
                      <div className="d-flex justify-content-center">
                        <table className="table w-100 fs-4">
                          <thead className="text-center">
                            <tr className="fs-6">
                              <th>Classification</th>
                              <th>Probability</th>
                            </tr>
                          </thead>
                          <tbody className="text-center fw-bold">
                            <tr className="text-success">
                              <td>positive</td>
                              <td>23%</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <p className="text-justify">
                        Based on the screening test, the result for{" "}
                        <span className="text-primary fw-bold">Velvet Crowe</span>{" "}DOES show a{" "}
                        <span
                          className="fw-bold text-success">
                          manifestation of social anxiety disorder
                        </span>{" "}
                        with a prediction probability of{" "}
                        <span className="fw-bold text-success">
                          29%
                        </span>
                        .
                      </p>
                    </div>

                  </div>

                </div>
              </div>

            </div>

            {/* Right Section */}
            <div className="col-12 col-lg-4 mt-3 mt-lg-0 px-0 px-lg-2">
              <div className="bg-white rounded-4 px-4 pt-4 pb-2 h-100">


                <div className="d-flex flex-column h-100">
                  <div className="border-bottom mb-4 pb-2 d-flex align-items-center justify-content-between">
                    <h5 className="fw-bold mb-0">Notes</h5>

                    {!isNotesEdittable && (
                      <button className="btn btn-primary" onClick={() => setIsNotesEdittable(true)} disabled={patient.assessment_id === null}>
                        <span>
                          <i className="bi bi-pencil-square"></i>
                        </span>
                      </button>
                    )}

                    {isNotesEdittable && (
                      <div>
                        <button className="btn btn-danger ms-2" onClick={handleDiscardNotesChanges}>
                          <span>
                            <i className="bi bi-x-lg"></i>
                          </span>
                        </button>
                        <button className="btn btn-success ms-2">
                          <span>
                            <i className="bi bi-check-lg"></i>
                          </span>
                        </button>
                      </div>
                    )}
                  </div>

                  {patient.assessment_id === null && (<div className='alert alert-primary alert-dismissible fade show' role="alert">
                        You can only add or update this section once the patient is already screened.
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                      </div>)}

                  <div className="flex-grow-1">
                    <textarea className="form-control text-area-scrollbar" id="floatingTextarea2" style={{ "height": "100%", "minHeight": "250px", "resize": "none" }} disabled={!isNotesEdittable} defaultValue={patient.patient_notes}>
                    </textarea>

                  </div>
                  <p className="fs-7 pt-3">
                    <span className="fw-bold">Last edited on:</span> <span className="text-black-50">{formatDate(patient.last_edited_on)}</span>
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default PatientDetails;
