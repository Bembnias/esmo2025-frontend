import { AnswerOption } from '@/components/ui/answer-option'
import { Button } from '@/components/ui/button'
import { CloseQuizButton } from '@/components/ui/close-quiz-button'
import { ProgressIndicator } from '@/components/ui/progress-indicator'
import { ScreenLayout } from '@/components/ui/screen-layout'
import { useQuiz } from '@/contexts/quiz-context'
import { QUIZ_QUESTIONS } from '@/data/questions'
import { quizScreenStyles } from '@/styles/quiz.styles'
import { Href, useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated'

export default function QuizScreen() {
  const router = useRouter()

  const { currentQuestionIndex, setCurrentQuestionIndex, addResult, setElapsedTime } = useQuiz()
  const [selectedAnswerId, setSelectedAnswerId] = useState<string | null>(null)
  const [isRevealed, setIsRevealed] = useState(false)
  const [startTime] = useState(Date.now())

  const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === QUIZ_QUESTIONS.length - 1

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
      router.push('/word-search' as Href)
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedAnswerId(null)
      setIsRevealed(false)
    }
  }

  return (
    <ScreenLayout>
      <View style={quizScreenStyles.wrapper}>
        <ScrollView style={quizScreenStyles.container} showsVerticalScrollIndicator={false}>
          <View style={quizScreenStyles.header}>
            <CloseQuizButton />
          </View>

          <Animated.View
            key={currentQuestion.id}
            entering={FadeInRight.duration(300)}
            exiting={FadeOutLeft.duration(300)}
            style={quizScreenStyles.card}
          >
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
          </Animated.View>
        </ScrollView>

        <View style={quizScreenStyles.footer}>
          <View style={quizScreenStyles.footerSpacer} />
          <ProgressIndicator total={QUIZ_QUESTIONS.length + 1} current={currentQuestionIndex} />

          {!isRevealed ? (
            <Button onPress={handleReveal} title='REVEAL' variant='outlined' disabled={!selectedAnswerId} />
          ) : (
            <Button onPress={handleNext} title={isLastQuestion ? 'FINISH' : 'NEXT'} />
          )}
        </View>
      </View>
    </ScreenLayout>
  )
}
