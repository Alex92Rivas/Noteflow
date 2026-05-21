import { Stack, router, useLocalSearchParams } from "expo-router";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { darkTheme } from "../../../constants/theme";
import { useNotesStore } from "../../../store/notesStore";

const theme = darkTheme;

export default function NoteDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const note = useNotesStore((state) => state.getNoteById(id));
  const deleteNote = useNotesStore((state) => state.deleteNote);

  const handleDeleteNote = () => {
    if (!note) return;

    Alert.alert(
      "Eliminar nota",
      `¿Seguro que quieres eliminar "${note.title}"?`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => {
            deleteNote(note.id);
            router.replace("/(tabs)/notas");
          },
        },
      ]
    );
  };

  if (!note) {
    return (
      <View style={styles.centeredContainer}>
        <Stack.Screen options={{ title: "Nota no encontrada" }} />

        <Text style={styles.emptyTitle}>Nota no encontrada</Text>

        <Pressable
          style={styles.backButton}
          onPress={() => router.replace("/(tabs)/notas")}
        >
          <Text style={styles.backButtonText}>Volver a notas</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Stack.Screen options={{ title: note.title }} />

      <View style={styles.header}>
        <Text style={styles.label}>Nota</Text>
        <Text style={styles.title}>{note.title}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.content}>{note.content}</Text>
      </View>

      <View style={styles.metaCard}>
        <Text style={styles.metaText}>Actualizada: {note.updatedAt}</Text>
      </View>

      <Pressable
        style={styles.editButton}
        onPress={() => router.push(`/editar-nota/${note.id}`)}
      >
        <Text style={styles.editButtonText}>Editar nota</Text>
      </Pressable>

      <Pressable style={styles.deleteButton} onPress={handleDeleteNote}>
        <Text style={styles.deleteButtonText}>Eliminar nota</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  contentContainer: {
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
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: 20,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  content: {
    color: theme.colors.text,
    fontSize: theme.typography.body,
    lineHeight: 26,
  },
  metaCard: {
    backgroundColor: theme.colors.card,
    borderRadius: 16,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  metaText: {
    color: theme.colors.mutedText,
    fontSize: theme.typography.small,
  },
  editButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 16,
    paddingVertical: theme.spacing.md,
    alignItems: "center",
  },
  editButtonText: {
    color: "#ffffff",
    fontSize: theme.typography.body,
    fontWeight: "700",
  },
  deleteButton: {
    backgroundColor: theme.colors.danger,
    borderRadius: 16,
    paddingVertical: theme.spacing.md,
    alignItems: "center",
  },
  deleteButtonText: {
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
  backButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 16,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
  },
  backButtonText: {
    color: "#ffffff",
    fontSize: theme.typography.body,
    fontWeight: "700",
  },
});
