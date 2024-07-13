import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { color } from '../constants/color'

const CustomButton = ({title,onPress}) => {
  return (
    <TouchableOpacity style={styles.btnContainer} onPress={onPress}>
      <Text style={styles.innerBtn}>{title ? title : "Get Now"}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton

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