import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { Ionicons } from "@expo/vector-icons";

import { NoteCard } from "../../../components/items/NoteCard";
import { useNotesStore } from "../../../store/notesStore";

export default function NotesScreen() {
  const router = useRouter();
  const notes = useNotesStore((state) => state.notes);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.title}>Notas</Text>
          <Text style={styles.subtitle}>Listado principal de notas de texto.</Text>
        </View>

        <Pressable
          style={styles.addButton}
          onPress={() => router.push("/nueva-nota")}
        >
          <Ionicons name="add" size={26} color="#ffffff" />
        </Pressable>
      </View>

      <View style={styles.listContainer}>
        <FlashList
          data={notes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <NoteCard
              title={item.title}
              content={item.content}
              updatedAt={item.updatedAt}
              onPress={() => router.push(`/notas/${item.id}`)}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
    backgroundColor: "#f9fafb",
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 24,
    gap: 16,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 42,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 20,
    color: "#374151",
  },
  addButton: {
    width: 54,
    height: 54,
    borderRadius: 18,
    backgroundColor: "#2563eb",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },
  listContainer: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 32,
  },
});
