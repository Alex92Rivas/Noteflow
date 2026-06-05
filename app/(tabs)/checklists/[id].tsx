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

export default function ChecklistDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [checklist, setChecklist] = useState<ApiNote | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function loadChecklist() {
    if (!id) return;

    try {
      setIsLoading(true);
      setErrorMessage(null);

      const data = await getNoteById(id);

      if (data.type !== "checklist") {
        setChecklist(null);
        setErrorMessage("El elemento encontrado no es una lista de tareas.");
        return;
      }

      setChecklist(data);
    } catch (error) {
      console.error(error);
      setChecklist(null);
      setErrorMessage("No se pudo cargar la tarea desde la API.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadChecklist();
  }, [id]);

  const handleDelete = () => {
    if (!checklist) return;

    Alert.alert(
      "Eliminar tarea",
      `¿Seguro que quieres eliminar "${checklist.title}"?`,
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
              await deleteNote(checklist.id);
              router.replace("/(tabs)/checklists");
            } catch (error) {
              console.error(error);
              Alert.alert(
                "Error",
                "No se pudo eliminar la tarea desde la API."
              );
            }
          },
        },
      ]
    );
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: "Cargando tarea" }} />

        <View style={styles.centerContent}>
          <ActivityIndicator size="large" color="#16a34a" />
          <Text style={styles.subtitle}>Cargando tarea desde la API...</Text>
        </View>
      </View>
    );
  }

  if (!checklist || errorMessage) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: "Tarea no encontrada" }} />

        <View style={styles.content}>
          <Text style={styles.title}>Tarea no encontrada</Text>
          <Text style={styles.subtitle}>
            {errorMessage ?? `No existe una lista con el ID ${id}.`}
          </Text>

          <Pressable
            style={styles.editButton}
            onPress={() => router.replace("/(tabs)/checklists")}
          >
            <Text style={styles.buttonText}>Volver a tareas</Text>
          </Pressable>

          <Pressable style={styles.secondaryButton} onPress={loadChecklist}>
            <Text style={styles.secondaryButtonText}>Reintentar</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  const completedItems = checklist.items.filter(
    (item) => item.is_completed
  ).length;

  const totalItems = checklist.items.length;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Stack.Screen options={{ title: "Detalle de tarea" }} />

      <View style={styles.iconBox}>
        <Ionicons name="checkbox-outline" size={34} color="#16a34a" />
      </View>

      <Text style={styles.title}>{checklist.title}</Text>

      <Text style={styles.date}>
        Actualizada: {new Date(checklist.updated_at).toLocaleString()}
      </Text>

      <View style={styles.summaryCard}>
        <Text style={styles.summaryNumber}>
          {completedItems} / {totalItems}
        </Text>
        <Text style={styles.summaryText}>tareas completadas</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Lista de tareas</Text>

        {checklist.items.length === 0 ? (
          <Text style={styles.emptyText}>
            Esta checklist todavía no tiene tareas.
          </Text>
        ) : (
          checklist.items.map((item) => (
            <View key={item.id} style={styles.taskRow}>
              <Ionicons
                name={item.is_completed ? "checkmark-circle" : "ellipse-outline"}
                size={24}
                color={item.is_completed ? "#16a34a" : "#9ca3af"}
              />

              <Text
                style={[
                  styles.taskText,
                  item.is_completed && styles.taskTextCompleted,
                ]}
              >
                {item.text}
              </Text>
            </View>
          ))
        )}
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoLabel}>Nota</Text>
        <Text style={styles.infoValue}>
          El detalle de esta tarea ya se carga desde la API. Marcar items como
          completados se conectará en un paso posterior.
        </Text>
      </View>

      <Pressable style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.buttonText}>Eliminar tarea</Text>
      </Pressable>

      <View style={styles.infoBox}>
        <Text style={styles.infoLabel}>ID interno</Text>
        <Text style={styles.infoValue}>{checklist.id}</Text>
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
    backgroundColor: "#f0fdf4",
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
  summaryCard: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    marginBottom: 18,
  },
  summaryNumber: {
    fontSize: 30,
    fontWeight: "800",
    color: "#16a34a",
  },
  summaryText: {
    fontSize: 16,
    color: "#6b7280",
    marginTop: 2,
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
    marginBottom: 14,
  },
  taskRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 12,
  },
  taskText: {
    flex: 1,
    fontSize: 17,
    color: "#374151",
  },
  taskTextCompleted: {
    color: "#9ca3af",
    textDecorationLine: "line-through",
  },
  emptyText: {
    fontSize: 16,
    color: "#6b7280",
    lineHeight: 22,
  },
  editButton: {
    backgroundColor: "#16a34a",
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
    borderColor: "#16a34a",
  },
  secondaryButtonText: {
    color: "#16a34a",
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