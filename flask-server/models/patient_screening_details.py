from sqlalchemy.sql import func
from connection.connection import db, ma

# Patient Class/Model
class PatientsScreeningDetails(db.Model):
    """
    This is a database model.
    """
    # __tablename__ = 'patients_screening_details'
    id = db.Column(db.Integer, primary_key = True)
    patient_id = db.Column(db.Integer, foreign_key = True)
    patient_notes = db.Column(db.Text, nullable = False)
    results = db.Column(db.Text, nullable = False)
    screened_by = db.Column(db.String(255), nullable = False)
    last_edited_by = db.Column(db.String(255), nullable = False)
    screened_date = db.Column(db.DateTime, nullable = False)
    screened_time = db.Column(db.Time, nullable = False)
    last_edited_on = db.Column(db.DateTime, nullable = False)
    created_at = db.Column(db.DateTime, nullable = False, server_default=func.now())
    updated_at = db.Column(db.DateTime, nullable = False, onupdate=func.now())


# Patient Schema
class PatientScreeningDetailsSchema(ma.Schema):
    """This is a database schema."""
    class Meta:
        """Specify which fields you want to see in RESTful API"""
        fields = ('id', 'patient_id', 'patient_notes', 'results', 'screened_by', 'last_edited_by', 'screened_date', 'screened_time', 'last_edited_on', 'created_at', 'updated_at')


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
patient_screening_details_schema = PatientScreeningDetailsSchema()
patient_screening_details_schema = PatientScreeningDetailsSchema(many = True)