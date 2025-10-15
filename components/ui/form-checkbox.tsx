import { Colors } from '@/constants/theme'
import { formScreenStyles } from '@/styles/form.styles'
import { FormData } from '@/types/quiz'
import { Ionicons } from '@expo/vector-icons'
import { Link } from 'expo-router'
import React from 'react'
import { Control, Controller } from 'react-hook-form'
import { Text, TouchableOpacity, View } from 'react-native'

interface FormCheckboxProps {
  control: Control<FormData>
  name: keyof FormData
  rules?: any
  children: React.ReactNode
}

export function FormCheckbox({ control, name, rules, children }: FormCheckboxProps) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value } }) => (
        <TouchableOpacity style={formScreenStyles.checkboxContainer} onPress={() => onChange(!value)}>
          <View style={[formScreenStyles.checkbox, value && formScreenStyles.checkboxChecked]}>
            {value && <Ionicons name='checkmark' size={16} color={Colors.white} />}
          </View>
          <Text style={formScreenStyles.checkboxLabel}>{children}</Text>
        </TouchableOpacity>
      )}
    />
  )
}

interface PrivacyConsentCheckboxProps {
  control: Control<FormData>
}

export function PrivacyConsentCheckbox({ control }: PrivacyConsentCheckboxProps) {
  return (
    <FormCheckbox control={control} name='privacyConsent' rules={{ required: 'You must accept the privacy policy' }}>
      By submitting your survey responses, you acknowledge that your personal data and survey responses will be
      processed by Guardant Health in accordance with its{' '}
      <Link style={{ textDecorationLine: 'underline' }} href='https://guardanthealth.com/contact/privacy-policy/'>
        Privacy Policy
      </Link>
      .
    </FormCheckbox>
  )
}

interface MarketingConsentCheckboxProps {
  control: Control<FormData>
}

export function MarketingConsentCheckbox({ control }: MarketingConsentCheckboxProps) {
  return (
    <FormCheckbox control={control} name='marketingConsent'>
      By checking this box, you agree that Guardant Health may send you educational and/or promotional materials at the
      email address you provided. You can opt-out of these emails at any time using the link provided therein or{' '}
      <Link style={{ textDecorationLine: 'underline' }} href='https://guardanthealth.com/your-privacy-choices/'>
        by submitting a request here.
      </Link>{' '}
      For more information about how we will use your personal data for this purpose, please see our{' '}
      <Link style={{ textDecorationLine: 'underline' }} href='https://guardanthealth.com/contact/privacy-policy/'>
        Privacy Policy
      </Link>
      .<Text> *</Text>
    </FormCheckbox>
  )
}
