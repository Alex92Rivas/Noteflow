import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

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
          <Ionicons name="document-text-outline" size={22} color="#2563eb" />
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
      </View>

      <Text style={styles.content} numberOfLines={3}>
        {content}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#eff6ff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  textBox: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
  date: {
    marginTop: 2,
    fontSize: 13,
    color: "#6b7280",
  },
  content: {
    fontSize: 15,
    lineHeight: 21,
    color: "#374151",
  },
});
