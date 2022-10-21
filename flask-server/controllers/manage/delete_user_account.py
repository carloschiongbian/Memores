from flask.json import jsonify
from auth.auth import is_authenticated, is_admin
from flask import session, request
from models.users import Users, db


def delete_user_account():

    user_id = session.get("user_id")
    #Check if session exist
    if not is_authenticated(user_id):
        return jsonify({"error": "Unauthorized"}), 401

    #Check if role is admin
    if not is_admin(user_id):
        return jsonify({"error": "Unauthorized"}), 401
    
    id = request.json["id"]
    #soft delete
    user = Users.query.get(id)
    user.is_deleted = 1
    db.session.commit()

    return jsonify({"success": "Deleted Successfully"}), 200 