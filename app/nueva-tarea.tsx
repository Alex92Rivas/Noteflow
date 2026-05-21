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

import { useChecklistsStore } from "../store/checklistsStore";

export default function NewChecklistScreen() {
  const addChecklist = useChecklistsStore((state) => state.addChecklist);

  const [title, setTitle] = useState("");
  const [items, setItems] = useState("");

  const handleSave = async () => {
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

    addChecklist(cleanTitle, itemsList);

    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    router.replace("/(tabs)/checklists");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: "padding", android: undefined })}
    >
      <Stack.Screen options={{ title: "Nueva tarea" }} />

      <View style={styles.content}>
        <Text style={styles.label}>Nueva lista</Text>
        <Text style={styles.title}>Crea una lista de tareas</Text>

        <Text style={styles.inputLabel}>Título</Text>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Ej: Tareas de clase"
          placeholderTextColor="#9ca3af"
          style={styles.input}
        />

        <Text style={styles.inputLabel}>Tareas</Text>
        <TextInput
          value={items}
          onChangeText={setItems}
          placeholder={"Escribe una tarea por línea\nEj:\nRepasar TypeScript\nHacer documentación\nProbar la app"}
          placeholderTextColor="#9ca3af"
          style={[styles.input, styles.textArea]}
          multiline
          textAlignVertical="top"
        />

        <Pressable style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Guardar tarea</Text>
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
