import { BorderRadius, Colors, FontSizes, Spacing } from '@/constants/theme'
import { StyleSheet } from 'react-native'

export const formScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.xxl,
    paddingVertical: Spacing.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  card: {
    backgroundColor: Colors.lightGray,
    borderRadius: BorderRadius.xl,
    paddingVertical: Spacing.lg - 4,
    paddingHorizontal: Spacing.xxl,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: FontSizes.xl,
    fontFamily: 'DMSans_700Bold',
    color: Colors.scienceBlue,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  row: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  inputContainer: {
    flex: 1,
    marginBottom: Spacing.sm,
  },
  input: {
    fontFamily: 'DMSans_400Regular',
    borderWidth: 1,
    borderColor: Colors.dataGray,
    borderRadius: BorderRadius.full,
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    fontSize: FontSizes.md,
    backgroundColor: Colors.white,
    color: Colors.scienceBlue,
  },
  inputError: {
    borderColor: Colors.bloodRed,
  },
  errorText: {
    fontSize: FontSizes.sm - 2,
    color: Colors.bloodRed,
    marginTop: 1,
    marginBottom: -9,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Spacing.sm,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: Colors.dataGray,
    borderRadius: 4,
    marginRight: Spacing.xs,
    marginTop: -3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  checkboxChecked: {
    backgroundColor: Colors.scienceBlue,
    borderColor: Colors.scienceBlue,
  },
  checkboxLabel: {
    fontFamily: 'DMSans_200ExtraLight_Italic',
    flex: 1,
    fontSize: FontSizes.sm,
    color: Colors.dataGray,
    lineHeight: 14,
  },
  footer: {
    alignItems: 'center',
    marginTop: Spacing.md,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: Spacing.sm,
  },
  optional: {
    fontFamily: 'DMSans_200ExtraLight_Italic',
    marginLeft: 24,
    color: Colors.dataGray,
  },
  floatingButton: { position: 'absolute', top: 0, right: 0, zIndex: 10 },
})
