import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

import { useNotesStore } from '../../store/notesStore';
import { useChecklistsStore } from '../../store/checklistsStore';
import { useIdeasStore } from '../../store/ideasStore';

export default function SettingsScreen() {
  const notes = useNotesStore((state) => state.notes);
  const checklists = useChecklistsStore((state) => state.checklists);
  const ideas = useIdeasStore((state) => state.ideas);

  const clearNotes = useNotesStore((state) => state.clearNotes);
  const clearChecklists = useChecklistsStore((state) => state.clearChecklists);
  const clearIdeas = useIdeasStore((state) => state.clearIdeas);

  async function playWarningHaptic() {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
  }

  async function playSuccessHaptic() {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  }

  function confirmClearNotes() {
    void playWarningHaptic();

    Alert.alert(
      'Eliminar notas',
      '¿Seguro que quieres eliminar todas las notas?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            clearNotes();
            void playSuccessHaptic();
          },
        },
      ]
    );
  }

  function confirmClearChecklists() {
    void playWarningHaptic();

    Alert.alert(
      'Eliminar tareas',
      '¿Seguro que quieres eliminar todas las listas de tareas?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            clearChecklists();
            void playSuccessHaptic();
          },
        },
      ]
    );
  }

  function confirmClearIdeas() {
    void playWarningHaptic();

    Alert.alert(
      'Eliminar ideas',
      '¿Seguro que quieres eliminar todas las ideas?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            clearIdeas();
            void playSuccessHaptic();
          },
        },
      ]
    );
  }

  function confirmClearAll() {
    void playWarningHaptic();

    Alert.alert(
      'Restablecer NoteFlow',
      'Esto eliminará notas, tareas e ideas. ¿Quieres continuar?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Restablecer todo',
          style: 'destructive',
          onPress: () => {
            clearNotes();
            clearChecklists();
            clearIdeas();
            void playSuccessHaptic();
          },
        },
      ]
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Ionicons name="settings-outline" size={30} color="#f8fafc" />
        </View>

        <View>
          <Text style={styles.title}>Ajustes</Text>
          <Text style={styles.subtitle}>
            Gestiona los datos locales de NoteFlow.
          </Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Resumen de datos</Text>

        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Notas guardadas</Text>
          <Text style={styles.statValue}>{notes.length}</Text>
        </View>

        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Listas de tareas</Text>
          <Text style={styles.statValue}>{checklists.length}</Text>
        </View>

        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Ideas guardadas</Text>
          <Text style={styles.statValue}>{ideas.length}</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Limpieza de datos</Text>
        <Text style={styles.cardDescription}>
          Estos botones eliminan datos guardados en AsyncStorage. Son útiles para pruebas,
          reiniciar la app o preparar una demostración limpia.
        </Text>

        <Pressable style={styles.secondaryButton} onPress={confirmClearNotes}>
          <Ionicons name="document-text-outline" size={20} color="#f8fafc" />
          <Text style={styles.buttonText}>Eliminar todas las notas</Text>
        </Pressable>

        <Pressable style={styles.secondaryButton} onPress={confirmClearChecklists}>
          <Ionicons name="checkbox-outline" size={20} color="#f8fafc" />
          <Text style={styles.buttonText}>Eliminar todas las tareas</Text>
        </Pressable>

        <Pressable style={styles.secondaryButton} onPress={confirmClearIdeas}>
          <Ionicons name="bulb-outline" size={20} color="#f8fafc" />
          <Text style={styles.buttonText}>Eliminar todas las ideas</Text>
        </Pressable>

        <Pressable style={styles.dangerButton} onPress={confirmClearAll}>
          <Ionicons name="trash-outline" size={20} color="#f8fafc" />
          <Text style={styles.buttonText}>Restablecer toda la app</Text>
        </Pressable>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Sobre el proyecto</Text>
        <Text style={styles.cardDescription}>
          NoteFlow es una app móvil creada con React Native, Expo Router,
          TypeScript, Zustand, AsyncStorage y FlashList como parte de la Fase 6
          de las prácticas de DAM.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
  },
  content: {
    padding: 20,
    gap: 18,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 4,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: '#334155',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#f8fafc',
    fontSize: 30,
    fontWeight: '800',
  },
  subtitle: {
    color: '#94a3b8',
    fontSize: 15,
    marginTop: 4,
  },
  card: {
    backgroundColor: '#0f172a',
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    borderColor: '#1e293b',
    gap: 14,
  },
  cardTitle: {
    color: '#f8fafc',
    fontSize: 20,
    fontWeight: '700',
  },
  cardDescription: {
    color: '#94a3b8',
    fontSize: 15,
    lineHeight: 22,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
    paddingVertical: 10,
  },
  statLabel: {
    color: '#cbd5e1',
    fontSize: 16,
  },
  statValue: {
    color: '#f8fafc',
    fontSize: 18,
    fontWeight: '800',
  },
  secondaryButton: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  dangerButton: {
    backgroundColor: '#dc2626',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 4,
  },
  buttonText: {
    color: '#f8fafc',
    fontSize: 16,
    fontWeight: '700',
  },
});
