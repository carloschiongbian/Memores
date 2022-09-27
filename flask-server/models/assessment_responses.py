from connection.connection import db, ma

# AssessmentResponses Class/Model
class AssessmentResponse(db.Model):
    """
    This is a database model.
    """
    # __tablename__ = 'assessment_responses'
    id = db.Column(db.Integer, primary_key = True)
    assessment_id = db.Column(db.Integer, nullable = False)
    response_id = db.Column(db.Integer, nullable = False)


# AssessmentResponses Schema
class AssessmentResponsesSchema(ma.Schema):
    """This is a database schema."""
    class Meta:
        """Specify which fields you want to see in RESTful API"""
        fields = ('id', 'assessment_id', 'response_id')


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
assessment_response_schema = AssessmentResponsesSchema()
assessment_responses_schema = AssessmentResponsesSchema(many = True)