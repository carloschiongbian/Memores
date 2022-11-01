from flask import session
from models.users import Users
from flask.json import jsonify
from auth.auth import is_authenticated, is_admin
import os
from flask import current_app as app
import base64


def get_general_users():

    user_id = session.get("user_id")
    # Check if session exist
    if not is_authenticated(user_id):
        return jsonify({"error": "Unauthorized"}), 401

    # Check if role is admin
    if not is_admin(user_id):
        return jsonify({"error": "Unauthorized"}), 401

    users = Users.query.filter_by(role='user', is_deleted=0).all()

    userList = []

    for user in users:
        filepath = os.path.join(
            app.root_path, app.config['UPLOAD_FOLDER'], user.photo.rsplit('\\', 1)[1])
        with open(filepath, "rb") as img_file:
            readFile = img_file.read()
            base64String = base64.b64encode(readFile)

        userList.append({
            "id": user.id,
            "fname": user.fname,
            "lname": user.lname,
            "uname": user.uname,
            "photo": base64String.decode('utf-8'),
            "role": user.role,
            "email": user.email,
            "created_at": user.created_at,
        })

    return jsonify(userList)
