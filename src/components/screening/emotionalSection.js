/**
 * 
 *  section = [
 *       {
 *         "acronym": "ATF",
 *          "id": 6,
 *         "options": {
 *            "1": 1,
 *            "2": 2,
 *            "3": 3,
 *            "4": 4,
 *            "5": 5,
 *            "6": 6,
 *            "7": 7,
 *            "8": 8,
 *            "9": 9,
 *            "10": 10
 *         },
 *         "section": "emotional",
 *         "text_option": "the question?"
 *       }
 *   ]
**/

const EmotionalSection = ({ section, handleOptionChange }) => {

    // console.log(section)
    return (
        <div>
            {
                section.map(question => (
                    <div className="my-4 py-2" key={question.id}>
                        <p className="card-text w-100 text-center" style={{ "maxWidth": "100%" }}>
                            {question.text_option}
                        </p>

                        {
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

export default EmotionalSection;