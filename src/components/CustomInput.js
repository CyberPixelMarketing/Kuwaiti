import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { color } from '../constants/color'

const CustomInput = ({ placeholder, value, onChangeText, title, style }) => {
  return (
    <View style={style}>
      {
        title &&
        <Text style={{ marginBottom: 5, color: color.theme, fontFamily: "Montserrat-Medium" }}>{title}</Text>
      }
      <TextInput
      autoCorrect={false}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={color.lightGray}
        style={{ borderBottomWidth: 1, paddingBottom: 7, borderColor: color.lightGray, paddingRight: 10,color:"#000" }}

      />
    </View>
  )
}

export default CustomInput

const styles = StyleSheet.create({})