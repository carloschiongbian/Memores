"""
SAMPLE GET_USER FUNCTION. YOU MAY CHANGE THIS FILE AS YOU SEE FIT.
"""

from flask import request
from models.users import Users, users_schema

def get_users():
    users = Users.query.all()
    return users_schema.jsonify(users)