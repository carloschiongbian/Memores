# input "python server.py" to run the flask server
from controllers.manage import update_user_account, get_user_account, delete_user_account, get_user_view, get_dashboard_data, get_deleted_users, get_updated_users, get_distinct_roles, get_general_users, update_user_photo_details, update_user_license_details, update_user_both_image, update_user_details_only
from controllers.screening import get_questions, submit_answers, get_patients
from controllers.patient_details import get_patient_details, update_patient_details, update_patient_notes
from controllers import get_users, login, register_user, get_current_user, logout, clinician_server, create_patient
import os
from flask import Flask
from flask_bcrypt import Bcrypt

# Additionals
import sys
from connection.connection import db, ma
from routes.routes import *
from dotenv import load_dotenv
from flask_cors import CORS
import redis
from flask_session import Session

UPLOAD_FOLDER = 'static'

dotenv_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '.env'))
load_dotenv(dotenv_path)

# Init app
app = Flask(__name__)
CORS(app, supports_credentials=True)  # allows Cross-Origin Resource Sharing
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# SESSION CONFIGURATION USING REDIS FOR SERVER-SIDE AUTHENTICATION/ PERSIST DATA SERVER SIDE
app.config['SESSION_TYPE'] = 'redis'
app.config['SESSION_PERMANENT'] = False
app.config['SESSION_USE_SIGNER'] = True
# app.config['SESSION_COOKIE_SAMESITE'] = 'None'
# app.config['SESSION_COOKIE_HTTPONLY'] = True
# app.config['SESSION_COOKIE_SECURE'] = True
app.config['SESSION_REDIS'] = redis.from_url("redis://127.0.0.1:6379")


# Secret Key
# NOTE: I am not sure what this is for
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')

# Config database
# syntax: 'mysql://username:password@localhost/db_name'
# NOTE: These credentials need to be inside the .env file
#           Create your own .env file
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get(
    'SQL_ALCHEMY_DATABASE_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = os.environ.get(
    'SQLALCHEMY_TRACK_MODIFICATIONS')

# init Session
server_session = Session(app)

# Init bcrypt
bcrypt = Bcrypt(app)

# Init db
db.init_app(app)

# Init ma : marshmallow -> this is for sqlalchemy schema
ma.init_app(app)


"""
IMPORT MODULES TO BE EXECUTED IN EACH API URL RULE.

SYNTAX FOR add_url_rule method:

app.add_url_rule('<URL>', '<NICKNAME>', <FUNCTION_NAME>, methods = ["GET", "POST", "DELETE", "PUT"])

    WHERE:
            <URL> - URL of the API Route -> can be found inside /routes/routes.py
"""
# Get Users
app.add_url_rule(GET_USERS, 'get_users', get_users.get_users, methods=['GET'])
# Assessment Questions
app.add_url_rule(QUESTIONS, 'questions',
                 get_questions.get_questions, methods=['GET'])
# Submit answers
app.add_url_rule(SUBMIT_ANSWERS, 'submit_answers',
                 submit_answers.submit_answers, methods=['POST'])
# Get Patient Details for screening
app.add_url_rule(GET_PATIENTS, 'get_patients',
                 get_patients.get_patients, methods=['GET'])
# Get Patient Details for screening using implementation 2
app.add_url_rule(GET_PATIENTS_V2, 'get_patients_v2',
                 get_patients.get_patients_v2, methods=['GET'])
# add_user
app.add_url_rule(ADD_USER, 'register_user',
                 register_user.register_user, methods=['POST'])
# login
app.add_url_rule(LOGIN, 'login', login.login, methods=['POST'])
# get current authenticated user
app.add_url_rule(CURRENT_USER, 'get_current_user',
                 get_current_user.get_current_user, methods=['GET'])
# logout
app.add_url_rule(LOGOUT, 'logout', logout.logout_user, methods=['POST'])
# Get Patient Records
app.add_url_rule(PATIENT_RECORDS, 'patient_records',
                 clinician_server.retrieveData, methods=['GET'])
# Create a Patient
app.add_url_rule(CREATE_PATIENT, 'create_patient',
                 create_patient.create_patient, methods=['POST'])
# Delete Patient Record
app.add_url_rule(DELETE_PATIENT_RECORD, 'delete_patient_record',
                 clinician_server.deletePatientRecord, methods=['DELETE'])
# Get Patient Details
app.add_url_rule(GET_PATIENT_DETAILS, 'get_patient_details', 
                get_patient_details.get_patient_details, methods=['GET'])
# Update Patient Details
app.add_url_rule(UPDATE_PATIENT_DETAILS, 'update_patient_details', 
                update_patient_details.update_patient_details, methods=['PUT'])
# Update Patient Notes
app.add_url_rule(UPDATE_PATIENT_NOTES, 'update_patient_notes', 
                update_patient_notes.update_patient_notes, methods=['PUT'])

# Get Dashboard Data
app.add_url_rule(DASHBOARD, 'dashboard',
                 clinician_server.retrieveDashboardContent, methods=['GET'])


# update user
app.add_url_rule(UPDATE_USER_ACCOUNT, 'update_user',
                 update_user_account.update_user_by_admin, methods=['PUT'])
# get user account by id
app.add_url_rule(GET_USER_ACCOUNT_DETAILS, 'get_user_account',
                 get_user_account.get_user_account_details, methods=['GET'])
# delete user(soft)
app.add_url_rule(DELETE_USER, 'delete_user',
                 delete_user_account.delete_user_account, methods=['PUT'])
# get user account by id for viewing
app.add_url_rule(GET_USER_VIEW, 'get_user_view',
                 get_user_view.get_user_account_view, methods=['GET'])
# get admin dashboard data
app.add_url_rule(GET_DASHBOARD_DATA, 'get_dashboard_data',
                 get_dashboard_data.get_dashboard_data, methods=['GET'])
# get deleted users
app.add_url_rule(GET_DELETED_USERS, 'get_deleted_users',
                 get_deleted_users.get_deleted_users, methods=['GET'])
# get updated users
app.add_url_rule(GET_UPDATED_USERS, 'get_updated_users',
                 get_updated_users.get_updated_users, methods=['GET'])
# get distinct roles
app.add_url_rule(GET_DISTINCT_ROLES, 'get_distinct_roles',
                 get_distinct_roles.get_distinct_roles, methods=['GET'])
# get general users
app.add_url_rule(GET_GENERAL_USERS, 'get_general_users',
                 get_general_users.get_general_users, methods=['GET'])
# update a user details and profile photo
app.add_url_rule(UPDATE_USER_AND_PHOTO, 'update_user_photo_details',
                 update_user_photo_details.update_user_photo_and_details, methods=['PUT'])
# update a user details and license image
app.add_url_rule(UPDATE_USER_AND_LICENSE, 'update_user_license_details',
                 update_user_license_details.update_user_license_and_details, methods=['PUT'])
# update a user details and both image
app.add_url_rule(UPDATE_BOTH_IMAGE, 'update_both_image',
                 update_user_both_image.update_user_both_image, methods=['PUT'])
# update user details only
app.add_url_rule(UPDATE_USER_DETAILS_ONLY, 'update_user_details_only',
                 update_user_details_only.update_user_details_only, methods=['PUT'])

# To create database tables inside the database,
# run the command: python server.py --create-db
if len(sys.argv) > 1 and sys.argv[1] == "--create-db":
    """
    We need to import the models so that db.create_all() knows which 
    database model we are trying to create.
    """
    from models import assessments, patient_screening_details, patients, questions, users
    with app.app_context():
        db.create_all()

if __name__ == "__main__":
    app.run(debug=True)
