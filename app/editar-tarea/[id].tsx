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

import { useChecklistsStore } from "../../store/checklistsStore";

export default function EditChecklistScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const checklist = useChecklistsStore((state) => state.getChecklistById(id));
  const updateChecklist = useChecklistsStore((state) => state.updateChecklist);

  const [title, setTitle] = useState("");
  const [items, setItems] = useState("");

  useEffect(() => {
    if (checklist) {
      setTitle(checklist.title);
      setItems(checklist.items.map((item) => item.text).join("\n"));
    }
  }, [checklist]);

  const handleSave = async () => {
    if (!checklist) return;

    const cleanTitle = title.trim();
    const itemsList = items
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);

    if (!cleanTitle || itemsList.length === 0) {
      Alert.alert(
        "Campos incompletos",
        "Escribe un título y al menos una tarea. Cada tarea debe ir en una línea."
      );
      return;
    }

    updateChecklist(checklist.id, cleanTitle, itemsList);

    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    router.replace(`/checklists/${checklist.id}`);
  };

  if (!checklist) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: "Tarea no encontrada" }} />

        <Text style={styles.title}>Tarea no encontrada</Text>

        <Pressable
          style={styles.saveButton}
          onPress={() => router.replace("/(tabs)/checklists")}
        >
          <Text style={styles.saveButtonText}>Volver a tareas</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: "padding", android: undefined })}
    >
      <Stack.Screen options={{ title: "Editar tarea" }} />

      <View style={styles.content}>
        <Text style={styles.label}>Editar lista</Text>
        <Text style={styles.title}>Actualiza tus tareas</Text>

        <Text style={styles.inputLabel}>Título</Text>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Título de la lista"
          placeholderTextColor="#9ca3af"
          style={styles.input}
        />

        <Text style={styles.inputLabel}>Tareas</Text>
        <TextInput
          value={items}
          onChangeText={setItems}
          placeholder="Una tarea por línea"
          placeholderTextColor="#9ca3af"
          style={[styles.input, styles.textArea]}
          multiline
          textAlignVertical="top"
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
    color: "#16a34a",
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
    minHeight: 190,
  },
  saveButton: {
    backgroundColor: "#16a34a",
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
