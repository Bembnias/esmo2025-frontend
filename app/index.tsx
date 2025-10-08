import { Button } from '@/components/ui/button'
import { Logo } from '@/components/ui/logo'
import { ScreenLayout } from '@/components/ui/screen-layout'
import { Separator } from '@/components/ui/separator'
import { useQuiz } from '@/contexts/quiz-context'
import { router } from 'expo-router'
import React from 'react'
import { Text, View } from 'react-native'
import { startScreenStyles } from '../styles/index.styles'

export default function StartScreen() {
  const { resetQuiz } = useQuiz()

  const handleStartQuiz = () => {
    resetQuiz()
    router.push('/quiz')
  }

  return (
    <ScreenLayout>
      <View style={startScreenStyles.container}>
        <Logo />
        <Text style={startScreenStyles.title}>Ready for a{'\n'}Quick Challenge?</Text>
        <Separator />
        <Text style={startScreenStyles.subtitle}>
          Test your knowledge and help us{'\n'}{' '}
          <Text style={startScreenStyles.highlight}>donate to a great cause.</Text>
        </Text>
        <Button onPress={handleStartQuiz} title='START QUIZ' variant='hero' />
      </View>
    </ScreenLayout>
  )
}
