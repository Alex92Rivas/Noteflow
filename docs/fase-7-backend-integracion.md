# Fase 7 - Backend e integración móvil de NoteFlow

## Descripción general

En esta fase se ha ampliado el proyecto NoteFlow incorporando un backend propio desplegado en producción y conectando la aplicación móvil React Native/Expo con una base de datos real.

Hasta la Fase 6, NoteFlow funcionaba con estado local usando Zustand y persistencia con AsyncStorage. En la Fase 7 se ha añadido una API REST conectada a PostgreSQL mediante Neon y desplegada en Vercel. La app móvil consume esta API para trabajar con datos reales en la nube.

## Repositorios

### Aplicación móvil

Repositorio GitHub:

https://github.com/Alex92Rivas/Noteflow

Ruta local:

C:\Users\Alejandro\Desktop\noteflow

### Backend API

Repositorio GitHub:

https://github.com/Alex92Rivas/noteflow-api

Ruta local:

C:\Users\Alejandro\Desktop\noteflow-api

## Backend desplegado

URL pública del backend:

https://noteflow-api-pink.vercel.app

API base usada por la app móvil:

https://noteflow-api-pink.vercel.app/api

## Tecnologías usadas

### Aplicación móvil

- React Native
- Expo
- Expo Router
- TypeScript
- FlashList
- Expo Haptics
- Ionicons
- Fetch API para comunicación HTTP

### Backend

- Next.js
- TypeScript
- API Routes
- PostgreSQL
- Neon
- Vercel

## Base de datos

La base de datos está alojada en Neon y utiliza PostgreSQL.

Se han usado tres entidades principales:

- Notas
- Items de checklist
- Etiquetas de ideas

La entidad principal es `notes`, que permite almacenar notas normales, checklists e ideas mediante el campo `type`.

Tipos usados:

- `note`
- `checklist`
- `idea`

## Endpoints principales

### Notas

Obtener todas las notas:

GET /api/notes

Crear una nota:

POST /api/notes

Obtener una nota por id:

GET /api/notes/:id

Actualizar una nota:

PATCH /api/notes/:id

Eliminar una nota:

DELETE /api/notes/:id

### Items de checklist

Crear item de checklist:

POST /api/notes/:id/items

Actualizar item de checklist:

PATCH /api/notes/:id/items/:itemId

### Etiquetas de ideas

Crear etiqueta para una idea:

POST /api/notes/:id/tags

## Integración móvil-backend

La app móvil se conecta al backend mediante el archivo:

services/api.ts

En este archivo se define la URL base de la API:

https://noteflow-api-pink.vercel.app/api

También se han definido los tipos principales usados por la app:

- ApiNote
- ApiNoteType
- ApiChecklistItem
- ApiNoteTag

Y las funciones para comunicarse con el backend:

- getNotes
- getNoteById
- createNote
- updateNote
- deleteNote
- createChecklistItem
- updateChecklistItem
- createNoteTag

## Funcionalidades conectadas a la API

### Notas

Se ha conectado el módulo de Notas con el backend.

Funcionalidades completadas:

- Listar notas desde la API.
- Crear notas en Neon a través del backend.
- Ver detalle de una nota.
- Editar notas.
- Eliminar notas.

### Checklists / Tareas

Se ha conectado el módulo de Tareas con el backend.

Funcionalidades completadas:

- Listar checklists desde la API.
- Crear checklists.
- Crear items internos de checklist.
- Ver detalle de una checklist.
- Marcar y desmarcar items.
- Eliminar checklists.

### Ideas

Se ha conectado el módulo de Ideas con el backend.

Funcionalidades completadas:

- Listar ideas desde la API.
- Crear ideas.
- Añadir etiquetas.
- Ver detalle de una idea.
- Editar ideas.
- Eliminar ideas.

También se corrigió un bug en el listado de Ideas: al borrar una idea desde su pantalla de detalle, la app volvía al listado pero la idea seguía apareciendo hasta refrescar manualmente. Se solucionó pasando parámetros de refresco al volver al listado y usando `listVersion`, `deletedId`, `refresh`, `key` y `extraData` en FlashList.

Archivos principales modificados para Ideas:

- app/(tabs)/ideas/index.tsx
- app/(tabs)/ideas/[id].tsx
- app/editar-idea/[id].tsx
- app/nueva-idea.tsx

## Pruebas realizadas

Se han realizado pruebas manuales desde la app móvil usando Expo Go.

Pruebas confirmadas:

- Crear una nota y comprobar que aparece en el listado.
- Editar una nota.
- Eliminar una nota.
- Crear una checklist con varios items.
- Marcar y desmarcar items de una checklist.
- Eliminar una checklist.
- Crear una idea con etiquetas.
- Editar una idea.
- Eliminar una idea y comprobar que desaparece inmediatamente del listado.
- Comprobar que los datos se leen desde el backend desplegado en Vercel y la base de datos Neon.

También se ha ejecutado la comprobación de TypeScript:

npx tsc --noEmit

Resultado:

Sin errores.

## Commits destacados

Commits realizados en la integración móvil:

- Add API service for NoteFlow backend
- Load notes from backend API
- Load checklists from backend API
- Load ideas from backend API
- Create notes through backend API
- Complete ideas CRUD with backend API

Último commit confirmado:

06be6c6 Complete ideas CRUD with backend API

## Estado final

La Fase 7 deja NoteFlow convertido en una aplicación móvil conectada a un backend real en producción.

El backend está desplegado en Vercel, conectado a una base de datos PostgreSQL en Neon, y la app móvil consume la API para gestionar notas, tareas e ideas.

Funcionalidades finales completadas:

- Backend API desplegado.
- Base de datos Neon conectada.
- App móvil conectada al backend.
- CRUD completo de Notas.
- CRUD principal de Checklists.
- Marcado y desmarcado de items.
- CRUD completo de Ideas.
- Etiquetas en Ideas.
- Pruebas manuales realizadas en Expo Go.
- TypeScript limpio.
- Cambios subidos a GitHub.

## Conclusión

La Fase 7 se considera completada a nivel funcional. NoteFlow ya no depende únicamente de almacenamiento local, sino que trabaja contra una API REST propia conectada a una base de datos real y desplegada en producción.
