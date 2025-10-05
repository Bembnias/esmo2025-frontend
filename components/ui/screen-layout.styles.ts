import { Colors } from '@/constants/theme'
import { StyleSheet } from 'react-native'

export const screenLayoutStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    borderWidth: 20,
    borderRadius: 24,
    borderLeftColor: Colors.bloodRed,
    borderTopColor: Colors.lightBlue,
    borderRightColor: Colors.scienceBlue,
    borderBottomColor: Colors.bloodRed,
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
