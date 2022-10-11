import pymysql.cursors
from flask import Flask, redirect, jsonify, request

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
    cursor = connection.cursor()
    query = ("SELECT p.id, p.fname, p.lname, p.age, sd.screened_by FROM patients AS p JOIN patients_screening_details AS sd ON sd.patient_id = p.id")
    # query = ("SELECT * FROM patients")
    cursor.execute(query)
    records = cursor.fetchall()
    cursor.close()
    return jsonify(records)

@app.route('/dashboard', methods=['GET'])
def retrieveDashboardContent():
    cursor = connection.cursor()
    query = ("SELECT p.id, p.fname, p.lname, sd.screened_on FROM patients AS p JOIN patients_screening_details AS sd ON sd.patient_id = p.id ORDER BY sd.screened_on")
    cursor.execute(query)
    records = cursor.fetchall()
    cursor.close()
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

# @app.route('/patientRecord/delete/<int:id>')
# def deletePatientRecord(id):
#     cursor = connection.cursor()
#     query = ("DELETE FROM `patients` WHERE id =" + id)
#     cursor.execute(query)
#     cursor.close()
#     print('poop')
#     return redirect('/patientRecord')

@app.route('/patientDetails/id=<id>', methods=['GET', 'PUT'])
def manipulatePatientDetails(id):
    if request.method == 'GET':
        cursor = connection.cursor()
        query = ("SELECT p.id, p.fname, p.lname, p.bday, p.gender, p.street, p.city, p.country, p.zip, p.email, p.phone, p.registered_date, sd.patient_notes, sd.results, sd.screened_by, sd.last_Edited_by, sd.screened_date, sd.screened_on, sd.screened_time, sd.last_edited_on FROM patients p LEFT JOIN patients_screening_details sd ON p.id = "+id)
        cursor.execute(query)
        record = cursor.fetchall()
        cursor.close()
        return jsonify(record)

    #FINISH CREATING THE UPDATING
    elif request.method == 'PUT':
        cursor = connection.cursor()
        fname = request.get_json()['fname']
        lname = request.get_json()['lname']
        bday = request.get_json()['bday']
        gender = request.get_json()['gender']
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
        
        query = (f"UPDATE patients p, patients_screening_details sd SET p.fname = '{fname}', p.lname = '{lname}', bday = '{bday}', gender = '{gender}', street = '{street}', city = '{city}', country = '{country}', zip = '{zip}', phone = '{phone}', patient_notes = '{patient_notes}', results = '{results}', screened_by = '{screened_by}', screened_on='{screened_on}'")
        
        cursor.execute(f"UPDATE patients SET fname = '{fname}' WHERE id = {id}")
        cursor.close()
        connection.commit()
        return jsonify(request.get_json())
    
if __name__ == "__main__":
    app.run(debug=True)