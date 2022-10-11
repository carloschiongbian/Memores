/**
 *  Note: acronym is the same to all questions
 * 
 *  section = [
 *       {
 *         "acronym": "SPIN",
 *          "id": 6,
 *         "options": {
 *            "Not at all": 0,
 *            "A little bit": 1,
 *            "Somewhat": 2,
 *            "Very Much": 3,
 *            "Extremely": 4
 *         },
 *         "section": "physical",
 *         "text_option": "the question?"
 *       }
 *   ]
**/

const SPINSection = ({ section, handleOptionChange }) => {

    // console.log(section)
    return (
        <div>
            {
                section.map((question, questionIndex) => (
                    <div className="my-4 py-2" key={question.id}>
                        <p className="card-text w-100 text-start" style={{ "maxWidth": "100%" }}>
                            <span className="me-4">{questionIndex+1}.</span> {question.text_option}
                        </p>

                        {
                            Object.keys(question.options).map((key, index) => (
                                <div className="form-check form-check-inline" key={index}>
                                    <input id={`question${question.id}-option${index}`} type="radio" className="form-check-input" value={question.options[key]} name={`${question.acronym}${questionIndex}`} onChange={handleOptionChange} required />
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

export default SPINSection;