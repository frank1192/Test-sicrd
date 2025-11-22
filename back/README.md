# Backend - Django REST Framework

Sistema de autenticación basado en Django REST Framework con JWT.

## Estructura del Proyecto

```
back/
├── config/                # Configuración principal del proyecto Django
│   ├── settings.py        # Configuración de Django
│   ├── urls.py            # URLs principales
│   └── wsgi.py            # Punto de entrada WSGI
│
├── authentication/        # App de autenticación
│   ├── views.py           # Vistas de la API
│   ├── serializers.py     # Serializadores
│   ├── urls.py            # URLs de autenticación
│   └── models.py          # Modelos (usa User por defecto)
│
├── manage.py              # Script de gestión de Django
├── requirements.txt       # Dependencias de Python
└── db.sqlite3             # Base de datos SQLite
```

## Instalación

1. Crear y activar entorno virtual:
```bash
python3 -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
```

2. Instalar dependencias:
```bash
pip install -r requirements.txt
```

3. Ejecutar migraciones:
```bash
python manage.py migrate
```

4. Crear usuario de prueba (opcional):
```bash
python manage.py shell
>>> from django.contrib.auth.models import User
>>> User.objects.create_user(username='testuser', email='test@example.com', password='testpass123')
>>> exit()
```

5. Iniciar servidor:
```bash
python manage.py runserver 8000
```

## Endpoints de la API

### Login
**POST** `/api/auth/login/`

Request:
```json
{
  "username": "testuser",
  "password": "testpass123"
}
```

Response (200):
```json
{
  "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6...",
  "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6...",
  "user": {
    "id": 1,
    "username": "testuser",
    "email": "test@example.com"
  }
}
```

### Registro
**POST** `/api/auth/register/`

Request:
```json
{
  "username": "newuser",
  "email": "newuser@example.com",
  "password": "password123",
  "password_confirm": "password123"
}
```

Response (201):
```json
{
  "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6...",
  "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6...",
  "user": {
    "id": 2,
    "username": "newuser",
    "email": "newuser@example.com"
  }
}
```

### Información del Usuario
**GET** `/api/auth/user/`

Headers:
```
Authorization: Bearer <access_token>
```

Response (200):
```json
{
  "id": 1,
  "username": "testuser",
  "email": "test@example.com"
}
```

### Refrescar Token
**POST** `/api/auth/token/refresh/`

Request:
```json
{
  "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
}
```

Response (200):
```json
{
  "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
}
```

## Configuración

### Tokens JWT
En `config/settings.py`:
```python
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
}
```

### CORS
En `config/settings.py`:
```python
CORS_ALLOWED_ORIGINS = [
    'http://localhost:5173',
    'http://localhost:3000',
    # Añadir más según necesidad
]
```

## Testing

Probar endpoints con curl:

```bash
# Login
curl -X POST http://127.0.0.1:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{"username": "testuser", "password": "testpass123"}'

# Obtener información del usuario
curl -X GET http://127.0.0.1:8000/api/auth/user/ \
  -H "Authorization: Bearer <access_token>"
```

## Dependencias

- Django 5.2.8
- djangorestframework 3.16.1
- djangorestframework-simplejwt 5.5.1
- django-cors-headers 4.9.0

## Notas de Seguridad

- El `SECRET_KEY` debe cambiarse en producción
- Desactivar `DEBUG = False` en producción
- Configurar `ALLOWED_HOSTS` apropiadamente
- Usar HTTPS en producción
- No commitear `db.sqlite3` en repositorios públicos
