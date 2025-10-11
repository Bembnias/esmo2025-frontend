import { Button } from '@/components/ui/button'
import { ScreenLayout } from '@/components/ui/screen-layout'
import { Colors } from '@/constants/theme'
import { useQuiz } from '@/contexts/quiz-context'
import { QUIZ_QUESTIONS } from '@/data/questions'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { reviewScreenStyles } from '../styles/review.styles'

export default function ReviewScreen() {
  const { results } = useQuiz()
  const [expandedQuestions, setExpandedQuestions] = useState<number[]>([])

  const toggleQuestion = (questionId: number) => {
    setExpandedQuestions((prev) =>
      prev.includes(questionId) ? prev.filter((id) => id !== questionId) : [...prev, questionId]
    )
  }

  const getExplanationImage = (questionId: number) => {
    const images = {
      1: require('@/assets/images/explanatory/q1.png'),
      2: require('@/assets/images/explanatory/q2.png'),
      3: require('@/assets/images/explanatory/q3.png'),
      4: require('@/assets/images/explanatory/q4.png'),
      5: require('@/assets/images/explanatory/q5.png'),
    }
    return images[questionId as keyof typeof images]
  }

  const getImageHeight = (questionId: number) => {
    const heights = {
      1: 610,
      2: 500,
      3: 1650,
      4: 610,
      5: 720,
    }
    return heights[questionId as keyof typeof heights]
  }

  const handleFinish = () => {
    router.push('/')
  }

  return (
    <ScreenLayout>
      <View style={reviewScreenStyles.container}>
        <ScrollView
          style={reviewScreenStyles.scrollContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={reviewScreenStyles.scrollContent}
        >
          {QUIZ_QUESTIONS.map((question) => {
            const result = results.find((r) => r.questionId === question.id)
            const userAnswer = question.answers.find((a) => a.id === result?.selectedAnswerId)
            const correctAnswer = question.answers.find((a) => a.isCorrect)
            const isExpanded = expandedQuestions.includes(question.id)
            const isCorrect = result?.isCorrect || false

            return (
              <View key={question.id} style={reviewScreenStyles.questionContainer}>
                <Text style={reviewScreenStyles.questionTitle}>
                  {question.question.split('EGFR').map((part, index, array) => (
                    <React.Fragment key={index}>
                      {part}
                      {index < array.length - 1 && <Text style={reviewScreenStyles.egfrText}>EGFR</Text>}
                    </React.Fragment>
                  ))}
                </Text>

                <TouchableOpacity
                  style={[
                    reviewScreenStyles.questionHeader,
                    isCorrect ? reviewScreenStyles.questionHeaderCorrect : reviewScreenStyles.questionHeaderIncorrect,
                  ]}
                  onPress={() => toggleQuestion(question.id)}
                  activeOpacity={0.7}
                >
                  <View style={reviewScreenStyles.questionHeaderLeft}>
                    <View style={reviewScreenStyles.iconContainer}>
                      <Ionicons name={isCorrect ? 'checkmark' : 'close'} size={40} color={Colors.white} />
                    </View>
                    <Text style={reviewScreenStyles.answerText}>
                      <Text style={reviewScreenStyles.highlighted}>Your answer:</Text> {userAnswer?.text || 'No answer'}
                    </Text>
                  </View>
                  <Ionicons
                    name={isExpanded ? 'chevron-up' : 'chevron-down'}
                    size={24}
                    color={Colors.white}
                    style={reviewScreenStyles.expandIcon}
                  />
                </TouchableOpacity>

                {isExpanded && (
                  <View style={reviewScreenStyles.answerContent}>
                    {!isCorrect ? (
                      <View style={reviewScreenStyles.correctAnswerContainer}>
                        <Text style={reviewScreenStyles.correctMessage}>
                          <Text style={reviewScreenStyles.sectionTitle}>Correct answer: </Text>
                          {correctAnswer && <Text>{correctAnswer.text}</Text>}
                        </Text>
                      </View>
                    ) : (
                      <View style={reviewScreenStyles.correctAnswerContainer}>
                        <Text style={reviewScreenStyles.yourAnswerCorrect}>Your answer is correct!</Text>
                      </View>
                    )}

                    <View style={reviewScreenStyles.explanationContainer}>
                      <Image
                        source={getExplanationImage(question.id)}
                        style={[
                          reviewScreenStyles.explanationImage,
                          { height: getImageHeight(question.id), marginTop: question.id === 3 || 4 ? -30 : 0 },
                        ]}
                      />
                    </View>
                  </View>
                )}
              </View>
            )
          })}
        </ScrollView>

        <View style={reviewScreenStyles.stickyFooter}>
          <LinearGradient
            colors={['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.8)', 'rgba(255, 255, 255, 1)']}
            style={reviewScreenStyles.gradientOverlay}
            pointerEvents='none'
          />
          <View style={reviewScreenStyles.buttonWrapper}>
            <Button onPress={handleFinish} title='FINISH' />
          </View>
        </View>
      </View>
    </ScreenLayout>
  )
}
