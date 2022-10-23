import json
from json import JSONEncoder
import pymysql.cursors
from sqlalchemy import select

from models.patients import Patients
from models.patient_screening_details import PatientsScreeningDetails

from flask import Flask, jsonify, request, render_template
from connection.connection import db

from marshmallow import Schema, fields

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
    # cursor = connection.cursor()
    # query = ("SELECT p.id, p.fname, p.lname, p.age, sd.screened_by FROM patients AS p JOIN patients_screening_details AS sd ON sd.patient_id = p.id")
    # # query = ("SELECT * FROM patients")
    # cursor.execute(query)
    # records = cursor.fetchall()
    # cursor.close()
    # return records

    response = Patients.query.all()
    records = []
    # for patient in Patients:
    #     records.append({
    #         'fname': patient.fname,
    #         'lname': patient.lname,
    #         'age': patient.age,
    #         'screened_by': patient.screened_by
    #     })
    # print(response[0].fname)
    # print(records[0])
    return jsonify(response[0].fname)
    
    # records = session.query(Patients, PatientsScreeningDetails).join(PatientsScreeningDetails)
    # records = Patients.query.all()
    # statement = select(Patients).join(PatientsScreeningDetails, Patients.id == PatientsScreeningDetails.patient_id)
    # records = db.session.query(Patients).join(PatientsScreeningDetails.patient_id).join(Patients.id)
    # records = db.session.query(Patients).join(PatientsScreeningDetails, Patients.id == PatientsScreeningDetails.patient_id, isouter=True).all()
    
def retrievePatientScreeningDetails(id):
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
        screened_time = request.get_json()['screened_time']
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
    cursor = connection.cursor()
    query = ("SELECT p.id, p.fname, p.lname, sd.screened_date, sd.sad_category, p.is_screened FROM patients AS p JOIN patients_screening_details AS sd ON sd.patient_id = p.id ORDER BY sd.screened_date")
    cursor.execute(query)
    records = cursor.fetchall()
    cursor.close()
    return jsonify(records)
        
if __name__ == "__main__":
    app.run(debug=True)