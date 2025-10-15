import { Dropdown } from '@/components/ui/dropdown'
import { formScreenStyles } from '@/styles/form.styles'
import { FormData } from '@/types/quiz'
import React from 'react'
import { Control, Controller, FieldErrors } from 'react-hook-form'
import { Text, View } from 'react-native'

interface FormDropdownProps {
  control: Control<FormData>
  name: keyof FormData
  placeholder: string
  options: string[]
  rules?: any
  errors: FieldErrors<FormData>
}

export function FormDropdown({ control, name, placeholder, options, rules, errors }: FormDropdownProps) {
  const error = errors[name]

  return (
    <View style={formScreenStyles.inputContainer}>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, value } }) => (
          <Dropdown
            placeholder={placeholder}
            value={(value as string) || ''}
            options={options}
            onSelect={onChange}
            error={!!error}
          />
        )}
      />
      {error && <Text style={formScreenStyles.errorText}>{error.message as string}</Text>}
    </View>
  )
}
