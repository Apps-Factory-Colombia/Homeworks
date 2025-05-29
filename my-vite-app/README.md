# 🔥 Challenge 11, 12 & 13 - Firebase Authentication + Firestore CRUD + Realtime Chat

Este proyecto implementa un sistema completo de autenticación, gestión de datos y chat en tiempo real usando **Firebase** y **Redux** según los requisitos de los Challenges 11, 12 y 13.

## ✅ Funcionalidades Implementadas

### Challenge 11 - Autenticación Firebase
1. **📧 Login con Email y Contraseña** - Sistema completo de registro e inicio de sesión
2. **🔍 Login con Google** - Autenticación rápida usando Google Sign-In
3. **🚪 Logout de Firebase** - Cierre de sesión seguro con actualización del estado

### Challenge 12 - Firestore CRUD
1. **➕ CREATE** - Agregar nuevos documentos a Firestore
2. **📋 READ** - Leer y mostrar documentos de Firestore
3. **✏️ UPDATE** - Actualizar documentos existentes en Firestore
4. **🗑️ DELETE** - Eliminar documentos de Firestore

### Challenge 13 - Chat en Tiempo Real
1. **💬 Mensajería Instantánea** - Envío y recepción de mensajes en tiempo real
2. **👥 Multi-usuario** - Chat compartido entre todos los usuarios conectados
3. **🔄 Sincronización Automática** - Los mensajes aparecen instantáneamente en pantalla
4. **📱 UI Moderna** - Interfaz de chat moderna con burbujas de mensajes

## 🛠️ Tecnologías Utilizadas

- **React 19** - Biblioteca de UI
- **Redux Toolkit** - Manejo de estado global
- **Firebase v11** - Backend as a Service completo
  - **Firebase Auth** - Autenticación de usuarios
  - **Firestore** - Base de datos NoSQL para CRUD
  - **Realtime Database** - Base de datos en tiempo real para chat
- **Vite** - Build tool y dev server

## 🚀 Inicio Rápido

### 1. Instalar Dependencias
```bash
npm install
```

### 2. Configuración de Firebase (Opcional)

El proyecto ya incluye una configuración de Firebase de ejemplo que **NO funcionará** en producción. Para usar tu propio proyecto de Firebase:

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Crea un nuevo proyecto llamado `challenge11-auth-app`
3. Habilita **Authentication** > Sign-in methods:
   - ✅ Email/Password
   - ✅ Google
4. Habilita **Firestore Database**:
   - Crea una nueva base de datos en modo de prueba
   - Configura las reglas de seguridad según tus necesidades
5. Habilita **Realtime Database**:
   - Crea una nueva base de datos en modo de prueba
   - Configura las reglas de seguridad
6. Ve a Project Settings > General > Your apps
7. Agrega una nueva Web App
8. Copia tu configuración real y reemplaza en `src/firebase/config.js`

