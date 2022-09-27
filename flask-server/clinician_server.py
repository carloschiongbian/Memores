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
def retrievePatientDetails(id):
    cursor = connection.cursor()
    query = ("SELECT * FROM `patients` WHERE id =" + id)
    cursor.execute(query)
    record = cursor.fetchall()
    print(record)
    cursor.close()
    return jsonify(record)

if __name__ == "__main__":
    app.run(debug=True)