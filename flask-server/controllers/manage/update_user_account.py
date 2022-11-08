from flask import session, request
from models.users import Users, users_schema
from flask.json import jsonify
from auth.auth import is_authenticated, is_admin
from flask_bcrypt import generate_password_hash, check_password_hash
from models.users import db


def update_user_by_admin():

    user_id = session.get("user_id")
    # Check if session exist
    if not is_authenticated(user_id):
        return jsonify({"error": "Unauthorized"}), 401

    # Check if role is admin
    if not is_admin(user_id):
        return jsonify({"error": "Unauthorized"}), 401

    id = request.json["id"]
    username = request.json["uname"]
    npwd = request.json["npwd"]
    cnpwd = request.json["cnpwd"]

    # Check if new pwd and confirm pwd is not empty, If not empty, it means user requested to update password credential and the username
    if (npwd != "" and cnpwd != ""):
        hashed_password = generate_password_hash(npwd).decode('utf-8')
        # If not match, error, return error message.
        if check_password_hash(hashed_password, cnpwd) is False:
            return jsonify({"error": "Password and confirmed password are not match"}), 400

        user = Users.query.get(id)
        user.pwd = hashed_password
        user.uname = username
        db.session.commit()

        return jsonify({"success": "Updated Password Successfully"}), 200

    # if password and confirm password is empty, it means the user wants to update his username only
    # Check if username or email exist in the database
    user_exist = Users.query.filter(Users.uname == username).first()
    if user_exist:
        return jsonify({"error": "Username already exist!"}), 409

    user = Users.query.get(id)
    user.uname = username
    db.session.commit()

    updatedUser = Users.query.filter_by(id=id).with_entities(
        Users.id, Users.uname, Users.fname, Users.lname, Users.role, Users.email, Users.created_at)

    return users_schema.jsonify(updatedUser)
