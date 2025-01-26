from flask_sqlalchemy import SQLAlchemy
#is an extension for Flask that simplifies the use of SQLAlchemy for database operations.
from sqlalchemy import MetaData
#is  SQLAlchemy object that helps manage the database schema and metadata (such as tables and relationships)
metadata = MetaData()
# An instance of the MetaData class to hold the schema details of the database.
db = SQLAlchemy(metadata=metadata)
# You create a(db) object which will be is used to define models and manage database operations.
# Initializes the SQLAlchemy object with the provided metadata instance to interact with the database. 

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(128), nullable=False)
    email=db.Column(db.String(128), nullable=False)
    is_approved = db.Column(db.Boolean, default=False)
    is_admin = db.Column(db.Boolean, default=False)

    password=db.Column(db.String(128), nullable=False)

    todos = db.relationship("Todo", backref="user", lazy=True)
    # Establishes a one-to-many relationship between the User model and the Todo model. 
    # user can have many todos. The backref creates a reverse relationship on the Todo model.

class Tags(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False)

    todos = db.relationship("Todo", backref="tag", lazy=True)
    # Establishes a one-to-many relationship between the Tags model and the Todo model. 
    # A tag can be associated with multiple todos.

class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(128), nullable=False)
    description=db.Column(db.String(256), nullable=False)
    is_complete = db.Column(db.Boolean, default=False )
    deadline = db.Column(db.String(20), nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False )
    #  A foreign key that links the todo to a specific user.
    tag_id = db.Column(db.Integer, db.ForeignKey("tags.id"), nullable=False )
    # A foreign key that links the todo to a specific tag.
    

# 
class TokenBlocklist(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    jti = db.Column(db.String(36), nullable=False, index=True)
    created_at = db.Column(db.DateTime, nullable=False)