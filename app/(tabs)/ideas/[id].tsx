import { Ionicons } from "@expo/vector-icons";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { useIdeasStore } from "../../../store/ideasStore";

export default function IdeaDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const idea = useIdeasStore((state) => state.getIdeaById(id));
  const deleteIdea = useIdeasStore((state) => state.deleteIdea);

  const handleDelete = () => {
    if (!idea) return;

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
          onPress: () => {
            deleteIdea(idea.id);
            router.replace("/(tabs)/ideas");
          },
        },
      ]
    );
  };

  if (!idea) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: "Idea no encontrada" }} />

        <Text style={styles.title}>Idea no encontrada</Text>
        <Text style={styles.subtitle}>No existe una idea con el ID {id}.</Text>

        <Pressable
          style={styles.editButton}
          onPress={() => router.replace("/(tabs)/ideas")}
        >
          <Text style={styles.buttonText}>Volver a ideas</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Stack.Screen options={{ title: "Detalle de idea" }} />

      <View style={styles.iconBox}>
        <Ionicons name="bulb-outline" size={34} color="#f59e0b" />
      </View>

      <Text style={styles.title}>{idea.title}</Text>

      <Text style={styles.date}>Actualizada: {idea.updatedAt}</Text>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Descripción</Text>
        <Text style={styles.body}>{idea.content}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Etiquetas</Text>

        <View style={styles.tagsContainer}>
          {idea.tags.length > 0 ? (
            idea.tags.map((tag) => (
              <View key={tag} style={styles.tag}>
                <Text style={styles.tagText}>#{tag}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.body}>Sin etiquetas</Text>
          )}
        </View>
      </View>

      <Pressable
        style={styles.editButton}
        onPress={() => router.push(`/editar-idea/${idea.id}`)}
      >
        <Text style={styles.buttonText}>Editar idea</Text>
      </Pressable>

      <Pressable style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.buttonText}>Eliminar idea</Text>
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
  deleteButton: {
    backgroundColor: "#dc2626",
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 18,
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
  },
  infoLabel: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
});
