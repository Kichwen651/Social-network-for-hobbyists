import os
from flask import Flask, jsonify, request
from flask_migrate import Migrate
from models import db, TokenBlocklist, User
from flask_jwt_extended import JWTManager
from datetime import timedelta
from flask_mail import Mail, Message
from flask_cors import CORS
import logging
from werkzeug.security import generate_password_hash
from views import *  # Import views containing blueprints for user, post, group, auth

# Initialize Flask app
app = Flask(__name__)

# CORS Configuration - Allow specific domains (frontend)
CORS(app, origins=["http://localhost:3000"])  # Allow localhost for frontend development

# Database URI from environment variable
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'postgresql://hobbiesdb_user:mXzEIhwhjfICAiJyEKk9v5F8NsmalX8H@dpg-cuesda5umphs73ajlfjg-a.oregon-postgres.render.com/hobbiesdb')  # SQLite for development
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # Disable unnecessary modification tracking
migrate = Migrate(app, db)
db.init_app(app)

# Flask mail configuration - Use environment variables for sensitive info
app.config["MAIL_SERVER"] = 'smtp.gmail.com'
app.config["MAIL_PORT"] = 587
app.config["MAIL_USE_TLS"] = True
app.config["MAIL_USE_SSL"] = False

# Ensure correct credentials are used for sending email
app.config["MAIL_USERNAME"] = os.getenv('MAIL_USERNAME', 'victor.kichwen@student.moringaschool.com')
app.config["MAIL_PASSWORD"] = os.getenv('MAIL_PASSWORD', 'your-app-password')  # Use app password for Gmail
app.config["MAIL_DEFAULT_SENDER"] = os.getenv('MAIL_USERNAME', 'victor.kichwen@student.moringaschool.com')

mail = Mail(app)

# JWT Configuration - Use environment variables for security
app.config["JWT_SECRET_KEY"] = os.getenv('JWT_SECRET_KEY', 'default-secret-key')  # Secret key for JWT
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(minutes=5)
app.config["JWT_REFRESH_TOKEN_EXPIRES"] = timedelta(days=7)  # Expiry for refresh tokens

jwt = JWTManager(app)

# Register blueprints
app.register_blueprint(user_bp, url_prefix='/api')  # Register user blueprint with '/api' prefix
app.register_blueprint(group_bp, url_prefix='/api')  # Register group blueprint with '/api' prefix
app.register_blueprint(post_bp, url_prefix='/api')  # Register post blueprint with '/api' prefix
app.register_blueprint(auth_bp, url_prefix='/api')  # Register auth blueprint with '/api' prefix

# JWT Blocklist Check (to invalidate tokens)
@jwt.token_in_blocklist_loader
def check_if_token_revoked(jwt_header, jwt_payload: dict) -> bool:
    jti = jwt_payload["jti"]
    token = db.session.query(TokenBlocklist.id).filter_by(jti=jti).scalar()
    return token is not None

# Route for adding a new user (Note: Can also be in your user blueprint)
@app.route('/api/users', methods=['POST'])
def add_user():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = generate_password_hash(data.get('password'))  # Hash password
    hobbies = data.get('hobbies', "No hobbies specified")  # Default if hobbies not provided

    # Validation for username and email
    if not username or not email or not password:
        return jsonify({"error": "Username, email, and password are required"}), 400

    # Check if the username or email already exists
    check_username = User.query.filter_by(username=username).first()
    check_email = User.query.filter_by(email=email).first()

    if check_username or check_email:
        return jsonify({"error": "Username or email already exists"}), 409  # Conflict status code

    # Determine if the user is an admin (first user gets admin)
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

        # Send welcome email (optional, can fail but doesn't affect user creation)
        try:
            msg = Message(
                subject="Welcome to Hobbyist App",
                sender=app.config["MAIL_DEFAULT_SENDER"],
                recipients=[email],
                body="Thank you for signing up with us. We hope you enjoy using our app!"
            )
            mail.send(msg)
        except Exception as e:
            app.logger.error(f"Error sending welcome email: {e}")
            # Log the email error but continue processing

        return jsonify({"msg": "User created successfully!"}), 201

    except Exception as e:
        db.session.rollback()  # Rollback in case of error
        app.logger.error(f"Error creating user: {e}")
        return jsonify({"error": f"Failed to create user: {e}"}), 500


# Main function to run the app
if __name__ == '__main__':
    # Set up logging
    logging.basicConfig(level=logging.DEBUG)
    app.run(debug=True)
