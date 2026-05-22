import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { darkTheme } from "../../constants/theme";

const colors = darkTheme.colors;

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
          <Ionicons name="checkbox-outline" size={22} color={colors.success} />
        </View>

        <View style={styles.textBox}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>

          <Text style={styles.counter}>
            {completedItems} de {totalItems} tareas completadas
          </Text>
        </View>

        <Ionicons name="chevron-forward" size={20} color={colors.mutedText} />
      </View>

      <View style={styles.previewList}>
        {items.slice(0, 3).map((item) => (
          <View key={item.id} style={styles.previewItem}>
            <Ionicons
              name={item.completed ? "checkmark-circle" : "ellipse-outline"}
              size={17}
              color={item.completed ? colors.success : colors.mutedText}
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
    backgroundColor: "rgba(74, 222, 128, 0.14)",
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
  counter: {
    marginTop: 3,
    fontSize: 13,
    color: colors.mutedText,
  },
  previewList: {
    gap: 8,
  },
  previewItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  previewText: {
    flex: 1,
    fontSize: 15,
    color: colors.mutedText,
  },
  previewTextCompleted: {
    color: "#64748B",
    textDecorationLine: "line-through",
  },
  date: {
    marginTop: 12,
    fontSize: 13,
    color: colors.mutedText,
  },
});
