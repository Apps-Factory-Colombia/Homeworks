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

# 🌲 Challenge 15 - Árboles N-arios con Sistema de Menús

Este proyecto implementa un **sistema de menús jerárquicos** usando **árboles N-arios** en React según los requisitos del Challenge 15.

## ✅ Funcionalidades Implementadas

### Challenge 15 - Árboles N-arios y Sidebar de Menús
1. **🌲 Árbol N-ario Completo** - Estructura donde cada nodo puede tener múltiples hijos
2. **📋 Sistema de Menús Jerárquicos** - Menús y submenús organizados en estructura de árbol
3. **🎯 Navegación Lateral (Sidebar)** - Interfaz lateral navegable que refleja la estructura del árbol
4. **🔗 Enlaces y Componentes** - Cada elemento tiene título, enlace y componente asociado
5. **📂 Expansión/Colapso** - Submenús expandibles y colapsables interactivamente
6. **🧭 Breadcrumb de Navegación** - Muestra el camino actual en el árbol
7. **📊 Información en Tiempo Real** - Estadísticas del árbol actualizadas dinámicamente

## 🎯 Cómo Probar el Challenge 15

### 1. Explorar el Menú Lateral
- **Navegación**: Haz clic en cualquier elemento del sidebar para navegar
- **Submenús**: Usa las flechas ▶/▼ para expandir/colapsar submenús
- **Jerarquía**: Observa la indentación que muestra los niveles del árbol
- **Indicadores**: Los elementos con 🔗 tienen enlaces configurados

### 2. Probar la Funcionalidad del Árbol N-ario
- **Dashboard**: Nodo raíz con estadísticas y métricas
- **Perfil**: Información del usuario
- **Mensajes**: Con submenús (Bandeja de Entrada, Notificaciones)
- **Configuración**: Con submenús (Cuenta, Seguridad y Privacidad)
- **Ayuda**: Con submenús (FAQ, Contacto, Tutorial)

### 3. Usar los Controles de Navegación
- **📂 Expandir Todo**: Abre todos los submenús del árbol
- **📁 Colapsar Todo**: Cierra todos los submenús (mantiene raíz abierta)
- **Breadcrumb**: Ve el camino actual desde la raíz hasta el elemento seleccionado

## 🌟 Características del Árbol N-ario

### Diferencias con Árboles Binarios
- **Múltiples Hijos**: Cada nodo puede tener cualquier cantidad de hijos (no solo 2)
- **Flexibilidad**: Perfecto para estructuras jerárquicas como menús
- **Recorridos**: Implementa DFS (Depth-First) y BFS (Breadth-First)
- **Búsquedas**: Por ID, por título, y caminos completos

### Estructura del Menú Implementada
```
Dashboard (📊)
├── Perfil (👤)
├── Mensajes (💬)
│   ├── Bandeja de Entrada (📥)
│   └── Notificaciones (🔔)
├── Configuración (⚙️)
│   ├── Cuenta (👤)
│   └── Seguridad y Privacidad (🔒)
└── Ayuda (❓)
    ├── Preguntas Frecuentes (📋)
    ├── Contacto (📞)
    └── Tutorial (🎓)
```

## 🔧 Estructura del Proyecto Challenge 15

```
src/
├── utils/
│   └── NaryTree.js           # Clase del árbol N-ario con MenuNode
├── components/
│   ├── Sidebar.jsx           # Componente del menú lateral
│   └── MenuComponents.jsx    # Componentes de cada sección del menú
├── App.jsx                   # Aplicación principal con navegación
└── main.jsx                  # Punto de entrada
```

## 📊 Algoritmos Implementados

### Operaciones del Árbol N-ario
- **Inserción**: O(1) - Agregar hijo a nodo específico
- **Búsqueda por ID**: O(1) - Usando Map para acceso directo
- **Búsqueda por título**: O(n) - Recorrido lineal de todos los nodos
- **DFS/BFS**: O(n) - Visita todos los nodos una vez
- **Nodos visibles**: O(n) - En el peor caso si todos están expandidos

### Funcionalidades del Sidebar
- **Posición Fija**: Sidebar fijo de 300px de ancho
- **Scroll Independiente**: Contenido principal y sidebar se desplazan independientemente
- **Indicadores Visuales**: Estados hover, selección y expansión
- **Indentación Dinámica**: Refleja la profundidad del árbol visualmente