**Configuración actual (solo para desarrollo):**
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyBkL9rQ2mX8vK3nP7wE5tA6uY9sD2fH8jK",
  authDomain: "challenge11-auth-app.firebaseapp.com",
  databaseURL: "https://challenge11-auth-app-default-rtdb.firebaseio.com",
  projectId: "challenge11-auth-app",
  storageBucket: "challenge11-auth-app.appspot.com",
  messagingSenderId: "847291635729",
  appId: "1:847291635729:web:c4b8f2e1a9d7e6f3a5b8c9"
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
│   ├── Login.jsx              # Componente de autenticación
│   ├── Dashboard.jsx          # Dashboard principal con pestañas
│   ├── FirestoreManager.jsx   # Gestor CRUD de Firestore
│   └── RealtimeChat.jsx       # Chat en tiempo real
├── firebase/
│   └── config.js              # Configuración de Firebase
├── redux/
│   ├── authSlice.js           # Slice de autenticación
│   ├── firestoreSlice.js      # Slice de operaciones CRUD
│   ├── realtimeSlice.js       # Slice de chat en tiempo real
│   └── store.js               # Store de Redux
├── hooks/
│   └── useAuthState.js        # Hook para estado de autenticación
└── App.jsx                    # Componente principal
```

## 🎯 Cómo Probar

### Challenge 11 - Autenticación
1. **Registro**: Crea una cuenta con email y contraseña
2. **Login Email**: Inicia sesión con las credenciales creadas
3. **Login Google**: Usa el botón de Google (requiere configuración real)
4. **Dashboard**: Explora la información del usuario autenticado
5. **Logout**: Cierra sesión de forma segura

### Challenge 12 - Firestore CRUD
1. **Navega** a la pestaña "🔥 Firestore CRUD" en el dashboard
2. **CREATE**: Agrega nuevas tareas con título, descripción y categoría
3. **READ**: Ve la lista de todas las tareas ordenadas por fecha
4. **UPDATE**: Haz clic en "✏️ Editar" para modificar una tarea
5. **DELETE**: Haz clic en "🗑️ Eliminar" para borrar una tarea

### Challenge 13 - Chat en Tiempo Real
1. **Navega** a la pestaña "💬 Chat en Tiempo Real" en el dashboard
2. **Conectar**: El chat se conecta automáticamente a Firebase Realtime Database
3. **Enviar**: Escribe mensajes y presiona Enter o el botón "🚀 Enviar"
4. **Ver en Tiempo Real**: Los mensajes aparecen instantáneamente para todos los usuarios
5. **Multi-usuario**: Abre múltiples pestañas para simular varios usuarios chateando

## 🚀 Características

### Generales
- **Estado Persistente**: La sesión se mantiene al recargar la página
- **Manejo de Errores**: Mensajes de error claros para el usuario
- **UI Moderna**: Interfaz limpia y responsiva con emojis
- **Loading States**: Indicadores de carga durante las operaciones
- **Redux Integration**: Estado global completo con Redux Toolkit

### Específicas de Firestore
- **Operaciones Asíncronas**: Todas las operaciones CRUD son asíncronas
- **Validación de Formularios**: Validación antes de enviar datos
- **Timestamps Automáticos**: Fechas de creación y actualización automáticas
- **Confirmación de Eliminación**: Previene eliminaciones accidentales

### Específicas de Chat en Tiempo Real
- **Mensajería Instantánea**: Los mensajes se sincronizan en tiempo real
- **Identificación de Usuario**: Cada mensaje muestra quién lo envió
- **Auto-scroll**: Se desplaza automáticamente a los mensajes más recientes
- **Indicador de Conexión**: Muestra el estado de conexión en tiempo real
- **Interfaz de Chat Moderna**: Burbujas de mensajes estilo WhatsApp
- **Timestamps**: Hora y fecha de cada mensaje
- **Soporte Multilinea**: Shift+Enter para nueva línea

## 🔧 Modo Demo

Si no configuras Firebase real, la aplicación mostrará errores de conexión, pero podrás ver toda la UI y el flujo completo implementado para los tres challenges.

## 🏗️ Arquitectura

- **Autenticación**: Manejo completo del estado de usuario con persistencia
- **CRUD Operations**: Operaciones asíncronas con Redux Toolkit sobre Firestore
- **Real-time Messaging**: Sistema de mensajería usando Firebase Realtime Database
- **Component Structure**: Separación clara entre autenticación, CRUD y chat
- **Error Handling**: Manejo robusto de errores en todas las operaciones
- **State Management**: Redux con múltiples slices para diferentes funcionalidades

## 📚 Referencias

- [Firebase Auth Web](https://firebase.google.com/docs/auth/web/google-signin?hl=es-419)
- [Firestore Web](https://firebase.google.com/docs/firestore/quickstart?hl=es-419)
- [Firebase Realtime Database](https://firebase.google.com/docs/database/web/start?hl=es-419)
- [Redux Toolkit](https://redux-toolkit.js.org/)
