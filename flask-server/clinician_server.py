import pymysql.cursors
from flask import Flask, redirect, jsonify

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
    return jsonify(records)

@app.route('/patientDetails/id=<id>', methods=['GET'])
def retrievePatient(id):
    cursor = connection.cursor()
    query = ("SELECT * FROM `patients` WHERE id =" + id)
    cursor.execute(query)
    record = cursor.fetchall()
    print("poop")
    cursor.close()
    return jsonify(record)

@app.route('/patientRecord/id=<id>', methods=['DELETE'])
def deletePatient(id):
    cursor = connection.cursor()
    query = ("DELETE FROM `patients` WHERE id =" + id)
    cursor.execute(query)
    cursor.close()
    redirect('/patientRecord')

if __name__ == "__main__":
    app.run(debug=True)