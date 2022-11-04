import pymysql.cursors
import time
from connection.connection import db, ma
from flask import Flask, jsonify, request, session

from models.patients import Patients
from models.assessments import Assessments
from controllers.get_current_user import *
from models.patient_screening_details import PatientsScreeningDetails
from auth.auth import is_authenticated

from sqlalchemy import create_engine
from sqlalchemy import delete, update

engine = create_engine("mysql+pymysql://root:@localhost/memores_v2")
connect = engine.connect()

app = Flask(__name__)

connection = pymysql.connect(
    host='localhost',
    user='root',
    password='',
    database='memores_v2',
    charset="utf8mb4",
    cursorclass=pymysql.cursors.DictCursor
)


def retrieveData():
    user_id = session.get("user_id")

    # Check if session exist
    if not is_authenticated(user_id):
        return jsonify({"error": "Unauthorized"}), 401

    patients_query = db.session.query(
        *Patients.__table__.columns).select_from(Patients)
    patients_query = patients_query.outerjoin(Assessments, Patients.id == Assessments.patient_id).filter(
        Patients.created_by == user_id).order_by(Patients.id)

    patients_query_response = patients_query.all()
    patient_response_object = patient_record_schema.jsonify(
        patients_query_response)

    assessments_query = db.session.query(*Assessments.__table__.columns).select_from(
        Assessments).where(Assessments.patient_id == Patients.id)
    assessment_response_object = patient_assessment_schema.jsonify(
        assessments_query)

    records = {'patients': patient_response_object.get_json(
    ), 'assessment': assessment_response_object.get_json()}
    return records


def retrievePatientScreeningDetails(id):

    user_id = session.get("user_id")

    # Check if session exist
    if not is_authenticated(user_id):
        return jsonify({"error": "Unauthorized"}), 401

    if request.method == 'GET':
        patients_query = db.session.query(
            *Patients.__table__.columns).select_from(Patients).where(Patients.id == id)
        patient_response_object = patient_record_schema.jsonify(patients_query)

        assessments_query = db.session.query(
            *Assessments.__table__.columns).select_from(Assessments).where(Assessments.patient_id == id)
        assessment_response_object = patient_assessment_schema.jsonify(
            assessments_query)

        screening_query = db.session.query(*PatientsScreeningDetails.__table__.columns).select_from(
            PatientsScreeningDetails).where(patient_response_object.get_json()[0]['id'] == PatientsScreeningDetails.id)
        screening_response_object = patient_screening_details_schema.jsonify(
            screening_query)

        records = {
            'patients': patient_response_object.get_json(),
            'assessment': assessment_response_object.get_json(),
            'screeningDetails': screening_response_object.get_json()
        }

        return records

    elif request.method == 'PUT':

        user_id = session.get("user_id")

        # Check if session exist
        if not is_authenticated(user_id):
            return jsonify({"error": "Unauthorized"}), 401
        # update with assessment table

        fname = request.get_json()['fname']
        lname = request.get_json()['lname']
        fullname = request.get_json()['fullname']
        bday = request.get_json()['bday']
        gender = request.get_json()['gender']
        country = request.get_json()['country']
        city = request.get_json()['city']
        zip = request.get_json()['zip']
        phone = request.get_json()['phone']
        street = request.get_json()['street']

        # #screening details
        patient_notes = request.get_json()['patient_notes']
        last_edited_on = request.get_json()['last_edited_on']

        # #assessment details
        date_taken = request.get_json()['date_taken']
        date_finished = request.get_json()['date_finished']
        result_description = request.get_json()['result_description']

        update_patient_query = (
            update(Patients).
            where(Patients.id == id).
            values(
                fname=fname,
                lname=lname,
                fullname=fullname,
                bday=bday,
                gender=gender,
                country=country,
                city=city,
                zip=zip,
                phone=phone,
                street=street
            )
        )

        update_assessment_query = (
            update(Assessments).
            where(Assessments.patient_id == id).
            values(
                date_taken=date_taken,
                date_finished=date_finished,
                result_description=result_description
            )
        )
    # include last edited on update
        update_screening_query = (
            update(PatientsScreeningDetails).
            where(PatientsScreeningDetails.id == id).
            values(
                patient_notes=patient_notes,
                last_edited_on=last_edited_on
            )
        )

        connect.execute(update_patient_query)
        connect.execute(update_screening_query)
        connect.execute(update_assessment_query)
        return jsonify(request.get_json())


