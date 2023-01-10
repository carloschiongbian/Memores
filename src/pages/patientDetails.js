import Layout from "../components/Layout";
import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import Api from "../services/api";
import "../public/css/pages/PatientDetails/index.css";
import countriesSelect from "../components/countriesSelect";
import PersonalDetailsSkeleton from "../components/patientDetails/personalDetailsSkeleton";
import TextSkeleton from "../components/patientDetails/textSkeleton";
import ServerError from "../components/serverError";

const PatientDetails = () => {
  const { id } = useParams()
  const alertRef = useRef(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isEdittable, setIsEdittable] = useState(false)
  const [isNotesEdittable, setIsNotesEdittable] = useState(false)
  const [isSubmittingPatientDetails, setIsSubmittingPatientDetails] = useState(false)
  const [isSubmittingNotes, setIsSubmittingNotes] = useState(false)
  const [hasErrorDuringPageLoad, setHasErrorDuringPageLoad] = useState(false)
  const [alertMessage, setAlertMessage] = useState({
    message: '',
    icon: '',
    type: ''
  })
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
  const [currentPatientPersonalDetails, setCurrentPatientPersonalDetails] = useState({
    id: null,
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
    country: ''
  })
  const [currentPatientNotesInfo, setCurrentPatientNotesInfo] = useState({
    patient_notes: '',
    last_edited_on: null
  })

  const handleEllipsis = (text, maxLength) => {
    if (text.length > maxLength) {
      let newText = text.slice(0, maxLength - 3);
      return newText + '...';
    }
    return text;
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

  const handleDetailsChange = (e, whichInfo) => {
    if (whichInfo === 'personalDetails') {

      if (e.target.name === 'phone') {
        e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 11)
      }
      const x = { ...currentPatientPersonalDetails, [e.target.name]: e.target.value }
      x.fullname = x.fname + ' ' + x.lname
      setCurrentPatientPersonalDetails(x)
    } else if (whichInfo === 'notes') {
      setCurrentPatientNotesInfo({
        ...currentPatientNotesInfo,
        patient_notes: e.target.value
      })
    }
  }

  const handleDiscardChanges = () => {
    // get previous value of the patient details
    // using the patient object
    const x = {
      id: patient.id,
      fname: patient.fname,
      lname: patient.lname,
      fullname: patient.fullname,
      email: patient.email,
      gender: patient.gender,
      bday: patient.bday,
      phone: patient.phone,
      street: patient.street,
      city: patient.city,
      country: patient.country,
      zip: patient.zip
    }
    setCurrentPatientPersonalDetails(x)
    setIsEdittable(false);
  };

  const handleDiscardNotesChanges = () => {
    // get previous value of the patient notes
    // using the patient object
    const x = {
      patient_notes: patient.patient_notes,
      last_edited_on: patient.last_edited_on
    }
    setCurrentPatientNotesInfo(x)
    setIsNotesEdittable(false);
  }

  const showAlertEffect = () => {
    alertRef.current.style.visibility = 'visible'
    alertRef.current.style.opacity = '1'
    setTimeout(() => {
      alertRef.current.style.visibility = 'hidden'
      alertRef.current.style.opacity = '0'
    }, 2500)
  }

  const saveToDatabase = async (data, url, successAlertObj, failedAlertObj) => {
    try {
      const res = await Api().put(url, data)
      if (res.status === 200) {
        setAlertMessage(successAlertObj)
        return true
      } else {
        setAlertMessage(failedAlertObj)
        return false
      }
    } catch (error) {
      setAlertMessage({
        message: "Cannot Perform Action! Internal Server Error.",
        icon: 'bi bi-exclamation-triangle',
        type: 'alert-danger'
      })
      return false
    }
  }

  const handleSubmitNewDetails = async () => {
    console.log(currentPatientPersonalDetails)
    const successAlertMessage = {
      message: "Patient's information is successfully updated!",
      icon: 'bi bi-check-circle',
      type: 'alert-success'
    }
    const failedAlertMessage = {
      message: "Cannot Perform Action! Patient's information is not updated.",
      icon: 'bi bi-check-circle',
      type: 'alert-danger'
    }
    setIsSubmittingPatientDetails(true)

    // If save is successful, set the patient to the latest
    // and close the form. Otherwise, do not save and do not close the form.
    const isSaved = await saveToDatabase(currentPatientPersonalDetails,
      '/update-patient-details', successAlertMessage, failedAlertMessage)
    if (isSaved) {
      const latestPatientDetails = {
        ...patient, ...currentPatientPersonalDetails
      }
      setPatient(latestPatientDetails)
      setIsEdittable(false)
    }

    showAlertEffect()
    setIsSubmittingPatientDetails(false)
  }

  const handleSubmitNewNotes = async () => {
    const successAlertMessage = {
      message: "Notes is successfully updated!",
      icon: 'bi bi-check-circle',
      type: 'alert-success'
    }
    const failedAlertMessage = {
      message: "Cannot Perform Action! Notes is not updated.",
      icon: 'bi bi-check-circle',
      type: 'alert-danger'
    }
    setIsSubmittingNotes(true)

    // If save is successful, set the patient to the latest
    // and close the form. Otherwise, do not save and do not close the form.
    const latest = {
      assessment_id: patient.assessment_id,
      ...currentPatientNotesInfo,
      last_edited_on: new Date().toISOString()
    }
    const isSaved = await saveToDatabase(latest, '/update-patient-notes',
      successAlertMessage, failedAlertMessage)
    if (isSaved) {
      const latestPatientDetails = {
        ...patient, ...latest
      }
      setPatient(latestPatientDetails)
      setIsNotesEdittable(false)
    }

    showAlertEffect()
    setIsSubmittingNotes(false)
  }

  useEffect(() => {
    Api().get(`/get-patient-details/id=${id}`)
      .then((res) => {
        const patientDetails = {
          id: res.data.id,
          fname: res.data.fname,
          lname: res.data.lname,
          fullname: res.data.fullname,
          email: res.data.email,
          phone: res.data.phone,
          age: res.data.age,
          bday: res.data.bday,
          gender: res.data.gender,
          street: res.data.street,
          city: res.data.city,
          zip: res.data.zip,
          country: res.data.country
        }
        setPatient(res.data)
        setCurrentPatientPersonalDetails(patientDetails)
        setCurrentPatientNotesInfo({
          patient_notes: res.data.patient_notes,
          last_edited_on: res.data.last_edited_on
        })
        setIsLoading(false)
      })
      .catch(() => {
        console.log('error getting patient details.')
        setHasErrorDuringPageLoad(true)
        setIsLoading(false)
      })
  }, [id])


  return (
    <Layout>
      {
        (hasErrorDuringPageLoad && <ServerError></ServerError> ) || 
      <div className="container">

        {/* Alert: Success and Error */}
        <div ref={alertRef} className={`alert ${alertMessage.type} position-fixed mb-0`} role="alert" style={{ 'zIndex': '10000', 'top': '5%', 'left': '40%', 'visibility': 'hidden', 'opacity': '0', 'transition': 'visibility 1s, opacity 0.4s linear' }}>
          <p className="mb-0 align-middle"><i className={`${alertMessage.icon} fs-5 me-2 align-middle`}></i> {alertMessage.message}</p>
        </div>

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
                  {handleEllipsis(patient.fullname || 'N/A', 20)}
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
                    <i className="bi bi-x-lg"></i> Discard
                  </span>
                </button>
                <button className="btn btn-success ms-2" onClick={handleSubmitNewDetails}>
                  <span>
                    {
                      (isSubmittingPatientDetails && <span className={`spinner-border spinner-border-sm me-2`} role="status" aria-hidden="true"></span>) || <i className="bi bi-check-lg me-1"></i>
                    }
                    Save Changes
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
              {
                (isLoading && <PersonalDetailsSkeleton></PersonalDetailsSkeleton>) ||
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
                      <div className="col-md-6 mb-1">
                        <label htmlFor="firstName" className="form-label">First Name</label>
                        <input type="text" className="form-control" id="firstName" name="fname" onInput={(e) => handleDetailsChange(e, 'personalDetails')} readOnly={!isEdittable} value={currentPatientPersonalDetails.fname} />
                      </div>
                      <div className="col-md-6 mb-1">
                        <label htmlFor="lastName" className="form-label">Last Name</label>
                        <input type="text" className="form-control" id="lastName" name="lname" onInput={(e) => handleDetailsChange(e, 'personalDetails')} placeholder="test hello" readOnly={!isEdittable} value={currentPatientPersonalDetails.lname} />
                      </div>
                      <div className="col-12 mb-1">
                        <label htmlFor="email" className="form-label">Email Address</label>
                        <input type="text" className="form-control" id="email" name="email" onInput={(e) => handleDetailsChange(e, 'personalDetails')} readOnly={!isEdittable} value={currentPatientPersonalDetails.email} />
                      </div>
                      <div className="col-md-6 mb-1">
                        <label htmlFor="gender" className="form-label">Gender</label>
                        <select id="gender" className="form-select" name="gender" onInput={(e) => handleDetailsChange(e, 'personalDetails')} disabled={!isEdittable} value={currentPatientPersonalDetails.gender}>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </select>
                      </div>
                      <div className="col-md-6 mb-1">
                        <label htmlFor="birthday" className="form-label">Birthday</label>
                        <input type="date" className="form-control" id="birthday" name="bday" onInput={(e) => handleDetailsChange(e, 'personalDetails')} readOnly={!isEdittable} max={new Date().toISOString().substring(0, 10)} value={currentPatientPersonalDetails.bday} />
                      </div>
                      <div className="col-md-6 mb-1">
                        <label htmlFor="contact" className="form-label">Contact Number</label>
                        <input type="text" className="form-control" id="contact" name="phone" onInput={(e) => handleDetailsChange(e, 'personalDetails')} readOnly={!isEdittable} value={currentPatientPersonalDetails.phone} />
                      </div>
                      <div className="col-md-6 mb-1">
                        <label htmlFor="street" className="form-label">Street</label>
                        <input type="text" className="form-control" id="street" name="street" onInput={(e) => handleDetailsChange(e, 'personalDetails')} readOnly={!isEdittable} value={currentPatientPersonalDetails.street} />
                      </div>
                      <div className="col-md-6 mb-1">
                        <label htmlFor="city" className="form-label">City</label>
                        <input type="text" className="form-control" id="city" name="city" onInput={(e) => handleDetailsChange(e, 'personalDetails')} readOnly={!isEdittable} value={currentPatientPersonalDetails.city} />
                      </div>
                      <div className="col-md-4 mb-1">
                        <label htmlFor="country" className="form-label">Country</label>
                        <select id="country" className="form-select" name="country" onInput={(e) => handleDetailsChange(e, 'personalDetails')} disabled={!isEdittable} value={currentPatientPersonalDetails.country}>
                          {countriesSelect.map((country) => (
                            <option key={country.value} value={country.label}>{country.label}</option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-2 mb-1">
                        <label htmlFor="zip" className="form-label">Zip</label>
                        <input type="text" className="form-control" id="zip" name="zip" onInput={(e) => handleDetailsChange(e, 'personalDetails')} readOnly={!isEdittable} value={currentPatientPersonalDetails.zip} />
                      </div>
                    </form>
                  </div>
                </div>
              }

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

                  {
                    (isLoading && <TextSkeleton rows={10}></TextSkeleton>) ||
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
                  }

                </div>
              </div>

            </div>

            {/* Right Section */}
            <div className="col-12 col-lg-4 mt-3 mt-lg-0 px-0 px-lg-2">
              <div className="bg-white rounded-4 px-4 pt-4 pb-2 h-100">

                {
                  (isLoading && <TextSkeleton rows={18}></TextSkeleton>) ||
                  (<div className="d-flex flex-column h-100">
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
                          <button className="btn btn-success ms-2" onClick={handleSubmitNewNotes}>
                            <span>
                              {
                                (isSubmittingNotes && <span className={`spinner-border spinner-border-sm`} role="status" aria-hidden="true"></span>) || <i className="bi bi-check-lg"></i>
                              }
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
                      <textarea className="form-control text-area-scrollbar" id="patient_notes" name="patient_notes" onInput={(e) => handleDetailsChange(e, 'notes')} style={{ "height": "100%", "minHeight": "250px", "resize": "none" }} disabled={!isNotesEdittable} value={currentPatientNotesInfo.patient_notes}>
                      </textarea>
                    </div>

                    <p className="fs-7 pt-3">
                      <span className="fw-bold">Last edited on:</span> <span className="text-black-50">{formatDate(patient.last_edited_on)}</span>
                    </p>
                  </div>)
                }
              </div>

            </div>
          </div>
        </section>
      </div>
      }
    </Layout>
  );
};

export default PatientDetails;
