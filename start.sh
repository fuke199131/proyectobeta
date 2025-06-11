#!/bin/bash

echo "🚀 Iniciando instalación y ejecución del proyecto Smart Recipe..."

# Activar entorno virtual si no está activo
if [ ! -d "backend/venv" ]; then
  echo "📦 Creando entorno virtual..."
  python3 -m venv backend/venv
fi

source backend/venv/bin/activate

# Instalar dependencias de backend
echo "📦 Instalando dependencias de backend..."
pip install -r backend/requirements.txt

# Instalar dependencias de frontend
echo "📦 Instalando dependencias de frontend..."
cd frontend
npm install

# Ejecutar frontend y backend simultáneamente
cd ..
gnome-terminal -- bash -c "cd backend && source venv/bin/activate && flask run --host=0.0.0.0 --port=5000"
gnome-terminal -- bash -c "cd frontend && npm start"
