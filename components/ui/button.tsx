import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { buttonStyles } from './button.styles'

interface ButtonProps {
  onPress: () => void
  title: string
  disabled?: boolean
  variant?: 'default' | 'hero'
}

export const Button: React.FC<ButtonProps> = ({ onPress, title, disabled = false, variant = 'default' }) => {
  return (
    <TouchableOpacity
      style={[
        buttonStyles.button,
        variant === 'hero' && buttonStyles.buttonHero,
        disabled ? buttonStyles.buttonDisabled : buttonStyles.buttonPrimary,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text
        style={[
          buttonStyles.buttonText,
          variant === 'hero' && buttonStyles.buttonTextHero,
          disabled && buttonStyles.buttonTextDisabled,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  )
}
