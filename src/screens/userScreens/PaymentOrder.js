import { FlatList, Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ExportSvg from '../../constants/ExportSvg'
import { color } from '../../constants/color'
import { paymentMethodCard } from '../../constants/data'
import PaymentModal from '../../components/PaymentModal'
import { orderConfirmed, tokenPrice, userShippingAddress } from '../../services/UserServices'
import { useDispatch, useSelector } from 'react-redux'
import PaymentSuccessModal from '../../components/PaymentSuccessModal'
import { addProductToCart, clearCart } from '../../redux/reducer/ProductAddToCart'
const PaymentOrder = ({ navigation, route }) => {
    const { totalPrice } = route?.params
    const dispatch = useDispatch()
    const data = useSelector((state) => state.cartProducts?.cartProducts)
    const userId = useSelector((state) => state.auth?.userId)

    const [modalVisible, setModalVisible] = useState(false)
    const [isPaymentSuccess, setIsPaymentSuccess] = useState(false)
    const [cardInfo, setCardInfo] = useState(null)
    const [selectedPayment, setSelectedPayment] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [getToken, setToken] = useState({})
    const [address, setAddress] = useState({})



    useEffect(()=>{
        getShippingAddress()
    },[])


    useEffect(() => {
        if (getToken?.token !== undefined) {
            confirmOrder();
            sendTokenPrice()
        }
    }, [getToken]);



    const getShippingAddress = async () => {
        try {
            const response = await userShippingAddress(userId)
            if (response) {
                setAddress(response?.data?.[response?.data?.length - 1])
            } else {
                alert('something went wrong')
            }

        } catch (error) {
            console.log(error)
        }
    }



    const renderItem = ({ item, index }) => {
        return (
            <View style={styles.productContainer}>
                <Image borderRadius={5} source={{ uri: item?.image }} style={{ width: 60, height: 60 }} />

                <View style={{ marginLeft: 10 }}>
                    <Text style={styles.productTitle}>{item?.productName}</Text>
                    <Text style={styles.subTitle}>{item?.subText}</Text>
                    <View style={styles.sendWithIcon}>
                        <ExportSvg.ArrowCurve />
                        <Text style={styles.sendTxt}>Send</Text>
                    </View>
                </View>

                <Text style={styles.productPrice}>KD{item?.price}</Text>
            </View>
        )
    }


    const paymentPress = (payment) => {
        setSelectedPayment(payment)
        if (payment == 'credit card') {
            setModalVisible(true)
        }
    }


    const confirmOrder = async () => {
        if (getToken?.token !== undefined) {
            const productNo = data?.length
            try {
                const response = await orderConfirmed(productNo, address, totalPrice, data, userId, getToken)
                if (response.status == 'success') {
                    setModalVisible(false)
                    setIsLoading(false)
                    setIsPaymentSuccess(true)
                    dispatch(clearCart([]))

                } else {
                    setIsLoading(false)
                    alert('Somthing went wrong')
                }

            } catch (error) {
                setIsLoading(false)
                console.log(error)

            }

        }
    }


    const sendTokenPrice = async () => {
        try {
            const response = await tokenPrice(getToken?.token,totalPrice)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View style={styles.mainContainer}>
            <ScrollView contentContainerStyle={{ paddingHorizontal: 15, paddingTop: Platform.OS == 'ios' ? 40 : 20 }}>

                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <ExportSvg.ClickMenuBar />
                    </TouchableOpacity>
                    <ExportSvg.SmallLogo style={styles.logoBox} />
                </View>

                <Text style={[styles.productName]}>Payment</Text>

                {/* {
                    PaymentCards?.map((item, index) => {
                        const payment = item?.paymentMethod?.toLowerCase()
                        return (
                            <TouchableOpacity key={index} onPress={() => paymentPress(payment)} style={[styles.paymentContainer, { backgroundColor: selectedPayment == payment ? color.theme : "#fff" }]}>

                                {
                                    payment == 'credit card' ?
                                        <View style={styles.paymentIconBg}>
                                            <ExportSvg.Payoneer />
                                        </View>
                                        :
                                        payment == 'paypal' ?
                                            <View style={styles.paymentIconBg}>
                                                <ExportSvg.Paypal />
                                            </View>
                                            :
                                            payment == 'visa' ?
                                                <View style={styles.paymentIconBg}>

                                                    <ExportSvg.VisaCard />
                                                </View>
                                                :
                                                <View style={styles.paymentIconBg}>
                                                    <ExportSvg.GooglePay />
                                                </View>
                                }

                                <Text style={[styles.paymentTxt, { color: selectedPayment == payment ? '#fff' : color.theme }]}>{item?.paymentMethod}</Text>
                                <View style={{ width: 13, height: 13, borderWidth: 1, borderRadius: 50, borderColor: selectedPayment == payment ? '#fff' : color.theme, marginLeft: "auto" }} />

                            </TouchableOpacity>
                        )
                    })
                } */}


                <View >
                    {
                        paymentMethodCard?.map((item, index) => {
                            const payment = item?.paymentName?.toLowerCase()
                            return (
                                <TouchableOpacity activeOpacity={0.7} onPress={() => paymentPress(payment)} key={index} style={styles.paymentContainers}>
                                    <View style={{ backgroundColor: selectedPayment == payment ? color.theme : "#fff", width: 18, height: 18, borderRadius: 50, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: color.theme }}>
                                        <ExportSvg.checks />
                                    </View>
                                    <View style={{ marginHorizontal: 20 }}>
                                        {item?.svg}
                                    </View>
                                    <Text style={{ color: "#000", fontFamily: "Montserrat-Medium" }}>{item?.paymentName}</Text>
                                </TouchableOpacity>

                            )
                        })
                    }
                </View>


                <PaymentModal
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    cardInfo={cardInfo}
                    setCardInfo={setCardInfo}
                    setToken={setToken}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}

                />

                {/* <TouchableOpacity style={styles.addCardBox} onPress={() => navigation.navigate('TrackOrder')}> */}
                {/* <TouchableOpacity style={styles.addCardBox} onPress={() => confirmOrder()}> */}
                {/* <TouchableOpacity style={styles.addCardBox}>
                    <View style={styles.addCardPlusBox}>
                        <Text style={styles.plusIcon}>+</Text>
                    </View>
                    <Text style={styles.paymentTxt}>Add Card</Text>
                </TouchableOpacity> */}

                <Text style={[styles.productName, { marginVertical: 20 }]}>History</Text>

                <View style={{ marginBottom: 10, flex: 1, zIndex: -1 }}>
                    <FlatList
                        // data={bags?.slice(1)}
                        data={data}
                        keyExtractor={(item, index) => index?.toString()}
                        renderItem={renderItem}
                        showsVerticalScrollIndicator={false}
                    />

                </View>




                <PaymentSuccessModal
                    isPaymentSuccess={isPaymentSuccess}
                    setIsPaymentSuccess={setIsPaymentSuccess}
                    navigation={navigation}

                />
            </ScrollView>

        </View>
    )
}

export default PaymentOrder

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
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
        zIndex: -1
    },
    paymentContainer: {
        flexDirection: "row",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        backgroundColor: "#fff",
        elevation: 5,
        padding: 10,
        borderRadius: 13,
        marginTop: 15
    },
    paymentIconBg: {
        width: 40,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#eee',
        borderRadius: 50
    },

    paymentTxt: {
        fontSize: 16,
        fontFamily: "Montserrat-Regular",
        marginLeft: 15,
        color: color.theme

    },
    addCardBox: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        height: 60,
        marginTop: 30,
        borderStyle: 'dashed',
        borderColor: "#DDD",
        borderRadius: 13,
        zIndex: -1
    },
    addCardPlusBox: {
        width: 40,
        height: 40,
        borderWidth: 1,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
        borderColor: "#DDD",

    },
    plusIcon: {
        color: color.theme,
        fontSize: 18
    },



    productContainer: {
        flexDirection: "row",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        backgroundColor: "#fff",
        elevation: 2,
        marginHorizontal: 1,
        marginTop: 10,
        marginBottom: 5,
        padding: 10,
        borderRadius: 10,
        alignItems: "center"
    },
    productTitle: {
        fontWeight: "600",
        color: color.theme,
        marginBottom: 5,
        fontFamily: "Montserrat-Bold"
    },
    subTitle: {
        color: color.gray,
        fontSize: 12,
        fontFamily: "Montserrat-Regular"

    },
    productPrice: {
        marginTop: 4,
        fontWeight: "600",
        color: color.theme,
        marginLeft: "auto",
        fontFamily: "Montserrat-Bold"

    },
    sendWithIcon: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#EEE",
        alignSelf: "baseline",
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 5,
    },
    sendTxt: {
        marginLeft: 5,
        color: color.theme,
        fontFamily: "Montserrat-SemiBold",
        fontSize: 9

    },
    paymentContainers: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 15
    },
})