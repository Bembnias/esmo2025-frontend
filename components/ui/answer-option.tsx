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
      return (
        <View style={answerOptionStyles.iconContainer}>
          <Ionicons name='checkmark' size={24} color={Colors.white} />
        </View>
      )
    }

    if (isSelected && !answer.isCorrect) {
      return (
        <View style={answerOptionStyles.iconContainer}>
          <Ionicons name='close' size={24} color={Colors.white} />
        </View>
      )
    }

    return null
  }

  return (
    <TouchableOpacity
      style={[answerOptionStyles.option, getOptionStyle()]}
      onPress={onSelect}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={[answerOptionStyles.optionLabel, isRevealed && answerOptionStyles.optionLabelRevealed]}>
        {answer.id}.
      </Text>
      <Text style={[answerOptionStyles.optionText, isRevealed && answerOptionStyles.optionTextRevealed]}>
        {answer.text}
      </Text>
      {renderIcon()}
    </TouchableOpacity>
  )
}
