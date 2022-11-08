from flask import session, request
from models.users import Users, users_schema
from flask.json import jsonify
from auth.auth import is_authenticated, is_admin
from flask import current_app as app
from werkzeug.utils import secure_filename
from models.users import db
import pymysql

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def update_user_license_and_details():

    user_id = session.get("user_id")
    # Check if session exist
    if not is_authenticated(user_id):
        return jsonify({"error": "Unauthorized"}), 401

    # Check if role is admin
    if not is_admin(user_id):
        return jsonify({"error": "Unauthorized"}), 401

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

    # check if license picture is empty
    license_file = request.files['img']
    if 'img' not in request.files or license_file.filename == '':
        return jsonify({"error": "Please upload photo of the user's license"}), 400

     # Check if username or email exist in the database
    user_exist = Users.query.filter(
        (Users.email == email) & (Users.id != id)).first()
    if user_exist:
        return jsonify({"error": "Email already exist!"}), 409

    if license_file and allowed_file(license_file.filename):
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
            user.license_id = license_id
            db.session.commit()

        except pymysql.Error as e:
            print("could not close connection error pymysql %d: %s" %
                  (e.args[0], e.args[1]))

    updatedUser = Users.query.filter_by(role='user', is_deleted=0).with_entities(
        Users.id, Users.uname, Users.fname, Users.lname, Users.role, Users.email, Users.created_at)

    return users_schema.jsonify(updatedUser)
