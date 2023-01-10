from flask import session, request, jsonify
from models.patients import Patients
from connection.connection import db
from pymysql import Error

def update_patient_details():

    user_id = session.get("user_id")
    # Check if session exist
    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    patient_details = request.get_json()
    id = patient_details['id']

    try:
        # Do not include the id (primary key) when updating
        # otherwise db Integrity Error is thrown
        patient_details.pop('id', None)
        Patients.query.filter(Patients.id == id).update(patient_details)
        db.session.commit()

        patient_details['id'] = id
        return patient_details, 200

    except Error as e:
        print('Error updating a patient details...', e)

        return jsonify({
            "error": "There is an error updating the patient details."
        }), 500

    