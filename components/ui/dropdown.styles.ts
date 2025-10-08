import { BorderRadius, Colors, FontSizes, Spacing } from '@/constants/theme'
import { StyleSheet } from 'react-native'

export const dropdownStyles = StyleSheet.create({
  input: {
    fontFamily: 'DMSans_400Regular',
    borderWidth: 1,
    borderColor: Colors.dataGray,
    borderRadius: BorderRadius.full,
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    fontSize: FontSizes.md,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputError: {
    borderColor: Colors.bloodRed,
  },
  inputText: {
    fontSize: FontSizes.md,
    color: Colors.scienceBlue,
    fontFamily: 'DMSans_400Regular',
  },
  placeholderText: {
    color: Colors.dataGray,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.xl,
    width: '80%',
    maxHeight: '70%',
    paddingVertical: Spacing.md,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dataGray,
  },
  modalTitle: {
    fontSize: FontSizes.lg,
    fontFamily: 'DMSans_700Bold',
    color: Colors.scienceBlue,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  selectedOption: {
    backgroundColor: Colors.lightGray,
  },
  optionText: {
    fontSize: FontSizes.md,
    fontFamily: 'DMSans_400Regular',
    color: Colors.scienceBlue,
  },
  selectedOptionText: {
    fontFamily: 'DMSans_700Bold',
  },
})
