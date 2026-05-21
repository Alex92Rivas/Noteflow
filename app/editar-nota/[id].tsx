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

import { darkTheme } from "../../constants/theme";
import { useNotesStore } from "../../store/notesStore";

const theme = darkTheme;

export default function EditNoteScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const note = useNotesStore((state) => state.getNoteById(id));
  const updateNote = useNotesStore((state) => state.updateNote);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, [note]);

  const handleSave = async () => {
    if (!note) return;

    const cleanTitle = title.trim();
    const cleanContent = content.trim();

    if (!cleanTitle || !cleanContent) {
      Alert.alert("Campos incompletos", "Escribe un título y un contenido para la nota.");
      return;
    }

    updateNote(note.id, cleanTitle, cleanContent);

    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    router.replace(`/(tabs)/notas/${note.id}`);
  };

  if (!note) {
    return (
      <View style={styles.centeredContainer}>
        <Stack.Screen options={{ title: "Nota no encontrada" }} />

        <Text style={styles.emptyTitle}>Nota no encontrada</Text>

        <Pressable
          style={styles.secondaryButton}
          onPress={() => router.replace("/(tabs)/notas")}
        >
          <Text style={styles.secondaryButtonText}>Volver a notas</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: "padding", android: undefined })}
    >
      <Stack.Screen options={{ title: "Editar nota" }} />

      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={styles.label}>Editar nota</Text>
          <Text style={styles.title}>Actualiza tu contenido</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.inputLabel}>Título</Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Título de la nota"
            placeholderTextColor={theme.colors.mutedText}
            style={styles.input}
          />

          <Text style={styles.inputLabel}>Contenido</Text>
          <TextInput
            value={content}
            onChangeText={setContent}
            placeholder="Contenido de la nota"
            placeholderTextColor={theme.colors.mutedText}
            style={[styles.input, styles.textArea]}
            multiline
            textAlignVertical="top"
          />

          <Pressable style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Guardar cambios</Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  contentContainer: {
    flex: 1,
    padding: theme.spacing.lg,
    gap: theme.spacing.lg,
  },
  header: {
    gap: theme.spacing.sm,
  },
  label: {
    color: theme.colors.primary,
    fontSize: theme.typography.small,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  title: {
    color: theme.colors.text,
    fontSize: theme.typography.title,
    fontWeight: "800",
  },
  form: {
    gap: theme.spacing.md,
  },
  inputLabel: {
    color: theme.colors.text,
    fontSize: theme.typography.small,
    fontWeight: "700",
  },
  input: {
    backgroundColor: theme.colors.card,
    borderColor: theme.colors.border,
    borderWidth: 1,
    borderRadius: 16,
    color: theme.colors.text,
    fontSize: theme.typography.body,
    padding: theme.spacing.md,
  },
  textArea: {
    minHeight: 180,
  },
  saveButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 16,
    paddingVertical: theme.spacing.md,
    alignItems: "center",
    marginTop: theme.spacing.sm,
  },
  saveButtonText: {
    color: "#ffffff",
    fontSize: theme.typography.body,
    fontWeight: "700",
  },
  centeredContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  emptyTitle: {
    color: theme.colors.text,
    fontSize: theme.typography.subtitle,
    fontWeight: "800",
    textAlign: "center",
  },
  secondaryButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 16,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
  },
  secondaryButtonText: {
    color: "#ffffff",
    fontSize: theme.typography.body,
    fontWeight: "700",
  },
});
