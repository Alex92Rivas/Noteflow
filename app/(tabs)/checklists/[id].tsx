import { Ionicons } from "@expo/vector-icons";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { useChecklistsStore } from "../../../store/checklistsStore";

export default function ChecklistDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const checklist = useChecklistsStore((state) => state.getChecklistById(id));
  const deleteChecklist = useChecklistsStore((state) => state.deleteChecklist);
  const toggleChecklistItem = useChecklistsStore((state) => state.toggleChecklistItem);

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
          onPress: () => {
            deleteChecklist(checklist.id);
            router.replace("/(tabs)/checklists");
          },
        },
      ]
    );
  };

  if (!checklist) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: "Tarea no encontrada" }} />

        <Text style={styles.title}>Tarea no encontrada</Text>
        <Text style={styles.subtitle}>No existe una lista con el ID {id}.</Text>

        <Pressable
          style={styles.editButton}
          onPress={() => router.replace("/(tabs)/checklists")}
        >
          <Text style={styles.buttonText}>Volver a tareas</Text>
        </Pressable>
      </View>
    );
  }

  const completedItems = checklist.items.filter((item) => item.completed).length;
  const totalItems = checklist.items.length;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Stack.Screen options={{ title: "Detalle de tarea" }} />

      <View style={styles.iconBox}>
        <Ionicons name="checkbox-outline" size={34} color="#16a34a" />
      </View>

      <Text style={styles.title}>{checklist.title}</Text>

      <Text style={styles.date}>Actualizada: {checklist.updatedAt}</Text>

      <View style={styles.summaryCard}>
        <Text style={styles.summaryNumber}>
          {completedItems} / {totalItems}
        </Text>
        <Text style={styles.summaryText}>tareas completadas</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Lista de tareas</Text>

        {checklist.items.map((item) => (
          <Pressable
            key={item.id}
            style={styles.taskRow}
            onPress={() => toggleChecklistItem(checklist.id, item.id)}
          >
            <Ionicons
              name={item.completed ? "checkmark-circle" : "ellipse-outline"}
              size={24}
              color={item.completed ? "#16a34a" : "#9ca3af"}
            />

            <Text
              style={[
                styles.taskText,
                item.completed && styles.taskTextCompleted,
              ]}
            >
              {item.text}
            </Text>
          </Pressable>
        ))}
      </View>

      <Pressable
        style={styles.editButton}
        onPress={() => router.push(`/editar-tarea/${checklist.id}`)}
      >
        <Text style={styles.buttonText}>Editar tarea</Text>
      </Pressable>

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
  editButton: {
    backgroundColor: "#16a34a",
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
