from flask import request, jsonify, session
from machine_learning_model.parser import SVM_Model
from connection.connection import db
from models.assessments import Assessments
from models.patient_screening_details import PatientsScreeningDetails

# https://stackoverflow.com/a/16664376/15440045
# request.json: parsed JSON data
def submit_answers():

    user_id = session.get("user_id")
     #Check if session exist
    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401    

    request_obj = request.get_json()
    # print(request_obj['data'])

    model = SVM_Model(request_obj['data'])
    model.parse_request_object()
    model.standardize()
    model.parse_answers()
    classification, prob = model.predict()


    # Write to the database
    assessor = request_obj['assessor']
    patient = request_obj['patient']
    date_started = request_obj['dateStarted']
    
    positive = 'does show a manifestation of social anxiety disorder'
    negative = 'does not show a manifestation of social anxiety disorder'
    description = positive if int(classification) == 1 else negative
    # We do not need to explicitly put date_finished because by default, it
    # will use the current time when this is written to the database
    assessment = Assessments(prediction_result = int(classification), \
                classification_probability = float(prob) * 100, \
                result_description = description, \
                date_taken = date_started, \
                patient_id = patient['id'], \
                assessor_id = assessor['id'], \
                responses = request_obj['data'])

    db.session.add(assessment)
    # to get the assessment.id, this returns the object in the session (db.session.add())
    db.session.flush()

    # Insert to the patient_screening_details, too
    assessment_id = assessment.id
    details = PatientsScreeningDetails(assessment_id = assessment_id, patient_notes = ' ')
    db.session.add(details)

    db.session.commit()
    
    # print(classification, prob)
    return jsonify({"classification": str(classification), "probability": str(prob)})