const API_BASE_URL = "https://noteflow-api-pink.vercel.app/api";

export type ApiNoteType = "note" | "checklist" | "idea";

export type ApiChecklistItem = {
  id: string;
  note_id: string;
  text: string;
  is_completed: boolean;
};

export type ApiNoteTag = {
  id?: string;
  note_id?: string;
  tag: string;
};

export type ApiNote = {
  id: string;
  title: string;
  content: string;
  type: ApiNoteType;
  color: string | null;
  created_at: string;
  updated_at: string;
  items: ApiChecklistItem[];
  tags: ApiNoteTag[] | string[];
};

type CreateNoteInput = {
  title: string;
  content: string;
  type: ApiNoteType;
  color?: string;
};

type UpdateNoteInput = {
  title?: string;
  content?: string;
  color?: string;
};

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${url}`, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Error en la petición a la API");
  }

  return response.json() as Promise<T>;
}

export async function getNotes() {
  return request<ApiNote[]>("/notes");
}

export async function getNoteById(id: string) {
  return request<ApiNote>(`/notes/${id}`);
}

export async function createNote(data: CreateNoteInput) {
  return request<ApiNote>("/notes", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateNote(id: string, data: UpdateNoteInput) {
  return request<ApiNote>(`/notes/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export async function deleteNote(id: string) {
  return request<{ message: string }>(`/notes/${id}`, {
    method: "DELETE",
  });
}

export async function getChecklistItems(noteId: string) {
  return request<ApiChecklistItem[]>(`/notes/${noteId}/items`);
}

export async function createChecklistItem(noteId: string, text: string) {
  return request<ApiChecklistItem>(`/notes/${noteId}/items`, {
    method: "POST",
    body: JSON.stringify({ text }),
  });
}

export async function getNoteTags(noteId: string) {
  return request<ApiNoteTag[]>(`/notes/${noteId}/tags`);
}

export async function createNoteTag(noteId: string, tag: string) {
  return request<ApiNoteTag>(`/notes/${noteId}/tags`, {
    method: "POST",
    body: JSON.stringify({ tag }),
  });
}