import pymysql.cursors
from flask import Flask, redirect, jsonify, url_for

app = Flask(__name__);

connection = pymysql.connect(
    host='localhost',
    user='root',
    password='',
    database='memores',
    charset="utf8mb4",
    cursorclass=pymysql.cursors.DictCursor
)
    
@app.route('/patientRecord', methods=['GET'])
def retrieveData():
    cursor = connection.cursor()
    query = "SELECT * FROM `patients`"
    cursor.execute(query)
    records = cursor.fetchall()
    cursor.close()
    print('got records')
    return jsonify(records)

# @app.route('/patientDetails/id=<id>', methods=['GET'])
# def retrievePatientScreeningDetails(id):
#     cursor = connection.cursor()
#     query = ("SELECT * FROM `patients_screening_details` WHERE id =" + id)
#     cursor.execute(query)
#     record = cursor.fetchall()
#     cursor.close()
#     print('got record')
#     return jsonify(record)

@app.route('/patientRecord/delete/<int:id>')
def deletePatientRecord(id):
    cursor = connection.cursor()
    query = ("DELETE FROM `patients` WHERE id =" + id)
    cursor.execute(query)
    cursor.close()
    print('poop')
    return redirect('/patientRecord')

@app.route('/patientDetails/id=<id>', methods=['GET'])
def retrievePatientDetails(id):
    cursor = connection.cursor()
    query = ("SELECT p.fname, p.lname, p.bday, p.gender, p.street, p.city, p.country, p.zip, p.email, p.phone, sd.patient_notes, sd.results, sd.screened_by, sd.last_Edited_by, sd.screened_on, sd.last_edited_on FROM patients p INNER JOIN patients_screening_details sd ON p.id = " + id)
    cursor.execute(query)
    record = cursor.fetchall()
    print(record)
    cursor.close()
    return jsonify(record)
    
if __name__ == "__main__":
    app.run(debug=True)