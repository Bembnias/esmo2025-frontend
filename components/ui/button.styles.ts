import { BorderRadius, Colors, FontSizes, Spacing } from '@/constants/theme'
import { StyleSheet } from 'react-native'

export const buttonStyles = StyleSheet.create({
  button: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 200,
  },
  buttonHero: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xxl,
    minWidth: 300,
  },
  buttonPrimary: {
    backgroundColor: Colors.bloodRed,
    borderColor: Colors.bloodRed,
    borderWidth: 4,
  },
  buttonOutlined: {
    backgroundColor: 'transparent',
    borderColor: Colors.bloodRed,
    borderWidth: 4,
  },
  buttonDisabled: {
    color: Colors.lightGray,
    backgroundColor: Colors.white,
    borderColor: Colors.lightGray,
    borderWidth: 4,
  },
  buttonText: {
    color: Colors.white,
    fontSize: FontSizes.lg,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  buttonTextHero: {
    fontFamily: 'DMSans_600SemiBold',
    fontSize: FontSizes.xxl * 2,
  },
  buttonTextOutlined: {
    color: Colors.bloodRed,
  },
  buttonTextDisabled: {
    color: Colors.lightGray,
  },
})
