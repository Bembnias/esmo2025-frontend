import { Colors, FontSizes } from '@/constants/theme'
import { useQuiz } from '@/contexts/quiz-context'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export const QuizTimer = () => {
  const { elapsedTime } = useQuiz()

  const minutes = Math.floor(elapsedTime / 60)
  const seconds = elapsedTime % 60

  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`

  return (
    <View style={styles.timerWrapper}>
      <Text style={styles.timer}>{formattedTime}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  timerWrapper: {
    borderWidth: 4,
    borderColor: Colors.lightGray,
    borderRadius: 30,
    width: 140,
  },
  timer: {
    fontSize: FontSizes.xxl - 2,
    color: Colors.scienceBlue,
    fontFamily: 'DMSans_700Bold',
    textAlign: 'center',
    paddingVertical: 0,
    paddingHorizontal: 16,
  },
})
