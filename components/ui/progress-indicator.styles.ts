import { Colors } from '@/constants/theme'
import { StyleSheet } from 'react-native'

export const progressIndicatorStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.lightGray,
  },
  dotActive: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: Colors.lightGray,
    borderWidth: 2,
    borderColor: Colors.scienceBlue,
  },
  dotCompleted: {
    backgroundColor: Colors.scienceBlue,
  },
  connector: {
    width: 16,
    height: 2,
    backgroundColor: Colors.lightGray,
  },
  connectorCompleted: {
    backgroundColor: Colors.scienceBlue,
  },
})
