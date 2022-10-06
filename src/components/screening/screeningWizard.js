/* eslint-disable jsx-a11y/anchor-is-valid */
import WizardContent from "./wizardContent";
import ScreeningResult from "./screeningResult";
import { useState } from "react";
import { sections } from "./dummy";
import { useEffect } from "react";
import Api from "../../services/api";

const ScreeningWizard = () => {

    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [mustShowResult, setMustShowResult] = useState(false)
    const [totalQuestions, setTotalQuestions] = useState(0)
    const [shouldEnableSubmit, setShouldEnableSubmit] = useState(false)
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        const total = sections.reduce((total, currentElement) => {
            return total + currentElement.questions.length
        }, 0)
        
        setTotalQuestions(total)
    }, [])

    useEffect(() => {
        // fetch assessment questions
        Api().get("/get-assessment-questions")
            .then(res => setQuestions(res.data))
            .catch(err => console.log(err))
    }, []);

    console.log(questions)


    const handleOptionChange = (item) => {
        const radios = document.getElementsByClassName('form-check-input')
        
        let totalChecks = 0
        for (let i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                totalChecks += 1
            }
        }

        if (totalQuestions === totalChecks)
            setShouldEnableSubmit(true)
    }


    const handleSubmit = () => {
        setHasSubmitted(true)

        setTimeout(() => {
            setHasSubmitted(false)
            setMustShowResult(true)
        }, 2000)
    }

    const handleReturn = () => {
        setTimeout(() => {
            setMustShowResult(false)
            setShouldEnableSubmit(false)
        }, 1000)
    }

   
    return (
        <>
            <div className="modal fade" id="screening-wizard-modal" aria-hidden="true" aria-labelledby="static-screening-wizard-modal" tabIndex="-1" data-bs-backdrop="static" data-bs-keyboard="false">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        
                            <div className="modal-header bg-primary">
                                <h5 className="text-light mb-0">Assessment</h5>
                            </div>
                            <div className="modal-body p-0">
                                {!mustShowResult && <WizardContent sections={sections} handleOptionChange={handleOptionChange}></WizardContent>}
                                {mustShowResult && <ScreeningResult></ScreeningResult>}
                            </div>
                            <div className="modal-footer">
                                {!mustShowResult &&
                                    <button type="submit" className={`btn btn-primary ${shouldEnableSubmit ? '' : 'disabled'}`} onClick={handleSubmit}>
                                        <span className={`spinner-border spinner-border-sm me-2 ${hasSubmitted ? 'disabled' : 'd-none'}`} role="status" aria-hidden="true"></span>
                                        {!hasSubmitted && 'Submit Answers'}
                                        {hasSubmitted && 'Submitting Answers...'}
                                    </button>}

                                {mustShowResult &&
                                    <button className="btn btn-primary" data-bs-dismiss="modal" onClick={handleReturn}>
                                        Return
                                    </button>}
                            </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default ScreeningWizard;