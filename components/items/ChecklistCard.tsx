import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type ChecklistItem = {
  id: string;
  text: string;
  completed: boolean;
};

type ChecklistCardProps = {
  title: string;
  items: ChecklistItem[];
  updatedAt?: string;
  onPress?: () => void;
};

export function ChecklistCard({
  title,
  items,
  updatedAt,
  onPress,
}: ChecklistCardProps) {
  const completedItems = items.filter((item) => item.completed).length;
  const totalItems = items.length;

  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <View style={styles.iconBox}>
          <Ionicons name="checkbox-outline" size={22} color="#16a34a" />
        </View>

        <View style={styles.textBox}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>

          <Text style={styles.counter}>
            {completedItems} de {totalItems} tareas completadas
          </Text>
        </View>
      </View>

      <View style={styles.previewList}>
        {items.slice(0, 3).map((item) => (
          <View key={item.id} style={styles.previewItem}>
            <Ionicons
              name={item.completed ? "checkmark-circle" : "ellipse-outline"}
              size={17}
              color={item.completed ? "#16a34a" : "#9ca3af"}
            />

            <Text
              style={[
                styles.previewText,
                item.completed && styles.previewTextCompleted,
              ]}
              numberOfLines={1}
            >
              {item.text}
            </Text>
          </View>
        ))}
      </View>

      {updatedAt ? (
        <Text style={styles.date} numberOfLines={1}>
          Actualizada: {updatedAt}
        </Text>
      ) : null}
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
    backgroundColor: "#f0fdf4",
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
  counter: {
    marginTop: 2,
    fontSize: 13,
    color: "#6b7280",
  },
  previewList: {
    gap: 7,
  },
  previewItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  previewText: {
    flex: 1,
    fontSize: 15,
    color: "#374151",
  },
  previewTextCompleted: {
    color: "#9ca3af",
    textDecorationLine: "line-through",
  },
  date: {
    marginTop: 12,
    fontSize: 13,
    color: "#6b7280",
  },
});