def deletePatientRecord(id):

    user_id = session.get("user_id")

    # Check if session exist
    if not is_authenticated(user_id):
        return jsonify({"error": "Unauthorized"}), 401

    # deletion wont reflect right away on the table
    # table component for patient records needs to be re-rendered

    delete_patients_query = delete(Patients).where(Patients.id == id)
    delete_assessment_query = delete(
        Assessments).where(Assessments.patient_id == id)
    delete_screening_details_query = delete(
        PatientsScreeningDetails).where(PatientsScreeningDetails.id == id)

    connect.execute(delete_patients_query)
    connect.execute(delete_assessment_query)
    connect.execute(delete_screening_details_query)

    return retrieveData()


def retrieveDashboardContent():
    user_id = session.get("user_id")

    # Check if session exist
    if not is_authenticated(user_id):
        return jsonify({"error": "Unauthorized"}), 401

    user_id = session.get("user_id")

    patients_query = db.session.query(
        *Patients.__table__.columns).select_from(Patients)
    patients_query = patients_query.outerjoin(Assessments, Patients.id == Assessments.patient_id).filter(
        Patients.created_by == user_id).order_by(Patients.id)
    patient_response_object = patient_record_schema.jsonify(patients_query)

    screened_patients_query = db.session.query(*Patients.__table__.columns).select_from(Patients).where(
        Assessments.patient_id == Patients.id).filter(Patients.created_by == user_id).order_by(Patients.id)
    screened_patients_response_object = patient_record_schema.jsonify(
        screened_patients_query)

    # screening_query = db.session.query(*PatientsScreeningDetails.__table__.columns).\
    # select_from(PatientsScreeningDetails).\
    # filter(PatientsScreeningDetails.id == Assessments.patient_id)

    # fix condition for dashboard chart
    screening_query = db.session.query(
        *PatientsScreeningDetails.__table__.columns).select_from(PatientsScreeningDetails)
    screening_query = screening_query.outerjoin(
        Assessments, PatientsScreeningDetails.id == Assessments.patient_id).filter(Assessments.assessor_id == user_id)
    screening_response_object = patient_screening_details_schema.jsonify(
        screening_query)

    assessments_query = db.session.query(*Assessments.__table__.columns).select_from(Assessments).where(
        Assessments.patient_id == Patients.id).filter(Patients.created_by == user_id).order_by(Assessments.date_finished.desc())
    assessment_response_object = patient_assessment_schema.jsonify(
        assessments_query)

    records = {
        'patients': patient_response_object.get_json(),
        'screened_patients': screened_patients_response_object.get_json(),
        'screening_details': screening_response_object.get_json(),
        'assessments': assessment_response_object.get_json()
    }

    return records


class PatientAssessmentSchema(ma.Schema):
    class Meta:
        fields = ('id', 'date_taken', 'date_finished',
                  'assessor_id', 'patient_id', 'result_description')


class PatientScreeningDetailsSchema(ma.Schema):
    class Meta:
        fields = ('id', 'assessment_id', 'patient_notes',
                  'sad_category', 'last_edited_on', 'last_edited_by')


patient_screening_details_schema = PatientScreeningDetailsSchema(many=True)


class PatientRecordSchema(ma.Schema):
    class Meta:
        fields = ('id', 'fname', 'lname', 'fullname', 'age', 'bday', 'phone', 'email',
                  'gender', 'city', 'country', 'street', 'zip', 'registered_date', 'created_by')


patient_record_schema = PatientRecordSchema(many=True)
