import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { NoteCard } from "../../../components/items/NoteCard";
import { useNotesStore } from "../../../store/notesStore";
import { darkTheme } from "../../../constants/theme";

const colors = darkTheme.colors;

export default function NotesScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const notes = useNotesStore((state) => state.notes);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.kicker}>NoteFlow</Text>
          <Text style={styles.title}>Notas</Text>
          <Text style={styles.subtitle}>
            Captura ideas rápidas, apuntes y recordatorios importantes.
          </Text>
        </View>

        <Pressable
          style={styles.addButton}
          onPress={() => router.push("/nueva-nota")}
        >
          <Ionicons name="add" size={28} color={colors.text} />
        </Pressable>
      </View>

      <View style={styles.summaryCard}>
        <View>
          <Text style={styles.summaryLabel}>Total de notas</Text>
          <Text style={styles.summaryValue}>{notes.length}</Text>
        </View>

        <View style={styles.summaryIcon}>
          <Ionicons name="document-text-outline" size={24} color={colors.primary} />
        </View>
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
          ListEmptyComponent={
            <View style={styles.emptyCard}>
              <Ionicons name="document-text-outline" size={34} color={colors.primary} />
              <Text style={styles.emptyTitle}>Todavía no tienes notas</Text>
              <Text style={styles.emptyText}>
                Pulsa el botón + para crear tu primera nota.
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
    color: colors.primary,
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
    backgroundColor: colors.primary,
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
    justifyContent: "space-between",
  },
  summaryLabel: {
    color: colors.mutedText,
    fontSize: 15,
    marginBottom: 4,
  },
  summaryValue: {
    color: colors.text,
    fontSize: 30,
    fontWeight: "900",
  },
  summaryIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: colors.primarySoft,
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
