from sqlalchemy.sql import func
from connection.connection import db, ma

# Patient Class/Model


class Patients(db.Model):
    """
    This is a database model.
    """
    # __tablename__ = 'patients'
    id = db.Column(db.Integer, primary_key=True)
    fname = db.Column(db.String(255), nullable=False)
    lname = db.Column(db.String(255), nullable=False)
    fullname = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    phone = db.Column(db.String(255), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    bday = db.Column(db.DateTime, nullable=False)
    gender = db.Column(db.String(10), nullable=False)
    street = db.Column(db.String(255), nullable=False)
    city = db.Column(db.String(255), nullable=False)
    country = db.Column(db.String(255), nullable=False)
    zip = db.Column(db.String(255), nullable=False)
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
                  'street', 'city', 'country', 'registered_date', 'zip', 'created_at', 'updated_at')


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
