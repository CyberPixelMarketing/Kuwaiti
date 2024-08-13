import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import ExportSvg from '../../constants/ExportSvg'
import { color } from '../../constants/color'
import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton'
import { addShippingAddress, userShippingAddress } from '../../services/UserServices'
import CustomLoader from '../../components/CustomLoader'
import { useDispatch, useSelector } from 'react-redux'
import { storeUserAddress } from '../../redux/reducer/UserShippingAddress'
import ScreenLoader from '../../components/ScreenLoader'

const ShippingAddress = ({ navigation, route }) => {
    const { totalPrice } = route?.params || ''
    const { btnText } = route.params ?? '';
    const userAddress = useSelector((state) => state?.customerAddress?.storeAddress)
    const userId = useSelector((state) => state.auth?.userId)
    // forStoring zipCode and countryCode i am using Api param block_avenue and emirates
    const dispatch = useDispatch()

    const [fullName, setFullName] = useState(userAddress?.full_name)
    const [street, setStreet] = useState(userAddress?.street)
    const [city, setCity] = useState(userAddress?.city)
    const [area, setArea] = useState(userAddress?.area)
    const [phoneNumber, setPhoneNumber] = useState(userAddress?.phone)
    const [zipCode, setZipCode] = useState(userAddress?.emirates)
    const [countryCode, setCountryCode] = useState(userAddress?.block_avenue)
    const [address, setAddress] = useState(userAddress?.address)
    const [country, setCountry] = useState(userAddress?.country)
    const [isLoader, setIsLoader] = useState(false)
    const [loader, setLoader] = useState(false)


    useEffect(() => {
        getShippingAddress()
    }, [])



    useEffect(() => {
        setFullName(userAddress?.full_name)
        setStreet(userAddress?.street)
        setCity(userAddress?.city)
        setArea(userAddress?.area)
        setPhoneNumber(userAddress?.phone)
        setZipCode(userAddress?.emirates)
        setCountryCode(userAddress?.block_avenue)
        setAddress(userAddress?.address)
        setCountry(userAddress?.country)
    }, [userAddress])

    const handlePress = async () => {
        if (
            fullName == userAddress?.full_name &&
            street == userAddress?.street &&
            city == userAddress?.city &&
            area == userAddress?.area &&
            phoneNumber == userAddress?.phone &&
            zipCode == userAddress?.emirates &&
            countryCode == userAddress?.block_avenue &&
            address == userAddress?.address &&
            country == userAddress?.country

        ) {
            return navigation.navigate('OrderDetails', {
                totalPrice: totalPrice
            })
        } else {
            setIsLoader(true)
            try {
                const response = await addShippingAddress(fullName, street, city, area, phoneNumber, address, zipCode, countryCode, country, userId)
                if (response) {
                    setIsLoader(false)
                    dispatch(storeUserAddress(response?.data))
                    if (btnText == 'Save') {
                        alert('Data saved successfully')
                    } else {
                        navigation.navigate('OrderDetails', {
                            totalPrice: totalPrice
                        })
                    }

                } else {
                    setIsLoader(false)
                    alert('Your Data is not Correct')

                }
            } catch (error) {
                setIsLoader(false)
                console.log(error)
            }
        }

    }

    const getShippingAddress = async () => {
        setLoader(true)
        try {
            const response = await userShippingAddress(userId)
            if (response) {
                setLoader(false)
                dispatch(storeUserAddress(response?.data?.[response?.data?.length - 1]))
            } else {
                alert('something went wrong')
                setLoader(false)
            }

        } catch (error) {
            setLoader(false)
            console.log(error)
        }
    }


    if (loader) {
        return (
            <ScreenLoader />
        )
    }


    return (
        <View style={styles.mainContainer}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ExportSvg.ClickMenuBar />
                </TouchableOpacity>
{
    btnText !== undefined && <ExportSvg.SmallLogo style={styles.logoBox} />

}
            </View>

            <Text style={[styles.productName]}>Shipping address</Text>
            <KeyboardAvoidingView style={{flex:1}} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <ScrollView style={{ flex: 1 }}   keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>

                    <CustomInput
                        placeholder={'Type your full name'}
                        title={'Full Name'}
                        style={{ marginTop: 20 }}
                        value={fullName}
                        onChangeText={setFullName}
                    />

                    <CustomInput
                        placeholder={'Enter Street'}
                        title={'Street'}
                        style={{ marginTop: 20 }}
                        value={street}
                        onChangeText={setStreet}
                    />


                    <CustomInput
                        placeholder={'City'}
                        title={'City'}
                        style={{ marginTop: 20 }}
                        value={city}
                        onChangeText={setCity}
                    />


                    <CustomInput
                        placeholder={'State/province/area'}
                        title={'Area'}
                        style={{ marginTop: 20 }}
                        value={area}
                        onChangeText={setArea}
                    />

                    <CustomInput
                        placeholder={'Type phone number'}
                        title={'Phone Number'}
                        style={{ marginTop: 20 }}
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                    />
                    <CustomInput
                        placeholder={'Type your full address'}
                        title={'Address'}
                        style={{ marginTop: 20 }}
                        value={address}
                        onChangeText={setAddress}
                    />

                    <CustomInput
                        placeholder={'Type zip code'}
                        title={'Zip Code'}
                        style={{ marginTop: 20 }}
                        value={zipCode}
                        onChangeText={setZipCode}
                    />
                    <CustomInput
                        placeholder={'+971'}
                        title={'Country Code'}
                        style={{ marginTop: 20 }}
                        value={countryCode}
                        onChangeText={setCountryCode}
                    />

                    <CustomInput
                        placeholder={'Type Country'}
                        title={'Country'}
                        style={{ marginVertical: 20 }}
                        value={country}
                        onChangeText={setCountry}
                    />


                    <View style={{ marginBottom: 100 }}>
                        {
                            isLoader ?
                                <CustomLoader />
                                :
                                <CustomButton
                                    title={btnText !== undefined ? btnText : "save"}
                                    onPress={handlePress}
                                    disabled={btnText == 'Save' &&
                                        fullName == userAddress?.full_name &&
                                        street == userAddress?.street &&
                                        city == userAddress?.city &&
                                        area == userAddress?.area &&
                                        phoneNumber == userAddress?.phone &&
                                        zipCode == userAddress?.emirates &&
                                        countryCode == userAddress?.block_avenue &&
                                        address == userAddress?.address &&
                                        country == userAddress?.country



                                    }

                                />

                        }
                    </View>

                </ScrollView>
            </KeyboardAvoidingView>

        </View>
    )
}

export default ShippingAddress

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        paddingTop: Platform.OS == 'ios' ? 40 : 20,
        paddingHorizontal: 15,
        backgroundColor: "#fff"

    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15
    },
    logoBox: {
        marginLeft: "auto",
        marginRight: "auto",
        right: 10
    },
    productName: {
        fontSize: 18,
        fontWeight: "600",
        color: color.theme,
        fontFamily: "Montserrat-Bold",

    },
})