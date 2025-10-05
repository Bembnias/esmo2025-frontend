import { Colors, FontSizes, Spacing } from '@/constants/theme'
import { StyleSheet } from 'react-native'

export const startScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
  },
  title: {
    fontFamily: 'DMSans_700Bold',
    fontSize: FontSizes.xxl * 2,
    color: Colors.scienceBlue,
    textAlign: 'center',
    marginBottom: Spacing.sm,
    textTransform: 'uppercase',
  },
  separator: {
    width: 90,
    height: 7,
    backgroundColor: Colors.bloodRed,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontFamily: 'DMSans_300Light',
    fontSize: FontSizes.xl,
    color: Colors.scienceBlue,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  highlight: {
    color: Colors.scienceBlue,
    fontFamily: 'DMSans_700Bold',
  },
})
