import { BorderRadius, Colors, FontSizes, Spacing } from '@/constants/theme'
import { StyleSheet } from 'react-native'

export const reviewScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.xl,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Spacing.md,
  },
  questionContainer: {
    marginBottom: Spacing.sm,
  },
  questionTitle: {
    fontFamily: 'DMSans_700Bold',
    fontSize: FontSizes.xl - 2,
    color: Colors.scienceBlue,
    marginBottom: Spacing.xs,
    lineHeight: 22,
  },
  questionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md - 4,
    borderRadius: BorderRadius.full,
    zIndex: 20,
  },
  questionHeaderCorrect: {
    backgroundColor: Colors.scienceBlue,
  },
  questionHeaderIncorrect: {
    backgroundColor: Colors.scienceBlue,
  },
  questionHeaderLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  highlighted: {
    fontFamily: 'DMSans_700Bold',
  },
  answerText: {
    flex: 1,
    fontFamily: 'DMSans_300Light',
    fontSize: FontSizes.lg,
    color: Colors.white,
    lineHeight: 22,
  },
  iconContainer: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  expandIcon: {
    marginLeft: Spacing.xs,
  },
  answerContent: {
    backgroundColor: Colors.white,
    borderColor: Colors.lightGray,
    borderWidth: 10,
    gap: Spacing.sm,
    borderRadius: BorderRadius.xl,
    marginTop: -Spacing.xl - 4,
    borderBottomLeftRadius: BorderRadius.xl,
    borderBottomRightRadius: BorderRadius.xl,
    zIndex: 10,
  },
  sectionTitle: {
    fontFamily: 'DMSans_700Bold',
    fontSize: FontSizes.lg,
    color: Colors.scienceBlue,
    marginBottom: 4,
  },
  yourAnswerCorrect: {
    fontFamily: 'DMSans_700Bold',
    fontSize: FontSizes.lg,
    color: Colors.scienceBlue,
    paddingHorizontal: Spacing.xxl - 9,
  },
  correctAnswerContainer: {
    backgroundColor: Colors.lightGray,
    borderRadius: BorderRadius.xxl,
    padding: Spacing.sm,
    paddingTop: Spacing.xxl - 4,
    marginBottom: Spacing.sm / 2,
  },
  correctMessage: {
    fontFamily: 'DMSans_400Regular',
    fontSize: FontSizes.lg,
    color: Colors.scienceBlue,
    paddingHorizontal: Spacing.xxl - 9,
  },
  explanationContainer: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.xl,
  },
  explanationImage: {
    width: '100%',
    resizeMode: 'contain',
    paddingHorizontal: Spacing.md - 4,
  },
  stickyFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: Spacing.md - 4,
    paddingHorizontal: Spacing.xl,
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  gradientOverlay: {
    position: 'absolute',
    top: -40,
    left: 0,
    right: 0,
    height: 80,
  },
  buttonWrapper: {
    maxWidth: 200,
    width: '100%',
    backgroundColor: Colors.white,
    paddingTop: Spacing.md,
  },
  egfrText: {
    fontFamily: 'DMSans_700Bold_Italic',
  },
})
