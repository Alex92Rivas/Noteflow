import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { darkTheme } from "../../constants/theme";

const colors = darkTheme.colors;

type NoteCardProps = {
  title: string;
  content: string;
  updatedAt?: string;
  onPress?: () => void;
};

export function NoteCard({ title, content, updatedAt, onPress }: NoteCardProps) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <View style={styles.iconBox}>
          <Ionicons name="document-text-outline" size={22} color={colors.primary} />
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
    backgroundColor: colors.primarySoft,
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
});
