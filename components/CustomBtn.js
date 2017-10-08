import React from 'react'
import { TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'

const ButtonView = styled.View`
  background-color: transparent;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  align-self: center;
  height: 50px;
  margin-bottom: 8px;
`

function CustomBtn ({ children, onPress, style={} }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <ButtonView style={style}>
        {children}
      </ButtonView>
    </TouchableOpacity>
  )
}

export default CustomBtn
