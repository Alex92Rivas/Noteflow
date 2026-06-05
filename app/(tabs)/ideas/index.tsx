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

import { IdeaCard } from "../../../components/items/IdeaCard";
import { darkTheme } from "../../../constants/theme";
import { getNotes } from "../../../services/api";
import type { ApiNote } from "../../../services/api";

const colors = darkTheme.colors;

function getTagNames(tags: ApiNote["tags"]) {
  return tags.map((tag) => (typeof tag === "string" ? tag : tag.tag));
}

export default function IdeasScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [apiNotes, setApiNotes] = useState<ApiNote[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const ideas = apiNotes
    .filter((note) => note.type === "idea")
    .map((idea) => ({
      ...idea,
      tags: getTagNames(idea.tags),
    }));

  const ideasWithTags = ideas.filter((idea) => idea.tags.length > 0).length;
  const totalTags = ideas.reduce((total, idea) => total + idea.tags.length, 0);

  async function loadIdeas() {
    try {
      setIsLoading(true);
      setErrorMessage(null);

      const data = await getNotes();
      setApiNotes(data);
    } catch (error) {
      console.error(error);
      setErrorMessage("No se pudieron cargar las ideas desde la API.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadIdeas();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.kicker}>NoteFlow</Text>
          <Text style={styles.title}>Ideas</Text>
          <Text style={styles.subtitle}>
            Guarda conceptos, inspiraciones y etiquetas para desarrollarlas después.
          </Text>
        </View>

        <Pressable
          style={styles.addButton}
          onPress={() => router.push("/nueva-idea")}
        >
          <Ionicons name="add" size={28} color={colors.text} />
        </Pressable>
      </View>

      <View style={styles.summaryCard}>
        <View>
          <Text style={styles.summaryLabel}>Ideas guardadas</Text>
          <Text style={styles.summaryValue}>{ideas.length}</Text>
        </View>

        <View style={styles.summaryDivider} />

        <View>
          <Text style={styles.summaryLabel}>Con etiquetas</Text>
          <Text style={styles.summaryValue}>{ideasWithTags}</Text>
        </View>

        <View style={styles.summaryIcon}>
          <Ionicons name="bulb-outline" size={24} color={colors.warning} />
        </View>
      </View>

      <View style={styles.tagsSummaryCard}>
        <Ionicons name="pricetags-outline" size={20} color={colors.warning} />
        <Text style={styles.tagsSummaryText}>
          {totalTags === 0
            ? "Aún no has añadido etiquetas."
            : `Tienes ${totalTags} etiquetas repartidas entre tus ideas.`}
        </Text>
      </View>

      <View style={styles.listContainer}>
        {isLoading ? (
          <View style={styles.feedbackCard}>
            <ActivityIndicator color={colors.warning} />
            <Text style={styles.feedbackText}>
              Cargando ideas desde la API...
            </Text>
          </View>
        ) : errorMessage ? (
          <View style={styles.feedbackCard}>
            <Ionicons name="warning-outline" size={34} color={colors.warning} />
            <Text style={styles.emptyTitle}>Error al cargar ideas</Text>
            <Text style={styles.emptyText}>{errorMessage}</Text>

            <Pressable style={styles.retryButton} onPress={loadIdeas}>
              <Text style={styles.retryButtonText}>Reintentar</Text>
            </Pressable>
          </View>
        ) : (
          <FlashList
            data={ideas}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <IdeaCard
                title={item.title}
                content={item.content}
                tags={item.tags}
                updatedAt={item.updated_at}
                onPress={() => router.push(`/ideas/${item.id}`)}
              />
            )}
            ListEmptyComponent={
              <View style={styles.emptyCard}>
                <Ionicons name="bulb-outline" size={34} color={colors.warning} />
                <Text style={styles.emptyTitle}>Todavía no tienes ideas</Text>
                <Text style={styles.emptyText}>
                  Pulsa el botón + para guardar tu primera idea.
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
    color: colors.warning,
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
    backgroundColor: colors.warning,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },
  summaryCard: {
    backgroundColor: colors.card,
    borderRadius: 22,
    padding: 18,
    marginBottom: 12,
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
    backgroundColor: "rgba(251, 191, 36, 0.14)",
    alignItems: "center",
    justifyContent: "center",
  },
  tagsSummaryCard: {
    backgroundColor: "rgba(251, 191, 36, 0.08)",
    borderRadius: 18,
    padding: 14,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "rgba(251, 191, 36, 0.16)",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  tagsSummaryText: {
    flex: 1,
    color: colors.mutedText,
    fontSize: 14,
    lineHeight: 20,
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
    backgroundColor: colors.warning,
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