import { Button } from '@/components/ui/button'
import { CloseQuizButton } from '@/components/ui/close-quiz-button'
import { Dropdown } from '@/components/ui/dropdown'
import { Logo } from '@/components/ui/logo'
import { ScreenLayout } from '@/components/ui/screen-layout'
import { Colors } from '@/constants/theme'
import { useQuiz } from '@/contexts/quiz-context'
import { FormData } from '@/types/quiz'
import { Ionicons } from '@expo/vector-icons'
import { Link, router } from 'expo-router'
import React, { useEffect, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Keyboard, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { formScreenStyles } from '../styles/form.styles'

const SPECIALITY_OPTIONS = [
  'Medical Oncology',
  'Surgical Oncology',
  'Radiation Oncology',
  'Hematology',
  'Pathology',
  'Radiology',
  'Other',
]

const LIQUID_BIOPSY_OPTIONS = ['Yes', 'No']

export default function FormScreen() {
  const { setFormData } = useQuiz()
  const scrollViewRef = useRef<ScrollView>(null)
  const scrollOffsetY = useRef(0)
  const [isKeyboardVisible, setKeyboardVisible] = useState(false)

  const {
    control,
    handleSubmit,
    watch,
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

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true)
    })
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false)
    })

    return () => {
      keyboardDidShowListener.remove()
      keyboardDidHideListener.remove()
    }
  }, [])

  // Watch required fields
  const formValues = watch()
  const isFormValid =
    !!formValues.name?.trim() &&
    !!formValues.surname?.trim() &&
    !!formValues.email?.trim() &&
    !!formValues.city?.trim() &&
    !!formValues.country?.trim() &&
    !!formValues.affiliation?.trim() &&
    !!formValues.liquidBiopsyAccess &&
    !!formValues.privacyConsent &&
    !errors.email // Check email is valid

  const onSubmit = (data: FormData) => {
    // Trim all text fields before submitting
    const trimmedData: FormData = {
      ...data,
      name: data.name.trim(),
      surname: data.surname.trim(),
      email: data.email.trim(),
      city: data.city.trim(),
      country: data.country.trim(),
      affiliation: data.affiliation.trim(),
      areaOfInterest: data.areaOfInterest?.trim() || '',
    }
    setFormData(trimmedData)
    router.push('/final')
  }

  const scrollToInput = (inputRef: any) => {
    setTimeout(() => {
      inputRef?.measureInWindow((_x: number, y: number, _width: number, _height: number) => {
        // Calculate how much to scroll
        // y is the absolute position on screen
        // We want to scroll so the input is visible with some offset from top
        const keyboardOffset = 250
        const targetScrollY = scrollOffsetY.current + y - keyboardOffset

        scrollViewRef.current?.scrollTo({
          y: Math.max(0, targetScrollY),
          animated: true,
        })
      })
    }, 300)
  }

  return (
    <ScreenLayout>
      <ScrollView
        ref={scrollViewRef}
        style={formScreenStyles.container}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps='handled'
        contentContainerStyle={{ paddingBottom: isKeyboardVisible ? 500 : 0 }}
        onScroll={(event) => {
          scrollOffsetY.current = event.nativeEvent.contentOffset.y
        }}
        scrollEventThrottle={16}
      >
        <View style={formScreenStyles.header}>
          <Logo />
        </View>
        <View style={formScreenStyles.floatingButton}>
          <CloseQuizButton />
        </View>

        <View style={formScreenStyles.card}>
          <Text style={formScreenStyles.title}>Submit your details and help us donate{'\n'}to XYZ on your behalf</Text>

          <View style={formScreenStyles.row}>
            <View style={formScreenStyles.inputContainer}>
              <Controller
                control={control}
                name='name'
                rules={{
                  required: 'Name is required',
                  validate: (value) => value.trim().length > 0 || 'Name cannot be empty',
                }}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={[formScreenStyles.input, errors.name && formScreenStyles.inputError]}
                    placeholder='Name'
                    value={value}
                    onChangeText={onChange}
                    onFocus={(e) => scrollToInput(e.currentTarget)}
                  />
                )}
              />
              {errors.name && <Text style={formScreenStyles.errorText}>{errors.name.message}</Text>}
            </View>

            <View style={formScreenStyles.inputContainer}>
              <Controller
                control={control}
                name='surname'
                rules={{
                  required: 'Surname is required',
                  validate: (value) => value.trim().length > 0 || 'Surname cannot be empty',
                }}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={[formScreenStyles.input, errors.surname && formScreenStyles.inputError]}
                    placeholder='Surname'
                    value={value}
                    onChangeText={onChange}
                    onFocus={(e) => scrollToInput(e.currentTarget)}
                  />
                )}
              />
              {errors.surname && <Text style={formScreenStyles.errorText}>{errors.surname.message}</Text>}
            </View>
          </View>

          <View style={formScreenStyles.inputContainer}>
            <Controller
              control={control}
              name='email'
              rules={{
                required: 'Email is required',
                validate: (value) => value.trim().length > 0 || 'Email cannot be empty',
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
                  onFocus={(e) => scrollToInput(e.currentTarget)}
                />
              )}
            />
            {errors.email && <Text style={formScreenStyles.errorText}>{errors.email.message}</Text>}
          </View>

          <View style={formScreenStyles.row}>
            <View style={formScreenStyles.inputContainer}>
              <Controller
                control={control}
                name='city'
                rules={{
                  required: 'City is required',
                  validate: (value) => value.trim().length > 0 || 'City cannot be empty',
                }}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={[formScreenStyles.input, errors.city && formScreenStyles.inputError]}
                    placeholder='City'
                    value={value}
                    onChangeText={onChange}
                    onFocus={(e) => scrollToInput(e.currentTarget)}
                  />
                )}
              />
              {errors.city && <Text style={formScreenStyles.errorText}>{errors.city.message}</Text>}
            </View>

            <View style={formScreenStyles.inputContainer}>
              <Controller
                control={control}
                name='country'
                rules={{
                  required: 'Country is required',
                  validate: (value) => value.trim().length > 0 || 'Country cannot be empty',
                }}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={[formScreenStyles.input, errors.country && formScreenStyles.inputError]}
                    placeholder='Country'
                    value={value}
                    onChangeText={onChange}
                    onFocus={(e) => scrollToInput(e.currentTarget)}
                  />
                )}
              />
              {errors.country && <Text style={formScreenStyles.errorText}>{errors.country.message}</Text>}
            </View>
          </View>

          <View style={formScreenStyles.row}>
            <View style={formScreenStyles.inputContainer}>
              <Controller
                control={control}
                name='affiliation'
                rules={{
                  required: 'Affiliation is required',
                  validate: (value) => value.trim().length > 0 || 'Affiliation cannot be empty',
                }}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={[formScreenStyles.input, errors.affiliation && formScreenStyles.inputError]}
                    placeholder='Affiliation'
                    value={value}
                    onChangeText={onChange}
                    onFocus={(e) => scrollToInput(e.currentTarget)}
                  />
                )}
              />
              {errors.affiliation && <Text style={formScreenStyles.errorText}>{errors.affiliation.message}</Text>}
            </View>

            <View style={formScreenStyles.inputContainer}>
              <Controller
                control={control}
                name='areaOfInterest'
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={formScreenStyles.input}
                    placeholder='Area of interest*'
                    value={value}
                    onChangeText={onChange}
                    onFocus={(e) => scrollToInput(e.currentTarget)}
                  />
                )}
              />
            </View>
          </View>

          <View style={formScreenStyles.row}>
            <View style={formScreenStyles.inputContainer}>
              <Controller
                control={control}
                name='speciality'
                render={({ field: { onChange, value } }) => (
                  <Dropdown
                    placeholder='Speciality*'
                    value={value || ''}
                    options={SPECIALITY_OPTIONS}
                    onSelect={onChange}
                  />
                )}
              />
            </View>

            <View style={formScreenStyles.inputContainer}>
              <Controller
                control={control}
                name='liquidBiopsyAccess'
                rules={{ required: 'This field is required' }}
                render={({ field: { onChange, value } }) => (
                  <Dropdown
                    placeholder='Do you have access to liquid biopsy?'
                    value={value || ''}
                    options={LIQUID_BIOPSY_OPTIONS}
                    onSelect={onChange}
                    error={!!errors.liquidBiopsyAccess}
                  />
                )}
              />
              {errors.liquidBiopsyAccess && (
                <Text style={formScreenStyles.errorText}>{errors.liquidBiopsyAccess.message}</Text>
              )}
            </View>
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
                  By submitting your survey responses, you acknowledge that your personal data and survey responses will
                  be processed by Guardant Health in accordance with its{' '}
                  <Link
                    style={{ textDecorationLine: 'underline' }}
                    href='https://guardanthealth.com/contact/privacy-policy/'
                  >
                    Privacy Policy
                  </Link>
                  .
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
                  By checking this box, you agree that Guardant Health may send you educational and/or promotional
                  materials at the email address you provided. You can opt-out of these emails at any time using the
                  link provided therein or{' '}
                  <Link
                    style={{ textDecorationLine: 'underline' }}
                    href='https://guardanthealth.com/your-privacy-choices/'
                  >
                    by submitting a request here.
                  </Link>{' '}
                  For more information about how we will use your personal data for this purpose, please see our{' '}
                  <Link
                    style={{ textDecorationLine: 'underline' }}
                    href='https://guardanthealth.com/contact/privacy-policy/'
                  >
                    Privacy Policy
                  </Link>
                  .<Text> *</Text>
                </Text>
              </TouchableOpacity>
            )}
          />

          <Text style={formScreenStyles.optional}>* optional</Text>
        </View>
        <View style={formScreenStyles.buttonContainer}>
          <Button disabled={!isFormValid} onPress={handleSubmit(onSubmit)} title='CONFIRM' />
        </View>
      </ScrollView>
    </ScreenLayout>
  )
}
