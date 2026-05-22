import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { darkTheme } from '../../constants/theme';

const colors = darkTheme.colors;

export default function TabsLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: '800',
        },
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
          height: 74 + insets.bottom,
          paddingTop: 10,
          paddingBottom: Math.max(insets.bottom, 14),
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.mutedText,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '700',
          marginTop: 2,
        },
        tabBarIconStyle: {
          marginTop: 2,
        },
      }}
    >
      <Tabs.Screen
        name="notas/index"
        options={{
          title: 'Notas',
          tabBarLabel: 'Notas',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="document-text-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="checklists/index"
        options={{
          title: 'Tareas',
          tabBarLabel: 'Tareas',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="checkbox-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="ideas/index"
        options={{
          title: 'Ideas',
          tabBarLabel: 'Ideas',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bulb-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="ajustes"
        options={{
          title: 'Ajustes',
          tabBarLabel: 'Ajustes',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen name="notas/[id]" options={{ href: null }} />
      <Tabs.Screen name="checklists/[id]" options={{ href: null }} />
      <Tabs.Screen name="ideas/[id]" options={{ href: null }} />
    </Tabs>
  );
}
