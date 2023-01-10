from flask import session, request, jsonify
from models.patient_screening_details import PatientsScreeningDetails
from connection.connection import db
from pymysql import Error

def update_patient_notes():

    user_id = session.get("user_id")
    # Check if session exist
    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    patient_notes = request.get_json()
    assessment_id = patient_notes['assessment_id']
    print(patient_notes)

    try:
        # Do not include the assessment_id (foreign key) when updating
        # otherwise db Integrity Error is thrown
        patient_notes.pop('assessment_id', None)
        PatientsScreeningDetails.query.\
            filter(PatientsScreeningDetails.assessment_id == assessment_id).\
            update(patient_notes)
        db.session.commit()

        patient_notes['assessment_id'] = assessment_id
        return patient_notes, 200

    except Error as e:
        print('Error updating the patient notes...', e)

        return jsonify({
            "error": "There is an error updating the patient notes."
        }), 500