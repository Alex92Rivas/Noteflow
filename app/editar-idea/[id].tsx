import * as Haptics from "expo-haptics";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { useIdeasStore } from "../../store/ideasStore";

export default function EditIdeaScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const idea = useIdeasStore((state) => state.getIdeaById(id));
  const updateIdea = useIdeasStore((state) => state.updateIdea);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");

  useEffect(() => {
    if (idea) {
      setTitle(idea.title);
      setContent(idea.content);
      setTags(idea.tags.join(", "));
    }
  }, [idea]);

  const handleSave = async () => {
    if (!idea) return;

    const cleanTitle = title.trim();
    const cleanContent = content.trim();
    const tagsList = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    if (!cleanTitle || !cleanContent) {
      Alert.alert("Campos incompletos", "Escribe un título y una descripción para la idea.");
      return;
    }

    updateIdea(idea.id, cleanTitle, cleanContent, tagsList);

    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    router.replace(`/ideas/${idea.id}`);
  };

  if (!idea) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: "Idea no encontrada" }} />

        <Text style={styles.title}>Idea no encontrada</Text>

        <Pressable
          style={styles.saveButton}
          onPress={() => router.replace("/(tabs)/ideas")}
        >
          <Text style={styles.saveButtonText}>Volver a ideas</Text>
        </Pressable>
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
        <Text style={styles.title}>Actualiza tu inspiración</Text>

        <Text style={styles.inputLabel}>Título</Text>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Título de la idea"
          placeholderTextColor="#9ca3af"
          style={styles.input}
        />

        <Text style={styles.inputLabel}>Descripción</Text>
        <TextInput
          value={content}
          onChangeText={setContent}
          placeholder="Descripción de la idea"
          placeholderTextColor="#9ca3af"
          style={[styles.input, styles.textArea]}
          multiline
          textAlignVertical="top"
        />

        <Text style={styles.inputLabel}>Etiquetas</Text>
        <TextInput
          value={tags}
          onChangeText={setTags}
          placeholder="Ej: ui, futuro, mejora"
          placeholderTextColor="#9ca3af"
          style={styles.input}
        />

        <Pressable style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Guardar cambios</Text>
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
  saveButton: {
    backgroundColor: "#f59e0b",
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 10,
  },
  saveButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "800",
  },
});
