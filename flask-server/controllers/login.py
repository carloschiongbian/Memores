from flask import request, session
from flask.json import jsonify
from models.users import Users
from flask_bcrypt import check_password_hash


def login():
    user = request.json["user"]
    password = request.json["password"]

    user_exist = Users.query.filter_by(uname=user).first()

    if user_exist is None:
        return jsonify({"error": "Username does not exist!"}), 401

    if not check_password_hash(user_exist.pwd, password):
        return jsonify({"error": "Incorrect Password!"}), 401

    # session.clear()
    session["user_id"] = user_exist.id
    session.permanent = True

    return jsonify({
        "id": user_exist.id,
        "fname": user_exist.fname,
        "lname": user_exist.lname,
        "photo": user_exist.photo,
        "role": user_exist.role,
    }), 200
