import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import ExportSvg from '../../constants/ExportSvg'
import { color } from '../../constants/color'
import { PaymentCards, bags } from '../../constants/data'

const PaymentOrder = ({ navigation }) => {
    const [selectedPayment, setSelectedPayment] = useState('')



    const renderItem = ({ item, index }) => {
        return (
            <View style={styles.productContainer}>
                <Image borderRadius={5} source={item?.img} style={{ width: 60, height: 60 }} />

                <View style={{ marginLeft: 10 }}>
                    <Text style={styles.productTitle}>{item?.title}</Text>
                    <Text style={styles.subTitle}>{item?.subTxt}</Text>
                    <View style={styles.sendWithIcon}>
                        <ExportSvg.ArrowCurve />
                        <Text style={styles.sendTxt}>Send</Text>
                    </View>
                </View>



                <Text style={styles.productPrice}>{item?.price}</Text>
            </View>

        )
    }
    return (
        <View style={styles.mainContainer}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ExportSvg.ClickMenuBar />
                </TouchableOpacity>
                <ExportSvg.SmallLogo style={styles.logoBox} />
            </View>

            <Text style={[styles.productName]}>Payment</Text>


            {
                PaymentCards?.map((item, index) => {
                    const paymentSvg = item?.paymentMethod?.toLowerCase()
                    return (
                        <TouchableOpacity onPress={() => setSelectedPayment(paymentSvg)} style={[styles.paymentContainer, { backgroundColor: selectedPayment == paymentSvg ? color.theme : "#fff" }]}>

                            {
                                paymentSvg == 'credit card' ?
                                    <View style={styles.paymentIconBg}>
                                        <ExportSvg.Payoneer />
                                    </View>
                                    :
                                    paymentSvg == 'paypal' ?
                                        <View style={styles.paymentIconBg}>
                                            <ExportSvg.Paypal />
                                        </View>
                                        :
                                        paymentSvg == 'visa' ?
                                            <View style={styles.paymentIconBg}>

                                                <ExportSvg.VisaCard />
                                            </View>
                                            :
                                            <View style={styles.paymentIconBg}>
                                                <ExportSvg.GooglePay />
                                            </View>
                            }

                            <Text style={[styles.paymentTxt, { color: selectedPayment == paymentSvg ? '#fff' : color.theme }]}>{item?.paymentMethod}</Text>
                            <View style={{ width: 13, height: 13, borderWidth: 1, borderRadius: 50, borderColor: selectedPayment == paymentSvg ? '#fff' : color.theme, marginLeft: "auto" }} />

                        </TouchableOpacity>
                    )
                })
            }



            <TouchableOpacity style={styles.addCardBox} onPress={()=>navigation.navigate('TrackOrder')}>
                <View style={styles.addCardPlusBox}>
                    <Text style={styles.plusIcon}>+</Text>
                </View>
                <Text style={styles.paymentTxt}>Add Card</Text>
            </TouchableOpacity>


            <Text style={[styles.productName, { marginVertical: 20 }]}>History</Text>


            <View style={{ marginBottom: 10,flex:1 }}>
                <FlatList
                    data={bags?.slice(1)}
                    keyExtractor={(item, index) => index?.toString()}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                />

            </View>
        </View>
    )
}

export default PaymentOrder

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        paddingTop: 40,
        paddingHorizontal: 15,
        backgroundColor:"#fff"


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
        fontFamily: "Montserrat-Bold"
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
        borderRadius: 13
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
        alignItems:"center"
    },
    productTitle: {
        fontWeight: "600",
        color: color.theme,
        marginBottom: 5,
        fontFamily: "Montserrat-Bold"
    },
    subTitle: {
        color: color.gray,
        fontSize:12,
        fontFamily: "Montserrat-Regular"

    },
    productPrice: {
        marginTop: 4,
        fontWeight: "600",
        color: color.theme,
        marginLeft:"auto",
        fontFamily:"Montserrat-Bold"

    },
    sendWithIcon:{
        flexDirection:"row",
        alignItems:"center",
        backgroundColor:"#EEE",
        alignSelf:"baseline",
        paddingHorizontal:10,
        paddingVertical:3,
        borderRadius:5,
    },
    sendTxt:{
        marginLeft:5,
        color:color.theme,
        fontFamily:"Montserrat-SemiBold",
        fontSize:9

    }
})