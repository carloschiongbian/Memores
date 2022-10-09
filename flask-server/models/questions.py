from connection.connection import db, ma

# Questions Class/Model
class Questions(db.Model):
    """
    This is a database model.
    """
    # __tablename__ = 'questions'
    id = db.Column(db.Integer, primary_key = True)
    section = db.Column(db.String(255), nullable = False)
    text_option = db.Column(db.String(255), nullable = False)
    acronym = db.Column(db.String(255), nullable = False)
    options = db.Column(db.String(255), nullable = True)


# Questions Schema
class QuestionsSchema(ma.Schema):
    """This is a database schema."""
    class Meta:
        """Specify which fields you want to see in RESTful API"""
        fields = ('id', 'section', 'text_option', 'acronym', 'options')


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
question_schema = QuestionsSchema()
questions_schema = QuestionsSchema(many = True)