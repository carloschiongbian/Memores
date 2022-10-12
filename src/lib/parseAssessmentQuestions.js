const parseDemographicOptions = (questionObject) => {
    /**
     *      questionObject.options format:
     *      null (patient's age), or
     *      <string> (<integer>), <string> (<integer>), ...
     */
    if (questionObject.options === null) {
        return {
            ...questionObject,
            options: null
        }
    }

    /**
     *  Split the string options to array of options where it would result to:
     *  ["<string> (<integer>)", "<string> (<integer>)"]
     * 
     *  I have asked this question before in stackoverflow:
     *  https://stackoverflow.com/questions/71408418/substrings-or-split-methods-in-javascript
     */
    const optionsArray = questionObject.options.split(/(?<=\)),\s/)

    /**
     *  From the array of options, we convert each element to a key/value pair, therefore, an
     *  array becomes an object where the elements become their own key/value pair.
     * 
     *      acronym   : will be the name of the input
     *      <string>  : will be the corresponding label
     *      <integer> : will be the input's corresponding value
     *      options = {
     *         <string>: <integer>,
     *         <string>: <integer>,
     *      }
     */
    let options = {}
    optionsArray.forEach((option) => {
        // split the "<string> (<integer>)" to become
        // key/value pair to be added to `options` object

        // match returns ['', '', index: '', input: '', groups: {key: '', value: ''}]
        let { groups: { key, value } } = option.match(/(?<key>.+) \((?<value>\d+)\)/)
        options[key] = parseInt(value)
    })

    // console.log(options)
    return { ...questionObject, options }
}

const parseEmotionalOptions = (questionObject) => {
    /**
     *      questionObject.options format:
     *      "1, 2, 3, 4, 5, 6, 7, 8, 9, 10"
     */

    // becomes ['1', '2', '3', '4', '5', ...]
    const optionsArray = questionObject.options.split(',')

    /**
     *      From the array of options, convert each element to become key/value pair.
     *      In this case, since the elements are standalone numbers, we make the
     *      number itself become the key and the value. i.e.,
     * 
     *     options = {
     *          "1": 1,
     *          "2": 2,
     *          "3": 3,
     *     }
     * 
     */

    let options = {}
    optionsArray.forEach(option => {
        options[option.trim()] = parseInt(option)
    })

    // console.log(options)
    return { ...questionObject, options }
}

const parsePhysicalOptions = (questionObject) => {
    /**
     *      Since the option for Physical section
     *      is just Yes and No, then just create it
     */
    const options = {
        Yes: 1,
        No: 0
    }
    return { ...questionObject, options }
}

const parseSPINOptions = (questionObject) => {
    /**
    *  SPIN is a constant questionnaire, there is no need to dynamically
    *  create the options
    */

    const options = {
        "Not at all": 0,
        "A little bit": 1,
        "Somewhat": 2,
        "Very Much": 3,
        "Extremely": 4
    }

    return { ...questionObject, options }

}

const parseLSASOptions = (questionObject) => {
    /**
     *  LSAS is a constant questionnaire, there is no need to dynamically
     *  create the questions and options
     */

    // None (0), Mild (1), Moderate (2), Severe (3) / Never (0), Occasionally (1), Often (2), Usually (3)
    const firstQuestion = "How anxious is the patient about this situation?"
    const secondQuestion = "How often does the patient avoid getting into this situation?"
    const firstQuestionOptions = {
        None: 0,
        Mild: 1,
        Moderate: 2,
        Severe: 3
    }

    const secondQuestionOptions = {
        Never: 0,
        Occasionally: 1,
        Often: 2,
        Usually: 3
    }

    return {
        ...questionObject,
        firstQuestion,
        secondQuestion,
        options: {
            firstQuestionOptions, secondQuestionOptions
        }
    }

}

/**
 *    questions: <array> => received from an api request
 *    array format:
 *    [ 
 *       {"acronym": "", "id": "", "options": "", section: "", "text_option": ""},      <--- questionObject
 *       {"acronym": "", "id": "", "options": "", section: "", "text_option": ""},      <--- questionObject
 *    ]
 * 
 * 
 *     Return value: The function must return the sections containing each questions.
 *      NOTE: See each section (components/screening/[section]Section.js) to know attributes.
 *      {
 *          LSAS: {},
 *          SPIN: {},
 *          demographic: {},
 *          emotional: {},
 *          physical: {]}
 *      }
 * 
 */
export const parseQuestions = (questions) => {
    /**
     *          Loop each question returned from the server,
     *          and transform the format of the `options` key since
     *          it is encoded as string.
     * 
     *          Each section has a specific pattern for the `options` key.
     *          
     *          Options format for "Demographic" section:
     * 
     *              1. Null
     *              2. <string> (<integer>), <string> (<integer>), ...
     *    
     * 
     *          Options format for "Emotional" section:
     * 
     *              1. <Integer>, <Integer>, <Integer>, ...
     * 
     * 
     *          Options format for "Physical" section:
     * 
     *              1. Yes (1), No (0)
     * 
     * 
     *          Options format for "SPIN" section:
     * 
     *              1. Not at all (0), A little bit (1), Somewhat (2), Very Much (3), Extremely (4)
     * 
     * 
     *          Options format for "LSAS" section:
     *              Note: <For First Question> / <For Second Question>
     *              First Question [Fear]: How anxious are you about this situation?
     *              Second Question [Avoidance]: How often do you avoid getting into this situation?
     *              
     *              1. None (0), Mild (1), Moderate (2), Severe (3) / Never (0), Occasionally (1), Often (2), Usually (3)
     *  
     * 
     */
    const sections = {
        "demographic": [],
        "emotional": [],
        "physical": [],
        "LSAS": [],
        "SPIN": []
    }
    questions.forEach(question => {

        let transformedQuestion = {}
        if (question.section.toUpperCase() === 'DEMOGRAPHIC')
            transformedQuestion = parseDemographicOptions(question)
        else if (question.section.toUpperCase() === 'EMOTIONAL')
            transformedQuestion = parseEmotionalOptions(question)
        else if (question.section.toUpperCase() === 'PHYSICAL')
            transformedQuestion = parsePhysicalOptions(question)
        else if (question.section.toUpperCase() === 'SPIN')
            transformedQuestion = parseSPINOptions(question)
        else
            transformedQuestion = parseLSASOptions(question)

        sections[question.section].push(transformedQuestion)
    })
    
    // console.log(sections)
    return sections
}