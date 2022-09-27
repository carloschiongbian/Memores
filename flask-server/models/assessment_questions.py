from connection.connection import db, ma

# AssessmentQuestions Class/Model
class AssessmentQuestion(db.Model):
    """
    This is a database model.
    """
    # __tablename__ = 'assessment_question'
    id = db.Column(db.Integer, primary_key = True)
    assessment_id = db.Column(db.Integer, nullable = False)
    question_id = db.Column(db.Integer, nullable = False)


# AssessmentQuestions Schema
class AssessmentQuestionsSchema(ma.Schema):
    """This is a database schema."""
    class Meta:
        """Specify which fields you want to see in RESTful API"""
        fields = ('id', 'assessment_id', 'question_id')


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
assessment_question_schema = AssessmentQuestionsSchema()
assessment_questions_schema = AssessmentQuestionsSchema(many = True)