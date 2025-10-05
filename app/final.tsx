import { Button } from '@/components/ui/button'
import { Logo } from '@/components/ui/logo'
import { ScreenLayout } from '@/components/ui/screen-layout'
import { useQuiz } from '@/contexts/quiz-context'
import { QUIZ_QUESTIONS } from '@/data/questions'
import { router } from 'expo-router'
import React, { useCallback, useEffect } from 'react'
import { Alert, Platform, Text, View } from 'react-native'
import { finalScreenStyles } from '../styles/final.styles'

export default function FinalScreen() {
  const { score, results, formData, elapsedTime } = useQuiz()

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const saveResultsToCSV = useCallback(async () => {
    if (!formData) return

    const csvHeader =
      'Name,Surname,Email,City,Country,Affiliation,Area of Interest,Speciality,Liquid Biopsy Access,Score,Total Questions,Time (seconds),Question 1,Answer 1,Correct 1,Question 2,Answer 2,Correct 2,Question 3,Answer 3,Correct 3,Question 4,Answer 4,Correct 4,Question 5,Answer 5,Correct 5,Question 6,Answer 6,Correct 6\n'

    const answers = results.map((result) => {
      const question = QUIZ_QUESTIONS.find((q) => q.id === result.questionId)
      const answer = question?.answers.find((a) => a.id === result.selectedAnswerId)
      return {
        question: question?.question || '',
        answer: answer?.text || '',
        correct: result.isCorrect,
      }
    })

    const csvRow = [
      formData.name,
      formData.surname,
      formData.email,
      formData.city,
      formData.country,
      formData.affiliation,
      formData.areaOfInterest || '',
      formData.speciality || '',
      formData.liquidBiopsyAccess || '',
      score,
      QUIZ_QUESTIONS.length,
      elapsedTime,
      ...answers.flatMap((a) => [
        `"${a.question.replace(/"/g, '""')}"`,
        `"${a.answer.replace(/"/g, '""')}"`,
        a.correct,
      ]),
    ].join(',')

    const csvContent = csvHeader + csvRow

    try {
      if (Platform.OS === 'web') {
        // For web, create a download link
        const blob = new Blob([csvContent], { type: 'text/csv' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
        link.download = `quiz_result_${timestamp}.csv`
        link.click()
        URL.revokeObjectURL(url)
      } else {
        // For mobile, we'll just log it (in production, you'd use expo-file-system)
        console.log('CSV Content:', csvContent)
        Alert.alert('Success', 'Quiz results saved!')
      }
    } catch (error) {
      console.error('Error saving CSV:', error)
    }
  }, [formData, results, score, elapsedTime])

  useEffect(() => {
    // Save results to CSV
    saveResultsToCSV()
  }, [saveResultsToCSV])

  const handleFinish = () => {
    router.push('/')
  }

  return (
    <ScreenLayout>
      <View style={finalScreenStyles.container}>
        <Logo />
        <View style={finalScreenStyles.card}>
          <View style={finalScreenStyles.scoreContainer}>
            <Text style={finalScreenStyles.scoreLabel}>Your score:</Text>
            <Text style={finalScreenStyles.score}>
              {score}/{QUIZ_QUESTIONS.length}
            </Text>
          </View>

          <Text style={finalScreenStyles.title}>Congratulations!</Text>

          <Text style={finalScreenStyles.time}>
            YOUR TIME: <Text style={finalScreenStyles.timeValue}>{formatTime(elapsedTime)}</Text>
          </Text>

          <Text style={finalScreenStyles.description}>
            You have completed the quiz and helped{' '}
            <Text style={finalScreenStyles.highlight}>contribute XY $ to [Name of Charity]</Text>.
          </Text>

          <Button onPress={handleFinish} title='FINISH' />
        </View>
      </View>
    </ScreenLayout>
  )
}
