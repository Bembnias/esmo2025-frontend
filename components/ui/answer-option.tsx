import { Colors } from '@/constants/theme'
import { QuizAnswer } from '@/types/quiz'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { answerOptionStyles } from './answer-option.styles'

interface AnswerOptionProps {
  answer: QuizAnswer
  isSelected: boolean
  isRevealed: boolean
  onSelect: () => void
  disabled: boolean
}

export const AnswerOption: React.FC<AnswerOptionProps> = ({ answer, isSelected, isRevealed, onSelect, disabled }) => {
  const getOptionStyle = () => {
    if (isRevealed) {
      if (answer.isCorrect) {
        return answerOptionStyles.optionCorrect
      }
      if (isSelected && !answer.isCorrect) {
        return answerOptionStyles.optionIncorrect
      }
    }
    if (isSelected && !isRevealed) {
      return answerOptionStyles.optionSelected
    }
    return {}
  }

  const renderIcon = () => {
    if (!isRevealed) return null

    if (answer.isCorrect) {
      return <Ionicons name='checkmark' size={40.5} color={Colors.white} />
    }

    if (isSelected && !answer.isCorrect) {
      return <Ionicons name='close' size={40.5} color={Colors.white} />
    }

    return null
  }

  const shouldShowIcon = isRevealed && (answer.isCorrect || isSelected)
  const shouldUseRevealedStyle = isRevealed && (answer.isCorrect || isSelected)

  return (
    <TouchableOpacity
      style={[answerOptionStyles.option, getOptionStyle()]}
      onPress={onSelect}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <View style={answerOptionStyles.labelContainer}>
        {shouldShowIcon ? (
          renderIcon()
        ) : (
          <Text
            style={[answerOptionStyles.optionLabel, shouldUseRevealedStyle && answerOptionStyles.optionLabelRevealed]}
          >
            {answer.id}.
          </Text>
        )}
      </View>
      <Text style={[answerOptionStyles.optionText, shouldUseRevealedStyle && answerOptionStyles.optionTextRevealed]}>
        {answer.text}
      </Text>
    </TouchableOpacity>
  )
}
