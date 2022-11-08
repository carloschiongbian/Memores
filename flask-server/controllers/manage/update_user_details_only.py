from models.users import Users, users_schema, db
from flask.json import jsonify
from auth.auth import is_authenticated, is_admin
from flask import session, request
import pymysql


def update_user_details_only():

    user_id = session.get("user_id")
    # Check if session exist
    if not is_authenticated(user_id):
        return jsonify({"error": "Unauthorized"}), 401

    # Check if role is admin
    if not is_admin(user_id):
        return jsonify({"error": "Unauthorized"}), 401

    id = request.json['id']
    fname = request.json['firstname']
    lname = request.json['lastname']
    email = request.json['email']
    gender = request.json['gender']
    bday = request.json['birthday']
    contact = request.json['contact']
    addr = request.json['address']
    city = request.json['city']
    country = request.json['country']
    zipcode = request.json['zipcode']
    license_id = request.json['license']

    # Check if username or email exist in the database
    user_exist = Users.query.filter(
        (Users.email == email) & (Users.id != id)).first()
    if user_exist:
        return jsonify({"error": "Email already exist!"}), 409

    try:
        # Finally, update a user in mysql
        user = Users.query.get(id)
        user.fname = fname
        user.lname = lname
        user.email = email
        user.gender = gender
        user.bday = bday
        user.phone = contact
        user.street = addr
        user.city = city
        user.country = country
        user.zip = zipcode
        user.license_id = license_id
        db.session.commit()

    except pymysql.Error as e:
        print("could not close connection error pymysql %d: %s" %
              (e.args[0], e.args[1]))

    updatedUser = Users.query.filter_by(role='user', is_deleted=0).with_entities(
        Users.id, Users.uname, Users.fname, Users.lname, Users.role, Users.email, Users.created_at)

    return users_schema.jsonify(updatedUser)
