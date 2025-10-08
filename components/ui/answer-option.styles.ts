import { BorderRadius, Colors, FontSizes, Spacing } from '@/constants/theme'
import { StyleSheet } from 'react-native'

export const answerOptionStyles = StyleSheet.create({
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.lightGray,
    padding: Spacing.sm,
    borderRadius: BorderRadius.full,
    marginBottom: Spacing.sm,
    borderWidth: 3,
    borderColor: 'transparent',
    shadowColor: Colors.black,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
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
    fontSize: FontSizes.xxl,
    fontFamily: 'DMSans_700Bold',
    color: Colors.scienceBlue,
    marginRight: Spacing.sm,
    marginLeft: Spacing.xs,
    minWidth: 30,
  },
  optionLabelRevealed: {
    color: Colors.white,
  },
  labelContainer: {
    marginRight: Spacing.sm,
    marginLeft: Spacing.xs,
    minWidth: 30,
    alignItems: 'center',
  },
  optionText: {
    fontSize: FontSizes.lg,
    fontFamily: 'DMSans_300Light',
    color: Colors.scienceBlue,
    flex: 1,
  },
  optionTextRevealed: {
    color: Colors.white,
  },
})
