import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { color } from './constants/color'
import ExportSvg from './constants/ExportSvg'
import { useSelector } from 'react-redux'
import { TabRouter } from '@react-navigation/native'

const SplashScreen = ({ navigation }) => {
   const token = useSelector((state)=>state.auth.token)
    useEffect(()=>{
     if(token){
        
     }
    },[])
    return (
        <View style={styles.mainContainer}>
            <ExportSvg.SplashLogo />
        </View>
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: color.theme,
        alignItems: "center",
        justifyContent: "center"
    }
})