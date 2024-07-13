import { Dimensions, FlatList, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ExportSvg from '../../constants/ExportSvg'
import { color } from '../../constants/color'
import { bags } from '../../constants/data'
import { LogBox } from 'react-native';
const {height} = Dimensions.get('screen')


const MyCart = ({ navigation }) => {
    const [productOrder, setProductOrder] = useState(1)
    const increment = (id) => {
        bags?.map((item, index) => {
            if (index == id) {
                setProductOrder(productOrder > 1 ? productOrder - 1 : 1)
            }
        })
    }
    const renderItem = ({ item, index }) => {
        return (
            <View style={styles.productContainer}>
                <Image borderRadius={5} source={item?.img} style={{ width: 80, height: 80 }} />

                <View style={{ marginLeft: 10 }}>
                    <Text style={styles.productTitle}>{item?.title}</Text>
                    <Text style={styles.subTitle}>{item?.subTxt}</Text>
                    <Text style={styles.productPrice}>{item?.price}</Text>
                </View>


                <View style={styles.counterMainContainer}>
                    <View style={styles.itemCounter}>
                        <TouchableOpacity onPress={() => increment(index)}>
                            <Text style={styles.decrementBtnTxt}>-</Text>
                        </TouchableOpacity>

                        <Text style={styles.counterNumberTxt}>{productOrder}</Text>

                        <TouchableOpacity onPress={() => setProductOrder(productOrder + 1)}>
                            <Text style={styles.incrementBtnTxt}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
 


useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
}, [])

    return (

        <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.mainContainer}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ExportSvg.ClickMenuBar />
                </TouchableOpacity>
                <ExportSvg.SmallLogo />
                <ExportSvg.ShippingCart />
            </View>


            <Text style={[styles.productName]}>My Cart</Text>

            <ScrollView  showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow:1,marginBottom:60}}>

                <View>
                    <FlatList
                        data={bags?.slice(1)}
                        keyExtractor={(item, index) => index?.toString()}
                        renderItem={renderItem}
                    />
                </View>

                <View style={styles.promoContainer}>
                    <TextInput
                        placeholder='Promo Code'
                        style={styles.inputStyle}

                    />


                    <TouchableOpacity style={styles.applyBtnBox}>
                        <Text style={styles.applyBtnTxt}>Apply</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, justifyContent: "flex-end", marginBottom: 25 }}>

                    <View style={styles.noOfItemBox}>
                        <Text style={styles.selectedItemTxt}>Total (3 item):</Text>
                        <Text style={styles.selectedItemPriceTxt}>KD500</Text>
                    </View>

                    <View style={styles.bottomPriceCartBox}>
                        <Text style={styles.proceedTxt}>Proceed to Checkout</Text>
                        <View style={styles.bottomCartBox}>
                            <TouchableOpacity onPress={() => navigation.navigate('MyCart')}>
                                <ExportSvg.BoldArrow style={{}} />
                            </TouchableOpacity>
                        </View>


                    </View>
                </View>
            </ScrollView>

        </View>
        </KeyboardAvoidingView>

    )
}

export default MyCart

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        paddingTop: Platform.OS=='ios'? 40:20,
        paddingHorizontal: 15,
        backgroundColor: "#ffffff90"

    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 15
    },
    productName: {
        fontSize: 18,
        color: color.theme,
        fontWeight:"600",
        fontFamily:"Montserrat-Bold"

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
        marginTop: 20,
        padding: 10,
        borderRadius: 10,



    },
    productTitle: {
        color: color.theme,
        marginBottom: 5,
        fontFamily: "Montserrat-Bold"
    },
    subTitle: {
        color: color.gray,
        fontSize:11,
        fontFamily: "Montserrat-SemiBold"


    },
    productPrice: {
        marginTop: 20,
        fontWeight: "600",
        color: color.theme,
        fontFamily: "Montserrat-SemiBold"


    },
    counterMainContainer: {
        flex: 1,
        justifyContent: "flex-end"
    },

    itemCounter: {
        flexDirection: "row",
        backgroundColor: "#EEEEEE",
        alignSelf: "center",
        paddingVertical: 8,
        borderRadius: 50,
        marginLeft: "auto",

    },
    decrementBtnTxt: {
        paddingHorizontal: 15,
        color: color.theme,
    },
    counterNumberTxt: {
        color: color.theme,
        fontSize: 16,
        fontWeight: "300"
    },
    incrementBtnTxt: {
        paddingHorizontal: 15,
        color: color.theme,
    },


    promoContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#F3F3F3",
        height: 50,
        marginTop: 50,
        paddingHorizontal: 15,
        borderRadius: 10
    },
    inputStyle: {
        width: "77%"
    },
    applyBtnBox: {
        backgroundColor: color.theme,
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 7
    },
    applyBtnTxt: {
        color: "#fff",
        fontWeight: "500"
    },






    noOfItemBox: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20
    },
    selectedItemTxt: {
        fontWeight: "600",
        color: color.grayShade
    },
    selectedItemPriceTxt: {
        fontWeight: "600",
        fontSize: 16,
        color: color.theme
    },
    bottomPriceCartBox: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: color.theme,
        paddingVertical: 10,
        borderRadius: 8,
        paddingHorizontal: 10,
        alignItems: "center",
    },
    bottomCartBox: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 5
    },
    proceedTxt: {
        color: "#fff",
        fontWeight: "500",
        fontSize: 16,
        fontFamily: "Montserrat-SemiBold"

    },
    cartTxt: {
        color: color.theme,
        fontWeight: "500"
    }
})