import { Modal, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import ExportSvg from '../../constants/ExportSvg'
import { color } from '../../constants/color'
import CountryPicker from 'react-native-country-picker-modal';
import CustomButton from '../../components/CustomButton';

const Login = ({ navigation }) => {
    const [countryCode, setCountryCode] = useState('+971');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [mobile, setMobile] = useState('');
    const [otp, setOtp] = useState('');

    const handleSelectCountry = (e) => {
        setCountryCode(`+${e?.callingCode[0]}`)
        setIsModalVisible(false)
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.logoContainer}>
                <ExportSvg.LoginLogo />
            </View>

            <Text style={styles.headerTxt}>Your Account will be Created{'\n'}Automatically !</Text>
            <Text style={styles.headerSubTxt}>Just use OTP or sign up to continue our app</Text>


            <Text style={styles.mobileTxt}>Mobile Number</Text>


            <View style={[styles.mobileNumberContainer]}>
                <TouchableOpacity onPress={() => setIsModalVisible(true)}>
                    <Text style={{ paddingRight: 5, color: "#9B9B9B" }}>{countryCode}</Text>
                </TouchableOpacity>

                <TextInput
                    placeholder='Enter Number'
                    style={styles.inputStyle}
                    value={mobile}
                    onChangeText={setMobile}
                    placeholderTextColor={color.gray}
                />
                {
                    mobile.length > 5 && <View style={{}}>
                        <ExportSvg.CheckMark />
                    </View>
                }
            </View>





            <CustomButton
                title={'Send OTP'}

            />

            <Text style={[styles.mobileTxt, { marginTop: 15 }]}>OTP</Text>

            <View>
                <TextInput
                    placeholder='*****'
                    style={styles.optInput}
                    value={otp}
                    onChangeText={setOtp}
                    placeholderTextColor={color.gray}

                />

                {
                    otp?.length >= 4 &&
                    <View style={styles.checkMarkIconBox}>
                        <ExportSvg.CheckMark />
                    </View>
                }

            </View>

            <CustomButton
                title={'Login'}
                onPress={() => navigation.navigate('BottomNavigation')}
            />


            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 20 }}>
                <View style={{ width: '43%', height: 2, backgroundColor: "#EEEEEE" }} />
                <Text style={{color:"#000"}}>or</Text>
                <View style={{ width: '43%', height: 2, backgroundColor: "#EEEEEE" }} />
            </View>


            <View style={{ marginTop: 40 }}>
                <TouchableOpacity style={styles.SocialLoginBox}>
                    <ExportSvg.Google />
                    <Text style={styles.socialTxt}>Continue with <Text style={{ fontWeight:"600",fontFamily: "Montserrat-SemiBold", }}>Google</Text></Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.SocialLoginBox}>
                    <ExportSvg.Apple />
                    <Text style={styles.socialTxt}>Continue with <Text style={{ fontWeight:"600", fontFamily: "Montserrat-SemiBold", }}>Apple</Text></Text>
                </TouchableOpacity>
            </View>


            <Modal
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => setIsModalVisible(false)}
            >
                <CountryPicker
                    withFilter
                    withFlag
                    withAlphaFilter
                    withCallingCode
                    withEmoji
                    onSelect={(e) => handleSelectCountry(e)}
                    visible={isModalVisible}
                    onClose={() => setIsModalVisible(false)}
                />
            </Modal>

        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        paddingTop: 40,
        paddingHorizontal: 15,
        backgroundColor: "#fff"
    },
    logoContainer: {
        alignItems: "center"
    },
    headerTxt: {
        fontSize: 17,
        fontFamily: "Montserrat-SemiBold",
        marginTop: 30,
        marginBottom: 10,
        color: "#000"

    },
    headerSubTxt: {
        fontFamily: "Montserrat-Regular",
        marginBottom: 30,
        color: "#000",
    },
    mobileTxt: {
        fontFamily: "Montserrat-SemiBold",
        color: "#000"
    },
    mobileNumberContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        paddingBottom: 5,
        marginTop: Platform.OS == 'ios' ? 5 : 0,
        borderColor: "#9B9B9B50",
        marginBottom: 10,
    },
    inputStyle: {
        width: "85%",
        color: "#000",
        paddingVertical: 0
    },
    optInput: {
        borderBottomWidth: 1,
        marginBottom: 5,
        borderColor: "#EEE",
        marginTop: 10,
        paddingVertical: 0,
        color:"#000"

    },
    checkMarkIconBox: {
        position: "absolute",
        right: 0,
        top: 10
    },
    SocialLoginBox: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        height: 50,
        justifyContent: "center",
        borderRadius: 50,
        borderColor: "#EEEEEE",
        marginBottom: 20


    },
    socialTxt: {
        fontSize: 16,
        fontWeight: "500",
        fontFamily: "Montserrat-Medium",
        marginLeft: 15,
        color: color.theme
    }

})