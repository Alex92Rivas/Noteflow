import * as Haptics from "expo-haptics";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import {
  createNoteTag,
  getNoteById,
  updateNote,
} from "../../services/api";
import type { ApiNote } from "../../services/api";

function getTagNames(tags: ApiNote["tags"]) {
  return tags.map((tag) => (typeof tag === "string" ? tag : tag.tag));
}

export default function EditIdeaScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [originalTags, setOriginalTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  async function loadIdea() {
    if (!id) return;

    try {
      setIsLoading(true);

      const data = await getNoteById(id);

      if (data.type !== "idea") {
        Alert.alert("Error", "El elemento encontrado no es una idea.");
        router.replace("/(tabs)/ideas");
        return;
      }

      const tagNames = getTagNames(data.tags);

      setTitle(data.title);
      setContent(data.content);
      setTags(tagNames.join(", "));
      setOriginalTags(tagNames);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "No se pudo cargar la idea desde la API.");
      router.replace("/(tabs)/ideas");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadIdea();
  }, [id]);

  const handleSave = async () => {
    if (!id) return;

    const cleanTitle = title.trim();
    const cleanContent = content.trim();
    const nextTags = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    if (!cleanTitle || !cleanContent) {
      Alert.alert(
        "Campos incompletos",
        "Escribe un título y una descripción para la idea."
      );
      return;
    }

    try {
      setIsSaving(true);

      await updateNote(id, {
        title: cleanTitle,
        content: cleanContent,
        color: "#f59e0b",
      });

      const tagsToCreate = nextTags.filter(
        (tag) => !originalTags.includes(tag)
      );

      for (const tag of tagsToCreate) {
        await createNoteTag(id, tag);
      }

      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

      router.replace(`/ideas/${id}`);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "No se pudo actualizar la idea en la API.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: "Cargando idea" }} />

        <View style={styles.centerContent}>
          <ActivityIndicator size="large" color="#f59e0b" />
          <Text style={styles.loadingText}>Cargando idea desde la API...</Text>
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: "padding", android: undefined })}
    >
      <Stack.Screen options={{ title: "Editar idea" }} />

      <View style={styles.content}>
        <Text style={styles.label}>Editar idea</Text>
        <Text style={styles.title}>Actualiza tu idea</Text>

        <Text style={styles.inputLabel}>Título</Text>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Ej: Buscador global"
          placeholderTextColor="#9ca3af"
          style={styles.input}
        />

        <Text style={styles.inputLabel}>Descripción</Text>
        <TextInput
          value={content}
          onChangeText={setContent}
          placeholder="Describe la idea..."
          placeholderTextColor="#9ca3af"
          style={[styles.input, styles.textArea]}
          multiline
          textAlignVertical="top"
        />

        <Text style={styles.inputLabel}>Etiquetas</Text>
        <TextInput
          value={tags}
          onChangeText={setTags}
          placeholder="Ej: ui, mejora, futuro"
          placeholderTextColor="#9ca3af"
          style={styles.input}
        />

        <Text style={styles.helperText}>
          Puedes añadir etiquetas nuevas separadas por comas. Las etiquetas antiguas se conservan.
        </Text>

        <Pressable
          style={[styles.saveButton, isSaving && styles.saveButtonDisabled]}
          onPress={handleSave}
          disabled={isSaving}
        >
          {isSaving ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={styles.saveButtonText}>Guardar cambios</Text>
          )}
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  content: {
    flex: 1,
    padding: 24,
    gap: 14,
  },
  centerContent: {
    flex: 1,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
    gap: 14,
  },
  loadingText: {
    fontSize: 16,
    color: "#4b5563",
  },
  label: {
    color: "#f59e0b",
    fontSize: 14,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  title: {
    color: "#111827",
    fontSize: 32,
    fontWeight: "800",
    marginBottom: 12,
  },
  inputLabel: {
    color: "#111827",
    fontSize: 15,
    fontWeight: "700",
  },
  input: {
    backgroundColor: "#ffffff",
    borderColor: "#e5e7eb",
    borderWidth: 1,
    borderRadius: 16,
    color: "#111827",
    fontSize: 16,
    padding: 16,
  },
  textArea: {
    minHeight: 170,
  },
  helperText: {
    color: "#6b7280",
    fontSize: 14,
    lineHeight: 20,
  },
  saveButton: {
    backgroundColor: "#f59e0b",
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 10,
  },
  saveButtonDisabled: {
    opacity: 0.7,
  },
  saveButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "800",
  },
});