import json
from datetime import timedelta
import pymysql.cursors
from connection.connection import db, ma
from json_encoder import AlchemyEncoder
from flask import Flask, jsonify, request, session

from models.users import Users
from models.patients import Patients
from models.assessments import Assessments
from controllers.get_current_user import *
from models.patient_screening_details import PatientsScreeningDetails

from sqlalchemy import create_engine
from sqlalchemy import select, delete, update

engine = create_engine("mysql+pymysql://root:@localhost/memores_v2")
connect = engine.connect()

app = Flask(__name__);

connection = pymysql.connect(
    host='localhost',
    user='root',
    password='',
    database='memores_v2',
    charset="utf8mb4",
    cursorclass=pymysql.cursors.DictCursor
)

def retrieveData():
    user = get_current_user()
    user_id = user.get_json(force=True)['id']

    patients_query = db.session.query(*Patients.__table__.columns).select_from(Patients)
    patients_query = patients_query.outerjoin(Assessments, Patients.id == Assessments.patient_id).filter(Patients.created_by == user_id).order_by(Patients.id)

    patients_query_response = patients_query.all()
    patient_response_object = patient_record_schema.jsonify(patients_query_response)

    assessments_query = db.session.query(*Assessments.__table__.columns).select_from(Assessments).where(Assessments.patient_id == Patients.id)
    assessment_response_object = patient_assessment_schema.jsonify(assessments_query)

    records = { 'patients': patient_response_object.get_json(), 'assessment': assessment_response_object.get_json() }
    return records
    
def retrievePatientScreeningDetails(id):

    if request.method == 'GET':
        patients_query = db.session.query(*Patients.__table__.columns).select_from(Patients).where(Patients.id == id)
        patient_response_object = patient_record_schema.jsonify(patients_query)

        assessments_query = db.session.query(*Assessments.__table__.columns).select_from(Assessments).where(Assessments.patient_id == id)
        assessment_response_object = patient_assessment_schema.jsonify(assessments_query)

        screening_query = db.session.query(*PatientsScreeningDetails.__table__.columns).select_from(PatientsScreeningDetails).where(patient_response_object.get_json()[0]['id'] == PatientsScreeningDetails.id)
        screening_response_object = patient_screening_details_schema.jsonify(screening_query)

        records = { 
            'patients': patient_response_object.get_json(), 
            'assessment': assessment_response_object.get_json(), 
            'screeningDetails': screening_response_object.get_json() 
        }
        
        return records
        
    elif request.method == 'PUT':
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

        # #assessment details
        date_taken = request.get_json()['date_taken']
        date_finished = request.get_json()['date_finished']
        result_description = request.get_json()['result_description']

        update_patient_query = (
            update(Patients).
            where(Patients.id == id).
            values(
                fname = fname,
                lname = lname,
                fullname = fullname,
                bday = bday,
                gender = gender,
                country = country,
                city = city,
                zip = zip,
                phone = phone,
                street = street
            )
        )

        update_assessment_query = (
            update(Assessments).
            where(Assessments.patient_id == id).
            values(
                date_taken = date_taken,
                date_finished = date_finished,
                result_description = result_description
            )
        )

        update_screening_query = (
            update(PatientsScreeningDetails).
            where(PatientsScreeningDetails.id == id).
            values(
                patient_notes = patient_notes
            )
        )

        connect.execute(update_patient_query)
        connect.execute(update_screening_query)
        connect.execute(update_assessment_query)
        return jsonify(request.get_json())

def deletePatientRecord(id):
    
    # deletion wont reflect right away on the table
    # table component for patient records needs to be re-rendered

    delete_patients_query = delete(Patients).where(Patients.id == id)
    delete_assessment_query = delete(Assessments).where(Assessments.patient_id == id)
    delete_screening_details_query = delete(PatientsScreeningDetails).where(PatientsScreeningDetails.id == id)

    connect.execute(delete_patients_query)
    connect.execute(delete_assessment_query)
    connect.execute(delete_screening_details_query)
    
    return retrieveData()

