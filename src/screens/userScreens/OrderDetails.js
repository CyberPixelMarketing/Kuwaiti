import { FlatList, Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ExportSvg from '../../constants/ExportSvg'
import { color } from '../../constants/color'
import { bags } from '../../constants/data'
import { useSelector } from 'react-redux'
import { userShippingAddress } from '../../services/UserServices'

const OrderDetails = ({ navigation, route }) => {
    const { totalPrice } = route?.params
    const data = useSelector((state) => state.cartProducts?.cartProducts)
    const userId = useSelector((state) => state.auth?.userId)
    const [address, setAddress] = useState('')
    const [value, setValue] = useState(totalPrice)

    useEffect(() => {
        getShippingAddress()
    }, [])


    useEffect(() => {
        var mount = true;
        const listener = navigation.addListener('focus', async () => {
            try {
                const response = await userShippingAddress(userId);
                if (response) {
                    setAddress(response?.data?.[response?.data?.length - 1])
                } else {
                    alert('something went wrong')
                }
            } catch (error) {
                console.log(error)
            }
        });

        return () => {
            listener;
            mount = false;
        };
    }, []);


    const AddressLine = ({ label, value }) => (
        <Text style={styles.label}>
            {label}: <Text style={styles.value}>{value}</Text>
        </Text>
    );


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

    const handleOnPress = () => {
        address?.length == 0 || address == undefined?
        alert('Please Add Shipping Address')
        :
        
        navigation.navigate('PaymentOrder', {
            totalPrice: value
        })
    }

    const renderItem = ({ item, index }) => {
        return (
            <View style={styles.productContainer}>
                <Image borderRadius={5} source={{ uri: item?.image }} style={{ width: 60, height: 60 }} />

                <View style={{ marginLeft: 10 }}>
                    <Text style={styles.productTitle}>{item?.productName}</Text>
                    <Text style={styles.subTitle}>{item?.subText}</Text>
                    <Text style={styles.productPrice}>{item?.price}</Text>
                </View>



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

            <Text style={[styles.productName]}>Delivery Address</Text>

            <ScrollView contentContainerStyle={{ paddingHorizontal: 4,paddingBottom:70 }}>
                {
                    address?.length == 0 || address == undefined
                        ?
                        <TouchableOpacity onPress={() => navigation.navigate('ShippingAddress')} style={styles.addCardBox}>
                            <View style={styles.addCardPlusBox}>
                                <Text style={styles.plusIcon}>+</Text>
                            </View>
                            <Text style={{ fontSize: 16, fontFamily: "Montserrat-Medium", color: color.theme }}>Add Shipping Address</Text>
                        </TouchableOpacity>
                        :
                        <View>
                            <View style={styles.userAddressBox}>
                                <AddressLine label="Street" value={address?.street} />
                                <AddressLine label="City" value={address?.city} />
                                <AddressLine label="State/province/area" value={address?.area} />
                                <AddressLine label="Phone number" value={address?.phone} />
                                <AddressLine label="Zip code" value={address?.emirates} />
                                <AddressLine label="Country calling code" value={address?.block_avenue} />
                                <AddressLine label="Country" value={address?.country} />
                            </View>
                            <TouchableOpacity onPress={() => navigation.navigate('ShippingAddress')} style={styles.editBox}>
                                <Text style={{ color: color.theme }}>Edit</Text>
                            </TouchableOpacity>
                        </View>
                }


                <Text style={[styles.productName, { fontSize: 15 }]}>Product Item</Text>



                <View style={{ marginBottom: 10 }}>
                    <FlatList
                        // data={bags?.slice(2)}
                        data={data}
                        keyExtractor={(item, index) => index?.toString()}
                        renderItem={renderItem}
                    />
                </View>

                <Text style={[styles.productName, { fontSize: 15 }]}>Promo Code</Text>

                <View style={styles.productContainer}>
                    <View style={styles.percentLogoBox}>
                        <ExportSvg.PromoPercent />
                    </View>
                    <View style={{ marginLeft: 10 }}>
                        <Text style={styles.productTitle}>Add Promo Code</Text>
                        <Text style={styles.subTitle}>#rika2021</Text>
                    </View>
                </View>


                <View style={{ flex: 1, justifyContent: "flex-end", marginVertical: 30, }}>
                    <View style={styles.bottomContent}>
                        <View>
                            <Text style={{ fontSize: 10, color: "#AAA" }}>Total Price</Text>
                            <Text style={styles.bottomPrice}>KD{value}</Text>
                        </View>

                        <TouchableOpacity   style={styles.bottomPlaceOrderBox} onPress={handleOnPress}>
                            <Text style={styles.orderTxt}>Place Order</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

        </View>
    )
}

export default OrderDetails

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        paddingTop: Platform.OS == 'ios' ? 40 : 20,
        backgroundColor: "#fff",
        paddingHorizontal: 15

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
    editBox: {
        position: "absolute",
        right: 15,
        top: 30
    },
    userAddressBox: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        backgroundColor: "#fff",
        elevation: 5,
        padding: 20,
        borderRadius: 20,
        marginVertical: 15
    },
    label: {
        fontFamily: "Montserrat-SemiBold",
        fontWeight: "600",
        color: color.theme,
        marginBottom: 7
    },
    value: {
        color: color.grayShade,
        fontWeight: "400",
        fontFamily: "Montserrat-Regular",

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
    },
    productTitle: {
        color: color.theme,
        fontFamily: "Montserrat-SemiBold"
    },
    subTitle: {
        fontWeight: '400',
        color: color.gray,
        fontFamily: "Montserrat-Regular",
        fontSize: 12,
        marginVertical: Platform.OS == 'ios' ? 2 : 1

    },
    productPrice: {
        fontWeight: "600",
        color: color.theme,
        fontFamily: "Montserrat-SemiBold"


    },
    counterMainContainer: {
        flex: 1,
        justifyContent: "flex-end"
    },


    percentLogoBox: {
        width: 40,
        height: 40,
        backgroundColor: color.theme,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 7
    },
    bottomContent: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    bottomPlaceOrderBox: {
        paddingHorizontal: 25,
        paddingVertical: 12,
        backgroundColor: color.theme,
        borderRadius: 50
    },
    bottomPrice: {
        fontSize: 18,
        fontWeight: "600",
        fontFamily: "Montserrat-Bold",
        color: color.theme
    },
    orderTxt: {
        fontSize: 16,
        fontFamily: "Montserrat-SemiBold",
        color: "#fff",
        fontWeight: "600"
    },
    addCardBox: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        height: 60,
        marginVertical: 25,
        borderStyle: 'dashed',
        borderColor: "#DDD",
        borderRadius: 13,
        zIndex: -1
    },
    addCardPlusBox: {
        width: 35,
        height: 35,
        borderWidth: 1,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
        borderColor: "#DDD",
        marginRight: 15

    },
    plusIcon: {
        color: color.theme,
        fontSize: 18
    },


})