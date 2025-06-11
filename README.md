# Smart Recipe 🍽️

Proyecto completo para generar recetas personalizadas con inteligencia artificial, integrando preferencias del usuario, login con Flask + JWT, y la API de Spoonacular.

## 📦 Requisitos

- Docker (opcional, para despliegue)
- Python 3.10+
- Node.js + npm

## 🚀 Instalación y ejecución

### 1. Clonar y acceder al proyecto

```bash
git clone <repositorio>
cd smart_recipe
```

### 2. Ejecutar script de inicio automático (requiere permisos)

```bash
chmod +x start.sh
./start.sh
```

Este script:
- Instala dependencias del backend y frontend.
- Crea entorno virtual.
- Carga variables del `.env`.
- Levanta backend y frontend simultáneamente.

### 3. Alternativa manual

#### Backend (Flask)

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py
```

#### Frontend (React)

```bash
cd frontend
npm install
npm start
```

## 🔐 Login y JWT

- Login modal en la sección "Perfil"
- Registro y login conectados con base de datos local vía SQLAlchemy
- Tokens almacenados y usados en peticiones protegidas

## 🧠 Inteligencia Artificial

La app utiliza:
- Spoonacular API para generar recetas basadas en intolerancias y gustos
- Filtro de ingredientes que el usuario no desea (verduras, pescado, carne, legumbres...)

## 🐳 Docker

### Backend

```bash
docker build -t smart-recipe-backend ./backend
docker run -p 5000:5000 smart-recipe-backend
```

## ⚙️ Despliegue en Render

- Usa el `Procfile` y configura:
  - Python build command: `pip install -r requirements.txt`
  - Start command: `gunicorn app:app`

## 📁 Estructura

```
smart_recipe/
├── backend/
│   ├── app.py
│   ├── models.py
│   ├── routes.py
│   └── ...
├── frontend/
│   ├── src/
│   ├── public/
│   └── ...
├── start.sh
├── Dockerfile
├── Procfile
└── README.md
```

---

Made by Erik