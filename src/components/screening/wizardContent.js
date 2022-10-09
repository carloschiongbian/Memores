/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";
import DemographicSection from "./demographicSection";
import EmotionalSection from "./emotionalSection";
import LSASSection from "./LSASSection";
import PhysicalSection from "./physicalSection";
import SPINSection from "./SPINSection";

const SECTION_ID = {
    1: "demographic",
    2: "emotional",
    3: "physical",
    4: "LSAS",
    5: "SPIN"
}

const CHECKS_NEEDED = {
    "demographic": 5, // since it's the start = 0 + 5
    "emotional": 13, // there are 8 for emotional = 5 + 8
    "physical": 26, // there are 13 for physical = 13 + 13
    "LSAS": 74,  // there are 48 for LSAS = 26 + 48
    "SPIN": 91 // there are 17 for LSAS = 74 + 17
}
const WizardContent = ({ sections, handleOptionChange, totalAnswered }) => {

    const [activeSection, setActiveSection] = useState("demographic")
    const [activeSectionID, setActiveSectionID] = useState(1)

    const handlePrev = () => {
        if (activeSectionID <= 1)
            return

        setActiveSection(SECTION_ID[activeSectionID - 1])
        setActiveSectionID((active) => active - 1)
    }

    const handleNext = () => {
        if (activeSectionID >= Object.keys(sections).length)
            return

        setActiveSection(SECTION_ID[activeSectionID + 1])
        setActiveSectionID((active) => active + 1)
    }

    return (
        <div className='wizard d-flex flex-column' style={{ "zIndex": "100000" }}>
            <div className="card text-center w-100">

                {/* Navigation Tabs */}
                <div className="card-header">
                    <ul className="nav nav-tabs card-header-tabs">
                        {
                            /**
                             *  sections = {
                             *      LSAS: {},
                             *      SPIN: {},
                             *      demographic: {},
                             *      emotional: {},
                             *      physical: {}
                             *  }
                             * 
                             *  running Object.keys() returns ['LSAS', 'SPIN', 'demographic', 'emotional', 'physical']
                             * 
                             * 
                             */
                            Object.keys(sections).map((key, index) => (
                                <li className="nav-item flex-grow-1" key={index}>
                                    <a className={`nav-link ${key === activeSection ? 'active' : ''}`}>
                                        <div className="row">
                                            <div className="col d-flex px-1 justify-content-center align-items-center position-relative">
                                                <span className={`badge fs-5 ${key === activeSection ? 'bg-primary' : 'bg-outline-primary'}`}>{index + 1}</span>
                                                {
                                                    totalAnswered >= CHECKS_NEEDED[key] &&
                                                    <span className="position-absolute bottom-0 end-0 text-success"><i className="bi bi-check-circle-fill"></i></span>
                                                }

                                                {
                                                    totalAnswered < CHECKS_NEEDED[key] &&
                                                    <span className="position-absolute bottom-0 end-0 text-danger"><i className="bi bi-x-circle-fill"></i></span>
                                                }
                                            </div>
                                            <div className="col text-start">
                                                <p className={`fs-6 mb-0 fw-bold ${key === activeSection ? 'text-primary' : ''}`}>Section</p>
                                                <p className={`fs-7 mb-0 ${key === activeSection ? 'fw-bold text-secondary' : 'text-dark'}`}>{key}</p>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                            ))
                        }
                    </ul>
                </div>

                {/* Content */}
                <div id="section-indicators" className="card-body py-4 wizard-content custom-scroll">


                    {
                        /**
                             *  sections = {
                             *      LSAS: {},
                             *      SPIN: {},
                             *      demographic: {},
                             *      emotional: {},
                             *      physical: {}
                             *  }
                             * 
                             *  running Object.keys() returns ['LSAS', 'SPIN', 'demographic', 'emotional', 'physical']
                             * 
                             * 
                             */
                        Object.keys(sections).map((key, index) => {
                            if (key === 'demographic')
                                return (
                                    <div key={key} className={`${key === activeSection ? 'd-block' : 'd-none'}`} >
                                        <DemographicSection section={sections.demographic} handleOptionChange={handleOptionChange}></DemographicSection>
                                    </div>
                                )

                            if (key === 'emotional')
                                return (
                                    <div key={key} className={`${key === activeSection ? 'd-block' : 'd-none'}`}>
                                        <EmotionalSection section={sections.emotional} handleOptionChange={handleOptionChange}></EmotionalSection>
                                    </div>
                                )

                            if (key === 'physical')
                                return (
                                    <div key={key} className={`${key === activeSection ? 'd-block' : 'd-none'}`} >
                                        <PhysicalSection section={sections.physical} handleOptionChange={handleOptionChange}></PhysicalSection>
                                    </div>
                                )

                            if (key === 'LSAS')
                                return (
                                    <div key={key} className={`${key === activeSection ? 'd-block' : 'd-none'}`}>
                                        <LSASSection section={sections.LSAS} handleOptionChange={handleOptionChange}></LSASSection>
                                    </div>
                                )

                            if (key === 'SPIN')
                                return (
                                    <div key={key} className={`${key === activeSection ? 'd-block' : 'd-none'}`}>
                                        <SPINSection section={sections.SPIN} handleOptionChange={handleOptionChange}></SPINSection>
                                    </div>
                                )

                            return null
                        })
                    }

                    <div className="d-flex justify-content-around">
                        <button className={`btn text-primary ${activeSectionID === 1 ? 'disabled' : ''}`} type="button" onClick={handlePrev}>
                            <i className="bi bi-chevron-double-left"></i> Previous Items
                        </button>

                        <button className={`btn text-primary ${activeSectionID === Object.keys(sections).length || totalAnswered < CHECKS_NEEDED[activeSection] ? 'disabled' : ''}`} type="button" onClick={handleNext}>
                            Next Items <i className="bi bi-chevron-double-right"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WizardContent;