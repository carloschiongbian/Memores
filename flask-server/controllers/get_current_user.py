from flask.json import jsonify
from models.users import Users
from flask import session

def get_current_user():
    user_id = session.get("user_id")
    
    if not user_id:
       return jsonify({"error": "Unauthorized"}), 401

    
    user = Users.query.filter_by(id = user_id).first()

    return jsonify({
        "id": user.id,
        "fname": user.fname,
        "lname": user.lname,
        "photo": user.photo,
        "role": user.role,
    })