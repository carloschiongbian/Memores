from flask import session
from models.users import Users, users_schema
from flask.json import jsonify
from auth.auth import is_authenticated, is_admin
from models.users import db


def get_distinct_roles():

    user_id = session.get("user_id")
    # Check if session exist
    if not is_authenticated(user_id):
        return jsonify({"error": "Unauthorized"}), 401

    # Check if role is admin
    if not is_admin(user_id):
        return jsonify({"error": "Unauthorized"}), 401

    roles = []
    for role in db.session.query(Users.role).distinct():
        roles.append(role.role)

    return jsonify({
        "roles": roles
    })
