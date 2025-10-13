import { BorderRadius, Colors, FontSizes, Spacing } from '@/constants/theme'
import { StyleSheet } from 'react-native'

export const wordSearchStyles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.sm,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'flex-end',
    marginTop: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  title: {
    fontFamily: 'DMSans_700Bold',
    fontSize: FontSizes.xxl,
    color: Colors.scienceBlue,
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontFamily: 'DMSans_300Light',
    fontSize: FontSizes.lg,
    color: Colors.scienceBlue,
    textAlign: 'center',
    marginBottom: Spacing.xl,
  },
  gridContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  grid: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.xl,
    padding: Spacing.sm,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 48,
    height: 48,
    margin: 0,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 0,
    borderWidth: 0,
    borderColor: 'transparent',
    backgroundColor: Colors.white,
    position: 'relative',
    overflow: 'hidden',
  },
  cellSelecting: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    borderColor: Colors.scienceBlue,
    borderRadius: 0,
  },
  cellSelected: {
    backgroundColor: Colors.scienceBlue,
    borderRadius: 0,
  },
  cellFound: {
    backgroundColor: Colors.scienceBlue,
    borderRadius: 0,
  },
  cellAvailable: {
    borderColor: Colors.scienceBlue,
    backgroundColor: Colors.white,
  },
  // Border styles for available words (only outer edges)
  cellAvailableBorderTop: {
    borderTopWidth: 2,
    borderTopColor: Colors.scienceBlue,
  },
  cellAvailableBorderBottom: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.scienceBlue,
  },
  cellAvailableBorderLeft: {
    borderLeftWidth: 2,
    borderLeftColor: Colors.scienceBlue,
  },
  cellAvailableBorderRight: {
    borderRightWidth: 2,
    borderRightColor: Colors.scienceBlue,
  },
  // Rounded corners for found and available words
  cellRoundedLeft: {
    borderTopLeftRadius: BorderRadius.full,
    borderBottomLeftRadius: BorderRadius.full,
  },
  cellRoundedRight: {
    borderTopRightRadius: BorderRadius.full,
    borderBottomRightRadius: BorderRadius.full,
  },
  cellRoundedTop: {
    borderTopLeftRadius: BorderRadius.full,
    borderTopRightRadius: BorderRadius.full,
  },
  cellRoundedBottom: {
    borderBottomLeftRadius: BorderRadius.full,
    borderBottomRightRadius: BorderRadius.full,
  },
  cellText: {
    fontFamily: 'DMSans_600SemiBold',
    fontSize: FontSizes.lg,
    color: Colors.scienceBlue,
  },
  cellTextSelected: {
    color: Colors.white,
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
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg + 4,
    marginHorizontal: Spacing.xl,
    width: 940,
    alignItems: 'center',
  },
  modalTitle: {
    fontFamily: 'DMSans_700Bold',
    fontSize: FontSizes.xxl * 2.2,
    color: Colors.scienceBlue,
    marginBottom: Spacing.md - 8,
  },
  modalText: {
    fontFamily: 'DMSans_300Light',
    fontSize: FontSizes.xl,
    color: Colors.scienceBlue,
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: Spacing.lg,
  },
  modalButtonContainer: {
    position: 'absolute',
    bottom: Spacing.xl - 4,
    right: Spacing.xxl + 4,
    alignItems: 'flex-end',
    width: '100%',
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 7,
    elevation: 6,
  },
  highlighted: {
    fontFamily: 'DMSans_700Bold',
  },
})
