# input "python server.py" to run the flask server
import os
from flask import Flask, request
from flask.json import jsonify
import pymysql
from flask_bcrypt import Bcrypt
from werkzeug.utils import secure_filename
import uuid


UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['SECRET_KEY'] = "super secret key"

bcrypt = Bcrypt(app)

connection = pymysql.connect(host="localhost",
                             user="user",
                             password="",
                             database="memores",
                             charset="utf8mb4",
                             cursorclass=pymysql.cursors.DictCursor)


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route("/register", methods=["POST"])
def register():
    # Store form data values to variable.
    fname = request.form['firstname']
    lname = request.form['lastname']
    email = request.form['email']
    license = request.form['license']
    gender = request.form['gender']
    bday = request.form['birthday']
    contact = request.form['contact']
    uname = request.form['username']
    pwd = request.form['password']
    confirm = request.form['confirm']
    addr = request.form['address']
    city = request.form['city']
    country = request.form['country']
    zipcode = request.form['zipcode']
    # Check if username and email exist in the Database, if exist returns 1, if not 0
    cursor = connection.cursor()
    cursor.execute(
        f"SELECT COUNT(*) FROM users WHERE uname ='{uname}' OR email ='{email}'")
    user_exist = cursor.fetchone()
    cursor.close()
    if user_exist['COUNT(*)'] > 0:
        return jsonify({"error": "Username or email already exist!"}), 409

    # Hash passwords then check if password and confirm password is equal
    hashed_password = bcrypt.generate_password_hash(
        pwd).decode('utf-8')
    if bcrypt.check_password_hash(hashed_password, confirm) is False:
        return jsonify({"error": "Please match the password and confirmed password"}), 400

    file = request.files['profile']
    # check if image is empty
    if 'profile' not in request.files or file.filename == '':
        return jsonify({"error": "Please upload an image"}), 400

    # check if the post request has the file part
    if request.method == 'POST':
        license_file = request.files['img']
        if file and allowed_file(file.filename) and license_file and allowed_file(license_file.filename):
            # rename file to a unique uuid
            file.filename = uuid.uuid4().hex+'.'+file.filename.split(".")[-1]
            filename = secure_filename(file.filename)
            filepath = os.path.join(os.path.abspath(os.path.dirname(
                __file__)), app.config['UPLOAD_FOLDER'], filename)
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            # save file to the uploads folder and insert the directory path to mysql db.
            file.save(filepath)
            try:
                binaryLicense = license_file.read()
                sql_insert_query = """ INSERT INTO users (uname,pwd,fname,lname,email,phone,bday,gender,photo,license,license_id,street,city,country,zip) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"""
                insert_values = (uname, hashed_password, fname, lname, email, contact, bday,
                                 gender, filepath, binaryLicense, license, addr, city, country, zipcode)
                # Finally, Insert data to user table in mysql
                cursor = connection.cursor()
                cursor.execute(sql_insert_query, insert_values)
                connection.commit()
                cursor.close()
                connection.close()
            except pymysql.Error as e:
                print("could not close connection error pymysql %d: %s" %
                      (e.args[0], e.args[1]))

    return jsonify({"success": "Registered Successfully"}), 200


if __name__ == "__main__":
    app.run(debug=True)