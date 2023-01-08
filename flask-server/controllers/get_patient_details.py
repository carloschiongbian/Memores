from flask import session, jsonify
from connection.connection import db, ma
from models.patients import Patients
from models.patient_screening_details import PatientsScreeningDetails, PatientScreeningDetailsSchema
from models.assessments import Assessments

# @param - id. A patient id, usually passed through url route
# i.e., 'website.com/api/get-patient-details/id=1'
def get_patient_details(id):

    user_id = session.get("user_id")
    #Check if session exist
    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    query = db.session.query(*Patients.__table__.columns,
                            Assessments.id.label("assessment_id"),
                            Assessments.prediction_result, Assessments.classification_probability,
                            Assessments.result_description, Assessments.date_taken,
                            Assessments.date_finished, PatientsScreeningDetails.patient_notes,
                            PatientsScreeningDetails.last_edited_on).\
                        outerjoin(Assessments, Assessments.patient_id == Patients.id).\
                        outerjoin(PatientsScreeningDetails, PatientsScreeningDetails.assessment_id == Assessments.id).\
                        filter(Patients.id == int(id))
    
    patient = query.first()
    patient_response_obj = patient_details_schema.jsonify(patient)
    return patient_response_obj.get_json()


class PatientDetailsSchema(ma.Schema):
    """This is a schema for the return query of get_patient_details() function."""
    class Meta:
        """Specify which fields you want to see in RESTful API"""
        fields = ('id', 'assessment_id', 'fname', 'lname', 'fullname', 'email', 'phone', 'age', 'bday', 'gender', 'street', 'city',
                    'country', 'zip', 'registered_date', 'prediction_result', 'classification_probability', 'result_description',
                    'date_taken', 'date_finished', 'patient_notes', 'last_edited_on')

patient_details_schema = PatientDetailsSchema()