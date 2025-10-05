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
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    alignItems: 'center',
    width: '90%',
    maxWidth: 600,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 3,
    borderLeftColor: Colors.bloodRed,
    borderTopColor: Colors.lightBlue,
    borderRightColor: Colors.scienceBlue,
    borderBottomColor: Colors.bloodRed,
  },
  scoreContainer: {
    backgroundColor: Colors.scienceBlue,
    borderRadius: BorderRadius.lg,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    marginBottom: Spacing.md,
  },
  scoreLabel: {
    fontSize: FontSizes.md,
    color: Colors.white,
    textAlign: 'center',
    marginBottom: 4,
  },
  score: {
    fontSize: FontSizes.xxl * 1.5,
    fontWeight: '700',
    color: Colors.white,
    textAlign: 'center',
  },
  title: {
    fontSize: FontSizes.xxl,
    fontWeight: '700',
    color: Colors.scienceBlue,
    textAlign: 'center',
    marginBottom: Spacing.sm,
    textTransform: 'uppercase',
  },
  time: {
    fontSize: FontSizes.lg,
    color: Colors.black,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  timeValue: {
    color: Colors.bloodRed,
    fontWeight: '700',
  },
  description: {
    fontSize: FontSizes.md,
    color: Colors.black,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  highlight: {
    fontWeight: '700',
  },
})
