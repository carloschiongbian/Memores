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

# def test():
#     return { "members": ["Hans","Joshua","Julian","Angelica"] }

if __name__ == "__main__":
    app.run(debug=True)