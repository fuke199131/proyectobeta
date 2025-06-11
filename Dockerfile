# Dockerfile para Smart Recipe
FROM python:3.11-slim

WORKDIR /app

COPY backend/ /app/backend/
COPY frontend/ /app/frontend/

RUN pip install --upgrade pip && \
    pip install -r /app/backend/requirements.txt

WORKDIR /app/backend

EXPOSE 5000

CMD ["flask", "run", "--host=0.0.0.0", "--port=5000"]
