from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from datetime import datetime

# Initialize metadata and db object
metadata = MetaData()
db = SQLAlchemy(metadata=metadata)

# User Model
class User(db.Model):
    __tablename__ = 'users'  # Explicitly naming the table for clarity
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(128), nullable=False, unique=True)
    email = db.Column(db.String(128), nullable=False, unique=True)
    is_approved = db.Column(db.Boolean, default=False)
    is_admin = db.Column(db.Boolean, default=False)
    password = db.Column(db.String(128), nullable=False)

    hobbies = db.Column(db.String(500), nullable=True, default="No hobbies specified")  # Set default value
    is_verified = db.Column(db.Boolean, default=False)  # Used for account verification

    # Relationship with Group and Post models
    posts = db.relationship('Post', backref='author', lazy=True)
    groups = db.relationship('Group', backref='creator', lazy=True)

    def __repr__(self):
        return f"<User {self.username}>"


# Group Model (A group for hobbyists, created by users)
class Group(db.Model):
    __tablename__ = 'groups'  # Explicitly naming the table for clarity
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(128), nullable=False)
    description = db.Column(db.String(256), nullable=False)
    created_by = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    # Relationship with Post model
    posts = db.relationship('Post', backref='group', lazy=True)

    def __repr__(self):
        return f"<Group {self.title}>"


# Post Model (For users to post content related to hobbies, and groups to organize around)
class Post(db.Model):
    __tablename__ = 'posts'  # Explicitly naming the table for clarity
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(500), nullable=False)
    media_url = db.Column(db.String(500))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    group_id = db.Column(db.Integer, db.ForeignKey('groups.id'), nullable=False)

    def __repr__(self):
        return f"<Post {self.content[:20]}...>"


# Token Blocklist Model (Stores revoked JWT tokens)
class TokenBlocklist(db.Model):
    __tablename__ = 'token_blocklist'  # Explicitly naming the table for clarity
    id = db.Column(db.Integer, primary_key=True)
    jti = db.Column(db.String(36), nullable=False, index=True)  # JWT ID for token identification
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def __repr__(self):
        return f"<Blocked Token {self.jti}>"
