from flask import session
from flask.json import jsonify


def logout_user():
    session.pop("user_id")
    return jsonify({"success": "Logout Successfully"}), 200