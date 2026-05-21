import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { FlashList } from "@shopify/flash-list";

import { IdeaCard } from "../../../components/items/IdeaCard";
import { useIdeasStore } from "../../../store/ideasStore";

export default function IdeasScreen() {
  const router = useRouter();
  const ideas = useIdeasStore((state) => state.ideas);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Ideas</Text>
          <Text style={styles.subtitle}>Espacio para notas rápidas con etiquetas.</Text>
        </View>

        <Pressable
          style={styles.addButton}
          onPress={() => router.push("/nueva-idea")}
        >
          <Text style={styles.addButtonText}>+</Text>
        </Pressable>
      </View>

      <View style={styles.listContainer}>
        <FlashList
          data={ideas}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <IdeaCard
              title={item.title}
              content={item.content}
              tags={item.tags}
              updatedAt={item.updatedAt}
              onPress={() => router.push(`/ideas/${item.id}`)}
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
    backgroundColor: "#f59e0b",
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
