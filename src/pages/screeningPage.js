/* eslint-disable jsx-a11y/anchor-is-valid */
import ScreeningWizard from '../components/screening/screeningWizard'
import '../public/css/pages/ScreeningPage/index.css'
import { useState, useContext } from 'react'
import { AnswerContext } from '../components/screening/AnswerContext'
import Layout from '../components/Layout'
import { useEffect } from 'react'
import Api from '../services/api'
import Pagination from '../components/customPagination/Pagination'
import { useRef } from 'react'
import AuthContext from '../auth/AuthContext'


const ScreeningPage = () => {

    const { user } = useContext(AuthContext)
    const searchQuery = useRef(null)
    const [answers, setAnswers] = useState({})
    const [patientSelected, setPatientSelected] = useState({})
    const [dateStarted, setDateStarted] = useState(null)
    const [patients, setPatients] = useState([])
    const [total, setTotal] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const perPage = 5

    // specific only to implementation 2
    // remove if implementation 1 is used
    const [allPatients, setAllPatients] = useState([])
    const [allSearchedPatients, setAllSearchedPatients] = useState([])

    const handleSelection = (patient) => {
        setPatientSelected(patient)
    }

    const handleStartScreening = () => {
        // Do a reset, whenever Start Screening button is clicked
        // By reset, we mean reset the current state selection
        setPatientSelected({})
        searchQuery.current.value = ''

        /**
         *  This is the first implementation. Use this if you opt to use
         *  the first implementation for handleSearch and useEffect.
         *  Below this comment is the second implementation, remove them
         *  if first implementation is used.
         * 
         * 
         *  Api().get('/get-patients', {
         *       params: {
         *           currentPage, perPage, name: searchQuery.current.value,
         *           createdBy: user.id
         *       }
         *   })
         *   .then(res => {
         *       setPatients(res.data.patients)
         *       setTotal(Number(res.data.total))
         *       setCurrentPage(1)
         *   })
         * 
         */
        setCurrentPage(1)
        const p = allPatients.slice((currentPage - 1) * perPage, currentPage * perPage)
        setPatients(p)
        setTotal(allPatients.length)
    }

    const handleProceed = () => {
        // When proceed is clicked, take note of when the screening started
        // This is to be used to get time elapsed for the total screening duration
        const date = new Date().toLocaleString('en-ZA', { hour12: false }).replaceAll('/', '-').replace(',', '')
        setDateStarted(date)
    }

    /**
     *  This is the 1st implementation which uses the concept of fetch necessary data only.
     *  It fetches data with pagination done in the backend. This is recommended
     *  but since the columns in the database are encrypted, this won't work due
     *  to the limitations of the encryption. Therefore, the other implementation
     *  is used since cols are encrypted, if it wasn't, this implementation is the best.
     * 
     *  Below this comment is the second implementation, remove them if this 
     *  first implementation is used.
     * 
     *       const handleSearch = () => {
     *           Api().get('/get-patients', {
     *               params: {
     *                   currentPage, perPage, name: searchQuery.current.value,
     *                   createdBy: user.id
     *               }
     *           })
     *               .then(res => {
     *                   setPatients(res.data.patients)
     *                   setTotal(Number(res.data.total))
     *                   setCurrentPage(1)
     *               })
     *       }
     *
     *       // [currentPage, user] are the dependency
     *       // useEffect will run when these two variables are changed (i.e., when pagination is clicked.)
     *       useEffect(() => {
     *           Api().get('/get-patients', {
     *               params: {
     *                   currentPage, perPage, name: searchQuery.current.value,
     *                   createdBy: user.id
     *               }
     *           })
     *               .then(res => {
     *                   setPatients(res.data.patients)
     *                   setTotal(Number(res.data.total))
     *               })
     *       }, [currentPage, user]);
     *
     */

    const handleSearch = () => {
        if (searchQuery.current.value === '') {
            const p = allPatients.slice((currentPage - 1) * perPage, currentPage * perPage)
            setPatients(p)
            setCurrentPage(1)
            setTotal(allPatients.length)
            setAllSearchedPatients([])
            return
        }

        // get all records that match the search query
        const p = allPatients.filter(patient => {
            return patient.fullname.toLowerCase()
                .includes(searchQuery.current.value.toLowerCase())
        })
        setAllSearchedPatients(p)
        setTotal(p.length)
        setCurrentPage(1)
        

        // there are more than 5 records that matched the search query
        if (p.length > perPage) {
            const paginated = p.slice((currentPage - 1) * perPage, currentPage * perPage)
            setPatients(paginated)
        } else {
            setPatients(p)
        }
    }

    useEffect(() => {
        // no data is fetched yet and search input is empty
        if (total <= 0 && searchQuery.current.value === '') {
            Api().get('/get-patients-v2', { params: { createdBy: user.id } })
                .then(res => {
                    setAllPatients(res.data.patients)
                    setTotal(Number(res.data.total))

                    const p = res.data.patients.slice((currentPage - 1) * perPage, currentPage * perPage)
                    setPatients(p)
                })
            return
        }

        // something changed while there are searched patients and still searching
        if (allSearchedPatients.length > 0 && searchQuery.current.value !== '') {
            // since there are searched patients, use it for displaying
            const p = allSearchedPatients.slice((currentPage - 1) * perPage, currentPage * perPage)
            setPatients(p)
            return
        } 
        // something changed while there are no searched patients and still searching
        else if (allSearchedPatients.length <= 0 && searchQuery.current.value !== '') {
            // no searched patient found, therefore, should be empty
            setPatients([])
            return
        }

        // just paginate the already fetched data
        const p = allPatients.slice((currentPage - 1) * perPage, currentPage * perPage)
        setPatients(p)

    }, [allSearchedPatients, allPatients, total, currentPage, user]);



    return (
        <Layout>
            <AnswerContext.Provider value={{ answers, setAnswers, patientSelected, dateStarted }}>
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
                                            <input type="text" className="form-control" id="which-patient" placeholder="Search for a patient..." ref={searchQuery} />
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
                                                <th scope="col" className='w-30'>Last Name</th>
                                                <th scope="col" className='w-30'>First Name</th>
                                                <th scope="col" className='w-20'>Status</th>
                                                <td className='w-5'></td>
                                            </tr>
                                        </thead>
                                        <tbody role="button">
                                            {
                                                patients.length <= 0 ?
                                                    <tr>
                                                        <td colSpan="5">
                                                            <div className='d-flex align-items-center justify-content-center' style={{ width: "100%", height: "250px" }}>
                                                                <i>No patients found.</i>
                                                            </div>
                                                        </td>
                                                    </tr> :
                                                    patients.map((patient, index) => {
                                                        return <tr id={`row${index}`} key={patient.id} onClick={() => handleSelection(patient)}>
                                                            <th scope="row">{patient.id}</th>
                                                            <td>{patient.lname}</td>
                                                            <td>{patient.fname}</td>
                                                            {
                                                                patient.assessment_id ? <td className='text-success'>Done</td> :
                                                                    <td className='text-danger'>Not Yet</td>
                                                            }
                                                            <td>
                                                                <span className={`badge rounded-pill bg-success ${patientSelected.id === patient.id ? '' : 'd-none'}`} style={{ "fontSize": "9px" }}>Selected</span>
                                                            </td>
                                                        </tr>;
                                                    })
                                            }
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
                                {/* Proceed Modal will just open a new modal on top of the current modal (to start the screening process)
                                 but the patient must not yet be screened */}
                                <button type="button" className={`btn btn-secondary ${Object.keys(patientSelected).length !== 0 && patientSelected.assessment_id === null ? '' : 'disabled'}`} data-bs-target="#screening-wizard-modal" data-bs-toggle="modal" data-bs-dismiss="modal" onClick={handleProceed}>Proceed</button>
                            </div>
                        </div>
                    </div>
                </div>
            </AnswerContext.Provider>
        </Layout>
    )
}

export default ScreeningPage;