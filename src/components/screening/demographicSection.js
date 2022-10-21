/**
 *  section = [
 *    {acronym: 'AGE', id: 1, options: null, section: 'demographic', text_option: 'the question?'} ,
 *    {acronym: 'EducationalLevel', id: 2, options: {"High School": 1, "Diploma": 2}, section: 'demographic', text_option: 'the question?'} ,
 *    {acronym: 'gender', id: 3, options: {"Male": 1, "Female": 0}, section: 'demographic', text_option: 'the question?'} ,
 *  ]
 * 
 */

const DemographicSection = ({ section, handleOptionChange }) => {

    // console.log(section)
    const handleAgeInput = (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '').replace(/(\..*?)\..*/g, '$1').replace(/^0[^.]/, '0')
    }

    return (
        <div>
            {
                section.map((question, index) => (
                    <div className="my-0 py-2" key={question.id}>
                        {
                            // if null, it is about age input
                            question.options === null ?

                                <div className="row mb-3">
                                    <label htmlFor="age" className="col-sm-4 col-form-label text-start">
                                        <span className="me-4">{index + 1}.</span>
                                        {question.text_option}
                                    </label>
                                    <div className="col-sm-8">
                                        <input id="age" type="text" name="AGE" className="form-control" onInput={handleAgeInput} onChange={handleOptionChange} required />
                                    </div>
                                </div> :

                                <>
                                    <p className="card-text w-100 text-start" style={{ "maxWidth": "100%" }}>
                                        <span className="me-4">{index + 1}.</span>
                                        {question.text_option}
                                    </p>

                                    {Object.keys(question.options).map((key, index) => (
                                        <div className="ms-4" key={index}>
                                            <div className="form-check text-start ms-4" >
                                                <input id={`question${question.id}-option${index}`} type="radio" className="form-check-input" value={question.options[key]} name={question.acronym} onChange={handleOptionChange} required />
                                                <label htmlFor={`question${question.id}-option${index}`} className="form-check-label">{key}</label>
                                            </div>
                                        </div>
                                    ))}
                                </>

                        }
                    </div>
                ))
            }
        </div >
    );
}

export default DemographicSection;