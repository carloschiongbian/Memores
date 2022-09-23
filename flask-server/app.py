import pymysql.cursors
from flask import Flask, redirect

app = Flask(__name__);

#when using routes, use the "@" symbol before the variable
#which holds the imported module


@app.route('/patientRecord')

def retrieveData():
    connection = pymysql.connect(host='localhost',
                                user='root',
                                password='',
                                database='memores',
                                cursorclass=pymysql.cursors.DictCursor)

    with connection:
        with connection.cursor() as cursor:
            # Create a new record
            sql = "SELECT * FROM `patients`"
            cursor.execute(sql)
            result = cursor.fetchall()
    
    return result
    
# def test():
#     return { "members": ["Hans","Joshua","Julian","Angelica"] }

if __name__ == "__main__":
    app.run(debug=True)