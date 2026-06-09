import * as Haptics from "expo-haptics";
import { Ionicons } from "@expo/vector-icons";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { deleteNote, getNoteById } from "../../../services/api";
import type { ApiNote } from "../../../services/api";

function getTagNames(tags: ApiNote["tags"]) {
  return tags.map((tag) => (typeof tag === "string" ? tag : tag.tag));
}

export default function IdeaDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [idea, setIdea] = useState<ApiNote | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  async function loadIdea() {
    if (!id) return;

    try {
      setIsLoading(true);
      setErrorMessage(null);

      const data = await getNoteById(id);

      if (data.type !== "idea") {
        setIdea(null);
        setErrorMessage("El elemento encontrado no es una idea.");
        return;
      }

      setIdea(data);
    } catch (error) {
      console.error(error);
      setIdea(null);
      setErrorMessage("No se pudo cargar la idea desde la API.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadIdea();
  }, [id]);

  const handleDelete = () => {
    if (!idea || isDeleting) return;

    Alert.alert(
      "Eliminar idea",
      `¿Seguro que quieres eliminar "${idea.title}"?`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              setIsDeleting(true);

              await deleteNote(idea.id);

              await Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Success
              );

              router.replace("/(tabs)/ideas");
            } catch (error) {
              console.error(error);
              Alert.alert("Error", String(error));
            } finally {
              setIsDeleting(false);
            }
          },
        },
      ]
    );
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: "Cargando idea" }} />

        <View style={styles.centerContent}>
          <ActivityIndicator size="large" color="#f59e0b" />
          <Text style={styles.subtitle}>Cargando idea desde la API...</Text>
        </View>
      </View>
    );
  }

  if (!idea || errorMessage) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: "Idea no encontrada" }} />

        <View style={styles.content}>
          <Text style={styles.title}>Idea no encontrada</Text>
          <Text style={styles.subtitle}>
            {errorMessage ?? `No existe una idea con el ID ${id}.`}
          </Text>

          <Pressable
            style={styles.editButton}
            onPress={() => router.replace("/(tabs)/ideas")}
          >
            <Text style={styles.buttonText}>Volver a ideas</Text>
          </Pressable>

          <Pressable style={styles.secondaryButton} onPress={loadIdea}>
            <Text style={styles.secondaryButtonText}>Reintentar</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  const tags = getTagNames(idea.tags);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Stack.Screen options={{ title: "Detalle de idea" }} />

      <View style={styles.iconBox}>
        <Ionicons name="bulb-outline" size={34} color="#f59e0b" />
      </View>

      <Text style={styles.title}>{idea.title}</Text>

      <Text style={styles.date}>
        Actualizada: {new Date(idea.updated_at).toLocaleString()}
      </Text>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Descripción</Text>
        <Text style={styles.body}>{idea.content}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Etiquetas</Text>

        {tags.length > 0 ? (
          <View style={styles.tagsContainer}>
            {tags.map((tag) => (
              <View key={tag} style={styles.tag}>
                <Text style={styles.tagText}>#{tag}</Text>
              </View>
            ))}
          </View>
        ) : (
          <Text style={styles.body}>Sin etiquetas</Text>
        )}
      </View>

      <Pressable
        style={styles.editButton}
        onPress={() => router.push(`/editar-idea/${idea.id}`)}
      >
        <Text style={styles.buttonText}>Editar idea</Text>
      </Pressable>

      <Pressable
        style={[styles.deleteButton, isDeleting && styles.deleteButtonDisabled]}
        onPress={handleDelete}
        disabled={isDeleting}
      >
        {isDeleting ? (
          <ActivityIndicator color="#ffffff" />
        ) : (
          <Text style={styles.buttonText}>Eliminar idea</Text>
        )}
      </Pressable>

      <View style={styles.infoBox}>
        <Text style={styles.infoLabel}>ID interno</Text>
        <Text style={styles.infoValue}>{idea.id}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  content: {
    padding: 24,
    paddingBottom: 40,
  },
  centerContent: {
    flex: 1,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
    gap: 14,
  },
  iconBox: {
    width: 70,
    height: 70,
    borderRadius: 22,
    backgroundColor: "#fffbeb",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 34,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: "#4b5563",
    marginBottom: 20,
  },
  date: {
    fontSize: 16,
    color: "#6b7280",
    marginBottom: 24,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 12,
  },
  body: {
    fontSize: 17,
    lineHeight: 25,
    color: "#374151",
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  tag: {
    backgroundColor: "#f3f4f6",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  tagText: {
    fontSize: 15,
    color: "#4b5563",
    fontWeight: "700",
  },
  editButton: {
    backgroundColor: "#f59e0b",
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 12,
  },
  secondaryButton: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#f59e0b",
  },
  secondaryButtonText: {
    color: "#f59e0b",
    fontSize: 16,
    fontWeight: "800",
  },
  deleteButton: {
    backgroundColor: "#dc2626",
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 18,
  },
  deleteButtonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "800",
  },
  infoBox: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    marginBottom: 18,
  },
  infoLabel: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    lineHeight: 22,
  },
});