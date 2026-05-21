export const notes = [
  {
    id: "1",
    title: "Ideas para el proyecto NoteFlow",
    content:
      "Crear una app móvil sencilla para guardar notas, tareas e ideas rápidas usando React Native, Expo y TypeScript.",
    updatedAt: "21/05/2026",
  },
  {
    id: "2",
    title: "Pendiente de documentación",
    content:
      "Añadir en docs/idea.md la descripción del problema, público objetivo, funcionalidades principales y stack técnico utilizado.",
    updatedAt: "21/05/2026",
  },
  {
    id: "3",
    title: "Mejoras futuras",
    content:
      "Añadir buscador, filtros por tipo de contenido, modo oscuro y sincronización futura con backend.",
    updatedAt: "21/05/2026",
  },
];

export const checklists = [
  {
    id: "1",
    title: "Tareas de la Fase 6",
    updatedAt: "21/05/2026",
    items: [
      {
        id: "1",
        text: "Crear estructura de carpetas",
        completed: true,
      },
      {
        id: "2",
        text: "Configurar Expo Router",
        completed: true,
      },
      {
        id: "3",
        text: "Integrar FlashList",
        completed: false,
      },
    ],
  },
  {
    id: "2",
    title: "Documentación pendiente",
    updatedAt: "21/05/2026",
    items: [
      {
        id: "1",
        text: "Crear docs/idea.md",
        completed: false,
      },
      {
        id: "2",
        text: "Explicar el problema que resuelve la app",
        completed: false,
      },
      {
        id: "3",
        text: "Añadir stack técnico",
        completed: false,
      },
    ],
  },
  {
    id: "3",
    title: "Mejoras de interfaz",
    updatedAt: "21/05/2026",
    items: [
      {
        id: "1",
        text: "Mejorar colores",
        completed: false,
      },
      {
        id: "2",
        text: "Añadir modo oscuro",
        completed: false,
      },
      {
        id: "3",
        text: "Añadir animaciones suaves",
        completed: false,
      },
    ],
  },
];

export const ideas = [
  {
    id: "1",
    title: "Modo oscuro",
    content:
      "Añadir un modo oscuro para mejorar la experiencia de uso por la noche y practicar gestión de temas en React Native.",
    tags: ["ui", "tema", "mejora"],
    updatedAt: "21/05/2026",
  },
  {
    id: "2",
    title: "Buscador global",
    content:
      "Crear una barra de búsqueda que permita encontrar notas, tareas e ideas desde una sola pantalla.",
    tags: ["busqueda", "ux", "productividad"],
    updatedAt: "21/05/2026",
  },
  {
    id: "3",
    title: "Sincronización futura",
    content:
      "En una versión posterior se podría conectar NoteFlow con un backend para guardar los datos en la nube.",
    tags: ["backend", "api", "futuro"],
    updatedAt: "21/05/2026",
  },
];
