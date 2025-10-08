import { Button } from '@/components/ui/button'
import { Logo } from '@/components/ui/logo'
import { ScreenLayout } from '@/components/ui/screen-layout'
import { Separator } from '@/components/ui/separator'
import { useQuiz } from '@/contexts/quiz-context'
import { QUIZ_QUESTIONS } from '@/data/questions'
import { useDataSync } from '@/hooks/use-data-sync'
import { prepareQuizData } from '@/services/api'
import { router } from 'expo-router'
import React, { useEffect, useRef } from 'react'
import { Text, View } from 'react-native'
import { finalScreenStyles } from '../styles/final.styles'

export default function FinalScreen() {
  const { totalScore, results, formData, elapsedTime, foundWords } = useQuiz()
  const { submitData } = useDataSync()
  const hasSubmitted = useRef(false)

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  useEffect(() => {
    // Submit results only once when component mounts
    if (!formData || hasSubmitted.current) return

    hasSubmitted.current = true

    const submitResults = async () => {
      // Prepare the data to submit
      const quizData = prepareQuizData(formData, results, totalScore, elapsedTime, foundWords)

      // Submit the data (will be saved offline if no internet)
      const success = await submitData(quizData)

      if (success) {
        console.log('Quiz results submitted successfully')
      } else {
        console.log('Quiz results saved locally, will sync when online')
      }
    }

    submitResults()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleFinish = () => {
    router.push('/')
  }

  const handleCheckAnswers = () => {
    router.push('/review')
  }

  const isPerfectScore = totalScore === QUIZ_QUESTIONS.length + 1

  return (
    <ScreenLayout>
      <View style={finalScreenStyles.container}>
        <Logo />
        <View style={finalScreenStyles.card}>
          <View style={finalScreenStyles.scoreContainer}>
            <Text style={finalScreenStyles.scoreLabel}>Your score:</Text>
            <Text style={finalScreenStyles.score}>
              {totalScore}/{QUIZ_QUESTIONS.length + 1}
            </Text>
          </View>

          <Text style={finalScreenStyles.title}>Congratulations!</Text>

          <Text style={finalScreenStyles.time}>
            YOUR TIME: <Text style={finalScreenStyles.timeValue}>{formatTime(elapsedTime)}</Text>
          </Text>

          <Separator />

          <Text style={finalScreenStyles.description}>
            You have completed the quiz and helped{'\n'}
            <Text style={finalScreenStyles.highlight}>contribute XY $ to [Name of Charity]</Text>.
          </Text>

          {isPerfectScore ? (
            <View style={{ maxWidth: 200 }}>
              <Button onPress={handleFinish} title='FINISH' />
            </View>
          ) : (
            <View style={{ maxWidth: 320 }}>
              <Button onPress={handleCheckAnswers} title='CHECK YOUR ANSWERS' />
            </View>
          )}
        </View>
      </View>
    </ScreenLayout>
  )
}
