import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ChecklistCard } from "../../../components/items/ChecklistCard";
import { useChecklistsStore } from "../../../store/checklistsStore";
import { darkTheme } from "../../../constants/theme";

const colors = darkTheme.colors;

export default function ChecklistsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const checklists = useChecklistsStore((state) => state.checklists);

  const totalItems = checklists.reduce(
    (total, checklist) => total + checklist.items.length,
    0
  );

  const completedItems = checklists.reduce(
    (total, checklist) =>
      total + checklist.items.filter((item) => item.completed).length,
    0
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.kicker}>NoteFlow</Text>
          <Text style={styles.title}>Tareas</Text>
          <Text style={styles.subtitle}>
            Organiza listas, marca avances y controla tus pendientes.
          </Text>
        </View>

        <Pressable
          style={styles.addButton}
          onPress={() => router.push("/nueva-tarea")}
        >
          <Ionicons name="add" size={28} color={colors.text} />
        </Pressable>
      </View>

      <View style={styles.summaryCard}>
        <View>
          <Text style={styles.summaryLabel}>Listas creadas</Text>
          <Text style={styles.summaryValue}>{checklists.length}</Text>
        </View>

        <View style={styles.summaryDivider} />

        <View>
          <Text style={styles.summaryLabel}>Completadas</Text>
          <Text style={styles.summaryValue}>
            {completedItems}/{totalItems}
          </Text>
        </View>

        <View style={styles.summaryIcon}>
          <Ionicons name="checkbox-outline" size={24} color={colors.success} />
        </View>
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
          ListEmptyComponent={
            <View style={styles.emptyCard}>
              <Ionicons name="checkbox-outline" size={34} color={colors.success} />
              <Text style={styles.emptyTitle}>Todavía no tienes tareas</Text>
              <Text style={styles.emptyText}>
                Pulsa el botón + para crear tu primera lista de tareas.
              </Text>
            </View>
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.listContent,
            { paddingBottom: 96 + insets.bottom },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 18,
    gap: 16,
  },
  headerText: {
    flex: 1,
  },
  kicker: {
    color: colors.success,
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  title: {
    fontSize: 38,
    fontWeight: "900",
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 23,
    color: colors.mutedText,
  },
  addButton: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: colors.success,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },
  summaryCard: {
    backgroundColor: colors.card,
    borderRadius: 22,
    padding: 18,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  summaryLabel: {
    color: colors.mutedText,
    fontSize: 14,
    marginBottom: 4,
  },
  summaryValue: {
    color: colors.text,
    fontSize: 26,
    fontWeight: "900",
  },
  summaryDivider: {
    width: 1,
    height: 42,
    backgroundColor: colors.border,
  },
  summaryIcon: {
    marginLeft: "auto",
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "rgba(74, 222, 128, 0.14)",
    alignItems: "center",
    justifyContent: "center",
  },
  listContainer: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 32,
  },
  emptyCard: {
    backgroundColor: colors.card,
    borderRadius: 22,
    padding: 24,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    marginTop: 8,
  },
  emptyTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: "800",
    marginTop: 14,
    marginBottom: 6,
    textAlign: "center",
  },
  emptyText: {
    color: colors.mutedText,
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
  },
});
