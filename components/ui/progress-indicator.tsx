import React from 'react'
import { View } from 'react-native'
import { progressIndicatorStyles } from './progress-indicator.styles'

interface ProgressIndicatorProps {
  total: number
  current: number
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ total, current }) => {
  return (
    <View style={progressIndicatorStyles.container}>
      {Array.from({ length: total }).map((_, index) => (
        <React.Fragment key={index}>
          <View
            style={[
              progressIndicatorStyles.dot,
              index < current && progressIndicatorStyles.dotCompleted,
              index === current && progressIndicatorStyles.dotActive,
            ]}
          />
          {index < total - 1 && (
            <View
              style={[progressIndicatorStyles.connector, index < current && progressIndicatorStyles.connectorCompleted]}
            />
          )}
        </React.Fragment>
      ))}
    </View>
  )
}
