# input "python server.py" to run the flask server
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

UPLOAD_FOLDER = 'uploads'

dotenv_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '.env'))
load_dotenv(dotenv_path)

# Init app
app = Flask(__name__)
CORS(app, supports_credentials=True) # allows Cross-Origin Resource Sharing
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# SESSION CONFIGURATION USING REDIS FOR SERVER-SIDE AUTHENTICATION/ PERSIST DATA SERVER SIDE
app.config['SESSION_TYPE'] = 'redis'
app.config['SESSION_PERMANENT'] = False
app.config['SESSION_USE_SIGNER'] = True
app.config['SESSION_REDIS'] = redis.from_url("redis://127.0.0.1:6379")

# Secret Key
# NOTE: I am not sure what this is for
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')

# Config database
# syntax: 'mysql://username:password@localhost/db_name'
# NOTE: These credentials need to be inside the .env file
#           Create your own .env file
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('SQL_ALCHEMY_DATABASE_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = os.environ.get('SQLALCHEMY_TRACK_MODIFICATIONS')

#init Session
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
from controllers import get_users, login, register_user, get_current_user, logout, clinician_server
from controllers.screening import get_questions
# Get Users
app.add_url_rule(GET_USERS, 'get_users', get_users.get_users, methods = ['GET'])
# Assessment Quesions
app.add_url_rule(QUESTIONS, 'questions', get_questions.get_questions, methods = ['GET'])
#add_user
app.add_url_rule(ADD_USER, 'register_user', register_user.register_user, methods = ['POST'])
#login
app.add_url_rule(LOGIN, 'login', login.login, methods = ['POST'])
#get current authenticated user
app.add_url_rule(CURRENT_USER, 'get_current_user', get_current_user.get_current_user, methods = ['GET'])
#logout
app.add_url_rule(LOGOUT, 'logout', logout.logout_user, methods = ['POST'])
#Get Patient Records
app.add_url_rule(PATIENT_RECORDS, 'patient_records', clinician_server.retrieveData, methods = ['GET'])


# To create database tables inside the database,
# run the command: python server.py --create-db
if len(sys.argv) > 1 and sys.argv[1] == "--create-db":
    """
    We need to import the models so that db.create_all() knows which 
    database model we are trying to create.
    """
    from models import assessment_questions, assessment_responses, assessments, options, patient_screening_details, patients, questions, responses, users
    with app.app_context():
        db.create_all()

if __name__ == "__main__":
    app.run(debug=True)
