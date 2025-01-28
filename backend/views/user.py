from flask import jsonify, request, Blueprint
from models import db, User, Group, Post
from werkzeug.security import generate_password_hash
from app import app, mail
from flask_mail import Message

user_bp = Blueprint("user_bp", __name__)

# ==================================USER ROUTES======================================
# Fetch All Users with Groups and Posts
@user_bp.route("/users", methods=["GET"])
def fetch_users():
    users = User.query.all()

    user_list = []
    for user in users:
        user_list.append({
            'id': user.id,
            'email': user.email,
            'is_approved': user.is_approved,
            'is_admin': user.is_admin,
            'username': user.username,
            'hobbies': user.hobbies,  # Include hobbies
            "groups": [
                {
                    "id": group.id,
                    "title": group.title,
                    "description": group.description,
                } for group in user.groups  # Assuming there's a relationship between user and groups
            ],
            "posts": [
                {
                    "id": post.id,
                    "content": post.content,
                    "media_url": post.media_url,
                    "group": {
                        "id": post.group.id,
                        "title": post.group.title
                    }
                } for post in user.posts  # Assuming there's a relationship between user and posts
            ]
        })
    return jsonify(user_list), 200


# Add New User
@user_bp.route("/users", methods=["POST"])
def add_user():
    data = request.get_json()
    username = data['username']
    email = data['email']
    password = generate_password_hash(data['password'])  # Hash password
    hobbies = data.get('hobbies', "No hobbies specified")  # Default if hobbies not provided

    # Check if the username or email already exists
    check_username = User.query.filter_by(username=username).first()
    check_email = User.query.filter_by(email=email).first()

    if check_username or check_email:
        return jsonify({"error": "Username or email already exists"}), 406

    # Check if this is the first user to register
    first_user = User.query.first()  # Get the first user (if any)
    if not first_user:  # If no users exist, this will be the first user
        is_admin = True
        is_approved = True
        is_verified = True
    else:
        is_admin = False
        is_approved = False
        is_verified = False

    # Create new user
    new_user = User(username=username, email=email, password=password, hobbies=hobbies,
                    is_admin=is_admin, is_approved=is_approved, is_verified=is_verified)

    try:
        db.session.add(new_user)
        db.session.commit()

        # Send welcome email
        try:
            msg = Message(
                subject="Welcome to Hobbyist App",
                sender=app.config["MAIL_DEFAULT_SENDER"],
                recipients=[email],
                body="Thank you for signing up with us. We hope you enjoy using our app!"
            )
            mail.send(msg)
        except Exception as e:
            return jsonify({"error": f"Failed to send email: {e}"}), 500

        return jsonify({"msg": "User created successfully!"}), 201

    except Exception as e:
        db.session.rollback()  # Rollback in case of error
        return jsonify({"error": f"Failed to create user: {e}"}), 500


# Update User (Includes updating groups, posts, hobbies if needed)
@user_bp.route("/users/<int:user_id>", methods=["PATCH"])
def update_user(user_id):
    user = User.query.get(user_id)

    if not user:
        return jsonify({"error": "User not found!"}), 404

    data = request.get_json()
    username = data.get('username', user.username)
    email = data.get('email', user.email)
    password = data.get('password', None)  # Password is optional
    hobbies = data.get('hobbies', user.hobbies)  # Update hobbies if provided, else keep the old value

    # Check if username/email is already taken
    check_username = User.query.filter(User.username == username, User.id != user.id).first()
    check_email = User.query.filter(User.email == email, User.id != user.id).first()

    if check_username or check_email:
        return jsonify({"error": "Username or email already exists"}), 406

    # Hash the password if it’s being updated
    if password:
        password = generate_password_hash(password)

    try:
        user.username = username
        user.email = email
        if password:
            user.password = password
        user.hobbies = hobbies  # Update hobbies

        # If the user is updating any associated data (e.g., groups, posts), handle it
        if 'groups' in data:
            for group_data in data['groups']:
                group = Group.query.get(group_data['id'])
                if group:
                    group.title = group_data.get('title', group.title)
                    group.description = group_data.get('description', group.description)
                    db.session.commit()

        if 'posts' in data:
            for post_data in data['posts']:
                post = Post.query.get(post_data['id'])
                if post and post.user_id == user.id:
                    post.content = post_data.get('content', post.content)
                    post.media_url = post_data.get('media_url', post.media_url)
                    post.group_id = post_data.get('group_id', post.group_id)
                    db.session.commit()

        db.session.commit()
        return jsonify({"success": "User updated successfully!"}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Failed to update user: {e}"}), 500


# Delete User
@user_bp.route("/users/<int:user_id>", methods=["DELETE"])
def delete_user(user_id):
    user = User.query.get(user_id)

    if not user:
        return jsonify({"error": "User not found!"}), 404

    try:
        db.session.delete(user)
        db.session.commit()
        return jsonify({"success": "User deleted successfully!"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Failed to delete user: {e}"}), 500
