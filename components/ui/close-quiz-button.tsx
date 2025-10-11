import { Colors } from '@/constants/theme'
import { useQuiz } from '@/contexts/quiz-context'
import { usePathname, useRouter } from 'expo-router'
import React, { useRef } from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { QuizTimer } from './quiz-timer'

export const CloseQuizButton = () => {
  const router = useRouter()
  const pathName = usePathname()
  const { resetQuiz } = useQuiz()
  const handleResetQuiz = () => {
    resetQuiz()
    router.push('/')
  }

  const holdTimeout = useRef<number | null>(null)

  const handlePressIn = () => {
    holdTimeout.current = window.setTimeout(() => {
      handleResetQuiz()
    }, 800)
  }

  const handlePressOut = () => {
    if (holdTimeout.current !== null) {
      clearTimeout(holdTimeout.current)
      holdTimeout.current = null
    }
  }

  return (
    <View style={styles.container}>
      {(pathName === '/quiz' || pathName === '/word-search') && <QuizTimer />}
      <TouchableOpacity onPressIn={handlePressIn} onPressOut={handlePressOut} activeOpacity={0.7}>
        <Image source={require('@/assets/images/close-icon.png')} style={styles.image} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: Colors.white,
  },
  image: { width: 60, height: 60 },
})
