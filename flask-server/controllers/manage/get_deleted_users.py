from flask import session
from models.users import Users, users_schema
from flask.json import jsonify
from auth.auth import is_authenticated, is_admin


def get_deleted_users():

    user_id = session.get("user_id")
    # Check if session exist
    if not is_authenticated(user_id):
        return jsonify({"error": "Unauthorized"}), 401

    # Check if role is admin
    if not is_admin(user_id):
        return jsonify({"error": "Unauthorized"}), 401

    users = Users.query.filter_by(role='user', is_deleted=1).with_entities(
        Users.id, Users.uname, Users.fname, Users.lname, Users.role, Users.email, Users.created_at)
    return users_schema.jsonify(users)
