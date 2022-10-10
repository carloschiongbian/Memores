"""
SAMPLE GET_USER FUNCTION. YOU MAY CHANGE THIS FILE AS YOU SEE FIT.
"""

from flask import session
from models.users import Users, users_schema
from flask.json import jsonify

def get_users():

    user_id = session.get("user_id")
     #Check if session exist
    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401
    
    #Check if role is admin
    user = Users.query.filter_by(id = user_id).first()
    if user.role != "admin":
        return jsonify({"error": "Unauthorized"}), 401

    users = Users.query.all()
    return users_schema.jsonify(users)