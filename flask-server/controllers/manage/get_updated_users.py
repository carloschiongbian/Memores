from flask import session
from models.users import Users
from flask.json import jsonify
from auth.auth import is_authenticated, is_admin
import os
from flask import current_app as app
import base64


def get_updated_users():

    user_id = session.get("user_id")
    # Check if session exist
    if not is_authenticated(user_id):
        return jsonify({"error": "Unauthorized"}), 401

    # Check if role is admin
    if not is_admin(user_id):
        return jsonify({"error": "Unauthorized"}), 401

    users = Users.query.filter(Users.updated_at.isnot(None)).filter(
        Users.role == "user").filter(Users.is_deleted == 0).all()

    userList = []

    for user in users:

        userList.append({
            "id": user.id,
            "fname": user.fname,
            "lname": user.lname,
            "uname": user.uname,
            "photo": user.photo,
            "role": user.role,
            "email": user.email,
            "created_at": user.created_at,
            "updated_at": user.updated_at
        })

    return jsonify(userList)
