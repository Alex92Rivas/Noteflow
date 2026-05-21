import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>NoteFlow</Text>

      <Text style={styles.subtitle}>
        App móvil de productividad con React Native y Expo
      </Text>

      <Link href="/(tabs)/notas" style={styles.button}>
        Entrar en la app
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2563EB',
  },
});