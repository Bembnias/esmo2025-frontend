import { Button } from '@/components/ui/button'
import { CloseQuizButton } from '@/components/ui/close-quiz-button'
import { MarketingConsentCheckbox, PrivacyConsentCheckbox } from '@/components/ui/form-checkbox'
import { FormDropdown } from '@/components/ui/form-dropdown'
import { FormInput } from '@/components/ui/form-input'
import { Logo } from '@/components/ui/logo'
import { ScreenLayout } from '@/components/ui/screen-layout'
import { LIQUID_BIOPSY_OPTIONS, SPECIALITY_OPTIONS } from '@/constants/form-options'
import { useDonationForm } from '@/hooks/use-donation-form'
import {
  validateAffiliation,
  validateAreaOfInterest,
  validateEmail,
  validateLocation,
  validateName,
} from '@/utils/form-validation'
import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import { formScreenStyles } from '../styles/form.styles'

export default function FormScreen() {
  const {
    control,
    errors,
    isFormValid,
    isKeyboardVisible,
    scrollViewRef,
    scrollOffsetY,
    handleSubmit,
    onSubmit,
    scrollToInput,
  } = useDonationForm()

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
          <Text style={formScreenStyles.title}>
            Submit your details and help us donate{'\n'}to World CUP Alliance on your behalf
          </Text>

          <View style={formScreenStyles.row}>
            <FormInput
              control={control}
              name='name'
              placeholder='Name'
              rules={{
                required: 'Name is required',
                validate: validateName,
              }}
              errors={errors}
              onScrollToInput={scrollToInput}
            />

            <FormInput
              control={control}
              name='surname'
              placeholder='Surname'
              rules={{
                required: 'Surname is required',
                validate: validateName,
              }}
              errors={errors}
              onScrollToInput={scrollToInput}
            />
          </View>

          <FormInput
            control={control}
            name='email'
            placeholder='Email'
            rules={{
              required: 'Email is required',
              validate: validateEmail,
            }}
            errors={errors}
            onScrollToInput={scrollToInput}
            inputProps={{
              keyboardType: 'email-address',
              autoCapitalize: 'none',
            }}
          />

          <View style={formScreenStyles.row}>
            <FormInput
              control={control}
              name='city'
              placeholder='City'
              rules={{
                required: 'City is required',
                validate: validateLocation,
              }}
              errors={errors}
              onScrollToInput={scrollToInput}
            />

            <FormInput
              control={control}
              name='country'
              placeholder='Country'
              rules={{
                required: 'Country is required',
                validate: validateLocation,
              }}
              errors={errors}
              onScrollToInput={scrollToInput}
            />
          </View>

          <View style={formScreenStyles.row}>
            <FormInput
              control={control}
              name='affiliation'
              placeholder='Affiliation'
              rules={{
                required: 'Affiliation is required',
                validate: validateAffiliation,
              }}
              errors={errors}
              onScrollToInput={scrollToInput}
            />

            <FormInput
              control={control}
              name='areaOfInterest'
              placeholder='Area of interest*'
              rules={{
                validate: validateAreaOfInterest,
              }}
              errors={errors}
              onScrollToInput={scrollToInput}
            />
          </View>

          <View style={formScreenStyles.row}>
            <FormDropdown
              control={control}
              name='speciality'
              placeholder='Speciality*'
              options={SPECIALITY_OPTIONS}
              errors={errors}
            />

            <FormDropdown
              control={control}
              name='liquidBiopsyAccess'
              placeholder='Do you have access to liquid biopsy?'
              options={LIQUID_BIOPSY_OPTIONS}
              rules={{ required: 'This field is required' }}
              errors={errors}
            />
          </View>

          <PrivacyConsentCheckbox control={control} />
          {errors.privacyConsent && <Text style={formScreenStyles.errorText}>{errors.privacyConsent.message}</Text>}

          <MarketingConsentCheckbox control={control} />

          <Text style={formScreenStyles.optional}>* optional</Text>
        </View>
        <View style={formScreenStyles.buttonContainer}>
          <Button disabled={!isFormValid} onPress={handleSubmit(onSubmit)} title='CONFIRM' />
        </View>
      </ScrollView>
    </ScreenLayout>
  )
}
