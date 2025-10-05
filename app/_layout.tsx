import { QuizProvider } from '@/contexts/quiz-context'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import 'react-native-reanimated'

export default function RootLayout() {
  return (
    <QuizProvider>
      <StatusBar hidden={true} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name='index' />
        <Stack.Screen name='quiz' />
        <Stack.Screen name='form' />
        <Stack.Screen name='final' />
      </Stack>
    </QuizProvider>
  )
}
