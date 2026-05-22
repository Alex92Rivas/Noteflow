# NoteFlow

NoteFlow es una aplicación móvil desarrollada con React Native y Expo como parte de la Fase 6 de las prácticas de Desarrollo de Aplicaciones Multiplataforma.

La aplicación permite gestionar tres tipos de contenido personal:

- Notas de texto.
- Listas de tareas.
- Ideas con etiquetas.

El proyecto utiliza navegación móvil, estado global, persistencia local y una interfaz visual adaptada a dispositivos móviles.

---

## Tecnologías utilizadas

- React Native
- Expo SDK 54
- TypeScript
- Expo Router
- Zustand
- AsyncStorage
- FlashList
- Zod
- Expo Haptics
- @expo/vector-icons

---

## Funcionalidades principales

### Notas

- Crear notas.
- Ver listado de notas.
- Consultar el detalle de una nota.
- Editar notas.
- Eliminar notas.
- Persistencia local con AsyncStorage.

### Tareas

- Crear listas de tareas.
- Ver listado de tareas.
- Consultar el detalle de una lista.
- Editar listas de tareas.
- Eliminar listas.
- Marcar y desmarcar tareas internas.
- Persistencia local con AsyncStorage.

### Ideas

- Crear ideas.
- Ver listado de ideas.
- Consultar el detalle de una idea.
- Editar ideas.
- Eliminar ideas.
- Añadir etiquetas.
- Persistencia local con AsyncStorage.

### Ajustes

- Consultar resumen de datos guardados.
- Eliminar todas las notas.
- Eliminar todas las tareas.
- Eliminar todas las ideas.
- Restablecer todos los datos de la aplicación.
- Confirmaciones mediante alertas.
- Vibración háptica con Expo Haptics.

---

## Navegación

La aplicación utiliza Expo Router.

La navegación principal está organizada en tabs inferiores:

- Notas
- Tareas
- Ideas
- Ajustes

También incluye rutas dinámicas para acceder al detalle de cada elemento:

- /notas/[id]
- /checklists/[id]
- /ideas/[id]

Y pantallas específicas para crear y editar contenido:

- /nueva-nota
- /nueva-tarea
- /nueva-idea
- /editar-nota/[id]
- /editar-tarea/[id]
- /editar-idea/[id]

---

## Estructura destacada del proyecto

```text
app/
  (tabs)/
    notas/
    checklists/
    ideas/
    ajustes.tsx
  nueva-nota.tsx
  nueva-tarea.tsx
  nueva-idea.tsx
  editar-nota/
  editar-tarea/
  editar-idea/

components/
  items/

constants/
  theme.ts
  mockData.ts

store/
  notesStore.ts
  checklistsStore.ts
  ideasStore.ts

types/
  index.ts

docs/
  fase-6-noteflow.md