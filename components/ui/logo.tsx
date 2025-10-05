import React from 'react'
import { Image, View } from 'react-native'
import { logoStyles } from './logo.styles'

export const Logo: React.FC = () => {
  return (
    <View style={logoStyles.container}>
      <Image source={require('@/assets/images/logo.png')} style={logoStyles.logo} />
    </View>
  )
}
