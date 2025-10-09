import { Colors } from '@/constants/theme'
import { Canvas, LinearGradient, RoundedRect, vec } from '@shopify/react-native-skia'
import { useEffect } from 'react'
import { StyleSheet, View, useWindowDimensions } from 'react-native'
import { useDerivedValue, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated'

interface AnimatedGradientBorderProps {
  children: React.ReactNode
  borderWidth?: number
  borderRadius?: number
}

export const AnimatedGradientBorder = ({
  children,
  borderWidth = 20,
  borderRadius = 24,
}: AnimatedGradientBorderProps) => {
  const progress = useSharedValue(0)
  const { width, height } = useWindowDimensions()

  useEffect(() => {
    progress.value = withRepeat(withTiming(Math.PI * 2, { duration: 4000 }), -1, false)
  }, [progress])

  const startPos = useDerivedValue(() => {
    const angle = progress.value
    const centerX = width / 2
    const centerY = height / 2
    const radius = Math.max(width, height) / 2

    return vec(centerX + Math.cos(angle) * radius, centerY + Math.sin(angle) * radius)
  })

  const endPos = useDerivedValue(() => {
    const angle = progress.value
    const centerX = width / 2
    const centerY = height / 2
    const radius = Math.max(width, height) / 2

    return vec(centerX + Math.cos(angle + Math.PI) * radius, centerY + Math.sin(angle + Math.PI) * radius)
  })

  return (
    <View style={styles.container}>
      <Canvas style={StyleSheet.absoluteFill}>
        <RoundedRect x={0} y={0} width={width} height={height} r={borderRadius}>
          <LinearGradient
            start={startPos}
            end={endPos}
            colors={[Colors.bloodRed, Colors.scienceBlue, Colors.lightBlue]}
          />
        </RoundedRect>
      </Canvas>

      <View
        style={[
          styles.innerContent,
          {
            margin: borderWidth,
            borderRadius: borderRadius - borderWidth,
          },
        ]}
      >
        {children}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  innerContent: {
    flex: 1,
    backgroundColor: Colors.white,
    overflow: 'hidden',
  },
})
