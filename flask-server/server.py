# input "python server.py" to run the flask server
import os
from flask import Flask, request, abort, flash, jsonify
from flask_bcrypt import Bcrypt
from werkzeug.utils import secure_filename

# Additionals
import sys
from connection.connection import db, ma
from routes.routes import *
from dotenv import load_dotenv

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

dotenv_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '.env'))
load_dotenv(dotenv_path)

# Init app
app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Secret Key
# NOTE: I am not sure what this is for
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')

# Config database
# syntax: 'mysql://username:password@localhost/db_name'
# NOTE: These credentials need to be inside the .env file
#           Create your own .env file
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('SQL_ALCHEMY_DATABASE_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = os.environ.get('SQLALCHEMY_TRACK_MODIFICATIONS')

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
from controllers import index

# Index
app.add_url_rule(INDEX, 'index', index.index, methods = ['GET'])


# To create database tables inside the database,
# run the command: python server.py --create-db
if len(sys.argv) > 1 and sys.argv[1] == "--create-db":
    """
    We need to import the models so that db.create_all() knows which 
    database model we are trying to create.
    """
    from models import admins, assessment_questions, assessment_responses, assessments, options, patients, questions, responses, users
    with app.app_context():
        db.create_all()

if __name__ == "__main__":
    app.run(debug=True)
