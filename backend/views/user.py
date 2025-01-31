from flask import Blueprint, jsonify, request
from models import db, User
from werkzeug.security import generate_password_hash 
from flask_jwt_extended import jwt_required, get_jwt_identity

user_bp = Blueprint('user_bp', __name__)

# CREATE - Add New User
@user_bp.route('/users', methods=['POST'])
def add_user():
    data = request.get_json()
    username = data['username']
    email = data['email']
    password = data['password']  # Plain password (we'll hash it)
    hobbies = data.get('hobbies', 'No hobbies specified')  # Optional hobbies

    # Check if the username or email already exists
    existing_user = User.query.filter_by(username=username).first()
    if existing_user:
        return jsonify({"error": "Username already exists"}), 400

    existing_email = User.query.filter_by(email=email).first()
    if existing_email:
        return jsonify({"error": "Email already exists"}), 400

    # Hash the password before saving to the database
    hashed_password = generate_password_hash(password)

    # Create a new user
    new_user = User(username=username, email=email, password=hashed_password, hobbies=hobbies)

    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"msg": "User created successfully!"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Failed to create user: {e}"}), 500

# READ - Get All Users (Admin only)
@user_bp.route('/users', methods=['GET'])
@jwt_required()  # Ensure the request is authenticated
def get_users():
    current_user_id = get_jwt_identity()
    
    # Only admins should be able to view all users
    current_user = User.query.get(current_user_id)
    if not current_user or not current_user.is_admin:
        return jsonify({"error": "Access denied. Admins only."}), 403

    users = User.query.all()
    user_list = [
        {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "hobbies": user.hobbies
        } for user in users
    ]
    return jsonify(user_list), 200

# READ - Get a User by ID
@user_bp.route('/users/<int:user_id>', methods=['GET'])
@jwt_required()  # Ensure the request is authenticated
def get_user(user_id):
    current_user_id = get_jwt_identity()

    # Only allow access to the requested user or an admin
    user = User.query.get(user_id)
    if not user or (user_id != current_user_id and not User.query.get(current_user_id).is_admin):
        return jsonify({"error": "User not found or unauthorized access"}), 404

    user_details = {
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "hobbies": user.hobbies
    }

    return jsonify(user_details), 200

# UPDATE - Update User Info
@user_bp.route('/users/<int:user_id>', methods=['PUT'])
@jwt_required()  # Ensure the request is authenticated
def update_user(user_id):
    current_user_id = get_jwt_identity()

    # Only allow the user to update their own info or an admin
    if user_id != current_user_id and not User.query.get(current_user_id).is_admin:
        return jsonify({"error": "Unauthorized access"}), 403

    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    hobbies = data.get('hobbies')

    # Get the user object
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    # Update the fields if provided
    if username:
        user.username = username
    if email:
        user.email = email
    if hobbies:
        user.hobbies = hobbies

    db.session.commit()

    return jsonify({"msg": "User updated successfully!"}), 200

# DELETE - Delete User
@user_bp.route('/users/<int:user_id>', methods=['DELETE'])
@jwt_required()  # Ensure the request is authenticated
def delete_user(user_id):
    current_user_id = get_jwt_identity()

    # Only allow the user to delete their own account or an admin
    if user_id != current_user_id and not User.query.get(current_user_id).is_admin:
        return jsonify({"error": "Unauthorized access"}), 403

    # Get the user object
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    db.session.delete(user)
    db.session.commit()

    return jsonify({"msg": "User deleted successfully!"}), 200
