import { GRADIENT_FRAME_COLORS } from '@/constants/theme'
import { Canvas, RoundedRect, SweepGradient, useClock, vec } from '@shopify/react-native-skia'
import React, { ReactNode } from 'react'
import { StyleSheet, useWindowDimensions, View } from 'react-native'
import { useDerivedValue } from 'react-native-reanimated'

const BORDER_WIDTH = 20
const BORDER_RADIUS = 15
const INNER_BORDER_RADIUS = 40

type SkiaAnimatedGradientFrameProps = {
  children: ReactNode
}

export const AnimatedGradientFrame = ({ children }: SkiaAnimatedGradientFrameProps) => {
  const { width, height } = useWindowDimensions()
  const clock = useClock()

  const transform = useDerivedValue(() => {
    const rotation = (clock.value / 1000) * (Math.PI / 2)
    return [{ rotate: rotation }]
  }, [clock])

  return (
    <View style={styles.container}>
      <Canvas style={StyleSheet.absoluteFill} pointerEvents='none'>
        <RoundedRect
          x={BORDER_WIDTH / 2}
          y={BORDER_WIDTH / 2}
          width={width - BORDER_WIDTH}
          height={height - BORDER_WIDTH}
          r={BORDER_RADIUS}
          style='stroke'
          strokeWidth={BORDER_WIDTH}
        >
          <SweepGradient
            c={vec(width / 2.4, height / 2.4)}
            positions={[0, 0.33, 0.66, 1]}
            colors={GRADIENT_FRAME_COLORS}
            transform={transform}
          />
        </RoundedRect>
      </Canvas>

      <View style={styles.contentContainer}>{children}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    borderRadius: BORDER_RADIUS,
    overflow: 'hidden',
  },
  contentContainer: {
    flex: 1,
    margin: BORDER_WIDTH,
    borderRadius: INNER_BORDER_RADIUS,
    overflow: 'hidden',
  },
})
