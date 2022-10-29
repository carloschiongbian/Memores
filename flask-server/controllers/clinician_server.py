import json
import pymysql.cursors
from connection.connection import db
from json_encoder import AlchemyEncoder
from flask import Flask, jsonify, request

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

    patients_query = select(Patients)
    patients_query_response = connect.execute(patients_query)

    assessment_query = select(Assessments)
    assessment_query_response = connect.execute(assessment_query)

    users_query = select(Users)
    users_query_response = connect.execute(users_query)

    user = get_current_user()
    user_id = user.get_json(force=True)['id']
 
    users = []
    patients = []
    assessments = []
    patient_record_details = []

    for data in patients_query_response:
        obj = {
            'patient_id': data['id'],
            'fname': data['fname'],
            'lname': data['lname'],
            'age': data['age'],
            'created_by': data['created_by'],
            'is_screened': data['is_screened']
        }
        patients.append(obj)
    
    for data in assessment_query_response:
        obj = {
            'patient_id': data['patient_id'],
            'assessor_id': data['assessor_id']
        }
        assessments.append(obj)

    for data in users_query_response:
        obj = {
            'id': data['id'],
            'username': data['uname']
        }
        users.append(obj)

    for patient in patients:
        if patient['created_by'] == user_id:
            obj = {
                'patient_id': patient['patient_id'],
                'fname': patient['fname'],
                'lname': patient['lname'],
                'age': patient['age'],
                'created_by': patient['created_by'],
                'is_screened': patient['is_screened']
            }
            patient_record_details.append(obj)

    return patient_record_details
    
def retrievePatientScreeningDetails(id):

    patients_query = select(Patients)
    patients_query_response = connect.execute(patients_query)

    assessment_query = select(Assessments)
    assessment_query_response = connect.execute(assessment_query)

    screening_details_query = select(PatientsScreeningDetails)
    screening_details_query_response = connect.execute(screening_details_query)

    if request.method == 'GET':
        patient_screening_details = []

        for data in patients_query_response:
            obj = {
                'id': data['id'],
                'fname': data['fname'],
                'lname': data['lname'],
                'bday': data['bday'],
                'gender': data['gender'],
                'street': data['street'],
                'city': data['city'],
                'country': data['country'],
                'zip': data['zip'],
                'email': data['email'],
                'phone': data['phone'],
                'registered_date': data['registered_date'],
                'is_screened': data['is_screened'],
                'patient_notes': '',
                'sad_category': '',
                'last_edited_by': '',
                'last_edited_on': '',
                'responses': '',
                'date_taken': '',
                'assessor_id': '',
                'date_finished': '',
                'prediction_result':'',
                'result_description': ''
            }

            if data['is_screened'] != False:
                for screening_data in screening_details_query_response:
                    if screening_data['id'] == data['id']: 
                        screening_obj = {
                            'patient_notes': screening_data['patient_notes'],
                            'sad_category': screening_data['sad_category'],
                            'last_edited_by': screening_data['last_edited_by'],
                            'last_edited_on': screening_data['last_edited_on'],
                        }
                        obj.update(screening_obj)
                    
                for assessment_data in assessment_query_response:
                    if assessment_data['patient_id'] == data['id']: 
                        assessment_obj = {
                            'responses': assessment_data['responses'],
                            'date_taken': assessment_data['date_taken'],
                            'assessor_id': assessment_data['assessor_id'],
                            'date_finished': assessment_data['date_finished'],
                            'prediction_result': assessment_data['prediction_result'],
                            'result_description': assessment_data['result_description']
                        }
                        obj.update(assessment_obj)

            patient_screening_details.append(obj)        

        return jsonify(patient_screening_details)

    elif request.method == 'PUT':
        # update with assessment table

        fname = request.get_json()['fname']
        lname = request.get_json()['lname']
        bday = request.get_json()['bday']
        gender = request.get_json()['gender']
        country = request.get_json()['country']
        city = request.get_json()['city']
        zip = request.get_json()['zip']
        phone = request.get_json()['phone']
        street = request.get_json()['street']
        # patient_notes = request.get_json()['patient_notes']
        # screened_date = request.get_json()['screened_date']
        # screened_by = request.get_json()['screened_by']
        # screened_on = request.get_json()['screened_on']
        # results = request.get_json()['results']

        query = (
            update(Patients).
            where(Patients.id == id).
            values(
                fname = fname,
                lname = lname,
                bday = bday,
                gender = gender,
                country = country,
                city = city,
                zip = zip,
                phone = phone,
                street = street
            )
        )

        connect.execute(query)
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
    
    return jsonify(request.get_json())

def retrieveDashboardContent():

    patients_query = select(Patients)
    patients_query_response = connect.execute(patients_query)

    assessment_query = select(Assessments)
    assessment_query_response = connect.execute(assessment_query)

    users_query = select(Users)
    users_query_response = connect.execute(users_query)

    user = get_current_user()
    user_id = user.get_json(force=True)
 
    users = []
    patients = []
    assessments = []
    dashboard_content = []

    for data in patients_query_response:
        obj = {
            'patient_id': data['id'],
            'fname': data['fname'],
            'lname': data['lname'],
            'created_by': data['created_by'],
            'is_screened': data['is_screened']
        }
        patients.append(obj)
    
    for data in assessment_query_response:
        obj = {
            'patient_id': data['patient_id'],
            'assessor_id': data['assessor_id']
        }
        assessments.append(obj)

    for data in users_query_response:
        obj = {
            'id': data['id'],
            'username': data['uname']
        }
        users.append(obj)

    for data in patients:
        if data['created_by'] == user_id:
            obj = {
                'patient_id': data['patient_id'],
                'fname': data['fname'],
                'lname': data['lname'],
                'created_by': data['created_by'],
                'is_screened': data['is_screened']
            }
            dashboard_content.append(obj)
    
    return dashboard_content
        
if __name__ == "__main__":
    app.run(debug=True)