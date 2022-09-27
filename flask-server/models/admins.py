from sqlalchemy.sql import func
from connection.connection import db, ma

# Admin Class/Model
class Admins(db.Model):
    """
    This is a database model.
    """
    # __tablename__ = 'admins'
    id = db.Column(db.Integer, primary_key = True)
    uname = db.Column(db.String(255), nullable = False, unique = True)
    pwd = db.Column(db.String(255), nullable = False)
    fname = db.Column(db.String(255), nullable = False)
    lname = db.Column(db.String(255), nullable = False)
    created_at = db.Column(db.DateTime, nullable = False, server_default=func.now())
    updated_at = db.Column(db.DateTime, nullable = False, onupdate=func.now())


# Admin Schema
class AdminSchema(ma.Schema):
    """This is a database schema."""
    class Meta:
        """Specify which fields you want to see in RESTful API"""
        fields = ('id', 'uname', 'pwd', 'fname', 'lname', 'created_at', 'updated_at')


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
admin_schema = AdminSchema()
admins_schema = AdminSchema(many = True)