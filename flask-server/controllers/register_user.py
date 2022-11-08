from flask import request, session
from flask.json import jsonify
from models.users import Users, users_schema
from flask import current_app as app
from werkzeug.utils import secure_filename
import uuid
import os
from models.users import db
from flask_bcrypt import generate_password_hash, check_password_hash

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def register_user():
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

    # Check if session exist
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    # Check if role is admin
    user = Users.query.filter_by(id=user_id).first()
    if user.role != "admin":
        return jsonify({"error": "Unauthorized"}), 401

    # Check if username or email exist in the database
    user_exist = Users.query.filter(
        (Users.email == email) | (Users.uname == uname)).first()
    if user_exist:
        return jsonify({"error": "Username or email already exist!"}), 409

    # Hash passwords then check if password and confirm password is equal
    hashed_password = generate_password_hash(
        pwd).decode('utf-8')
    if check_password_hash(hashed_password, confirm) is False:
        return jsonify({"error": "Password and confirmed password are not match"}), 400

    # check if profile picture is empty
    file = request.files['profile']
    if 'profile' not in request.files or file.filename == '':
        return jsonify({"error": "Please upload profile picture"}), 400

    # check if license picture is empty
    license_file = request.files['img']
    if 'img' not in request.files or license_file.filename == '':
        return jsonify({"error": "Please upload photo of the user's license"}), 400

    # check if the post request has the file part
    if request.method == 'POST':
        if file and allowed_file(file.filename) and license_file and allowed_file(license_file.filename):
            # rename file to a unique uuid
            file.filename = uuid.uuid4().hex+'.'+file.filename.split(".")[-1]
            filename = secure_filename(file.filename)
            filepath = os.path.join(os.path.abspath(os.path.dirname(
                __file__)), app.config['UPLOAD_FOLDER'], filename)
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            # save file to the uploads folder and insert the directory path to mysql db.
            file.save(filepath)

            binaryLicense = license_file.read()
            # Finally, Insert new user in mysql
            new_user = Users(uname=uname, pwd=hashed_password, fname=fname, lname=lname, email=email, phone=contact, bday=bday, gender=gender,
                             photo=filepath, license=binaryLicense, license_id=license, street=addr, city=city, country=country, zip=zipcode)
            db.session.add(new_user)
            db.session.commit()

    users = Users.query.filter_by(role='user', is_deleted=0).with_entities(
        Users.id, Users.uname, Users.fname, Users.lname, Users.role, Users.email, Users.created_at)
    return users_schema.jsonify(users)
