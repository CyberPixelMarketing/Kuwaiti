import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { color } from '../constants/color'

const CustomLoader = ({title,onPress,style}) => {
  return (
    <TouchableOpacity style={[styles.btnContainer,style]} onPress={onPress}>
      <ActivityIndicator  />
    </TouchableOpacity>
  )
}

export default CustomLoader

const styles = StyleSheet.create({
  btnContainer: {
    backgroundColor: color.theme,
    paddingVertical: 14,
    alignItems: "center",
    borderRadius: 50,
    paddingHorizontal: 10
  },
  innerBtn: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 17
  }
})