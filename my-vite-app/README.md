# 🔥 Challenge 11 - Firebase Authentication

Este proyecto implementa un sistema completo de autenticación usando **Firebase** y **Redux** según los requisitos del Challenge 11.

## ✅ Funcionalidades Implementadas

1. **📧 Login con Email y Contraseña** - Sistema completo de registro e inicio de sesión
2. **🔍 Login con Google** - Autenticación rápida usando Google Sign-In
3. **🚪 Logout de Firebase** - Cierre de sesión seguro con actualización del estado

## 🛠️ Tecnologías Utilizadas

- **React 18** - Biblioteca de UI
- **Redux Toolkit** - Manejo de estado global
- **Firebase v10** - Backend as a Service para autenticación
- **Vite** - Build tool y dev server

## 🔧 Configuración

### 1. Instalar Dependencias
```bash
npm install
```

### 2. Configurar Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Crea un nuevo proyecto
3. Habilita Authentication > Sign-in methods:
   - Email/Password
   - Google
4. Obtén tu configuración de Firebase
5. Reemplaza la configuración en `src/firebase/config.js`:

```javascript
const firebaseConfig = {
  apiKey: "tu-api-key",
  authDomain: "tu-auth-domain",
  projectId: "tu-project-id", 
  storageBucket: "tu-storage-bucket",
  messagingSenderId: "tu-messaging-sender-id",
  appId: "tu-app-id"
};
```

### 3. Ejecutar la Aplicación
```bash
npm run dev
```

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── Login.jsx          # Componente de autenticación
│   └── Dashboard.jsx      # Dashboard para usuarios autenticados
├── firebase/
│   └── config.js          # Configuración de Firebase
├── redux/
│   ├── authSlice.js       # Slice de Redux para autenticación
│   └── store.js           # Store de Redux
├── hooks/
│   └── useAuthState.js    # Hook para manejar estado de auth
└── App.jsx                # Componente principal
```

## 🚀 Características

- **Estado Persistente**: La sesión se mantiene al recargar la página
- **Manejo de Errores**: Mensajes de error claros para el usuario
- **UI Moderna**: Interfaz limpia y responsiva
- **Validación**: Validación de formularios y confirmación de contraseñas
- **Loading States**: Indicadores de carga durante las operaciones

## 📚 Referencia

Documentación oficial: [Firebase Auth Web](https://firebase.google.com/docs/auth/web/google-signin?hl=es-419)
