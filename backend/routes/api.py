
from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from models.user import db, User

api = Blueprint("api", __name__)

@api.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data["email"]).first()
    if user and user.password == data["password"]:
        token = create_access_token(identity=user.id)
        return jsonify(token=token)
    return jsonify(message="Credenciales incorrectas"), 401

@api.route("/generate", methods=["POST"])
def generate():
    data = request.get_json()
    recetas = []

    if data.get("vegan"): recetas.append("Ensalada vegana de garbanzos")
    if data.get("spicy"): recetas.append("Curry picante tailandés")
    if data.get("noFish"): recetas.append("Pasta con salsa de tomate sin pescado")
    if data.get("noVeggies"): recetas.append("Pollo al horno sin verduras")
    if data.get("noLegumes"): recetas.append("Arroz con huevo sin legumbres")
    if data.get("noMeat"): recetas.append("Tortilla de patata sin carne")

    if not recetas:
        recetas = ["Tostadas con aguacate", "Arroz tres delicias", "Sopa de verduras"]

    return jsonify(recipes=recetas)
