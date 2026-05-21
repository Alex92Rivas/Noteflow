import * as Haptics from "expo-haptics";
import { Stack, router } from "expo-router";
import { useState } from "react";
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

import { useIdeasStore } from "../store/ideasStore";

export default function NewIdeaScreen() {
  const addIdea = useIdeasStore((state) => state.addIdea);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");

  const handleSave = async () => {
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

    addIdea(cleanTitle, cleanContent, tagsList);

    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    router.replace("/(tabs)/ideas");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: "padding", android: undefined })}
    >
      <Stack.Screen options={{ title: "Nueva idea" }} />

      <View style={styles.content}>
        <Text style={styles.label}>Nueva idea</Text>
        <Text style={styles.title}>Guarda una idea rápida</Text>

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

        <Pressable style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Guardar idea</Text>
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
