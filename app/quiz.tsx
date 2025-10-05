import { AnswerOption } from '@/components/ui/answer-option'
import { Button } from '@/components/ui/button'
import { CloseQuizButton } from '@/components/ui/close-quiz-button'
import { ProgressIndicator } from '@/components/ui/progress-indicator'
import { ScreenLayout } from '@/components/ui/screen-layout'
import { useQuiz } from '@/contexts/quiz-context'
import { QUIZ_QUESTIONS } from '@/data/questions'
import { quizScreenStyles } from '@/styles/quiz.styles'
import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { ScrollView, Text, View } from 'react-native'

export default function QuizScreen() {
  const router = useRouter()

  const { currentQuestionIndex, setCurrentQuestionIndex, addResult, setElapsedTime, resetQuiz } = useQuiz()
  const [selectedAnswerId, setSelectedAnswerId] = useState<string | null>(null)
  const [isRevealed, setIsRevealed] = useState(false)
  const [startTime] = useState(Date.now())

  const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === QUIZ_QUESTIONS.length - 1

  const handleResetQuiz = () => {
    resetQuiz()
    router.push('/')
  }

  useEffect(() => {
    // Timer starts when quiz screen mounts
    return () => {
      // Update elapsed time when unmounting
      const elapsed = Math.floor((Date.now() - startTime) / 1000)
      setElapsedTime(elapsed)
    }
  }, [startTime, setElapsedTime])

  const handleReveal = () => {
    if (!selectedAnswerId) return

    const selectedAnswer = currentQuestion.answers.find((a) => a.id === selectedAnswerId)
    if (selectedAnswer) {
      addResult({
        questionId: currentQuestion.id,
        selectedAnswerId,
        isCorrect: selectedAnswer.isCorrect,
      })
      setIsRevealed(true)
    }
  }

  const handleNext = () => {
    if (isLastQuestion) {
      const elapsed = Math.floor((Date.now() - startTime) / 1000)
      setElapsedTime(elapsed)
      router.push('/form')
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedAnswerId(null)
      setIsRevealed(false)
    }
  }

  return (
    <ScreenLayout>
      <ScrollView style={quizScreenStyles.container} showsVerticalScrollIndicator={false}>
        <View style={quizScreenStyles.header}>
          <CloseQuizButton handleResetQuiz={handleResetQuiz} />
        </View>

        <View style={quizScreenStyles.card}>
          <Text style={quizScreenStyles.questionText}>{currentQuestion.question}</Text>

          <View style={quizScreenStyles.answersContainer}>
            {currentQuestion.answers.map((answer) => (
              <AnswerOption
                key={answer.id}
                answer={answer}
                isSelected={selectedAnswerId === answer.id}
                isRevealed={isRevealed}
                onSelect={() => !isRevealed && setSelectedAnswerId(answer.id)}
                disabled={isRevealed}
              />
            ))}
          </View>
        </View>

        <View style={quizScreenStyles.footer}>
          <View style={quizScreenStyles.progressContainer}>
            <ProgressIndicator total={QUIZ_QUESTIONS.length} current={currentQuestionIndex} />
          </View>

          {!isRevealed ? (
            <Button onPress={handleReveal} title='REVEAL' disabled={!selectedAnswerId} />
          ) : (
            <Button onPress={handleNext} title={isLastQuestion ? 'FINISH' : 'NEXT'} />
          )}
        </View>
      </ScrollView>
    </ScreenLayout>
  )
}
