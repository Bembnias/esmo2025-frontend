import { QuizProvider } from '@/contexts/quiz-context'
import { DMSans_300Light } from '@expo-google-fonts/dm-sans/300Light'
import { DMSans_600SemiBold } from '@expo-google-fonts/dm-sans/600SemiBold'
import { DMSans_700Bold } from '@expo-google-fonts/dm-sans/700Bold'
import { useFonts } from '@expo-google-fonts/dm-sans/useFonts'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import 'react-native-reanimated'

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    DMSans_300Light,
    DMSans_600SemiBold,
    DMSans_700Bold,
  })

  if (!fontsLoaded) {
    return null
  }

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
