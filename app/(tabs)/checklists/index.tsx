import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { FlashList } from "@shopify/flash-list";

import { ChecklistCard } from "../../../components/items/ChecklistCard";
import { useChecklistsStore } from "../../../store/checklistsStore";

export default function ChecklistsScreen() {
  const router = useRouter();
  const checklists = useChecklistsStore((state) => state.checklists);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Tareas</Text>
          <Text style={styles.subtitle}>Gestión de listas de tareas.</Text>
        </View>

        <Pressable
          style={styles.addButton}
          onPress={() => router.push("/nueva-tarea")}
        >
          <Text style={styles.addButtonText}>+</Text>
        </Pressable>
      </View>

      <View style={styles.listContainer}>
        <FlashList
          data={checklists}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ChecklistCard
              title={item.title}
              items={item.items}
              updatedAt={item.updatedAt}
              onPress={() => router.push(`/checklists/${item.id}`)}
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
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 24,
    gap: 16,
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
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#16a34a",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },
  addButtonText: {
    color: "#ffffff",
    fontSize: 30,
    fontWeight: "800",
    lineHeight: 34,
  },
  listContainer: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 32,
  },
});
