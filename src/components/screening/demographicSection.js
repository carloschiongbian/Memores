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
                section.map(question => (
                    <div className="my-4 py-2" key={question.id}>
                        <p className="card-text w-100 text-center" style={{ "maxWidth": "100%" }}>
                            {question.text_option}
                        </p>

                        {
                            // if null, it is about age input
                            question.options === null ?
                            <input id="age" type="text" name="AGE" className="form-control" onInput={handleAgeInput} onChange={handleOptionChange} required/> :
                            Object.keys(question.options).map((key, index) => (
                                <div className="form-check form-check-inline" key={index}>
                                    <input id={`question${question.id}-option${index}`} type="radio" className="form-check-input" value={question.options[key]} name={question.acronym} onChange={handleOptionChange} required/>
                                    <label htmlFor={`question${question.id}-option${index}`} className="form-check-label">{key}</label>
                                </div>
                            ))
                        }
                    </div>
                ))
            }
        </div>
    );
}

export default DemographicSection;