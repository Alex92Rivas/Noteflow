import { useCallback, useState } from "react";
import { useFocusEffect, useRouter } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { getNotes } from "../../../services/api";
import type { ApiNote } from "../../../services/api";

export default function NotesScreen() {
  const router = useRouter();

  const [notes, setNotes] = useState<ApiNote[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const textNotes = notes.filter((note) => note.type === "note");

  async function loadNotes() {
    try {
      setIsLoading(true);
      setErrorMessage(null);

      const data = await getNotes();
      setNotes(data);
    } catch (error) {
      console.error(error);
      setErrorMessage("No se pudieron cargar las notas desde la API.");
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      loadNotes();
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.kicker}>NoteFlow</Text>
          <Text style={styles.title}>Notas</Text>
          <Text style={styles.subtitle}>
            Listado principal de notas de texto desde la API.
          </Text>
        </View>

        <Pressable
          style={styles.addButton}
          onPress={() => router.push("/nueva-nota")}
        >
          <Ionicons name="add" size={26} color="#ffffff" />
        </Pressable>
      </View>

      <View style={styles.summaryCard}>
        <Text style={styles.summaryLabel}>Total de notas</Text>
        <Text style={styles.summaryValue}>{textNotes.length}</Text>
      </View>

      {isLoading ? (
        <View style={styles.centerCard}>
          <ActivityIndicator size="large" color="#8b5cf6" />
          <Text style={styles.centerText}>Cargando notas desde la API...</Text>
        </View>
      ) : errorMessage ? (
        <View style={styles.centerCard}>
          <Ionicons name="warning-outline" size={36} color="#8b5cf6" />
          <Text style={styles.errorTitle}>Error al cargar notas</Text>
          <Text style={styles.centerText}>{errorMessage}</Text>

          <Pressable style={styles.retryButton} onPress={loadNotes}>
            <Text style={styles.retryButtonText}>Reintentar</Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          data={textNotes}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <Pressable
              style={styles.noteCard}
              onPress={() => router.push(`/notas/${item.id}`)}
            >
              <Text style={styles.noteTitle}>{item.title}</Text>

              <Text style={styles.noteContent} numberOfLines={3}>
                {item.content}
              </Text>

              <Text style={styles.noteDate}>
                Actualizada: {new Date(item.updated_at).toLocaleDateString()}
              </Text>
            </Pressable>
          )}
          ListEmptyComponent={
            <View style={styles.centerCard}>
              <Ionicons
                name="document-text-outline"
                size={36}
                color="#8b5cf6"
              />
              <Text style={styles.errorTitle}>Todavía no tienes notas</Text>
              <Text style={styles.centerText}>
                Cuando crees notas en la API aparecerán aquí.
              </Text>
            </View>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#0f172a",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
    marginBottom: 20,
  },
  headerText: {
    flex: 1,
  },
  kicker: {
    color: "#8b5cf6",
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  title: {
    fontSize: 36,
    fontWeight: "900",
    color: "#f8fafc",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 22,
    color: "#94a3b8",
  },
  addButton: {
    width: 54,
    height: 54,
    borderRadius: 18,
    backgroundColor: "#8b5cf6",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },
  summaryCard: {
    backgroundColor: "#1e293b",
    borderRadius: 22,
    padding: 18,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#334155",
  },
  summaryLabel: {
    color: "#94a3b8",
    fontSize: 15,
    marginBottom: 4,
  },
  summaryValue: {
    color: "#f8fafc",
    fontSize: 30,
    fontWeight: "900",
  },
  listContent: {
    paddingBottom: 40,
  },
  noteCard: {
    backgroundColor: "#1e293b",
    borderRadius: 22,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#334155",
  },
  noteTitle: {
    color: "#f8fafc",
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 8,
  },
  noteContent: {
    color: "#cbd5e1",
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 12,
  },
  noteDate: {
    color: "#64748b",
    fontSize: 13,
  },
  centerCard: {
    backgroundColor: "#1e293b",
    borderRadius: 22,
    padding: 24,
    borderWidth: 1,
    borderColor: "#334155",
    alignItems: "center",
    gap: 12,
  },
  centerText: {
    color: "#94a3b8",
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
  },
  errorTitle: {
    color: "#f8fafc",
    fontSize: 20,
    fontWeight: "800",
    textAlign: "center",
  },
  retryButton: {
    backgroundColor: "#8b5cf6",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 14,
    marginTop: 8,
  },
  retryButtonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "800",
  },
});