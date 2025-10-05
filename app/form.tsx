import { Button } from '@/components/ui/button'
import { Logo } from '@/components/ui/logo'
import { ScreenLayout } from '@/components/ui/screen-layout'
import { Colors } from '@/constants/theme'
import { useQuiz } from '@/contexts/quiz-context'
import { FormData } from '@/types/quiz'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { formScreenStyles } from '../styles/form.styles'

export default function FormScreen() {
  const { setFormData } = useQuiz()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      surname: '',
      email: '',
      city: '',
      country: '',
      affiliation: '',
      areaOfInterest: '',
      speciality: '',
      liquidBiopsyAccess: '',
      privacyConsent: false,
      marketingConsent: false,
    },
  })

  const onSubmit = (data: FormData) => {
    setFormData(data)
    router.push('/final')
  }

  return (
    <ScreenLayout>
      <ScrollView style={formScreenStyles.container} showsVerticalScrollIndicator={false}>
        <View style={formScreenStyles.header}>
          <Logo />
        </View>

        <View style={formScreenStyles.card}>
          <Text style={formScreenStyles.title}>Submit your details and help us donate{'\n'}to XYZ on your behalf</Text>

          <View style={formScreenStyles.row}>
            <View style={formScreenStyles.inputContainer}>
              <Text style={formScreenStyles.label}>
                Name<Text style={formScreenStyles.required}>*</Text>
              </Text>
              <Controller
                control={control}
                name='name'
                rules={{ required: 'Name is required' }}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={[formScreenStyles.input, errors.name && formScreenStyles.inputError]}
                    placeholder='Name'
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />
              {errors.name && <Text style={formScreenStyles.errorText}>{errors.name.message}</Text>}
            </View>

            <View style={formScreenStyles.inputContainer}>
              <Text style={formScreenStyles.label}>
                Surname<Text style={formScreenStyles.required}>*</Text>
              </Text>
              <Controller
                control={control}
                name='surname'
                rules={{ required: 'Surname is required' }}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={[formScreenStyles.input, errors.surname && formScreenStyles.inputError]}
                    placeholder='Surname'
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />
              {errors.surname && <Text style={formScreenStyles.errorText}>{errors.surname.message}</Text>}
            </View>
          </View>

          <View style={formScreenStyles.inputContainer}>
            <Text style={formScreenStyles.label}>
              Email<Text style={formScreenStyles.required}>*</Text>
            </Text>
            <Controller
              control={control}
              name='email'
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={[formScreenStyles.input, errors.email && formScreenStyles.inputError]}
                  placeholder='Email'
                  value={value}
                  onChangeText={onChange}
                  keyboardType='email-address'
                  autoCapitalize='none'
                />
              )}
            />
            {errors.email && <Text style={formScreenStyles.errorText}>{errors.email.message}</Text>}
          </View>

          <View style={formScreenStyles.row}>
            <View style={formScreenStyles.inputContainer}>
              <Text style={formScreenStyles.label}>
                City<Text style={formScreenStyles.required}>*</Text>
              </Text>
              <Controller
                control={control}
                name='city'
                rules={{ required: 'City is required' }}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={[formScreenStyles.input, errors.city && formScreenStyles.inputError]}
                    placeholder='City'
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />
              {errors.city && <Text style={formScreenStyles.errorText}>{errors.city.message}</Text>}
            </View>

            <View style={formScreenStyles.inputContainer}>
              <Text style={formScreenStyles.label}>
                Country<Text style={formScreenStyles.required}>*</Text>
              </Text>
              <Controller
                control={control}
                name='country'
                rules={{ required: 'Country is required' }}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={[formScreenStyles.input, errors.country && formScreenStyles.inputError]}
                    placeholder='Country'
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />
              {errors.country && <Text style={formScreenStyles.errorText}>{errors.country.message}</Text>}
            </View>
          </View>

          <View style={formScreenStyles.inputContainer}>
            <Text style={formScreenStyles.label}>
              Affiliation<Text style={formScreenStyles.required}>*</Text>
            </Text>
            <Controller
              control={control}
              name='affiliation'
              rules={{ required: 'Affiliation is required' }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={[formScreenStyles.input, errors.affiliation && formScreenStyles.inputError]}
                  placeholder='Affiliation'
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
            {errors.affiliation && <Text style={formScreenStyles.errorText}>{errors.affiliation.message}</Text>}
          </View>

          <View style={formScreenStyles.inputContainer}>
            <Text style={formScreenStyles.label}>Area of interest</Text>
            <Controller
              control={control}
              name='areaOfInterest'
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={formScreenStyles.input}
                  placeholder='Area of interest'
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
          </View>

          <View style={formScreenStyles.inputContainer}>
            <Text style={formScreenStyles.label}>Speciality</Text>
            <Controller
              control={control}
              name='speciality'
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={formScreenStyles.input}
                  placeholder='Speciality'
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
          </View>

          <View style={formScreenStyles.inputContainer}>
            <Text style={formScreenStyles.label}>Do you have access to liquid biopsy?</Text>
            <Controller
              control={control}
              name='liquidBiopsyAccess'
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={formScreenStyles.input}
                  placeholder='Do you have access to liquid biopsy?'
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
          </View>

          <Controller
            control={control}
            name='privacyConsent'
            rules={{ required: 'You must accept the privacy policy' }}
            render={({ field: { onChange, value } }) => (
              <TouchableOpacity style={formScreenStyles.checkboxContainer} onPress={() => onChange(!value)}>
                <View style={[formScreenStyles.checkbox, value && formScreenStyles.checkboxChecked]}>
                  {value && <Ionicons name='checkmark' size={16} color={Colors.white} />}
                </View>
                <Text style={formScreenStyles.checkboxLabel}>
                  By providing your details you acknowledge the processing of personal data and sharing of the proceeded
                  by Guardant Health in accordance with its Privacy Policy
                  <Text style={formScreenStyles.required}>*</Text>
                </Text>
              </TouchableOpacity>
            )}
          />
          {errors.privacyConsent && <Text style={formScreenStyles.errorText}>{errors.privacyConsent.message}</Text>}

          <Controller
            control={control}
            name='marketingConsent'
            render={({ field: { onChange, value } }) => (
              <TouchableOpacity style={formScreenStyles.checkboxContainer} onPress={() => onChange(!value)}>
                <View style={[formScreenStyles.checkbox, value && formScreenStyles.checkboxChecked]}>
                  {value && <Ionicons name='checkmark' size={16} color={Colors.white} />}
                </View>
                <Text style={formScreenStyles.checkboxLabel}>
                  By checking this box you agree that Guardant Health may send you educational and/or promotional
                  materials at the email address you provided. We will never sell your information. For more information
                  about how we use your data, please see our Privacy Policy. Optional
                </Text>
              </TouchableOpacity>
            )}
          />

          <View style={formScreenStyles.footer}>
            <Button onPress={handleSubmit(onSubmit)} title='CONFIRM' />
          </View>
        </View>
      </ScrollView>
    </ScreenLayout>
  )
}
