import ScreeningWizard from '../components/screening/screeningWizard'
import '../public/css/pages/ScreeningPage/index.css'
import { useState } from 'react'
import { AnswerContext } from '../components/screening/AnswerContext'
import Layout from '../components/Layout'


const ScreeningPage = () => {


    const [answers, setAnswers] = useState({})
    const [rowSelected, setRowSelected] = useState(null)

    const handleSelection = (key) => {
        setRowSelected(key)
    }

    const handleStartScreening = () => {
        setRowSelected(null)
    }

    const patients = [
        {
            id: 1,
            firstName: "Shionne",
            lastName: "Imerys"
        },
        {
            id: 2,
            firstName: "Velvet",
            lastName: "Crowe"
        },
        {
            id: 3,
            firstName: "Shionne",
            lastName: "Imerys"
        },
        {
            id: 4,
            firstName: "Edna",
            lastName: "Hershel"
        },
        {
            id: 5,
            firstName: "Eleanor",
            lastName: "Hume"
        },
        {
            id: 6,
            firstName: "Celica",
            lastName: "Crowe"
        },
        {
            id: 7,
            firstName: "Artorius",
            lastName: "Collbrande"
        },
        {
            id: 8,
            firstName: "Melchior",
            lastName: "Mayvin"
        },
        {
            id: 9,
            firstName: "Oscar",
            lastName: "Dragonia"
        },
        {
            id: 10,
            firstName: "Teresa",
            lastName: "Linares"
        },
        {
            id: 11,
            firstName: "Van",
            lastName: "Aifread"
        },
        {
            id: 12,
            firstName: "Laphicet",
            lastName: "Crowe"
        },
        {
            id: 13,
            firstName: "Vholran",
            lastName: "Igniseri"
        },
        {
            id: 14,
            firstName: "Rinwell",
            lastName: "Maxwell"
        },
        {
            id: 15,
            firstName: "Farah",
            lastName: "Oersted"
        },
    ]


    return (
        <Layout>
            <AnswerContext.Provider value={{ answers, setAnswers }}>
                <div className='d-flex flex-column h-100 '>
                    <div className="container mt-2">
                        <div className="vh-75 d-flex flex-column align-items-center justify-content-center">
                            <div>
                                <h1 className='fw-bolder text-center text-primary pb-4'>Social Anxiety Disorder Screening</h1>

                                <h3 className='fw-bolder pb-4'>Instruction</h3>

                                <p className='pb-4'>The screening test is divided into 5 sections - namely, section 1: demographic, section 2: emotional, section 3: physical symptoms, section 4: Liebowitz Social Anxiety Scale (LSAS), and section 5: Social Phobia Inventory (SPIN). After taking the test, the probability of manifesting social anxiety disorder will be shown. Please read the questions carefully and let the patient answer as honest as possible.</p>

                                <div className='d-flex align-items-center mb-4 pb-4'>
                                    <button type="button" className='btn btn-secondary m-auto py-3 px-4' data-bs-toggle="modal" data-bs-target="#select-a-patient" onClick={handleStartScreening}>Start Screening</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                {/* Wizard */}
                <ScreeningWizard />


                <div className="modal fade" id="select-a-patient" tabIndex="-1" aria-labelledby="select-a-patient-modal-title" aria-hidden="true">
                    <div className="modal-dialog  modal-dialog-centered modal-dialog-scrollable modal-lg">
                        <div className="modal-content border-0">
                            <div className="modal-header bg-primary">
                                <h5 className="modal-title text-light" id="select-a-patient-modal-title">Select a patient to screen</h5>
                            </div>
                            <div className="modal-body">

                                <div>
                                    <div className="row">
                                        <div className="col">
                                            <input type="text" className="form-control" id="which-patient" placeholder="Search for a patient..." />
                                        </div>
                                        <div className="col-auto">
                                            <button type="submit" className="btn btn-primary mb-3">Search</button>
                                        </div>
                                    </div>
                                </div>

                                <div className="table-responsive custom-scroll" style={{ "minHeight": "200px", "maxHeight": "500px" }}>
                                    <table className="table table-striped table-hover">
                                        <thead className='bg-gray'>
                                            <tr className='text-light'>
                                                <th scope="col" className='w-15'>ID</th>
                                                <th scope="col" className='w-40'>Last Name</th>
                                                <th scope="col" className='w-40'>First Name</th>
                                                <td className='w-5'></td>
                                            </tr>
                                        </thead>
                                        <tbody role="button">
                                            {patients.map((patient, index) => {
                                                return <tr id={`row${index}`} key={patient.id} onClick={() => handleSelection(index)}>
                                                    <th scope="row">{patient.id}</th>
                                                    <td>{patient.lastName}</td>
                                                    <td>{patient.firstName}</td>
                                                    <td>
                                                        <span className={`badge rounded-pill bg-success ${rowSelected === index ? '' : 'd-none'}`} style={{ "fontSize": "9px" }}>Selected</span>
                                                    </td>
                                                </tr>;
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                                <button type="button" className={`btn btn-secondary ${rowSelected !== null ? '' : 'disabled'}`} data-bs-target="#screening-wizard-modal" data-bs-toggle="modal" data-bs-dismiss="modal">Proceed</button>
                            </div>
                        </div>
                    </div>
                </div>
            </AnswerContext.Provider>
        </Layout>
    )
}

export default ScreeningPage;