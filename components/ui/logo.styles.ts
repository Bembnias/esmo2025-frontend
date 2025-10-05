import { Spacing } from '@/constants/theme'
import { StyleSheet } from 'react-native'

export const logoStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: Spacing.md,
    paddingBottom: Spacing.xl,
  },
  logo: {
    width: 420,
    height: 112,
    resizeMode: 'contain',
  },
})
