import { Button } from '@/components/ui/button'
import { Logo } from '@/components/ui/logo'
import { ScreenLayout } from '@/components/ui/screen-layout'
import { useQuiz } from '@/contexts/quiz-context'
import { Href, router } from 'expo-router'
import React from 'react'
import { Text, View } from 'react-native'
import { startScreenStyles } from '../styles/index.styles'

export default function StartScreen() {
  const { resetQuiz } = useQuiz()

  const handleStartQuiz = () => {
    resetQuiz()
    router.push('/quiz' as Href)
  }

  return (
    <ScreenLayout>
      <View style={startScreenStyles.container}>
        <Logo />
        <View style={startScreenStyles.card}>
          <Text style={startScreenStyles.title}>Ready for a{'\n'}Quick Challenge?</Text>
          <Text style={startScreenStyles.subtitle}>
            Test your knowledge and help us{'\n'}{' '}
            <Text style={startScreenStyles.highlight}>donate to a great cause.</Text>
          </Text>
          <Button onPress={handleStartQuiz} title='START QUIZ' />
        </View>
      </View>
    </ScreenLayout>
  )
}
