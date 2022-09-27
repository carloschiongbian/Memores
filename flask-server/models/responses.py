from connection.connection import db, ma

# Responses Class/Model
class Responses(db.Model):
    """
    This is a database model.
    """
    # __tablename__ = 'responses'
    id = db.Column(db.Integer, primary_key = True)
    response = db.Column(db.String(255), nullable = False)
    question_id = db.Column(db.Integer)


# Responses Schema
class ResponsesSchema(ma.Schema):
    """This is a database schema."""
    class Meta:
        """Specify which fields you want to see in RESTful API"""
        fields = ('id', 'response', 'question_id')


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
response_schema = ResponsesSchema()
responses_schema = ResponsesSchema(many = True)