import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ChecklistCard } from "../../../components/items/ChecklistCard";
import { darkTheme } from "../../../constants/theme";
import { getNotes } from "../../../services/api";
import type { ApiNote } from "../../../services/api";

const colors = darkTheme.colors;

export default function ChecklistsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [apiNotes, setApiNotes] = useState<ApiNote[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const checklists = apiNotes
    .filter((note) => note.type === "checklist")
    .map((checklist) => ({
      ...checklist,
      items: checklist.items.map((item) => ({
        id: item.id,
        text: item.text,
        completed: item.is_completed,
      })),
    }));

  const totalItems = checklists.reduce(
    (total, checklist) => total + checklist.items.length,
    0
  );

  const completedItems = checklists.reduce(
    (total, checklist) =>
      total + checklist.items.filter((item) => item.completed).length,
    0
  );

  async function loadChecklists() {
    try {
      setIsLoading(true);
      setErrorMessage(null);

      const data = await getNotes();
      setApiNotes(data);
    } catch (error) {
      console.error(error);
      setErrorMessage("No se pudieron cargar las tareas desde la API.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadChecklists();
  }, []);

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
        {isLoading ? (
          <View style={styles.feedbackCard}>
            <ActivityIndicator color={colors.success} />
            <Text style={styles.feedbackText}>
              Cargando tareas desde la API...
            </Text>
          </View>
        ) : errorMessage ? (
          <View style={styles.feedbackCard}>
            <Ionicons name="warning-outline" size={34} color={colors.success} />
            <Text style={styles.emptyTitle}>Error al cargar tareas</Text>
            <Text style={styles.emptyText}>{errorMessage}</Text>

            <Pressable style={styles.retryButton} onPress={loadChecklists}>
              <Text style={styles.retryButtonText}>Reintentar</Text>
            </Pressable>
          </View>
        ) : (
          <FlashList
            data={checklists}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ChecklistCard
                title={item.title}
                items={item.items}
                updatedAt={item.updated_at}
                onPress={() => router.push(`/checklists/${item.id}`)}
              />
            )}
            ListEmptyComponent={
              <View style={styles.emptyCard}>
                <Ionicons
                  name="checkbox-outline"
                  size={34}
                  color={colors.success}
                />
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
        )}
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
  feedbackCard: {
    backgroundColor: colors.card,
    borderRadius: 22,
    padding: 24,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    marginTop: 8,
    gap: 12,
  },
  feedbackText: {
    color: colors.mutedText,
    fontSize: 15,
    textAlign: "center",
  },
  retryButton: {
    backgroundColor: colors.success,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 14,
    marginTop: 8,
  },
  retryButtonText: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "800",
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