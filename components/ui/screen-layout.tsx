import { ImageBackground, View } from 'react-native'
import { AnimatedGradientBorder } from './animated-gradient-border'
import { screenLayoutStyles } from './screen-layout.styles'

interface ScreenLayoutProps {
  children: React.ReactNode
}

export const ScreenLayout = ({ children }: ScreenLayoutProps) => {
  return (
    <View style={screenLayoutStyles.outerContainer}>
      <View style={screenLayoutStyles.gradientWrapper}>
        <AnimatedGradientBorder borderWidth={20} borderRadius={24}>
          <View style={screenLayoutStyles.innerContainer}>
            <ImageBackground
              source={require('@/assets/images/background.png')}
              style={screenLayoutStyles.backgroundImage}
            />
            <View style={screenLayoutStyles.content}>{children}</View>
          </View>
        </AnimatedGradientBorder>
      </View>
    </View>
  )
}
