from flask.json import jsonify
from models.users import Users

#pass session_id as parameter
def is_authenticated(id):
    if not id:
        return False
    return True

#pass session_id as parameter
def is_admin(id):
    user = Users.query.filter_by(id = id).first()
    if user.role != "admin":
        return False
    return True

