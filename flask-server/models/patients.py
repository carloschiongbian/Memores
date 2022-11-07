from connection.connection import db, ma

import os
import sqlalchemy as sa
from sqlalchemy_utils import EncryptedType, StringEncryptedType
from sqlalchemy_utils.types.encrypted.encrypted_type import AesEngine
from sqlalchemy.sql import func

# Patient Class/Model

secret_key = 'secretkey1234'


class Patients(db.Model):
    """
    This is a database model.
    """
    # __tablename__ = 'patients'
    id = db.Column(db.Integer, primary_key=True)
    fname = db.Column(EncryptedType(sa.String,
                                    secret_key,
                                    AesEngine,
                                    'pkcs5'))
    lname = db.Column(EncryptedType(sa.String,
                                    secret_key,
                                    AesEngine,
                                    'pkcs5'))
    fullname = db.Column(EncryptedType(sa.String,
                                       secret_key,
                                       AesEngine,
                                       'pkcs5'))
    email = db.Column(EncryptedType(sa.String,
                                    secret_key,
                                    AesEngine,
                                    'pkcs5'))
    phone = db.Column(EncryptedType(sa.String,
                                    secret_key,
                                    AesEngine,
                                    'pkcs5'))
    age = db.Column(EncryptedType(sa.String,
                                  secret_key,
                                  AesEngine,
                                  'pkcs5'))
    bday = db.Column(EncryptedType(sa.String,
                                   secret_key,
                                   AesEngine,
                                   'pkcs5'))
    gender = db.Column(EncryptedType(sa.String,
                                     secret_key,
                                     AesEngine,
                                     'pkcs5'))
    street = db.Column(EncryptedType(sa.String,
                                     secret_key,
                                     AesEngine,
                                     'pkcs5'))
    city = db.Column(EncryptedType(sa.String,
                                   secret_key,
                                   AesEngine,
                                   'pkcs5'))
    country = db.Column(EncryptedType(sa.String,
                                      secret_key,
                                      AesEngine,
                                      'pkcs5'))
    zip = db.Column(EncryptedType(sa.String,
                                  secret_key,
                                  AesEngine,
                                  'pkcs5'))
    created_by = db.Column(db.Integer, db.ForeignKey("users.id"))
    registered_date = db.Column(
        db.DateTime, nullable=False, server_default=func.now())
    updated_at = db.Column(db.DateTime, nullable=True, onupdate=func.now())


# Patient Schema
class PatientSchema(ma.Schema):
    """This is a database schema."""
    class Meta:
        """Specify which fields you want to see in RESTful API"""
        fields = ('id', 'fname', 'lname', 'fullname', 'email', 'phone', 'age', 'bday', 'gender',
                  'street', 'city', 'country', 'registered_date', 'zip', 'created_by', 'created_at', 'updated_at')


"""
PLURALITY matters

Use the first schema if you are fetching 1 user, otherwise
use the second one.

Use like so:

: Get ALL Users
def get_all_users():
    users = Users.query.all()
    return users_schema.jsonify(users)  <--- Notice the schema used (plural)

: Get Specific User
def get_specific_user(id):
    user = Users.query.get(id)
    return user_schema.jsonify(user)    <--- Notice the schema used (singular)
"""
patient_schema = PatientSchema()
patients_schema = PatientSchema(many=True)
