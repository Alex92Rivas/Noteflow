import { Stack, useRouter } from "expo-router";
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
import * as Haptics from "expo-haptics";
import { Ionicons } from "@expo/vector-icons";

import { useNotesStore } from "../store/notesStore";

export default function NewNoteScreen() {
  const router = useRouter();
  const addNote = useNotesStore((state) => state.addNote);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSave = async () => {
    const cleanTitle = title.trim();
    const cleanContent = content.trim();

    if (!cleanTitle || !cleanContent) {
      Alert.alert(
        "Campos incompletos",
        "Escribe un título y un contenido para guardar la nota."
      );
      return;
    }

    addNote(cleanTitle, cleanContent);

    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    router.replace("/(tabs)/notas");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({
        ios: "padding",
        android: undefined,
      })}
    >
      <Stack.Screen options={{ title: "Nueva nota" }} />

      <View style={styles.content}>
        <View style={styles.iconBox}>
          <Ionicons name="create-outline" size={34} color="#2563eb" />
        </View>

        <Text style={styles.title}>Nueva nota</Text>
        <Text style={styles.subtitle}>
          Guarda una idea, apunte o recordatorio rápido.
        </Text>

        <View style={styles.form}>
          <Text style={styles.label}>Título</Text>
          <TextInput
            style={styles.input}
            placeholder="Ejemplo: Ideas para la app"
            value={title}
            onChangeText={setTitle}
          />

          <Text style={styles.label}>Contenido</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Escribe aquí el contenido de la nota..."
            value={content}
            onChangeText={setContent}
            multiline
            textAlignVertical="top"
          />

          <Pressable style={styles.button} onPress={handleSave}>
            <Ionicons name="save-outline" size={22} color="#ffffff" />
            <Text style={styles.buttonText}>Guardar nota</Text>
          </Pressable>
        </View>
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
  },
  iconBox: {
    width: 70,
    height: 70,
    borderRadius: 22,
    backgroundColor: "#eff6ff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 38,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    lineHeight: 25,
    color: "#4b5563",
    marginBottom: 28,
  },
  form: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  label: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 8,
  },
  input: {
    minHeight: 52,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: "#111827",
    backgroundColor: "#ffffff",
    marginBottom: 18,
  },
  textArea: {
    minHeight: 150,
  },
  button: {
    minHeight: 54,
    borderRadius: 16,
    backgroundColor: "#2563eb",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    marginTop: 4,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "800",
  },
});
