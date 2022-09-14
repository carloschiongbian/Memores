# input "python server.py" to run the flask server
from flask import Flask
import pymysql

app = Flask(__name__)

connection = pymysql.connect(host='localhost',
                             user='user',
                             password='',
                             database='memores',
                             charset='utf8mb4',
                             cursorclass=pymysql.cursors.DictCursor)

# when using routes, use the "@" symbol before the variable
# which holds the imported module

# access "localhost:5000/members" to see the server
# return the members in JSON format


@app.route("/members")
def members():
    return {"members": ["Hans", "Joshua", "Julian", "Angelica"]}


@app.route('/admin')
def getAdmin():
    cursor = connection.cursor()
    cursor.execute('SELECT * FROM administrators')
    data = cursor.fetchall()
    print(data)
    return data


if __name__ == "__main__":
    app.run(debug=True)
