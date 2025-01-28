import os
from flask import Flask, jsonify, request
from flask_migrate import Migrate
from models import db, TokenBlocklist
from flask_jwt_extended import JWTManager
from datetime import timedelta
from flask_mail import Mail, Message
from flask_cors import CORS
import logging

app = Flask(__name__)

# CORS Configuration - Allow only specific domains
CORS(app, origins=["https://your-frontend-domain.com"])  # Adjust accordingly

# Database URI from environment variable
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///hobbies.db')  # Use production DB in production
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # Disable unnecessary modification tracking
migrate = Migrate(app, db)
db.init_app(app)

# Flask mail configuration - Use environment variables for sensitive info
app.config["MAIL_SERVER"] = 'smtp.gmail.com'
app.config["MAIL_PORT"] = 587
app.config["MAIL_USE_TLS"] = True
app.config["MAIL_USE_SSL"] = False

# Ensure you are using the correct credentials from environment variables or app password
app.config["MAIL_USERNAME"] = os.getenv('MAIL_USERNAME', 'victor.kichwen@student.moringaschool.com')  # Your Gmail address
app.config["MAIL_PASSWORD"] = os.getenv('MAIL_PASSWORD', 'pdle xlhn kpmc xwfe')  # Use app password if 2FA is enabled
app.config["MAIL_DEFAULT_SENDER"] = os.getenv('MAIL_USERNAME', 'victor.kichwen@student.moringaschool.com')

mail = Mail(app)

# JWT Configuration - Use environment variables for security
app.config["JWT_SECRET_KEY"] = os.getenv('JWT_SECRET_KEY', 'default-secret-key')  # Use a secret key from environment
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(minutes=5)
app.config["JWT_REFRESH_TOKEN_EXPIRES"] = timedelta(days=7)  # Add a refresh token expiration

jwt = JWTManager(app)

# Import all functions in views
from views import *

# Register blueprints
app.register_blueprint(user_bp)
app.register_blueprint(group_bp)
app.register_blueprint(post_bp)
app.register_blueprint(auth_bp)

# JWT Blocklist Check (to invalidate tokens)
@jwt.token_in_blocklist_loader
def check_if_token_revoked(jwt_header, jwt_payload: dict) -> bool:
    jti = jwt_payload["jti"]
    token = db.session.query(TokenBlocklist.id).filter_by(jti=jti).scalar()
    return token is not None

@app.route('/users', methods=['POST'])
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
            # You can log the email error but continue processing
        
        return jsonify({"msg": "User created successfully!"}), 201

    except Exception as e:
        db.session.rollback()  # Rollback in case of error
        return jsonify({"error": f"Failed to create user: {e}"}), 500


# Main function to run the app
if __name__ == '__main__':
    app.run(debug=True)
