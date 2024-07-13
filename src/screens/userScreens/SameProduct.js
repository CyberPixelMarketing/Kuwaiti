import { Dimensions, FlatList, ImageBackground, LogBox, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import ExportSvg from '../../constants/ExportSvg'
import { color } from '../../constants/color'
import { bags, discountProducts, electronics } from '../../constants/data'
const { width } = Dimensions.get('screen')

const SameProduct = ({ navigation, route }) => {
    const { text } = route?.params
    useEffect(() => {
        LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
      }, [])

    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity activeOpacity={0.8} onPress={()=>navigation.navigate('ProductDetails')} style={{ alignItems: "center", marginBottom: 20 }}>
                <ImageBackground source={item?.img} style={{ width: 160, height: 170, marginRight: 5, }} borderRadius={20}>
                    <View style={{ marginLeft: "auto", margin: 10 }}>
                        <ExportSvg.Favorite />
                    </View>

                </ImageBackground>
                <Text style={styles.arrivalTitle}>{item?.title}</Text>
                <Text style={styles.arrivalSubTitle}>{item?.subTxt}</Text>
                <Text style={styles.arrivalPrice}>{item?.price}</Text>
            </TouchableOpacity>

        )
    }

    const renderItems = ({ item, index }) => {
        return (
            <ImageBackground source={item?.bgImage} style={{ width: '100%', height: 160, marginRight: 15, marginBottom: 15 }} borderRadius={20}>
                <View style={{ paddingLeft: 15, paddingTop: 20 }}>
                    <Text style={{ color: color.theme, fontWeight: "700", fontSize: 22 }}>{item?.discount}</Text>
                    <Text style={{ color: color.theme, fontWeight: "300", fontSize: 20 }}>{item?.subText}</Text>
                    <Text style={{ color: color.gray, fontSize: 12, marginTop: 12 }}>{item?.extraTxt}</Text>

                    <TouchableOpacity style={styles.getNowBtn}>
                        <Text style={styles.getNowBtnTxt}>Get Now</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        )
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ExportSvg.ClickMenuBar />
                </TouchableOpacity>
                <ExportSvg.SmallLogo />
                <ExportSvg.Cart />
            </View>

            <Text style={styles.arrivalTxt}>{text}</Text>



            <ScrollView showsVerticalScrollIndicator={false}>
                {
                    text == 'New Arrivals' ?
                        <FlatList
                            data={discountProducts}
                            keyExtractor={(item, index) => index?.toString()}
                            renderItem={renderItems}
                            showsVerticalScrollIndicator={false}
                        />
                        :
                        <FlatList
                            data={text == 'Bags' ? bags : electronics}
                            keyExtractor={(item, index) => index?.toString()}
                            renderItem={renderItem}
                            showsVerticalScrollIndicator={false}
                            numColumns={2}
                            columnWrapperStyle={{ justifyContent: "space-between" }}
                        />

                }





            </ScrollView>

        </View>
    )
}

export default SameProduct

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        paddingTop: Platform.OS=='ios' ?40 :20,
        paddingHorizontal: 15

    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 15
    },
    arrivalTxt: {
        fontSize: 17,
        fontWeight: "700",
        color: color.theme,
        marginBottom: 10
    },

    arrivalTitle: {
        fontSize: 15,
        color: color.theme,
        marginTop: 5,
        fontFamily:"Montserrat-SemiBold"
    },
    arrivalSubTitle: {
        color: color.gray,
        marginVertical: 2,
        fontFamily:"Montserrat-Regular",
        fontSize:13


    },
    arrivalPrice: {
        color: color.theme,
        fontFamily:"Montserrat-SemiBold"
    },
    getNowBtn: {
        backgroundColor: color.theme,
        paddingVertical: 6,
        borderRadius: 20,
        paddingHorizontal: 12,
        alignSelf: "flex-start",
        marginTop: 20
    },
    getNowBtnTxt: {
        fontWeight: "700",
        color: "#fff",
        fontSize: 11,

    },
})