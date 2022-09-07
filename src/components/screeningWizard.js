/* eslint-disable jsx-a11y/anchor-is-valid */
const ScreeningWizard = () => {

    const sections = [
        { id: 1, title: "Section", name: "Demographics", is_active: true },
        { id: 2, title: "Section", name: "Emotional", is_active: false },
        { id: 3, title: "Section", name: "Physical", is_active: false },
        { id: 4, title: "Section", name: "LSAS", is_active: false },
        { id: 5, title: "Section", name: "SPIN", is_active: false },
    ]


    return (
        <>
            <div className='wizard d-flex flex-column' style={{ "zIndex": "100000" }}>
                <div className="container">
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

                            {/* Q1 */}
                            {
                                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                                    <div className="my-4 py-2" key={item}>
                                        <p className="card-text w-100 text-center" style={{ "maxWidth": "100%" }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam quibusdam veniam nihil earum blanditiis voluptas?

                                        </p>

                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
                                            <label class="form-check-label" for="inlineRadio1">Option 1</label>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                                            <label class="form-check-label" for="inlineRadio2">Option 2</label>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                                            <label class="form-check-label" for="inlineRadio2">Option 3</label>
                                        </div>
                                    </div>
                                ))
                            }

                        </div>

                        <div className="card-footer d-flex justify-content-between">
                            <button className="btn btn-secondary" disabled="true" type="button" data-bs-target="#section-indicators" data-bs-slide="prev" >
                                Previous
                            </button>
                            <button className="btn btn-secondary" type="button" data-bs-target="#section-indicators" data-bs-slide="next" >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ScreeningWizard;