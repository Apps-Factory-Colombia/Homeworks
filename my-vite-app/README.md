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

# 🌳 Challenge 14 - Árboles Binarios en React

Este proyecto implementa un **sistema completo de árboles binarios** usando React y visualización con react-d3-tree según los requisitos del Challenge 14.

## ✅ Funcionalidades Implementadas

### Challenge 14 - Árboles Binarios
1. **➕ Inserción de Números** - Agregar números al árbol binario de búsqueda
2. **🔍 Búsqueda de Valores** - Verificar si un valor existe en el árbol con camino recorrido
3. **📝 Recorridos del Árbol**:
   - **PreOrder** (Raíz → Izquierda → Derecha) - Útil para copiar el árbol
   - **InOrder** (Izquierda → Raíz → Derecha) - Devuelve valores ordenados
   - **PostOrder** (Izquierda → Derecha → Raíz) - Útil para eliminar nodos
4. **🌲 Visualización Interactiva** - Visualizar el árbol con react-d3-tree
5. **📊 Estadísticas** - Altura del árbol y número de nodos
6. **📋 Información en Consola** - Logs detallados de todas las operaciones

## 🛠️ Tecnologías Utilizadas

- **React 19** - Biblioteca de UI con hooks modernos
- **react-d3-tree** - Visualización interactiva de árboles
- **JavaScript ES6+** - Clases y métodos modernos
- **Vite** - Build tool y dev server ultrarrápido

## 🚀 Inicio Rápido

### 1. Instalar Dependencias
```bash
npm install
```

### 2. Ejecutar la Aplicación
```bash
npm run dev
```

### 3. Abrir en el Navegador
- Ve a `http://localhost:5173`
- **Importante**: Abre la consola del navegador (F12) para ver los logs detallados

## 📁 Estructura del Proyecto

```
src/
├── utils/
│   └── BinaryTree.js          # Clase del árbol binario con todos los métodos
├── App.jsx                    # Componente principal con UI completa
└── main.jsx                   # Punto de entrada de la aplicación
```

## 🎯 Cómo Probar el Challenge 14

### 1. Insertar Números en el Árbol
- **Manual**: Usa el campo "Insertar Número" para agregar valores uno por uno
- **Automático**: Haz clic en "📝 Números de Ejemplo" para insertar [10, 5, 15, 2, 7, 12, 20]
- **Consola**: Verás logs como `🌳 Insertado nodo raíz: 10` y `🌿 Insertado 5 a la izquierda de 10`

### 2. Visualizar los Recorridos
Después de insertar números, verás automáticamente los tres recorridos:
- **🔍 PreOrder**: Raíz → Izquierda → Derecha
- **🔍 InOrder**: Izquierda → Raíz → Derecha (valores ordenados)
- **🔍 PostOrder**: Izquierda → Derecha → Raíz

### 3. Buscar Valores en el Árbol
- Usa el campo "🔍 Buscar Valor" para verificar si un número existe
- Verás el resultado y el **camino recorrido** para encontrar (o no encontrar) el valor
- Ejemplo: Al buscar 7 en el árbol [10, 5, 15, 2, 7, 12, 20] verás: `Camino: [10 → 5 → 7]`

### 4. Explorar la Visualización Interactiva
- **Zoom**: Usa la rueda del mouse para acercar/alejar
- **Arrastrar**: Mueve el árbol para explorarlo
- **Nodos**: Cada nodo se muestra como un círculo azul con el valor
- **Estructura**: Las conexiones muestran las relaciones padre-hijo

### 5. Revisar Estadísticas y Logs
- **Estadísticas**: Ve la altura del árbol y número de nodos en tiempo real
- **Consola**: Todos los detalles se imprimen en la consola del navegador
- **Información**: Aprende sobre cada tipo de recorrido y sus usos

## 🌟 Características Especiales

### Algoritmo de Árbol Binario de Búsqueda (BST)
- **Propiedad BST**: Valores menores van a la izquierda, mayores a la derecha
- **Búsqueda Eficiente**: O(log n) en promedio para búsquedas
- **Inserción Ordenada**: Los valores se mantienen organizados automáticamente

### Recorridos Implementados
1. **PreOrder (N-L-R)**:
   - Visita: Nodo actual → Subárbol izquierdo → Subárbol derecho
   - Uso: Crear copias del árbol, evaluación de expresiones
   
2. **InOrder (L-N-R)**:
   - Visita: Subárbol izquierdo → Nodo actual → Subárbol derecho
   - Uso: Obtener valores en orden ascendente (BST)
   
