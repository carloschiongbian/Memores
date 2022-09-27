from connection.connection import db, ma

# Options Class/Model
class Options(db.Model):
    """
    This is a database model.
    """
    # __tablename__ = 'options'
    id = db.Column(db.Integer, primary_key = True)
    question_id = db.Column(db.Integer, nullable = False)
    text_option = db.Column(db.String(255), nullable = False)
    val = db.Column(db.Integer, nullable = False)


# Options Schema
class OptionsSchema(ma.Schema):
    """This is a database schema."""
    class Meta:
        """Specify which fields you want to see in RESTful API"""
        fields = ('id', 'question_id', 'text_option', 'val')


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
option_schema = OptionsSchema()
options_schema = OptionsSchema(many = True)