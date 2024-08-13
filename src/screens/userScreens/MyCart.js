import { Dimensions, FlatList, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ExportSvg from '../../constants/ExportSvg'
import { color } from '../../constants/color'
import { bags } from '../../constants/data'
import { LogBox } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import { decrementCounter, deleteProduct, incrementCounter, selectTotalPrice } from '../../redux/reducer/ProductAddToCart'
import EmptyScreen from '../../components/EmptyScreen'
const { height } = Dimensions.get('screen')


const MyCart = ({ navigation }) => {
    const dispatch = useDispatch()
    const data = useSelector((state) => state.cartProducts?.cartProducts)

    const calculateTotalPrice = (items) => {
        return items.reduce((total, item) => {
            return total + (item.counter * parseFloat(item.price));
        }, 0).toFixed(2);
    };

    const totalPrice = calculateTotalPrice(data);

    const incrementProduct = (id) => {
        dispatch(incrementCounter(id))
    }

    const decrementProduct = (id) => {
        dispatch(decrementCounter(id))
    }

    const productDelete = (id) => {
        dispatch(deleteProduct(id))
    }


    const renderItem = ({ item, index }) => {
        return (
            <View style={styles.productContainer}>
                <Image borderRadius={5} source={{ uri: item?.image }} style={{ width: 80, height: 80 }} />

                <View style={{ marginLeft: 10 }}>
                    <Text style={styles.productTitle}>{item?.productName}</Text>
                    <Text style={styles.subTitle}>{item?.subText}</Text>
                    {/* <Text style={styles.productPrice}>KD{item?.price?.toFixed(2)}</Text> */}
                    <Text style={styles.productPrice}>KD{item?.price}</Text>
                </View>


                <View style={styles.counterMainContainer}>
                    <TouchableOpacity style={{ alignSelf: "center" }} onPress={() => productDelete(item?.id)}>
                        <ExportSvg.deletes />
                    </TouchableOpacity>

                    <View >
                        <View style={styles.itemCounter}>
                            <TouchableOpacity onPress={() => decrementProduct(item?.id)}>
                                <Text style={styles.decrementBtnTxt}>-</Text>
                            </TouchableOpacity>

                            <Text style={styles.counterNumberTxt}>{item?.counter}</Text>


                            <TouchableOpacity onPress={() => incrementProduct(item?.id)}>
                                <Text style={styles.incrementBtnTxt}>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    }, [])


    const handlePress = () => {
        if (data.length) {
            // navigation.navigate('ShippingAddress',{
            //     totalPrice:totalPrice
            // })

            navigation.navigate('OrderDetails',{
                totalPrice:totalPrice
            })
        } else {
            alert('Your cart is empty. Add items to get started!')
        }
    }

    if(data?.length == 0) {
        return(
          <EmptyScreen
        text={'No Item In The Cart'}
          />
        )
    }

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
                    <View style={styles.rightIconBox}>
                        <ExportSvg.ShippingCart />
                        <View style={styles.rightIconNumber}>
                            <Text style={styles.noOfItemTxt}>{data?.length}</Text>
                        </View>
                    </View>
                </View>


                <Text style={[styles.productName]}>My Cart</Text>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, marginBottom: 60 }}>

                    <View>
                        <FlatList
                            data={data}
                            keyExtractor={(item, index) => index?.toString()}
                            renderItem={renderItem}
                        />
                    </View>

                    {/* <View style={styles.promoContainer}>
                        <TextInput
                            placeholder='Promo Code'
                            style={styles.inputStyle}
                            placeholderTextColor={'#cecece'}

                        />


                        <TouchableOpacity style={styles.applyBtnBox}>
                            <Text style={styles.applyBtnTxt}>Apply</Text>
                        </TouchableOpacity>
                    </View> */}
                    <View style={{ flex: 1, justifyContent: "flex-end", marginBottom: 25 }}>

                        <View style={styles.noOfItemBox}>
                            <Text style={styles.selectedItemTxt}>Total ({data?.length} item):</Text>
                            <Text style={styles.selectedItemPriceTxt}>KD{totalPrice}</Text>
                        </View>

                        <View style={styles.bottomPriceCartBox}>
                            <Text style={styles.proceedTxt}>Proceed to Checkout</Text>
                            <TouchableOpacity onPress={handlePress} style={styles.bottomCartBox}>
                                <View >
                                    <ExportSvg.BoldArrow style={{}} />
                                </View>
                            </TouchableOpacity>


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
        paddingTop: Platform.OS == 'ios' ? 40 : 20,
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
        fontWeight: "600",
        fontFamily: "Montserrat-Bold"

    },
    emptyScreen:{
     flex:1,
     alignItems:"center",
     justifyContent:"center"
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
        fontSize: 11,
        fontFamily: "Montserrat-SemiBold"


    },
    productPrice: {
        marginTop: 20,
        fontWeight: "600",
        color: color.theme,
        fontFamily: "Montserrat-SemiBold"


    },
    counterMainContainer: {
        marginLeft: "auto",
        alignSelf: "center",
        gap: 20
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
        width: "77%",
        color:"#000"
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
    rightIconBox: {
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
        borderRadius: 50
    },
    rightIconNumber: {
        position: "absolute",
        backgroundColor: color.theme,
        right: 0,
        width: 15,
        height: 15,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50,
        right: -5

    },
    noOfItemTxt: {
        color: "#fff",
        fontSize: 10
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