## 💡 Conceptos Avanzados

### Estructuras de Datos
- **Árbol N-ario**: Cada nodo puede tener múltiples hijos
- **Map para indexación**: Búsqueda rápida por ID
- **Referencias circulares**: Nodos conocen a sus padres e hijos
- **Estados de navegación**: Expansión y selección persistentes

### Patrones de Diseño
- **Component Pattern**: Cada menú tiene su componente React
- **Observer Pattern**: Actualización automática de estadísticas
- **Factory Pattern**: Creación dinámica de nodos del menú

---

**🎯 Challenge 15 Completado** - Implementación completa de árboles N-arios con sistema de menús jerárquicos, sidebar navegable y componentes intercambiables en React.

# 🎨 Challenge 17 - SASS + CSS Modules

Este proyecto implementa el **Challenge 17** que consiste en tomar un challenge previo y aplicar **SASS con CSS Modules** para crear un diseño creativo y moderno. Se utilizó el Challenge 16 (grafos) como base.

## ✅ Funcionalidades Implementadas

### Challenge 17 - SASS con CSS Modules
1. **🎨 Variables SASS** - Sistema completo de variables para colores, espaciado, tipografía y más
2. **🔧 Mixins Avanzados** - Mixins para botones, formularios, animaciones, responsive design
3. **📦 CSS Modules** - Estilos encapsulados y reutilizables
4. **🌟 Efectos Visuales** - Glass morphism, neumorphism, gradientes y animaciones
5. **📱 Responsive Design** - Breakpoints y mixins para diferentes dispositivos
6. **🎯 Funciones SASS** - Funciones para cálculos, colores y utilidades
7. **🔄 Loops y Placeholders** - Generación automática de clases utilitarias
8. **🎭 Animaciones CSS** - Keyframes personalizados y efectos de transición

### Características SASS Utilizadas

#### 🎨 Variables y Maps
```scss
$primary-colors: (
  'main': #6366f1,
  'light': #818cf8,
  'dark': #4338ca,
  'ultra-light': #e0e7ff
);

$spacing: (
  'xs': 0.25rem,
  'sm': 0.5rem,
  'md': 1rem,
  'lg': 1.5rem,
  'xl': 2rem
);
```

#### 🔧 Mixins Avanzados
```scss
@mixin button-gradient($gradient-name) {
  @include button-base;
  background: gradient($gradient-name);
  color: white;
  
  &:hover:not(:disabled) {
    transform: translateY(-2px) scale(1.02);
    box-shadow: shadow('lg');
  }
}

@mixin glass-effect($opacity: 0.1) {
  background: alpha(white, $opacity);
  backdrop-filter: blur(20px);
  border: 1px solid alpha(white, 0.2);
  box-shadow: 0 8px 32px 0 alpha(black, 0.37);
}
```

#### 🎯 Funciones Personalizadas
```scss
@function primary($variant: 'main') {
  @return color($primary-colors, $variant);
}

@function spacing($size: 'md') {
  @return map-get($spacing, $size);
}

@function fluid-spacing($min-size, $max-size, $min-width: 320px, $max-width: 1200px) {
  $slope: ($max-size - $min-size) / ($max-width - $min-width);
  $intersection: $min-size - $slope * $min-width;
  @return clamp(#{$min-size}rem, #{$intersection}rem + #{$slope * 100}vw, #{$max-size}rem);
}
```

#### 🔄 Loops para Utilidades
```scss
@each $name, $value in $spacing {
  .m-#{$name} { margin: $value !important; }
  .p-#{$name} { padding: $value !important; }
}

@each $name, $value in $font-sizes {
  .text-#{$name} { font-size: $value !important; }
}
```

#### 📦 Placeholders Reutilizables
```scss
%reset-button {
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  font: inherit;
  color: inherit;
  cursor: pointer;
}

%flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
```

### Efectos Visuales Implementados

#### 🌟 Glass Morphism
- Fondos translúcidos con `backdrop-filter: blur()`
- Bordes sutiles con transparencia
- Efectos de profundidad y capas

#### 🎭 Neumorphism
- Sombras internas y externas
- Efectos de relieve y hundimiento
- Diferentes niveles de profundidad

