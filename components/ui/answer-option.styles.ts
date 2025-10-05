import { BorderRadius, Colors, FontSizes, Spacing } from '@/constants/theme'
import { StyleSheet } from 'react-native'

export const answerOptionStyles = StyleSheet.create({
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.lightGray,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.sm,
    borderWidth: 3,
    borderColor: 'transparent',
  },
  optionSelected: {
    borderColor: Colors.scienceBlue,
  },
  optionCorrect: {
    backgroundColor: Colors.scienceBlue,
  },
  optionIncorrect: {
    backgroundColor: Colors.bloodRed,
  },
  optionLabel: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: Colors.scienceBlue,
    marginRight: Spacing.sm,
    minWidth: 30,
  },
  optionLabelRevealed: {
    color: Colors.white,
  },
  optionText: {
    fontSize: FontSizes.md,
    color: Colors.black,
    flex: 1,
  },
  optionTextRevealed: {
    color: Colors.white,
  },
  iconContainer: {
    marginLeft: Spacing.sm,
  },
})
