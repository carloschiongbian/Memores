/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";


const WizardContent = ({ sections, handleOptionChange }) => {

    const [activeSection, setActiveSection] = useState(1)

    const handleNavigateSection = (section) => {
        setActiveSection(section.id)
    }

    const handlePrev = () => {
        if (activeSection <= 1)
            return
        setActiveSection((active) => active - 1)
    }

    const handleNext = () => {
        if (activeSection >= sections.length)
            return
        setActiveSection((active) => active + 1)
    }

    return (
        <div className='wizard d-flex flex-column' style={{ "zIndex": "100000" }}>
            <div className="card text-center w-100">

                {/* Navigation Tabs */}
                <div className="card-header">
                    <ul className="nav nav-tabs card-header-tabs">
                        {
                            sections.map((section) => (
                                <li className="nav-item flex-grow-1" key={section.name + section.id} onClick={() => handleNavigateSection(section)}>
                                    <a className={`nav-link ${section.id === activeSection ? 'active' : ''}`} aria-current="true" href="#">
                                        <div className="row">
                                            <div className="col d-flex px-1 justify-content-center align-items-center">
                                                <span className={`badge fs-5 ${section.id === activeSection ? 'bg-primary' : 'bg-outline-primary'}`}>{section.id}</span>
                                            </div>
                                            <div className="col text-start">
                                                <p className={`fs-6 mb-0 fw-bold ${section.id === activeSection ? 'text-primary' : ''}`}>{section.title}</p>
                                                <p className={`fs-7 mb-0 ${section.id === activeSection ? 'fw-bold text-secondary' : 'text-dark'}`}>{section.name}</p>
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
                        sections.map(section => {

                            return (
                                <section key={`section-tag-${section.id}`} className={`${section.id === activeSection ? 'd-block' : 'd-none'}`}>
                                    {
                                        section.questions.map(question => (
                                            <div className="my-4 py-2" key={`${question.from}+${question.id}`}>
                                                <p className="card-text w-100 text-center" style={{ "maxWidth": "100%" }}>
                                                    {question.text}
                                                </p>

                                                {
                                                    Object.keys(question.options).map((key, index) => (
                                                        <div className="form-check form-check-inline" key={index}>
                                                            <input id={`${question.from}${question.id}-option-index${index}`} type="radio" className="form-check-input" value={question.options[key]} name={`question${question.id}-for-${section.name}`} onChange={handleOptionChange} required/>
                                                            <label htmlFor={`${question.from}${question.id}-option-index${index}`} className="form-check-label">{question.options[key]}</label>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        ))
                                    }
                                </section>
                            )
                        })
                    }

                    <div className="d-flex justify-content-around">
                        <button className={`btn text-primary ${activeSection === 1 ? 'disabled' : ''}`} type="button" onClick={handlePrev}>
                            <i className="bi bi-chevron-double-left"></i> Previous Items
                        </button>

                        <button className={`btn text-primary ${activeSection === sections.length ? 'disabled' : ''}`} type="button" onClick={handleNext}>
                            Next Items <i className="bi bi-chevron-double-right"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WizardContent;