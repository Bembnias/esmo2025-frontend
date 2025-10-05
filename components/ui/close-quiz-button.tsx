import React, { useRef } from 'react'
import { Image, StyleSheet, TouchableOpacity } from 'react-native'

export const CloseQuizButton = ({ handleResetQuiz }: { handleResetQuiz: () => void }) => {
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
    <TouchableOpacity style={styles.button} onPressIn={handlePressIn} onPressOut={handlePressOut} activeOpacity={0.7}>
      <Image source={require('@/assets/images/close-icon.png')} style={styles.image} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 24,
  },
  image: { width: 60, height: 60 },
})
