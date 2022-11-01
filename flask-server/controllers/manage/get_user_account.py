from flask import session, request
from models.users import Users, users_schema
from flask.json import jsonify
from auth.auth import is_authenticated, is_admin


def get_user_account_details():

    user_id = session.get("user_id")
    # Check if session exist
    if not is_authenticated(user_id):
        return jsonify({"error": "Unauthorized"}), 401

    # Check if role is admin
    if not is_admin(user_id):
        return jsonify({"error": "Unauthorized"}), 401

    id = request.args.get("id")
    users = Users.query.filter_by(id=id).with_entities(Users.id, Users.uname)
    return users_schema.jsonify(users)
