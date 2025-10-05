import { BorderRadius, Colors, FontSizes, Spacing } from '@/constants/theme'
import { StyleSheet } from 'react-native'

export const quizScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 3,
    borderLeftColor: Colors.bloodRed,
    borderTopColor: Colors.lightBlue,
    borderRightColor: Colors.scienceBlue,
    borderBottomColor: Colors.bloodRed,
  },
  questionText: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.black,
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
