import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { darkTheme } from "../../constants/theme";

const colors = darkTheme.colors;

type IdeaCardProps = {
  title: string;
  content: string;
  tags?: string[];
  updatedAt?: string;
  onPress?: () => void;
};

export function IdeaCard({
  title,
  content,
  tags = [],
  updatedAt,
  onPress,
}: IdeaCardProps) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <View style={styles.iconBox}>
          <Ionicons name="bulb-outline" size={22} color={colors.warning} />
        </View>

        <View style={styles.textBox}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>

          {updatedAt ? (
            <Text style={styles.date} numberOfLines={1}>
              Actualizada: {updatedAt}
            </Text>
          ) : null}
        </View>

        <Ionicons name="chevron-forward" size={20} color={colors.mutedText} />
      </View>

      <Text style={styles.content} numberOfLines={3}>
        {content}
      </Text>

      {tags.length > 0 ? (
        <View style={styles.tagsContainer}>
          {tags.slice(0, 3).map((tag) => (
            <View key={tag} style={styles.tag}>
              <Text style={styles.tagText}>#{tag}</Text>
            </View>
          ))}
        </View>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 15,
    backgroundColor: "rgba(251, 191, 36, 0.14)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  textBox: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.text,
  },
  date: {
    marginTop: 3,
    fontSize: 13,
    color: colors.mutedText,
  },
  content: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.mutedText,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 12,
  },
  tag: {
    backgroundColor: "rgba(251, 191, 36, 0.12)",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: "rgba(251, 191, 36, 0.22)",
  },
  tagText: {
    fontSize: 13,
    color: colors.warning,
    fontWeight: "700",
  },
});
