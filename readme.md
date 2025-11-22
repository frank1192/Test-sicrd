# Test SICRD - Sistema de Login con Backend y Frontend

Este repositorio contiene una aplicación completa con backend (Django REST Framework) y frontend (React) que implementa un sistema de autenticación con login.

## Estructura del Proyecto

```
Test-sicrd/
├── back/              # Backend - Django REST Framework
│   ├── config/        # Configuración principal de Django
│   ├── authentication/# App de autenticación
│   ├── manage.py      # Script de gestión de Django
│   ├── requirements.txt # Dependencias de Python
│   └── db.sqlite3     # Base de datos SQLite
│
├── front/             # Frontend - React + Vite
│   ├── src/
│   │   ├── components/    # Componentes React
│   │   ├── services/      # Servicios de API
│   │   └── App.jsx        # Componente principal
│   └── package.json   # Dependencias de Node.js
│
└── readme.md          # Este archivo
```

## Tecnologías Utilizadas

### Backend
- **Django 5.2.8** - Framework web de Python
- **Django REST Framework 3.16.1** - API REST
- **djangorestframework-simplejwt 5.5.1** - Autenticación JWT
- **django-cors-headers 4.9.0** - Manejo de CORS
- **SQLite** - Base de datos

### Frontend
- **React 18** - Biblioteca de interfaz de usuario
- **Vite 7.2.4** - Herramienta de construcción
- **Axios** - Cliente HTTP para llamadas a la API
- **Node.js 20.19** - Entorno de ejecución

## Requisitos Previos

- Python 3.12 o superior
- Node.js 20.19 o superior
- npm 10.8 o superior

## Instalación y Configuración

### Backend (Django)

1. Navegar al directorio del backend:
```bash
cd back
```

2. Crear y activar el entorno virtual:
```bash
python3 -m venv venv
source venv/bin/activate  # En Windows: venv\Scripts\activate
```

3. Instalar las dependencias:
```bash
pip install -r requirements.txt
```

4. Ejecutar las migraciones:
```bash
python manage.py migrate
```

5. Crear un superusuario (opcional):
```bash
python manage.py createsuperuser
```

6. Iniciar el servidor de desarrollo:
```bash
python manage.py runserver 8000
```

El backend estará disponible en `http://127.0.0.1:8000/`

### Frontend (React)

1. Navegar al directorio del frontend:
```bash
cd front
```

2. Instalar las dependencias:
```bash
npm install
```

3. Iniciar el servidor de desarrollo:
```bash
npm run dev
```

El frontend estará disponible en `http://localhost:5173/`

## Uso

### Endpoints del Backend

- **POST** `/api/auth/login/` - Login de usuario
  ```json
  {
    "username": "testuser",
    "password": "testpass123"
  }
  ```
  Respuesta:
  ```json
  {
    "refresh": "token_refresh",
    "access": "token_access",
    "user": {
      "id": 1,
      "username": "testuser",
      "email": "test@example.com"
    }
  }
  ```

- **POST** `/api/auth/register/` - Registro de nuevo usuario
  ```json
  {
    "username": "newuser",
    "email": "newuser@example.com",
    "password": "password123",
    "password_confirm": "password123"
  }
  ```

- **GET** `/api/auth/user/` - Obtener información del usuario autenticado
  (Requiere token de acceso en el header `Authorization: Bearer <token>`)

- **POST** `/api/auth/token/refresh/` - Refrescar el token de acceso
  ```json
  {
    "refresh": "token_refresh"
  }
  ```

### Usuario de Prueba

Por defecto, se crea un usuario de prueba:
- **Username:** testuser
- **Password:** testpass123
- **Email:** test@example.com

### Flujo de Autenticación

1. El usuario accede al frontend en `http://localhost:5173/`
2. Se muestra el formulario de login
3. El usuario ingresa sus credenciales (username y password)
4. El frontend envía las credenciales al endpoint `/api/auth/login/`
5. El backend valida las credenciales y devuelve:
   - Token de acceso (JWT)
   - Token de refresco
   - Información del usuario
6. El frontend guarda los tokens en localStorage
7. Se redirige al usuario al dashboard
8. Para cerrar sesión, se limpian los tokens del localStorage

### Características Implementadas

✅ Sistema de login con validación
✅ Registro de nuevos usuarios
✅ Autenticación JWT (JSON Web Tokens)
✅ Refresco automático de tokens
✅ Protección CORS configurada
✅ Manejo de errores en frontend y backend
✅ Interfaz de usuario moderna y responsiva
✅ Dashboard protegido para usuarios autenticados
✅ Base de datos SQLite

## Configuración de CORS

El backend está configurado para aceptar peticiones desde:
- `http://localhost:5173` (Vite dev server)
- `http://localhost:3000`
- `http://localhost:8080`
- `http://127.0.0.1:5173`
- `http://127.0.0.1:3000`
- `http://127.0.0.1:8080`

Para añadir más orígenes, editar `back/config/settings.py`:
```python
CORS_ALLOWED_ORIGINS = [
    'http://tu-nuevo-origen:puerto',
    # ...
]
```

## Estructura de la Base de Datos

La aplicación utiliza SQLite como base de datos, ubicada en `back/db.sqlite3`. Incluye las siguientes tablas principales:

- **auth_user** - Usuarios del sistema (modelo por defecto de Django)
  - id
  - username
  - email
  - password (hasheada)
  - first_name
  - last_name
  - is_active
  - is_staff
  - is_superuser
  - date_joined

## Notas Técnicas

### Seguridad
- Las contraseñas se almacenan hasheadas usando el sistema de Django
- Los tokens JWT tienen una validez de 60 minutos
- Los tokens de refresco tienen una validez de 1 día
- CSRF está habilitado en Django
- Las credenciales se envían solo por HTTPS en producción

### Integración Frontend-Backend
- El frontend utiliza Axios para las peticiones HTTP
- Los tokens se almacenan en localStorage del navegador
- Se implementa un interceptor para añadir automáticamente el token a las peticiones
- Se maneja automáticamente el refresco de tokens cuando expiran

### Desarrollo
- Backend: El servidor de desarrollo de Django se ejecuta en el puerto 8000
- Frontend: El servidor de desarrollo de Vite se ejecuta en el puerto 5173
- Ambos servidores tienen hot-reload habilitado

## Troubleshooting

### Error de CORS
Si recibes errores de CORS, verifica que:
1. El backend esté corriendo en el puerto 8000
2. El frontend esté corriendo en el puerto 5173
3. El origen esté incluido en `CORS_ALLOWED_ORIGINS` en settings.py

### Error de conexión al backend
1. Verifica que el backend esté corriendo: `http://127.0.0.1:8000/api/auth/login/`
2. Verifica que el URL de la API en `front/src/services/api.js` sea correcto

### Error al instalar dependencias
- Backend: Asegúrate de tener Python 3.12+ y pip actualizado
- Frontend: Asegúrate de tener Node.js 20+ y npm actualizado

## Próximos Pasos

Posibles mejoras para el proyecto:
- [ ] Implementar recuperación de contraseña
- [ ] Añadir perfil de usuario editable
- [ ] Implementar roles y permisos
- [ ] Añadir tests unitarios y de integración
- [ ] Migrar a PostgreSQL para producción
- [ ] Añadir Docker para facilitar el despliegue
- [ ] Implementar CI/CD
- [ ] Añadir logging y monitoreo

## Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## Contacto

Para preguntas o sugerencias, por favor abre un issue en el repositorio.

