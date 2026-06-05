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

import { darkTheme } from "../../constants/theme";
import { getNoteById, updateNote } from "../../services/api";
import type { ApiNote } from "../../services/api";

const theme = darkTheme;

export default function EditNoteScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [note, setNote] = useState<ApiNote | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function loadNote() {
      if (!id) return;

      try {
        setIsLoading(true);

        const apiNote = await getNoteById(id);

        if (apiNote.type !== "note") {
          setNote(null);
          Alert.alert("Error", "El elemento encontrado no es una nota.");
          return;
        }

        setNote(apiNote);
        setTitle(apiNote.title);
        setContent(apiNote.content);
      } catch (error) {
        console.error(error);
        Alert.alert(
          "Error al cargar",
          "No se ha podido cargar la nota desde el backend."
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadNote();
  }, [id]);

  const handleSave = async () => {
    if (!note) return;

    const cleanTitle = title.trim();
    const cleanContent = content.trim();

    if (!cleanTitle || !cleanContent) {
      Alert.alert(
        "Campos incompletos",
        "Escribe un título y un contenido para la nota."
      );
      return;
    }

    try {
      setIsSaving(true);

      const updatedNote = await updateNote(note.id, {
        title: cleanTitle,
        content: cleanContent,
      });

      setNote(updatedNote);

      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

      router.replace(`/(tabs)/notas/${updatedNote.id}`);
    } catch (error) {
      console.error(error);

      Alert.alert(
        "Error al guardar",
        "No se han podido guardar los cambios en el backend."
      );
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.centeredContainer}>
        <Stack.Screen options={{ title: "Cargando nota" }} />
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={styles.emptyTitle}>Cargando nota...</Text>
      </View>
    );
  }

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

          <Pressable
            style={[styles.saveButton, isSaving && styles.saveButtonDisabled]}
            onPress={handleSave}
            disabled={isSaving}
          >
            <Text style={styles.saveButtonText}>
              {isSaving ? "Guardando..." : "Guardar cambios"}
            </Text>
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
  saveButtonDisabled: {
    opacity: 0.7,
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