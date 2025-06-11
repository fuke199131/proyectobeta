
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import os
from datetime import timedelta
import requests

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL", "sqlite:///data.db")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY", "super-secret")
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(days=1)

db = SQLAlchemy(app)
CORS(app)
jwt = JWTManager(app)

SPOONACULAR_API_KEY = os.getenv("SPOONACULAR_API_KEY")

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)

@app.route("/api/register", methods=["POST"])
def register():
    data = request.get_json()
    new_user = User(email=data["email"], password=data["password"])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"msg": "Usuario registrado"}), 201

@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data["email"], password=data["password"]).first()
    if not user:
        return jsonify({"msg": "Credenciales incorrectas"}), 401
    access_token = create_access_token(identity=user.id)
    return jsonify(access_token=access_token), 200

@app.route("/api/generate-recipes", methods=["POST"])
@jwt_required()
def generate_recipes():
    user_id = get_jwt_identity()
    data = request.get_json()
    gustos = data.get("gustos", [])

    query = ",".join(gustos)
    url = f"https://api.spoonacular.com/recipes/complexSearch"
    params = {
        "apiKey": SPOONACULAR_API_KEY,
        "includeIngredients": query,
        "number": 5
    }

    try:
        response = requests.get(url, params=params)
        response.raise_for_status()
        results = response.json().get("results", [])
        recetas = [{"title": r["title"], "image": r.get("image", "")} for r in results]
        return jsonify(recetas)
    except Exception as e:
        return jsonify({"error": "Error al obtener recetas", "details": str(e)}), 500

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(host="0.0.0.0", port=5000, debug=True)
