import React from 'react'
import { ImageBackground, View } from 'react-native'
import { screenLayoutStyles } from './screen-layout.styles'

interface ScreenLayoutProps {
  children: React.ReactNode
}

export const ScreenLayout: React.FC<ScreenLayoutProps> = ({ children }) => {
  return (
    <View style={screenLayoutStyles.container}>
      <ImageBackground source={require('@/assets/images/background.png')} style={screenLayoutStyles.backgroundImage} />
      <View style={screenLayoutStyles.content}>{children}</View>
    </View>
  )
}
