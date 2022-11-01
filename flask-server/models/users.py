from sqlalchemy.sql import func
from connection.connection import db, ma
from sqlalchemy.sql import expression
# User Class/Model


class Users(db.Model):
    """
    This is a database model.
    """
    # __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    uname = db.Column(db.String(255), nullable=False, unique=True)
    pwd = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(255), nullable=False, server_default='user')
    fname = db.Column(db.String(255), nullable=False)
    lname = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    phone = db.Column(db.String(255), nullable=False)
    bday = db.Column(db.Date, nullable=False)
    gender = db.Column(db.String(10), nullable=False)
    photo = db.Column(db.String(255), nullable=False)
    license = db.Column(db.LargeBinary(length=16777215), nullable=False)
    license_id = db.Column(db.String(255), nullable=False)
    street = db.Column(db.String(255), nullable=False)
    city = db.Column(db.String(255), nullable=False)
    country = db.Column(db.String(255), nullable=False)
    zip = db.Column(db.String(255), nullable=False)
    is_deleted = db.Column(
        db.Boolean, server_default=expression.false(), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False,
                           server_default=func.now())
    updated_at = db.Column(db.DateTime, nullable=True, onupdate=func.now())


# User Schema
class UserSchema(ma.Schema):
    """This is a database schema."""
    class Meta:
        """Specify which fields you want to see in RESTful API"""
        fields = ('id', 'uname', 'pwd', 'role', 'fname', 'lname', 'email', 'phone', 'bday', 'gender',
                  'photo', 'license', 'license_id', 'street', 'city', 'country', 'zip', 'created_at', 'updated_at')


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
user_schema = UserSchema()
users_schema = UserSchema(many=True)
