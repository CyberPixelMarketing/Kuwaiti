import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { color } from '../constants/color'

const ScreenLoader = ({title,onPress,style}) => {
  return (
    <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
      <ActivityIndicator  />
    </View>
  )
}

export default ScreenLoader

const styles = StyleSheet.create({
  btnContainer: {
    backgroundColor: color.theme,
    paddingVertical: 14,
    alignItems: "center",
    borderRadius: 50,
    paddingHorizontal: 10
  },
 
})