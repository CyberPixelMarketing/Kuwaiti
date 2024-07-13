import { FlatList, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import ExportSvg from '../../constants/ExportSvg'
import { color } from '../../constants/color'
import { bags } from '../../constants/data'

const OrderDetails = ({navigation}) => {


    const AddressLine = ({ label, value }) => (
        <Text style={styles.label}>
            {label}: <Text style={styles.value}>{value}</Text>
        </Text>
    );




    const renderItem = ({ item, index }) => {
        return (
            <View style={styles.productContainer}>
                <Image borderRadius={5} source={item?.img} style={{ width: 60, height: 60 }} />

                <View style={{ marginLeft: 10 }}>
                    <Text style={styles.productTitle}>{item?.title}</Text>
                    <Text style={styles.subTitle}>{item?.subTxt}</Text>
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


            <View style={styles.userAddressBox}>
                <AddressLine label="Street" value="Hawali" />
                <AddressLine label="City" value="Kuwait" />
                <AddressLine label="State/province/area" value="Kuwait" />
                <AddressLine label="Phone number" value="000-888-1234" />
                <AddressLine label="Zip code" value="1234" />
                <AddressLine label="Country calling code" value="+000" />
                <AddressLine label="Country" value="Kuwait" />
            </View>

            <Text style={[styles.productName, { fontSize: 15 }]}>Product Item</Text>



            <View style={{ marginBottom: 10 }}>
                <FlatList
                    data={bags?.slice(2)}
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


            <View style={{ flex: 1, justifyContent: "flex-end", marginBottom: 20 }}>
                <View style={styles.bottomContent}>
                    <View>
                        <Text style={{ fontSize: 10, color: "#AAA" }}>Total Price</Text>
                        <Text style={styles.bottomPrice}>KD443.00</Text>
                    </View>

                    <TouchableOpacity style={styles.bottomPlaceOrderBox} onPress={()=>navigation.navigate('PaymentOrder')}>
                        <Text style={styles.orderTxt}>Place Order</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    )
}

export default OrderDetails

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        paddingTop: Platform.OS=='ios' ?  40 :20,
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
        fontFamily: "Montserrat-Bold",

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
        fontSize:12,
        marginVertical: Platform.OS =='ios' ? 2 :1
        
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
    bottomPrice:{
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
    }
})