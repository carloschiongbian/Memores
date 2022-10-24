/* eslint-disable jsx-a11y/anchor-is-valid */
import ScreeningWizard from '../components/screening/screeningWizard'
import '../public/css/pages/ScreeningPage/index.css'
import { useState } from 'react'
import { AnswerContext } from '../components/screening/AnswerContext'
import Layout from '../components/Layout'
import { useEffect } from 'react'
import Api from '../services/api'
import Pagination from '../components/customPagination/Pagination'
import { useRef } from 'react'


const ScreeningPage = () => {

    const searchQuery = useRef(null)
    const [answers, setAnswers] = useState({})
    const [patientSelected, setPatientSelected] = useState({})
    const [patients, setPatients] = useState([])
    const [total, setTotal] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const perPage = 5

    const handleSelection = (patient) => {
        setPatientSelected(patient)
    }

    const handleStartScreening = () => {
        // Do a reset, whenever Start Screening button is clicked
        // By reset, we mean reset the current state selection
        setPatientSelected({})
        searchQuery.current.value = ''
    }

    const handleSearch = () => {
        Api().get('/get-patients', {
            params: { currentPage, perPage, name: searchQuery.current.value }
        })
            .then(res => {
                console.log(res.data)
                setPatients(res.data.patients)
                setTotal(parseInt(res.data.total))
            })
    }

    useEffect(() => {
        Api().get('/get-patients', {
            params: { currentPage, perPage, name: searchQuery.current.value }
        })
            .then(res => {
                console.log(res.data)
                setPatients(res.data.patients)
                setTotal(parseInt(res.data.total))
            })
    }, [currentPage]);

    return (
        <Layout>
            <AnswerContext.Provider value={{ answers, setAnswers, patientSelected }}>
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

                                {/* Search */}
                                <div>
                                    <div className="row">
                                        <div className="col">
                                            <input type="text" className="form-control" id="which-patient" placeholder="Search for a patient..." ref={searchQuery}/>
                                        </div>
                                        <div className="col-auto">
                                            <button type="submit" className="btn btn-primary mb-3" onClick={handleSearch}>Search</button>
                                        </div>
                                    </div>
                                </div>

                                {/* Table */}
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
                                                return <tr id={`row${index}`} key={patient.id} onClick={() => handleSelection(patient)}>
                                                    <th scope="row">{patient.id}</th>
                                                    <td>{patient.lname}</td>
                                                    <td>{patient.fname}</td>
                                                    <td>
                                                        <span className={`badge rounded-pill bg-success ${patientSelected.id === patient.id ? '' : 'd-none'}`} style={{ "fontSize": "9px" }}>Selected</span>
                                                    </td>
                                                </tr>;
                                            })}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Pagination */}
                                <div className='d-flex justify-content-center'>
                                    <Pagination
                                        className="pagination-bar py-2 mb-0 ps-0"
                                        currentPage={currentPage}
                                        totalCount={total}
                                        pageSize={5}
                                        onPageChange={page => setCurrentPage(page)}
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                {/* Close Modal will just close the current modal (where we choose which patient to screen) */}
                                <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                                {/* Proceed Modal will just open a new modal on top of the current modal (to start the screening process) */}
                                <button type="button" className={`btn btn-secondary ${Object.keys(patientSelected).length !== 0 ? '' : 'disabled'}`} data-bs-target="#screening-wizard-modal" data-bs-toggle="modal" data-bs-dismiss="modal">Proceed</button>
                            </div>
                        </div>
                    </div>
                </div>
            </AnswerContext.Provider>
        </Layout>
    )
}

export default ScreeningPage;