from flask.json import jsonify
from models.users import Users
from flask import session
from auth.auth import is_authenticated
import os
from flask import current_app as app
import base64


def get_current_user():
    user_id = session.get("user_id")

    if not is_authenticated(user_id):
        return jsonify({"error": "Unauthorized"}), 401

    user = Users.query.filter_by(id=user_id).first()

    filepath = os.path.join(
        app.root_path, app.config['UPLOAD_FOLDER'], user.photo.rsplit('\\', 1)[1])
    with open(filepath, "rb") as img_file:
        readFile = img_file.read()
        base64String = base64.b64encode(readFile)

    return jsonify({
        "id": user.id,
        "uname": user.uname,
        "fname": user.fname,
        "lname": user.lname,
        "photo": base64String.decode('utf-8'),
        "role": user.role,
    })
