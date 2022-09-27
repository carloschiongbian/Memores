from sqlalchemy.sql import func
from connection.connection import db, ma

# Assessment Class/Model
class Assessments(db.Model):
    """
    This is a database model.
    """
    # __tablename__ = 'assessments'
    id = db.Column(db.Integer, primary_key = True)
    prediction_result = db.Column(db.Boolean, nullable = False)
    hasSad_percentage = db.Column(db.Float, nullable = False)
    hasNoSad_percentage = db.Column(db.Float, nullable = False)
    result_description = db.Column(db.String(255), nullable = False)
    date_taken = db.Column(db.DateTime, nullable = False)
    patient_id = db.Column(db.Integer)
    assessor_id = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, nullable = False, server_default=func.now())
    updated_at = db.Column(db.DateTime, nullable = False, onupdate=func.now())


# Assessments Schema
class AssessmentsSchema(ma.Schema):
    """This is a database schema."""
    class Meta:
        """Specify which fields you want to see in RESTful API"""
        fields = ('id', 'prediction_result', 'hasSad_percentage', 'hasNoSad_percentage', 'result_description', 'date_taken', 'patient_id', 'assessor_id', 'created_at', 'updated_at')


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
assessment_schema = AssessmentsSchema()
assessments_schema = AssessmentsSchema(many = True)