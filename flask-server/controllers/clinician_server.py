import json
import pymysql.cursors
from flask import Flask, jsonify, request, session

from models.patients import Patients
from models.patient_screening_details import PatientsScreeningDetails

from connection.connection import db
from sqlalchemy.ext.declarative import DeclarativeMeta
from marshmallow import Schema, fields

from sqlalchemy import create_engine
from sqlalchemy.orm import Session
from sqlalchemy.orm import sessionmaker


engine = create_engine("mysql+pymysql://root:@memores_v2?charset=utf8mb4")
Session = sessionmaker(bind = engine)
session = Session()


app = Flask(__name__);

class AlchemyEncoder(json.JSONEncoder):

    def default(self, obj):
        if isinstance(obj.__class__, DeclarativeMeta):
            # an SQLAlchemy class
            fields = {}
            for field in [x for x in dir(obj) if not x.startswith('_') and x != 'metadata']:
                data = obj.__getattribute__(field)
                try:
                    json.dumps(data) # this will fail on non-encodable values, like other classes
                    fields[field] = data
                except TypeError:
                    fields[field] = None
            # a json-encodable dict
            return fields

        return json.JSONEncoder.default(self, obj)

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

    records = db.session.query(Patients).join(PatientsScreeningDetails, Patients.id == PatientsScreeningDetails.patient_id, isouter=True).all()
    # print(json.dumps(records, cls=AlchemyEncoder))
    return json.dumps(records, cls=AlchemyEncoder)
    
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
    # switch to SQLAlchemy

    cursor = connection.cursor()
    query = ("SELECT p.id, p.fname, p.lname, sd.screened_date, sd.sad_category, p.is_screened FROM patients AS p JOIN patients_screening_details AS sd ON sd.patient_id = p.id ORDER BY sd.screened_date")
    cursor.execute(query)
    records = cursor.fetchall()
    cursor.close()
    return jsonify(records)
        
if __name__ == "__main__":
    app.run(debug=True)