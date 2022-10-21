/**
 *  section = [
 *    {
 *       "acronym": "performance",
 *       "id": 1,
 *       "firstQuestion": "question about fear?",
 *       "secondQuestion": "question about avoidance?",
 *       "section": "LSAS",
 *       "text_option": "the situation",
 *       "options": {
 *          "firstQuestionOptions": {
 *              "None": 0,
 *              "Mild": 1,
 *              "Moderate": 2,
 *              "Severe": 3
 *          },
 *          "secondQuestionOptitons": {
 *              "Never": 0,
 *              "Occasionally": 1,
 *              "Often": 2,
 *              "Usually": 3
 *          }
 *       }
 *    },
 * 
 *  ]
 * 
 */

const LSASSection = ({ section, handleOptionChange }) => {

    // console.log(section)
    return (
        <div>
            {
                section.map((question, questionIndex) => (
                    <div className="my-4 py-2" key={question.id}>
                        <p className="card-text w-100 text-start" style={{ "maxWidth": "100%" }}>
                            <span className="fw-bold me-2">Situation #{questionIndex + 1}:</span> {question.text_option}
                        </p>

                        {/* First Question */}
                        <p className="card-text w-100 text-start mb-0" style={{ "maxWidth": "100%" }}>
                            {question.firstQuestion}
                        </p>
                        {
                            Object.keys(question.options.firstQuestionOptions).map((key, index) => (
                                <div className="ms-4" key={index}>
                                    <div className="form-check ms-4 text-start">
                                        <input id={`question${question.id}-option${index}-fear`} type="radio" className="form-check-input" value={question.options.firstQuestionOptions[key]} name={`${question.acronym}${questionIndex}-fear`} onChange={handleOptionChange} required />
                                        <label htmlFor={`question${question.id}-option${index}-fear`} className="form-check-label">{key}</label>
                                    </div>
                                </div>
                            ))
                        }


                        {/* Second Question */}
                        <p className="card-text w-100 text-start mb-0" style={{ "maxWidth": "100%" }}>
                            {question.secondQuestion}
                        </p>
                        {
                            Object.keys(question.options.secondQuestionOptions).map((key, index) => (
                                <div className="ms-4" key={index}>
                                    <div className="form-check ms-4 text-start">
                                        <input id={`question${question.id}-option${index}-avoidance`} type="radio" className="form-check-input" value={question.options.secondQuestionOptions[key]} name={`${question.acronym}${questionIndex}-avoidance`} onChange={handleOptionChange} required />
                                        <label htmlFor={`question${question.id}-option${index}-avoidance`} className="form-check-label">{key}</label>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                ))
            }
        </div>
    );
}

export default LSASSection;