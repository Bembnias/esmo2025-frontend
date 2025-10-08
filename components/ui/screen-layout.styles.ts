import { Colors } from '@/constants/theme'
import { StyleSheet } from 'react-native'

const BORDER_WIDTH = 20
const BORDER_RADIUS = 24
const INNER_RADIUS = BORDER_RADIUS - BORDER_WIDTH

export const screenLayoutStyles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    position: 'relative',
  },
  gradientWrapper: {
    flex: 1,
    borderRadius: BORDER_RADIUS,
    overflow: 'hidden',
  },
  gradientBorder: {
    flex: 1,
    padding: BORDER_WIDTH,
    borderRadius: BORDER_RADIUS,
  },
  innerContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: INNER_RADIUS,
    overflow: 'hidden',
  },
  lightEffect: {
    borderRadius: BORDER_RADIUS,
    opacity: 0.5,
    overflow: 'hidden',
  },
  lightGradient: {
    flex: 1,
    borderRadius: BORDER_RADIUS,
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  content: {
    flex: 1,
    zIndex: 1,
  },
})
