from flask import Flask, request, jsonify, Blueprint
from api.models import db, User
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash

api = Blueprint('api', __name__)

CORS(api)

@api.route('/signup', methods=['POST'])
def signup():
    email = request.json.get('email', None)
    password = request.json.get('password', None)

    if not email or not password:
        return jsonify({"msg": "Email y contraseña son requeridos"}), 400

    user_exists = User.query.filter_by(email=email).first()
    if user_exists:
        return jsonify({"msg": "El usuario ya existe"}), 400

    hashed_password = generate_password_hash(password)
    
    new_user = User(email=email, password=hashed_password, is_active=True)
    
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg": "Usuario creado exitosamente"}), 201

@api.route('/token', methods=['POST'])
def create_token():
    email = request.json.get('email', None)
    password = request.json.get('password', None)

    user = User.query.filter_by(email=email).first()

    if user and check_password_hash(user.password, password):
        access_token = create_access_token(identity=user.email)
        return jsonify(access_token=access_token), 200
    else:
        return jsonify({"msg": "Email o contraseña incorrectos"}), 401

@api.route('/private-data', methods=['GET'])
@jwt_required()
def private_data():
    current_user_email = get_jwt_identity()
    return jsonify({"msg": f"Bienvenido a la zona privada, {current_user_email}"}), 200