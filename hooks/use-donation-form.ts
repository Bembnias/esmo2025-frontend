import { useQuiz } from '@/contexts/quiz-context'
import { FormData } from '@/types/quiz'
import { router } from 'expo-router'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Keyboard, ScrollView } from 'react-native'

export function useDonationForm() {
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

  return {
    control,
    errors,
    isFormValid,
    isKeyboardVisible,
    scrollViewRef,
    scrollOffsetY,
    handleSubmit,
    onSubmit,
    scrollToInput,
  }
}
