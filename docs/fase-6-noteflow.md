# Fase 6 - Proyecto móvil NoteFlow

## 1. Introducción

NoteFlow es una aplicación móvil desarrollada como parte de la Fase 6 de las prácticas de Desarrollo de Aplicaciones Multiplataforma.

El objetivo principal del proyecto es crear una app funcional con React Native y Expo que permita gestionar diferentes tipos de contenido personal desde un dispositivo móvil.

La aplicación permite crear, consultar, editar y eliminar tres tipos principales de información:

- Notas de texto.
- Listas de tareas.
- Ideas con etiquetas.

---

## 2. Tecnologías utilizadas

Para el desarrollo de NoteFlow se han utilizado las siguientes tecnologías:

- React Native.
- Expo SDK 54.
- TypeScript.
- Expo Router.
- Zustand.
- AsyncStorage.
- FlashList.
- Zod.
- Expo Haptics.
- @expo/vector-icons.

---

## 3. Objetivo de la aplicación

El objetivo de NoteFlow es ofrecer una herramienta sencilla para organizar información personal en tres categorías diferenciadas.

### Notas

Permiten guardar contenido textual, apuntes rápidos o recordatorios.

### Tareas

Permiten crear listas con varios elementos, marcar tareas como completadas y consultar el progreso.

### Ideas

Permiten guardar conceptos o inspiraciones acompañadas de etiquetas.

---

## 4. Navegación

La navegación principal se organiza mediante tabs inferiores:

- Notas.
- Tareas.
- Ideas.
- Ajustes.

Además, se han creado rutas dinámicas para acceder al detalle de cada elemento:

- /notas/[id]
- /checklists/[id]
- /ideas/[id]

También existen pantallas específicas para crear y editar contenido:

- /nueva-nota
- /nueva-tarea
- /nueva-idea
- /editar-nota/[id]
- /editar-tarea/[id]
- /editar-idea/[id]

---

## 5. Gestión de estado

La gestión del estado se realiza con Zustand.

Se han creado stores independientes para cada entidad principal:

- store/notesStore.ts
- store/checklistsStore.ts
- store/ideasStore.ts

Cada store contiene las acciones necesarias para crear, actualizar, eliminar y limpiar datos.

---

## 6. Persistencia local

La persistencia de datos se realiza mediante AsyncStorage.

Esto permite que los datos creados por el usuario permanezcan guardados aunque la aplicación se cierre o se recargue desde Expo Go.

Se ha comprobado que los datos persisten correctamente al recargar la aplicación con la tecla r desde Metro Bundler.

---

## 7. Funcionalidades implementadas

### Notas

- Crear nota.
- Ver listado de notas.
- Ver detalle de una nota.
- Editar nota.
- Eliminar nota.
- Persistencia local.

### Tareas

- Crear lista de tareas.
- Ver listado de tareas.
- Ver detalle de una lista.
- Editar lista de tareas.
- Eliminar lista de tareas.
- Marcar y desmarcar tareas internas.
- Persistencia local.

### Ideas

- Crear idea.
- Ver listado de ideas.
- Ver detalle de una idea.
- Editar idea.
- Eliminar idea.
- Añadir etiquetas.
- Persistencia local.

### Ajustes

- Ver resumen de datos guardados.
- Eliminar todas las notas.
- Eliminar todas las tareas.
- Eliminar todas las ideas.
- Restablecer todos los datos de la app.
- Confirmaciones mediante alertas.
- Vibración háptica con Expo Haptics.

---

## 8. Interfaz de usuario

La interfaz se ha diseñado con una estética oscura y consistente entre las diferentes pantallas.

Se han aplicado mejoras visuales en:

- Pantalla de Notas.
- Pantalla de Tareas.
- Pantalla de Ideas.
- Pantalla de Ajustes.
- Barra inferior de navegación.
- Separación inferior mediante Safe Area para evitar solapamiento con los botones del sistema Android.

También se han incluido estados vacíos para mejorar la experiencia cuando no hay datos creados.

---

## 9. Comprobaciones realizadas

Durante el desarrollo se ha comprobado continuamente el proyecto con TypeScript mediante el comando:

npx tsc --noEmit

El proyecto se encuentra sin errores de TypeScript.

También se ha probado en Expo Go, confirmando:

- Navegación correcta.
- CRUD completo.
- Persistencia con AsyncStorage.
- Funcionamiento de tabs.
- Rutas dinámicas.
- Limpieza de datos desde Ajustes.
- Vibración con Expo Haptics.

---

## 10. Conclusión

NoteFlow cumple los objetivos principales de la Fase 6 al implementar una aplicación móvil funcional con React Native, Expo y TypeScript.

El proyecto demuestra el uso de navegación móvil, estado global, persistencia local, listas optimizadas, rutas dinámicas, diseño visual consistente e integración con funcionalidades nativas mediante Expo Haptics.

La aplicación está preparada para ser revisada, documentada y presentada como entrega final de la fase.