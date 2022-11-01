from flask import session
from models.users import Users
from flask.json import jsonify
from auth.auth import is_authenticated, is_admin
from models.users import db


def get_dashboard_data():

    user_id = session.get("user_id")
    # Check if session exist
    if not is_authenticated(user_id):
        return jsonify({"error": "Unauthorized"}), 401

    # Check if role is admin
    if not is_admin(user_id):
        return jsonify({"error": "Unauthorized"}), 401

    totalUser = Users.query.filter_by(role="user", is_deleted=0).count()
    distinctRole = db.session.query(Users.role).distinct().count()
    deletedUsers = Users.query.filter_by(is_deleted=1, role="user").count()
    updatedUsers = Users.query.filter(
        Users.updated_at.isnot(None)).filter(Users.role == "user").filter(Users.is_deleted == 0).count()

    return jsonify({
        "totalUsers": totalUser,
        "distinctRoles": distinctRole,
        "deletedUsers": deletedUsers,
        "updatedUsers": updatedUsers
    })