#### 🌈 Gradientes Dinámicos
- Gradientes personalizados para diferentes elementos
- Efectos de arcoíris y cristal
- Transiciones suaves entre colores

#### ⚡ Animaciones Avanzadas
- Fade in, slide in, bounce in
- Efectos de hover y focus
- Animaciones de carga y pulso
- Keyframes personalizados

### Responsive Design

#### 📱 Breakpoints
```scss
$breakpoints: (
  'sm': 640px,
  'md': 768px,
  'lg': 1024px,
  'xl': 1280px,
  '2xl': 1536px
);
```

#### 🔧 Mixins Responsivos
```scss
@mixin respond-to($breakpoint) {
  $bp: map-get($breakpoints, $breakpoint);
  @if $bp {
    @media (min-width: $bp) {
      @content;
    }
  }
}
```

## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js 16+
- npm o yarn

### Instalación
```bash
# Clonar el repositorio
git clone <repository-url>
cd my-vite-app

# Instalar dependencias
npm install

# Instalar SASS
npm install -D sass

# Instalar dependencias del grafo
npm install react-d3-graph d3 --legacy-peer-deps
```

### Ejecutar la aplicación
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 📁 Estructura del Proyecto

```
src/
├── styles/
│   ├── variables.scss      # Variables, funciones y configuración
│   ├── mixins.scss         # Mixins, placeholders y utilidades
│   └── App.module.scss     # Estilos del componente principal
├── utils/
│   └── Graph.js           # Lógica del grafo (Challenge 16)
├── App.jsx                # Componente principal con CSS Modules
└── main.jsx              # Punto de entrada
```

## 🎨 Características del Diseño

### 🌟 Efectos Visuales
- **Glass Morphism**: Paneles translúcidos con blur
- **Neumorphism**: Efectos de relieve en tarjetas
- **Gradientes**: Fondos dinámicos y coloridos
- **Animaciones**: Transiciones suaves y efectos hover

### 📱 Responsive
- **Mobile First**: Diseño optimizado para móviles
- **Breakpoints**: Adaptación a diferentes tamaños
- **Grid Flexible**: Layout que se adapta automáticamente

### 🎯 Interactividad
- **Hover Effects**: Efectos al pasar el mouse
- **Focus States**: Estados de foco accesibles
- **Loading States**: Animaciones de carga
- **Micro-interactions**: Pequeñas animaciones que mejoran UX

## 🔧 Tecnologías Utilizadas

- **React 18** - Framework de UI
- **Vite** - Build tool y dev server
- **SASS** - Preprocesador CSS
- **CSS Modules** - Estilos encapsulados
- **react-d3-graph** - Visualización de grafos
- **D3.js** - Manipulación de datos

## 📊 Conceptos SASS Demostrados

### Variables y Maps ✅
- Paletas de colores organizadas
- Sistemas de espaciado consistentes
- Configuración de tipografía

### Mixins ✅
- Mixins para componentes reutilizables
- Mixins para responsive design
- Mixins para animaciones

### Funciones ✅
- Funciones para acceso a variables
- Cálculos dinámicos
- Utilidades de color

### Loops ✅
- Generación automática de clases
- Iteración sobre maps
- Creación de utilidades

### Placeholders ✅
- Estilos base reutilizables
- Patrones comunes
- Optimización de CSS

### Anidación ✅
- Estructura jerárquica
- Pseudo-elementos y pseudo-clases
- Modificadores BEM

## 🎯 Mejoras Implementadas

1. **Sistema de Design Tokens** - Variables organizadas por categorías
2. **Arquitectura Modular** - Separación clara de responsabilidades
3. **Performance** - CSS optimizado y minificado
4. **Accesibilidad** - Estados de foco y contraste adecuado
5. **Mantenibilidad** - Código SASS bien estructurado y documentado

## 🌟 Características Destacadas

- **Creatividad**: Diseño único con efectos visuales modernos
- **Funcionalidad**: Mantiene toda la funcionalidad del Challenge 16
- **Performance**: CSS optimizado con SASS
- **Responsive**: Adaptable a todos los dispositivos
- **Accesible**: Cumple estándares de accesibilidad web

---

**Desarrollado con ❤️ usando SASS y CSS Modules**
