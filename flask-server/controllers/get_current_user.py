from flask.json import jsonify
from models.users import Users
from flask import session
from auth.auth import is_authenticated


def get_current_user():
    user_id = session.get("user_id")

    if not is_authenticated(user_id):
        return jsonify({"error": "Unauthorized"}), 401

    user = Users.query.filter_by(id=user_id).first()

    return jsonify({
        "id": user.id,
        "uname": user.uname,
        "fname": user.fname,
        "lname": user.lname,
        "photo": user.photo,
        "role": user.role,
    })
