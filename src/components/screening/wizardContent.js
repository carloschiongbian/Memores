/* eslint-disable jsx-a11y/anchor-is-valid */


const WizardContent = ({sections}) => {
    return (
        <div className='wizard d-flex flex-column' style={{ "zIndex": "100000" }}>
            <div className="card text-center w-100">

                {/* Navigation Tabs */}
                <div className="card-header">
                    <ul className="nav nav-tabs card-header-tabs">
                        {
                            sections.map((section) => (
                                <li className="nav-item flex-grow-1" key={section.id}>
                                    <a className={`nav-link ${section.is_active ? 'active' : ''}`} aria-current="true" href="#">
                                        <div className="row">
                                            <div className="col d-flex px-1 justify-content-center align-items-center">
                                                <span className={`badge fs-5 ${section.is_active ? 'bg-primary' : 'bg-outline-primary'}`}>{section.id}</span>
                                            </div>
                                            <div className="col text-start">
                                                <p className={`fs-6 mb-0 fw-bold ${section.is_active ? 'text-primary' : ''}`}>{section.title}</p>
                                                <p className={`fs-7 mb-0 ${section.is_active ? 'fw-bold text-secondary' : 'text-dark'}`}>{section.name}</p>
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
                        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                            <div className="my-4 py-2" key={item}>
                                <p className="card-text w-100 text-center" style={{ "maxWidth": "100%" }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam quibusdam veniam nihil earum blanditiis voluptas?

                                </p>

                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
                                    <label className="form-check-label" htmlFor="inlineRadio1">Option 1</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                                    <label className="form-check-label" htmlFor="inlineRadio2">Option 2</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option2" />
                                    <label className="form-check-label" htmlFor="inlineRadio3">Option 3</label>
                                </div>
                            </div>
                        ))
                    }

                    <div className="d-flex justify-content-around">
                        <button className="btn text-primary" type="button" data-bs-target="#section-indicators" data-bs-slide="next" >
                            <i className="bi bi-chevron-double-left"></i> Previous Items
                        </button>

                        <button className="btn text-primary" type="button" data-bs-target="#section-indicators" data-bs-slide="next" >
                            Next Items <i className="bi bi-chevron-double-right"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WizardContent;