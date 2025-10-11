import { Colors, FontSizes, Spacing } from '@/constants/theme'
import { StyleSheet } from 'react-native'

export const quizScreenStyles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: Spacing.xl,
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
    fontFamily: 'DMSans_600SemiBold',
    fontSize: FontSizes.xxl,
    color: Colors.scienceBlue,
    marginBottom: Spacing.md,
  },
  egfrText: {
    fontFamily: 'DMSans_700Bold_Italic',
  },
  answersContainer: {
    marginBottom: Spacing.md,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
  },
  footerSpacer: {
    width: 200,
  },
})
