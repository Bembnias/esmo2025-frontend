import { Colors, Spacing } from '@/constants/theme'
import { StyleSheet } from 'react-native'

export const progressIndicatorStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.lightGray,
  },
  dotActive: {
    backgroundColor: Colors.scienceBlue,
  },
  dotCompleted: {
    backgroundColor: Colors.scienceBlue,
  },
})
