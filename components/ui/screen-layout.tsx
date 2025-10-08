import { Colors } from '@/constants/theme'
import { LinearGradient } from 'expo-linear-gradient'
import { useEffect } from 'react'
import { ImageBackground, View } from 'react-native'
import Animated, { useAnimatedProps, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated'
import { screenLayoutStyles } from './screen-layout.styles'

interface ScreenLayoutProps {
  children: React.ReactNode
}

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient)

export const ScreenLayout = ({ children }: ScreenLayoutProps) => {
  const progress = useSharedValue(0)

  useEffect(() => {
    // animujemy 0 -> 1 -> 0 -> ... (auto-reverse)
    progress.value = withRepeat(
      withTiming(1, { duration: 2000 }),
      -1, // infinite
      true // reverse on repeat
    )
  }, [progress])

  const animatedProps = useAnimatedProps(() => {
    const p = Math.max(0, Math.min(1, progress.value))
    return {
      start: { x: p, y: p },
      end: { x: 1 - p, y: 1 - p },
    }
  })

  return (
    <View style={screenLayoutStyles.outerContainer}>
      <View style={screenLayoutStyles.gradientWrapper}>
        <AnimatedLinearGradient
          colors={[Colors.bloodRed, Colors.scienceBlue, Colors.lightBlue]}
          animatedProps={animatedProps}
          style={screenLayoutStyles.gradientBorder}
        >
          <View style={screenLayoutStyles.innerContainer}>
            <ImageBackground
              source={require('@/assets/images/background.png')}
              style={screenLayoutStyles.backgroundImage}
            />
            <View style={screenLayoutStyles.content}>{children}</View>
          </View>
        </AnimatedLinearGradient>
      </View>
    </View>
  )
}