3. **PostOrder (L-R-N)**:
   - Visita: Subárbol izquierdo → Subárbol derecho → Nodo actual
   - Uso: Eliminar nodos, cálculo de espacio requerido

### Visualización Avanzada
- **react-d3-tree**: Biblioteca profesional para visualización de árboles
- **Interactividad**: Zoom, pan, y navegación fluida
- **Responsive**: Se adapta al tamaño de la pantalla
- **Animaciones**: Transiciones suaves al actualizar el árbol

### Búsqueda con Camino
- **Tracking**: Registra cada nodo visitado durante la búsqueda
- **Visualización**: Muestra exactamente qué camino siguió el algoritmo
- **Educativo**: Perfecto para entender cómo funciona la búsqueda en BST

## 🔧 Funcionalidades Adicionales

### Gestión de Estados
- **Validación**: Previene inserción de valores no numéricos
- **Estado Persistente**: Mantiene toda la información del árbol
- **Actualización Automática**: Los recorridos se actualizan tras cada inserción
- **Limpieza**: Opción para limpiar completamente el árbol

### Interfaz de Usuario
- **UI Moderna**: Diseño limpio con emojis y colores distintivos
- **Responsive**: Funciona en desktop y mobile
- **Feedback Visual**: Mensajes de confirmación para cada operación
- **Organización**: Paneles separados para control, información y visualización

### Logging Completo
- **Inserción**: `🌳 Insertado nodo raíz: 10` / `🌿 Insertado 5 a la izquierda de 10`
- **Recorridos**: `🔍 PreOrder (R-I-D): [10, 5, 2, 7, 15, 12, 20]`
- **Búsquedas**: `🔍 Buscando 7: 📍 Resultado: ENCONTRADO 🛤️ Camino recorrido: [10 → 5 → 7]`
- **Estadísticas**: `🌳 Altura: 3 📊 Número de nodos: 7`

## 📚 Conceptos Implementados

### Estructuras de Datos
- **Nodos**: Clase TreeNode con valor, left y right
- **Árbol**: Clase BinaryTree con referencia a root
- **Recursión**: Implementación recursiva de todos los recorridos

### Algoritmos
- **Inserción**: Algoritmo iterativo para agregar nodos
- **Búsqueda**: Algoritmo recursivo con tracking de camino
- **Recorridos**: Implementaciones recursivas clásicas
- **Conversión**: Transformación a formato D3 para visualización

### Complejidad Computacional
- **Inserción**: O(h) donde h es la altura del árbol
- **Búsqueda**: O(h) en promedio, O(n) en el peor caso
- **Recorridos**: O(n) para visitar todos los nodos
- **Espacio**: O(h) para la pila de recursión

## 🎮 Casos de Prueba Sugeridos

1. **Árbol Balanceado**: Inserta [10, 5, 15, 2, 7, 12, 20]
2. **Árbol Desbalanceado**: Inserta [1, 2, 3, 4, 5] (lista enlazada)
3. **Búsquedas**: Busca valores existentes (7) y no existentes (99)
4. **Duplicados**: Intenta insertar el mismo valor dos veces
5. **Árbol Vacío**: Busca en un árbol sin nodos

## 🌐 Visualización con react-d3-tree

### Características
- **SVG**: Renderizado vectorial escalable
- **Interactividad**: Zoom con rueda del mouse, arrastre para mover
- **Personalización**: Nodos circulares azules con texto blanco
- **Animaciones**: Transiciones suaves al actualizar
- **Responsive**: Se adapta automáticamente al contenedor

### Configuración
```javascript
<Tree
  data={treeData}                    // Datos del árbol en formato D3
  orientation="vertical"             // Árbol vertical (raíz arriba)
  pathFunc="diagonal"               // Conexiones diagonales
  nodeSize={{ x: 120, y: 80 }}     // Espaciado entre nodos
  zoom={0.8}                        // Zoom inicial
  scaleExtent={{ min: 0.1, max: 3 }} // Límites de zoom
/>
```

## 🔗 Referencias y Recursos

- [React D3 Tree Documentation](https://github.com/bkrem/react-d3-tree)
- [Binary Search Trees - GeeksforGeeks](https://www.geeksforgeeks.org/binary-search-tree-data-structure/)
- [Tree Traversal Algorithms](https://www.geeksforgeeks.org/tree-traversals-inorder-preorder-and-postorder/)
- [D3.js Tree Layouts](https://observablehq.com/@d3/tree)

---

**🎯 Challenge 14 Completado** - Implementación completa de árboles binarios con inserción, búsqueda, recorridos y visualización interactiva usando React y react-d3-tree.
