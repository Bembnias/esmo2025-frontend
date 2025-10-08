import { useQuiz } from '@/contexts/quiz-context'
import { useRouter } from 'expo-router'
import React, { useRef } from 'react'
import { Image, StyleSheet, TouchableOpacity } from 'react-native'

export const CloseQuizButton = () => {
  const router = useRouter()
  const { resetQuiz } = useQuiz()
  const handleResetQuiz = () => {
    resetQuiz()
    router.push('/')
  }

  const holdTimeout = useRef<number | null>(null)

  const handlePressIn = () => {
    holdTimeout.current = window.setTimeout(() => {
      handleResetQuiz()
    }, 2000)
  }

  const handlePressOut = () => {
    if (holdTimeout.current !== null) {
      clearTimeout(holdTimeout.current)
      holdTimeout.current = null
    }
  }

  return (
    <TouchableOpacity onPressIn={handlePressIn} onPressOut={handlePressOut} activeOpacity={0.7}>
      <Image source={require('@/assets/images/close-icon.png')} style={styles.image} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  image: { width: 60, height: 60 },
})
