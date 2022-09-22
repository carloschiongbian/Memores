# input "python server.py" to run the flask server
import os
from flask import Flask, request, abort, flash
from flask.json import jsonify
import pymysql
from flask_bcrypt import Bcrypt
from werkzeug.utils import secure_filename

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
    if user_exist['COUNT(*)']:
        abort(409)

    # Hash passwords then check if password and confirm password is equal
    hashed_password = bcrypt.generate_password_hash(
        pwd).decode('utf-8')
    if bcrypt.check_password_hash(hashed_password, confirm) is False:
        abort(409)

    # Save profile picture and license within the web application's folder, and encrypt the path.
    if request.method == 'POST':
        # check if the post request has the file part
        if 'img' not in request.files:
            flash('No file part')
            return {"error": "Please upload a file"}
        file = request.files['img']
        # If the user does not select a file, the browser submits an
        # empty file without a filename.
        if file.filename == '':
            flash('No selected file')
            return {"error": "Please submit a file"}
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(os.path.abspath(os.path.dirname(
                __file__)), app.config['UPLOAD_FOLDER'], filename))
            if filename:
                # Finally, Insert data to user table in mysql
                cursor = connection.cursor()
                cursor.execute(
                    f"INSERT INTO users (uname,pwd,fname,lname,email,phone,bday,gender,license,license_id,street,city,country,zip) VALUES ('{uname}', '{hashed_password}', '{fname}', '{lname}', '{email}', '{contact}', '{bday}', '{gender}', '{filename}', '{license}', '{addr}', '{city}', '{country}', '{zipcode}'  )")
                connection.commit()
                cursor.close()

    return 'Done', 201


if __name__ == "__main__":
    app.run(debug=True)
