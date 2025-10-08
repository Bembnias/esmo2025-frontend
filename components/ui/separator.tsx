import { Colors, Spacing } from '@/constants/theme'
import { StyleSheet, View } from 'react-native'

export const Separator = () => {
  return <View style={styles.separator} />
}

const styles = StyleSheet.create({
  separator: {
    width: 90,
    height: 7,
    backgroundColor: Colors.bloodRed,
    marginBottom: Spacing.sm,
  },
})
