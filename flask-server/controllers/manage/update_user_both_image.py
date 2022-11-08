from flask import session, request
from models.users import Users, users_schema
from flask.json import jsonify
from auth.auth import is_authenticated, is_admin
from flask import current_app as app
from werkzeug.utils import secure_filename
from models.users import db
import pymysql
import uuid
import os
from models.users import db


ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def update_user_both_image():

    # Store form data values to variable.
    id = request.form['id']
    fname = request.form['firstname']
    lname = request.form['lastname']
    email = request.form['email']
    gender = request.form['gender']
    bday = request.form['birthday']
    contact = request.form['contact']
    addr = request.form['address']
    city = request.form['city']
    country = request.form['country']
    zipcode = request.form['zipcode']
    license_id = request.form['license']

    user_id = session.get("user_id")
    # Check if session exist
    if not is_authenticated(user_id):
        return jsonify({"error": "Unauthorized"}), 401

    # Check if role is admin
    if not is_admin(user_id):
        return jsonify({"error": "Unauthorized"}), 401

    # check if profile picture is empty
    file = request.files['profile']
    if 'profile' not in request.files or file.filename == '':
        return jsonify({"error": "Please upload profile picture"}), 400

    # check if license picture is empty
    license_file = request.files['img']
    if 'img' not in request.files or license_file.filename == '':
        return jsonify({"error": "Please upload photo of the user's license"}), 400

    # Check if username or email exist in the database
    user_exist = Users.query.filter(
        (Users.email == email) & (Users.id != id)).first()
    if user_exist:
        return jsonify({"error": "Email already exist!"}), 409

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

            # Finally, update a user in mysql
            user = Users.query.get(id)
            user.fname = fname
            user.lname = lname
            user.email = email
            user.gender = gender
            user.bday = bday
            user.phone = contact
            user.street = addr
            user.city = city
            user.country = country
            user.zip = zipcode
            user.license = binaryLicense
            user.photo = filepath
            user.license_id = license_id
            db.session.commit()

        except pymysql.Error as e:
            return jsonify({"error": "could not close connection error pymysql"})

    updatedUser = Users.query.filter_by(role='user', is_deleted=0).with_entities(
        Users.id, Users.uname, Users.fname, Users.lname, Users.role, Users.email, Users.created_at)

    return users_schema.jsonify(updatedUser)
