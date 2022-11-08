from flask import session, request
from models.users import Users
from flask.json import jsonify
from auth.auth import is_authenticated, is_admin
import base64


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

    return jsonify({
        "id": user.id,
        "profile": user.photo,
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
