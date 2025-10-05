import { Spacing } from '@/constants/theme'
import { StyleSheet } from 'react-native'

export const logoStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: Spacing.md,
  },
  logo: {
    width: 200,
    height: 60,
    resizeMode: 'contain',
  },
})
