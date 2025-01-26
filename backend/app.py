from flask import Flask, jsonify, request
from flask_migrate import Migrate
from models import db, TokenBlocklist
from flask_jwt_extended import JWTManager
from datetime import timedelta
from flask_mail import Mail
from flask_cors import CORS

app = Flask(__name__)


CORS(app)
# migration initialization
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///todo.db'
migrate = Migrate(app, db)
db.init_app(app)


# Flask mail configuration
app.config["MAIL_SERVER"]= 'smtp.gmail.com'
app.config["MAIL_PORT"]=587
app.config["MAIL_USE_TLS"]=True
app.config["MAIL_USE_SSL"]=False
app.config["MAIL_USERNAME"]="kelvinapp2025@gmail.com"
app.config["MAIL_PASSWORD"]="jila igua qyac yxcv"
app.config["MAIL_DEFAULT_SENDER"]="kelvinapp2025@gmail.com"

mail = Mail(app)


# jwt
app.config["JWT_SECRET_KEY"] = "jiyucfvbkaudhudkvfbt" 
app.config["JWT_ACCESS_TOKEN_EXPIRES"] =  timedelta(minutes=5)

jwt = JWTManager(app)
jwt.init_app(app)


# import all functions in views
from views import *


app.register_blueprint(user_bp)
app.register_blueprint(tags_bp)
app.register_blueprint(todo_bp)
app.register_blueprint(auth_bp)


@jwt.token_in_blocklist_loader
def check_if_token_revoked(jwt_header, jwt_payload: dict) -> bool:
    jti = jwt_payload["jti"]
    token = db.session.query(TokenBlocklist.id).filter_by(jti=jti).scalar()

    return token is not None