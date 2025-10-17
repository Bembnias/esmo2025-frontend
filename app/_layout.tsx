import { QuizProvider } from '@/contexts/quiz-context'
import { useDataSync } from '@/hooks/use-data-sync'
import { DMSans_200ExtraLight_Italic } from '@expo-google-fonts/dm-sans/200ExtraLight_Italic'
import { DMSans_300Light } from '@expo-google-fonts/dm-sans/300Light'
import { DMSans_400Regular } from '@expo-google-fonts/dm-sans/400Regular'
import { DMSans_600SemiBold } from '@expo-google-fonts/dm-sans/600SemiBold'
import { DMSans_700Bold } from '@expo-google-fonts/dm-sans/700Bold'
import { DMSans_700Bold_Italic } from '@expo-google-fonts/dm-sans/700Bold_Italic'
import { useFonts } from '@expo-google-fonts/dm-sans/useFonts'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import 'react-native-reanimated'

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    DMSans_300Light,
    DMSans_400Regular,
    DMSans_600SemiBold,
    DMSans_700Bold,
    DMSans_200ExtraLight_Italic,
    DMSans_700Bold_Italic,
  })

  // Initialize data sync hook to monitor connectivity
  const { syncPendingSubmissions, isOnline } = useDataSync()

  // Try to sync pending submissions when app starts
  useEffect(() => {
    if (isOnline) {
      console.log('App started with internet connection, checking for pending submissions...')
      syncPendingSubmissions()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!fontsLoaded) {
    return null
  }

  return (
    <QuizProvider>
      <StatusBar hidden={true} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name='index' />
        <Stack.Screen name='quiz' />
        <Stack.Screen name='word-search' />
        <Stack.Screen name='form' />
        <Stack.Screen name='final' />
        <Stack.Screen name='review' />
      </Stack>
    </QuizProvider>
  )
}
