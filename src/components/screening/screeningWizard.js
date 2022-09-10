/* eslint-disable jsx-a11y/anchor-is-valid */
import WizardContent from "./wizardContent";
import ScreeningResult from "./screeningResult";
import { useState } from "react";

const ScreeningWizard = () => {

    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [mustShowResult, setMustShowResult] = useState(false)

    const sections = [
        { id: 1, title: "Section", name: "Demographics", is_active: true },
        { id: 2, title: "Section", name: "Emotional", is_active: false },
        { id: 3, title: "Section", name: "Physical", is_active: false },
        { id: 4, title: "Section", name: "LSAS", is_active: false },
        { id: 5, title: "Section", name: "SPIN", is_active: false },
    ]

    const handleSubmit = () => {
        setHasSubmitted(true)

        setTimeout(() => {
            setHasSubmitted(false)
            setMustShowResult(true)
        }, 2000)
    }

    const handleReturn = () => {
        // reset
        setTimeout(() => {
            setMustShowResult(false)
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
                            {!mustShowResult && <WizardContent sections={sections}></WizardContent>}
                            {mustShowResult && <ScreeningResult></ScreeningResult>}
                        </div>
                        <div className="modal-footer">
                            {!mustShowResult &&
                                <button className="btn btn-primary" onClick={handleSubmit}>
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