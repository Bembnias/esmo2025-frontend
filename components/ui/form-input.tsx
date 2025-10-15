import { formScreenStyles } from '@/styles/form.styles'
import { FormData } from '@/types/quiz'
import React from 'react'
import { Control, Controller, FieldErrors } from 'react-hook-form'
import { Text, TextInput, TextInputProps, View } from 'react-native'

interface FormInputProps {
  control: Control<FormData>
  name: keyof FormData
  placeholder: string
  rules?: any
  errors: FieldErrors<FormData>
  onScrollToInput?: (ref: any) => void
  inputProps?: Partial<TextInputProps>
}

export function FormInput({ control, name, placeholder, rules, errors, onScrollToInput, inputProps }: FormInputProps) {
  const error = errors[name]

  return (
    <View style={formScreenStyles.inputContainer}>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[formScreenStyles.input, error && formScreenStyles.inputError]}
            placeholder={placeholder}
            value={value as string}
            onChangeText={onChange}
            onFocus={(e) => onScrollToInput?.(e.currentTarget)}
            {...inputProps}
          />
        )}
      />
      {error && <Text style={formScreenStyles.errorText}>{error.message as string}</Text>}
    </View>
  )
}
