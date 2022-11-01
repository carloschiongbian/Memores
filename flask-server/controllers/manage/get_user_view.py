from flask import session, request
from models.users import Users
from flask.json import jsonify
from auth.auth import is_authenticated, is_admin
import base64
import os
from flask import current_app as app


def get_user_account_view():

    user_id = session.get("user_id")
    # Check if session exist
    if not is_authenticated(user_id):
        return jsonify({"error": "Unauthorized"}), 401

    # Check if role is admin
    if not is_admin(user_id):
        return jsonify({"error": "Unauthorized"}), 401

    id = request.args.get("id")

    user = Users.query.filter_by(id=id).first()

    imageBase64 = base64.b64encode(user.license)
    filepath = os.path.join(
        app.root_path, app.config['UPLOAD_FOLDER'], user.photo.rsplit('\\', 1)[1])
    with open(filepath, "rb") as img_file:
        readFile = img_file.read()
        base64String = base64.b64encode(readFile)

    return jsonify({
        "id": user.id,
        "profile": base64String.decode('utf-8'),
        "img": str(imageBase64.decode('utf-8')),
        "license": user.license_id,
        "firstname": user.fname,
        "lastname": user.lname,
        "email": user.email,
        "contact": user.phone,
        "birthday": user.bday,
        "address": user.street,
        "gender": user.gender,
        "city": user.city,
        "country": user.country,
        "zipcode": user.zip
    })
