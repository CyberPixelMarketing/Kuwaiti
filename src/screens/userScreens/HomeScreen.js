import { Dimensions, FlatList, Image, ImageBackground, Keyboard, LogBox, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect } from 'react'
import ExportSvg from '../../constants/ExportSvg'
import { color } from '../../constants/color'
import SearchInput from '../../components/SearchInput'
import { discountProducts, newArrival } from '../../constants/data'
const { width } = Dimensions.get('screen')
const ITEM_WIDTH = Dimensions.get('window').width * 0.8;
const ITEM_MARGIN = Dimensions.get('window').width * 0.1;

const HomeScreen = ({ navigation }) => {
    useEffect(() => {
        LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
      }, [])

    const renderItem = ({ item, index }) => {
        return (
            <View style={[styles.item, { marginHorizontal: ITEM_MARGIN * 0.1 }]}>
                <ImageBackground source={item?.bgImage} style={{ width: width / 1.3, height: 160 }} borderRadius={20}>
                    <View style={{ paddingLeft: 15, paddingTop: 20 }}>
                        <Text style={{ color: color.theme, fontWeight: "700", fontSize: 22 }}>{item?.discount}</Text>
                        <Text style={{ color: color.theme, fontWeight: "300", fontSize: 20 }}>{item?.subText}</Text>
                        <Text style={{ color: color.gray, fontSize: 12, marginTop: 12 }}>{item?.extraTxt}</Text>

                        <TouchableOpacity style={styles.getNowBtn} onPress={() => navigation.navigate('CategoriesList')}>
                            <Text style={styles.getNowBtnTxt}>Get Now</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View >
        )
    }

    const renderArrivalItem = ({ item, index }) => {
        return (
            <View style={{ alignItems: "center",marginBottom:15 }}>
                <ImageBackground source={item?.img} style={{ width: 170, height: 170, marginRight: 5, }} borderRadius={20}>
                    <View style={{ marginLeft: "auto", margin: 10 }}>
                        <ExportSvg.Favorite />
                    </View>
                </ImageBackground>
                <Text style={styles.arrivalTitle}>{item?.title}</Text>
                <Text style={styles.arrivalSubTitle}>{item?.subTxt}</Text>
                <Text style={styles.arrivalPrice}>{item?.price}</Text>
            </View>

        )
    }
    return (
        <View style={styles.mainContainer}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('AllProducts')}>
                    <ExportSvg.MenuBar />
                </TouchableOpacity>
                <ExportSvg.SmallLogo />
                <TouchableOpacity onPress={() => navigation.navigate('OrderDetails')}>

                    <ExportSvg.Cart />
                </TouchableOpacity>
            </View>

            <Text style={styles.welcomeTxt}>Welcome,</Text>
            <Text style={[styles.subTxt, { color: color.gray }]}>Our 1st Shop App</Text>

            <View style={styles.searchContainer}>
                <View style={{ width: "82%" }}>
                    <SearchInput />
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('Filters')}>
                    <ExportSvg.Filter />
                </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={{flex:1,paddingBottom:Platform.OS == 'ios' ? 70:50}}>

            <View style={{ marginRight: -15 }}>
                {/* <FlatList
                    data={discountProducts}
                    keyExtractor={(item, index) => index?.toString()}
                    renderItem={renderItem}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                /> */}

                <FlatList
                    horizontal
                    data={discountProducts}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index?.toString()}
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    snapToInterval={ITEM_WIDTH + ITEM_MARGIN * 0.2}
                    snapToAlignment="start"
                    decelerationRate="fast"
                />
            </View>

            <View style={styles.arrivalBox}>
                <Text style={styles.arrivalTxt}>New Arrivals</Text>
                <Text style={styles.viewTxt}>View all</Text>
            </View>

            <View style={{flex:1}}>
                <FlatList
                    data={newArrival}
                    keyExtractor={(item, index) => index?.toString()}
                    renderItem={renderArrivalItem}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: "space-between" }}
                />
            </View>
            </ScrollView>

        </View>

    )
}

export default HomeScreen

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        paddingTop: Platform.OS == 'ios' ? 40 : 20,
        paddingHorizontal: 15,
        backgroundColor: "#fff",

    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 15
    },
    welcomeTxt: {
        fontSize: 25,
        fontWeight: "600",
        color: color.theme,
        fontFamily:"Montserrat-Bold"
    },
    subTxt: {
        fontSize: 20,
        fontWeight: "600",
        color: color.gray,
        fontFamily:"Montserrat-SemiBold"

    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 20
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
    arrivalBox: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 20,
        marginBottom: 10
    },
    arrivalTxt: {
        fontSize: 18,
        fontWeight: "700",
        color: color.theme
    },
    viewTxt: {
        fontSize: 12,
        fontWeight: "600",
        color: color.gray

    },
    arrivalTitle: {
        fontSize: 15,
        fontWeight: "600",
        color: color.theme,
        marginTop: 5,
        fontFamily:"Montserrat-SemiBold"

    },
    arrivalSubTitle: {
        color: color.gray,
        // fontWeight: "300",
        marginVertical: 2,
        fontFamily:"Montserrat-Regular",
        fontSize:12


    },
    arrivalPrice: {
        color: color.theme,
        // fontWeight: "500",
        fontFamily:"Montserrat-SemiBold"

    },

    item: {
        width: ITEM_WIDTH,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderColor: '#ccc',
        paddingHorizontal: 20,
    },
})