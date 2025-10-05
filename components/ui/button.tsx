import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { buttonStyles } from './button.styles'

interface ButtonProps {
  onPress: () => void
  title: string
  disabled?: boolean
}

export const Button: React.FC<ButtonProps> = ({ onPress, title, disabled = false }) => {
  return (
    <TouchableOpacity
      style={[buttonStyles.button, disabled ? buttonStyles.buttonDisabled : buttonStyles.buttonPrimary]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text style={[buttonStyles.buttonText, disabled && buttonStyles.buttonTextDisabled]}>{title}</Text>
    </TouchableOpacity>
  )
}
