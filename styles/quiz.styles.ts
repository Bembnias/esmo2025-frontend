import { Colors, FontSizes, Spacing } from '@/constants/theme'
import { StyleSheet } from 'react-native'

export const quizScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xl,
  },
  header: {
    alignItems: 'flex-end',
    marginBottom: Spacing.md,
  },
  card: {
    marginBottom: Spacing.md,
  },
  questionText: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.white,
    marginBottom: Spacing.md,
    lineHeight: 26,
  },
  answersContainer: {
    marginBottom: Spacing.md,
  },
  footer: {
    alignItems: 'center',
    marginTop: 'auto',
  },
  progressContainer: {
    marginBottom: Spacing.md,
  },
})
