# Frontend - React + Vite

Aplicación frontend en React que se conecta al backend Django para autenticación.

## Estructura del Proyecto

```
front/
├── src/
│   ├── components/        # Componentes React
│   │   ├── Login.jsx      # Componente de login/registro
│   │   ├── Login.css      # Estilos del login
│   │   ├── Dashboard.jsx  # Dashboard protegido
│   │   └── Dashboard.css  # Estilos del dashboard
│   │
│   ├── services/          # Servicios de API
│   │   └── api.js         # Cliente axios y funciones de autenticación
│   │
│   ├── App.jsx            # Componente principal
│   ├── App.css            # Estilos del app
│   ├── index.css          # Estilos globales
│   └── main.jsx           # Punto de entrada
│
├── public/                # Archivos estáticos
├── index.html             # HTML principal
├── package.json           # Dependencias de Node.js
└── vite.config.js         # Configuración de Vite
```

## Instalación

1. Instalar dependencias:
```bash
npm install
```

2. Iniciar servidor de desarrollo:
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173/`

## Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Preview de la build de producción
- `npm run lint` - Ejecuta el linter

## Componentes Principales

### Login.jsx
Componente que maneja:
- Login de usuarios existentes
- Registro de nuevos usuarios
- Validación de formularios
- Manejo de errores

### Dashboard.jsx
Componente protegido que:
- Muestra información del usuario autenticado
- Permite cerrar sesión
- Solo accesible con autenticación válida

### services/api.js
Servicio que maneja:
- Configuración de axios
- Interceptores para añadir tokens
- Refresco automático de tokens
- Funciones de autenticación (login, register, logout)

## Flujo de Autenticación

1. **Login/Registro**:
   - Usuario ingresa credenciales en el formulario
   - Se envía petición POST a `/api/auth/login/` o `/api/auth/register/`
   - Backend responde con tokens JWT y datos del usuario

2. **Almacenamiento**:
   - Tokens (access y refresh) se guardan en localStorage
   - Información del usuario se guarda en localStorage

3. **Peticiones Autenticadas**:
   - Interceptor de axios añade automáticamente el token de acceso
   - Header: `Authorization: Bearer <access_token>`

4. **Refresco de Token**:
   - Si el access token expira (401), se intenta refrescar automáticamente
   - Se usa el refresh token para obtener un nuevo access token
   - Si falla, se redirige al login

5. **Logout**:
   - Se eliminan todos los tokens del localStorage
   - Se redirige al login

## Configuración de la API

En `src/services/api.js`, la URL base del backend se configura:

```javascript
const API_BASE_URL = 'http://127.0.0.1:8000/api';
```

Cambiar según el entorno:
- Desarrollo: `http://127.0.0.1:8000/api`
- Producción: `https://tu-dominio.com/api`

## Características

✅ Login y registro de usuarios
✅ Validación de formularios
✅ Manejo de errores
✅ Refresco automático de tokens
✅ Interceptores HTTP
✅ Diseño responsive
✅ UI moderna con gradientes
✅ Estados de carga
✅ Protección de rutas

## Estilos

La aplicación utiliza CSS puro con:
- Gradientes para fondos
- Efectos hover en botones
- Diseño centrado y responsive
- Paleta de colores púrpura/azul
- Sombras y bordes redondeados

## Manejo de Errores

Los errores del backend se muestran al usuario:
- Credenciales incorrectas
- Usuario ya existe
- Contraseñas no coinciden
- Campos requeridos

Los mensajes se extraen de la respuesta del backend y se muestran en el formulario.

## LocalStorage

Se almacena:
- `access_token`: Token JWT de acceso
- `refresh_token`: Token JWT de refresco
- `user`: Objeto JSON con datos del usuario

## Dependencias

### Dependencias de Producción
- `react`: ^18.3.1
- `react-dom`: ^18.3.1
- `axios`: ^1.7.9

### Dependencias de Desarrollo
- `vite`: ^7.2.4
- `@vitejs/plugin-react`: ^4.3.4
- `eslint`: ^9.17.0

## Testing con cURL

Mientras el frontend esté en desarrollo, puedes probar la integración:

```bash
# Desde el navegador, abrir DevTools > Console y ejecutar:
localStorage.getItem('access_token')  # Ver el token actual
localStorage.clear()                   # Limpiar todos los datos
```

## Próximos Pasos

Posibles mejoras:
- [ ] Añadir recuperación de contraseña
- [ ] Implementar perfil de usuario editable
- [ ] Añadir navegación con React Router
- [ ] Implementar estados globales (Context API o Redux)
- [ ] Añadir tests con Vitest
- [ ] Mejorar accesibilidad (a11y)
- [ ] Añadir modo oscuro
- [ ] Implementar notificaciones/toasts

## Troubleshooting

### No se conecta al backend
1. Verificar que el backend esté corriendo en el puerto 8000
2. Verificar la URL en `src/services/api.js`
3. Verificar la consola del navegador para errores CORS

### Tokens no se guardan
1. Abrir DevTools > Application > Local Storage
2. Verificar que los tokens estén siendo guardados
3. Verificar que no haya errores en la consola

### Error 401 constantemente
1. El token puede haber expirado
2. Intentar hacer logout y login nuevamente
3. Verificar que el reloj del sistema esté correcto
