import json
import pymysql.cursors
from flask import Flask, jsonify, request, session

from models.patients import Patients
from json_encoder import AlchemyEncoder
from models.patient_screening_details import PatientsScreeningDetails
from connection.connection import db

from sqlalchemy import join
from sqlalchemy import select
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# engine = create_engine("mysql+pymysql://root:@memores_v2?charset=utf8mb4")
engine = create_engine("mysql+pymysql://root:@localhost/memores_v2")
conn = engine.connect()

Session = sessionmaker(bind = engine)
session = Session()

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
    # join data from PatientsScreeningDetails

    query = select([Patients, PatientsScreeningDetails]).where(Patients.id == PatientsScreeningDetails.patient_id)
    results = conn.execute(query)
    records = []

    for data in results:
        obj = {
            'id': data['patient_id'],
            'fname': data['fname'],
            'lname': data['lname'],
            'age': data['age'],
            'patient_id': data['patient_id'],
            'screened_by': data['screened_by'],
        }
        
        records.append(obj)

    return jsonify(records)
    
def retrievePatientScreeningDetails(id):
    # switch to SQLAlchemy

    if request.method == 'GET':
        cursor = connection.cursor()
        query = ("SELECT p.id, p.fname, p.lname, p.bday, p.gender, p.street, p.city, p.country, p.zip, p.email, p.phone, p.registered_date, sd.patient_notes, sd.results, sd.screened_by, sd.last_Edited_by, sd.screened_date, sd.screened_date, sd.screened_time, sd.last_edited_on FROM patients p LEFT JOIN patients_screening_details sd ON p.id = "+id)
        cursor.execute(query)
        record = cursor.fetchall()
        cursor.close()
        return jsonify(record)

    elif request.method == 'PUT':
        cursor = connection.cursor()
        fname = request.get_json()['fname']
        lname = request.get_json()['lname']
        bday = request.get_json()['bday']
        gender = request.get_json()['gender']
        country = request.get_json()['country']
        city = request.get_json()['city']
        zip = request.get_json()['zip']
        phone = request.get_json()['phone']
        street = request.get_json()['street']
        patient_notes = request.get_json()['patient_notes']
        screened_date = request.get_json()['screened_date']
        screened_by = request.get_json()['screened_by']
        screened_on = request.get_json()['screened_on']
        results = request.get_json()['results']
        
        query = (f"UPDATE patients p, patients_screening_details sd SET p.fname = '{fname}', p.lname = '{lname}', p.bday = '{bday}', p.gender = '{gender}', p.street = '{street}', p.city = '{city}', p.country = '{country}', p.zip = '{zip}', p.phone = '{phone}', sd.patient_notes = '{patient_notes}', sd.results = '{results}', sd.screened_by = '{screened_by}', sd.screened_date='{screened_date}' WHERE p.id = '{id}' AND sd.patient_id = '{id}'")
        
        cursor.execute(query)
        cursor.close()
        connection.commit()
        return jsonify(request.get_json())

def deletePatientRecord(id):
    cursor = connection.cursor()
    query = (f"DELETE FROM patients WHERE id='{id}'")
    cursor.execute(query)    
    query = (f"DELETE FROM patients_screening_details WHERE id='{id}'")
    cursor.execute(query)  
    connection.commit()  
    cursor.close()
    return jsonify(request.get_json())

def retrieveDashboardContent():
    # switch to SQLAlchemy

    cursor = connection.cursor()
    query = ("SELECT p.id, p.fname, p.lname, sd.screened_date, sd.sad_category, p.is_screened FROM patients AS p JOIN patients_screening_details AS sd ON sd.patient_id = p.id ORDER BY sd.screened_date")
    cursor.execute(query)
    records = cursor.fetchall()
    cursor.close()
    return jsonify(records)
        
if __name__ == "__main__":
    app.run(debug=True)