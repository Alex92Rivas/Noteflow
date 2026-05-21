import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'NoteFlow' }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="nueva-nota"
        options={{
          title: 'Nueva nota',
          presentation: 'modal',
        }}
      />
    </Stack>
  );
}