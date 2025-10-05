import { BorderRadius, Colors, FontSizes, Spacing } from '@/constants/theme'
import { StyleSheet } from 'react-native'

export const formScreenStyles = StyleSheet.create({
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
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.black,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  row: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  inputContainer: {
    flex: 1,
    marginBottom: Spacing.sm,
  },
  label: {
    fontSize: FontSizes.sm,
    color: Colors.black,
    marginBottom: 4,
  },
  required: {
    color: Colors.bloodRed,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.lightGray,
    borderRadius: BorderRadius.sm,
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    fontSize: FontSizes.md,
    backgroundColor: Colors.white,
  },
  inputError: {
    borderColor: Colors.bloodRed,
  },
  errorText: {
    fontSize: FontSizes.sm - 2,
    color: Colors.bloodRed,
    marginTop: 2,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Spacing.sm,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: Colors.lightGray,
    borderRadius: 4,
    marginRight: Spacing.xs,
    marginTop: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: Colors.scienceBlue,
    borderColor: Colors.scienceBlue,
  },
  checkboxLabel: {
    flex: 1,
    fontSize: FontSizes.sm,
    color: Colors.black,
    lineHeight: 18,
  },
  footer: {
    alignItems: 'center',
    marginTop: Spacing.md,
  },
})
