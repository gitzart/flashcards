import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'

function CustomBtn ({ children, onPress, style={} }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[ styles.button, style ]}>
        {children}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'transparent',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    height: 50,
    marginBottom: 10
  }
})

export default CustomBtn
