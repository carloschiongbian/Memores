from asyncio.windows_events import NULL
import json
import pymysql.cursors
from connection.connection import db
from flask import Flask, jsonify, request
from json_encoder import AlchemyEncoder

from models.patients import Patients
from models.assessments import Assessments
from models.users import Users
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
    
    # need to link to assessments table to get data for screened_by etc.
    # query = select([Patients, PatientsScreeningDetails]).where(Patients.id == PatientsScreeningDetails.id)
    patients_query = select(Patients)
    patients_query_response = connect.execute(patients_query)

    assessment_query = select(Assessments)
    assessment_query_response = connect.execute(assessment_query)

    users_query = select(Users)
    users_query_response = connect.execute(users_query)

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
            'assessor': ''
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

    test = {'assessor_id': '100'}

    for patient in patients:
        for assessment in assessments:
            if patient['patient_id'] == assessment['patient_id']:
                for user in users:
                    if user['id'] == assessment['assessor_id']:
                        obj = {
                            'patient_id': patient['patient_id'],
                            'fname': patient['fname'],
                            'lname': patient['lname'],
                            'age': patient['age'],
                            'assessor_name': user['username']
                        }
                        patient_record_details.append(obj)
            else:
                patient_record_details.append(patient)


    # print(patients[0])


    # patient_record_details.append(users)
    # patient_record_details.append(patients)
    # patient_record_details.append(assessments)

    return jsonify(patient_record_details)
    # results = connect.execute(query)
    # records = []

    # for data in results:
    #     obj = {
    #         'id': data['id'],
    #         'fname': data['fname'],
    #         'lname': data['lname'],
    #         'age': data['age']
    #     }
    #     records.append(obj)

    # return jsonify(records)

    # use this for now
    # records = Patients.query.all()
    # return json.dumps(records, cls=AlchemyEncoder)
    
def retrievePatientScreeningDetails(id):
    # switch to SQLAlchemy

    if request.method == 'GET':
    
        patients_query = select(Patients).where(Patients.id == id)
        patients_response = connect.execute(patients_query)

        screening_details_query = select(PatientsScreeningDetails).where(PatientsScreeningDetails.id == id)
        screening_details_response = connect.execute(screening_details_query)

        assessments_query = select(Assessments).where(Assessments.patient_id == 2)
        assessments_response = connect.execute(assessments_query)

        user = []
        patients = []
        screening_details = []
        patient_screening_details = []

        assessment = []

        for data in patients_response:
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
            }
            patients.append(obj)

        for data in screening_details_response:
            obj = {
                'patient_notes':data['patient_notes'],
                'sad_category':data['sad_category'],
                'last_edited_by':data['last_edited_by'],
                'last_edited_on':data['last_edited_on'],
            }
            screening_details.append(obj)

        for data in assessments_response:
            obj = {
                'responses': data['responses'],
                'date_taken': data['date_taken'],
                'assessor_id': data['assessor_id'],
                'date_finished': data['date_finished'],
                'prediction_result': data['prediction_result'],
                'result_description': data['result_description']
            }
            assessment.append(obj)

        user_query = select(Users).where(Users.id == assessment[0]['assessor_id'])
        user_query_response = connect.execute(user_query)

        for data in user_query_response:
            obj = {
                'uname': data['uname'],
            }

        patient_screening_details.append(user)
        patient_screening_details.append(patients)
        patient_screening_details.append(assessment)
        patient_screening_details.append(screening_details)
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
    
    # temporary until finalized with data of assessments table 
    # deletion wont reflect
    print(id)
    query = delete(Patients).where(Patients.id == id)
    connect.execute(query)
    # records = Patients.query.filter_by(Patients.id == id).delete()
    return jsonify(request.get_json())

def retrieveDashboardContent():
    # switch to SQLAlchemy

    patients_query = select(Patients)
    screening_details_query = select(PatientsScreeningDetails)

    patients_results = connect.execute(patients_query)
    screening_details_results = connect.execute(screening_details_query)
    patients = []
    screening_details = []
    dashboard_content = []

    for data in patients_results:
        obj = {
            'id': data['id'],
            'fname': data['fname'],
            'lname': data['lname'],
        }
        patients.append(obj)

    for data in screening_details_results:
        obj = {
            'sad_category': data['sad_category'],
        }
        screening_details.append(obj)

    dashboard_content.append(patients)
    dashboard_content.append(screening_details)

    return jsonify(dashboard_content)
        
if __name__ == "__main__":
    app.run(debug=True)