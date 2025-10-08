import { BorderRadius, Colors, FontSizes, Spacing } from '@/constants/theme'
import { StyleSheet } from 'react-native'

export const finalScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
  },
  card: {
    padding: Spacing.xl,
    alignItems: 'center',
    width: '90%',
    maxWidth: 600,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  scoreContainer: {
    backgroundColor: Colors.scienceBlue,
    borderRadius: BorderRadius.lg,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    marginBottom: Spacing.md,
  },
  scoreLabel: {
    fontFamily: 'DMSans_400Regular',
    fontSize: FontSizes.md,
    color: Colors.white,
    textAlign: 'center',
    marginBottom: 4,
  },
  score: {
    fontSize: FontSizes.xxl * 1.5,
    fontFamily: 'DMSans_700Bold',
    color: Colors.white,
    textAlign: 'center',
    paddingHorizontal: Spacing.lg,
  },
  title: {
    fontSize: FontSizes.xxl * 1.5,
    fontFamily: 'DMSans_700Bold',
    color: Colors.scienceBlue,
    textAlign: 'center',
    marginBottom: Spacing.sm,
    textTransform: 'uppercase',
  },
  time: {
    fontSize: FontSizes.xl,
    color: Colors.scienceBlue,
    fontFamily: 'DMSans_400Regular',
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  timeValue: {
    color: Colors.scienceBlue,
    fontFamily: 'DMSans_700Bold',
  },
  description: {
    fontFamily: 'DMSans_400Regular',
    fontSize: FontSizes.lg,
    color: Colors.scienceBlue,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  highlight: {
    fontFamily: 'DMSans_700Bold',
  },
})