def retrieveDashboardContent():

    patients_query = select(Patients)
    patients_query_response = connect.execute(patients_query)

    screening_details_query = select(PatientsScreeningDetails)
    screening_details_query_response = connect.execute(screening_details_query)

    assessment_query = select(Assessments)
    assessment_query_response = connect.execute(assessment_query)

    user = get_current_user()
    user_id = user.get_json(force=True)['id']

    start_time = []
    finish_time = []

    cursor = connection.cursor()
    cursor.execute('SELECT TIME(date_taken) as start_time FROM assessments')
    result_time = cursor.fetchall()
    for time in result_time:
        start_time.append(time['start_time'])

    cursor = connection.cursor()
    cursor.execute('SELECT TIME(date_finished) as finished_time FROM assessments')
    result_time = cursor.fetchall()
    for time in result_time:
        finish_time.append(time['finished_time'])

    timeStamps = []

    for i in range(len(start_time)):
        timeStamps.append(finish_time[i] - start_time[i])
    # timeStamps.sort()

    print(timeStamps)
    # avg_time_duration = str((timeStamps[len(timeStamps) - 1] + timeStamps[0] / 2))
    
    patients = []
    assessments = []
    screening_details = []
    dashboard_content = []

    for data in screening_details_query_response:
        obj = {
            'id': data['id'],
            'sad_category': data['sad_category'],
            'assessment_id': data['assessment_id']
        }
        screening_details.append(obj)

    for data in assessment_query_response:
        obj = {
            'patient_id': data['patient_id'],
            'assessor_id': data['assessor_id'],
            'responses': data['responses'],
            'date_taken': data['date_taken'],
            'date_finished': data['date_finished'],
            'prediction_result': data['prediction_result'],
            'result_description': data['result_description'],
        }
        assessments.append(obj)

    for data in patients_query_response:
        obj = {
            'patient_id': data['id'],
            'fname': data['fname'],
            'lname': data['lname'],
            'created_by': data['created_by'],
            'is_screened': data['is_screened'],
            'date_taken': ''
        }

        for assessment in assessments:
            if obj['patient_id'] == assessment['patient_id']:
                is_screened_obj = {
                    'is_screened': True,
                    'date_taken': assessment['date_taken']
                }
                obj.update(is_screened_obj)

        patients.append(obj)

    for data in assessment_query_response:
        obj = {
            'patient_id': data['patient_id'],
            'assessor_id': data['assessor_id']
        }
        assessments.append(obj)

    for data in patients:
        if data['created_by'] == user_id:
            obj = {
                'id': data['patient_id'],
                'fname': data['fname'],
                'lname': data['lname'],
                'created_by': data['created_by'],
                'is_screened': data['is_screened'],
                'date_taken': data['date_taken'],
                'sad_category': '',
            }

            for screening_data in screening_details:
                if data['patient_id'] == screening_data['id']:
                    screening_obj = {
                        'sad_category': screening_data['sad_category'],
                        'assessment_id': screening_data['assessment_id']
                    }
                    obj.update(screening_obj)
            dashboard_content.append(obj)

    dashboard_content.append({'time_stamps': str(timeStamps)})
    return dashboard_content
        
class PatientAssessmentSchema(ma.Schema):
    class Meta:
        fields = ('id', 'date_taken', 'date_finished', 'assessor_id', 'patient_id')

patient_assessment_schema = PatientAssessmentSchema(many = True)

class PatientScreeningDetailsSchema(ma.Schema):
    class Meta:
        fields = ('id', 'assessment_id', 'patient_notes', 'sad_category', 'last_edited_on', 'last_edited_by')

patient_screening_details_schema = PatientScreeningDetailsSchema(many = True)

class PatientRecordSchema(ma.Schema):
    class Meta:
        fields = ('id', 'fname', 'lname', 'fullname', 'age', 'bday', 'phone', 'email', 'gender', 'city', 'country', 'street', 'zip', 'registered_date', 'created_by')

patient_record_schema = PatientRecordSchema(many = True)