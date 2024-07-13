import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { color } from './constants/color'
import ExportSvg from './constants/ExportSvg'

const SplashScreen = ({ navigation }) => {

    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.navigate('Login');
        }, 2000);

        return () => clearTimeout(timer);
    }, [navigation]);


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