/* eslint-disable jsx-a11y/anchor-is-valid */
import WizardContent from "./wizardContent";
import ScreeningResult from "./screeningResult";
import { useState, useEffect, useContext } from "react";
// import { sections } from "./dummy";
import Api from "../../services/api";
import { parseQuestions } from "../../lib/parseAssessmentQuestions";
import { AnswerContext } from "./AnswerContext";

const ScreeningWizard = () => {

    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [mustShowResult, setMustShowResult] = useState(false)
    const [totalQuestions, setTotalQuestions] = useState(0)
    const [totalAnswered, setTotalAnswered] = useState(0)
    const [shouldEnableSubmit, setShouldEnableSubmit] = useState(false)
    const [sections, setSections] = useState({})
    const {answers, setAnswers} = useContext(AnswerContext)
    const [classification, setClassification] = useState(null)
    const [classProbability, setClassProbability] = useState(null)

    useEffect(() => {

        // fetch assessment questions
        Api().get("/get-assessment-questions")
            .then(res => {

                const parsedQuestions = parseQuestions(res.data)
                setSections(parsedQuestions)

                // LSAS has 24 situations but each situation has 2 questions
                // SPIN has 17 situations
                // demographic has 5 questions
                // emotional has 8 questions
                // physical has 13 questions
                const total = (parsedQuestions['LSAS'].length * 2) + parsedQuestions['SPIN'].length + parsedQuestions['demographic'].length + parsedQuestions['emotional'].length + parsedQuestions['physical'].length
                setTotalQuestions(total)
            })
            .catch(err => console.log(err))
    }, []);

    // console.log(sections)


    const handleOptionChange = (e) => {

        const ageInput = document.getElementById('age')

        if (ageInput.value === '') return
        let totalChecks = 1 // 1 because age input has a value

        const radios = document.getElementsByClassName('form-check-input')

        for (let i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                totalChecks += 1
            }
        }

        setTotalAnswered(totalChecks)

        setAnswers({...answers, [e.target.name]: parseInt(e.target.value)})

        if (totalQuestions === totalChecks)
            setShouldEnableSubmit(true)
    }

    const handleSubmit = () => {
        console.log(answers)
        setHasSubmitted(true)

        // Post the answers for the screening assessment
        Api().post("/submit-answers", { data: answers }, {
            headers: { 'Content-Type': 'application/json' } })
            .then(res => {
                setClassification(res.data.classification)
                setClassProbability(res.data.probability)
            })
            .catch(err => console.log(err))



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
                            {
                                // Check first if data has been fetched
                                Object.keys(sections).length !== 0 &&
                                !mustShowResult && <WizardContent sections={sections} handleOptionChange={handleOptionChange} totalAnswered={totalAnswered}></WizardContent>
                            }

                            {
                                // Check first if data has been fetched
                                Object.keys(sections).length !== 0 &&
                                mustShowResult && <ScreeningResult classification={classification} classProbability={classProbability}></ScreeningResult>
                            }
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