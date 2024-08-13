import { Dimensions, FlatList, Image, ImageBackground, LogBox, Modal, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ExportSvg from '../../constants/ExportSvg'
import { color } from '../../constants/color'
import { homeBanner, newArrivals, searchProductByName } from '../../services/UserServices'
import SingleProductCard from '../../components/SingleProductCard'
import SearchModal from '../../components/SearchModal'
import { DrawerActions } from '@react-navigation/native'
import ScreenLoader from '../../components/ScreenLoader'
const { width, height } = Dimensions.get('screen')
const ITEM_WIDTH = Dimensions.get('window').width * 0.8;
const ITEM_MARGIN = Dimensions.get('window').width * 0.1;

const HomeScreen = ({ navigation }) => {

    const [banner, setBanner] = useState([])
    const [arrivalData, setArrivalData] = useState([])
    const [isLoader, setIsLoader] = useState(false)
    const [loader, setLoader] = useState(false)

    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
    }, [])


    useEffect(() => {
        discountHomeBanner()
        getNewArrivals()
    }, [])

    const discountHomeBanner = async () => {
        setLoader(true)
        try {
            const result = await homeBanner()
            if (result?.status) {
                setLoader(false)
                setBanner(result?.data)
            } else {
                setLoader(false)
            }
        } catch (error) {
            setLoader(false)
            console.log(error)
        }
    }

    const getNewArrivals = async () => {
        setIsLoader(true)
        try {
            const result = await newArrivals()
            if (result?.status) {
                setIsLoader(false)
                setArrivalData(result?.data)
            } else {
                setIsLoader(false)
            }
        } catch (error) {
            setIsLoader(false)
            console.log(error)
        }
    }






    const renderItem = ({ item, index }) => {
        return (
            <View style={[styles.item, { marginHorizontal: ITEM_MARGIN * 0.1 }]}>
                <ImageBackground source={{ uri: item?.image }} style={{ width: width / 1.3, height: 160 }} borderRadius={20}>
                    <View style={{ paddingLeft: 15, paddingTop: 20 }}>
                        <Text style={styles.discountTxt}>{item?.title_line_1}</Text>
                        <Text style={styles.discountTitle}>{item?.title_line_2}</Text>
                        <Text style={styles.subTitleTxt}>{item?.title_line_3}</Text>
                        {/* <TouchableOpacity style={styles.getNowBtn} onPress={() => navigation.navigate('CategoriesList')}>
                            <Text style={styles.getNowBtnTxt}>Get Now</Text>
                        </TouchableOpacity> */}
                    </View>
                </ImageBackground>
            </View >
        )
    }

    const renderArrivalItem = ({ item, index }) => {
        return (
            <SingleProductCard
                item={item}
                onPress={() => navigation.navigate('ProductDetails', { id: item?.pid })}
            />
        )
    }

  
    if (loader || isLoader) {
        return (
            <ScreenLoader />
        )
    }


    return (
        <View style={styles.mainContainer}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                    <ExportSvg.MenuBar />
                </TouchableOpacity>

                {/* <TouchableOpacity onPress={() => navigation.navigate('AllProducts')}>
                    <ExportSvg.MenuBar />
                </TouchableOpacity> */}
                <ExportSvg.SmallLogo />
                {/* <TouchableOpacity onPress={()=>navigation.navigate('MyCart')}>
                    <ExportSvg.Cart />
                </TouchableOpacity> */}
            </View>

            <Text style={styles.welcomeTxt}>Welcome,</Text>
            <Text style={[styles.subTxt, { color: color.gray }]}>Our 1st Shop App</Text>

            <View style={styles.searchContainer}>
                <TouchableOpacity style={[styles.searchBox]} onPress={() => setModalVisible(true)}>
                    {/* <SearchInput 
                    value={search}
                    onChangeText={setSearch}
                    
                    /> */}

                    <ExportSvg.Search style={{
                        marginLeft: 18,
                        marginRight: 10
                    }} />
                    <Text style={{color:"#00000080"}}>Search Here...</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Filters')}>
                    <ExportSvg.Filter />
                </TouchableOpacity>
            </View>



            <ScrollView  showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, paddingBottom: Platform.OS == 'ios' ? 70 : 50 }}>

                <View style={{ marginRight: -15 }}>

                    <FlatList
                        horizontal
                        data={banner}
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

                <View style={{ flex: 1 }}>
                    <FlatList
                        data={arrivalData}
                        keyExtractor={(item, index) => index?.toString()}
                        renderItem={renderArrivalItem}
                        showsVerticalScrollIndicator={false}
                        numColumns={2}
                        columnWrapperStyle={{ justifyContent: "space-between", flexGrow: 1 }}
                    />
                </View>
            </ScrollView>




            <SearchModal
                setModalVisible={setModalVisible}
                modalVisible={modalVisible}
                navigation={navigation}
            />

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
        marginBottom: 15,
        width:"70%"
    },
    welcomeTxt: {
        fontSize: 25,
        fontWeight: "600",
        color: color.theme,
        fontFamily: "Montserrat-Bold"
    },
    subTxt: {
        fontSize: 20,
        fontWeight: "600",
        color: color.gray,
        fontFamily: "Montserrat-SemiBold"

    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 20
    },

    searchBox: {
        backgroundColor: color.gray.concat('10'),
        flexDirection: "row",
        alignItems: "center",
        height: 50,
        borderRadius: 30,
        width: "82%",
    },
    getNowBtn: {
        backgroundColor: color.theme,
        paddingVertical: 6,
        borderRadius: 20,
        paddingHorizontal: 12,
        alignSelf: "flex-start",
        marginTop: 20
    },
    discountTxt: {
        color: color.theme,
        fontWeight: "700",
        fontSize: 22
    },
    discountTitle: {
        color: color.theme,
        fontWeight: "300",
        fontSize: 20
    },
    subTitleTxt: {
        color: color.gray,
        fontSize: 12,
        marginTop: 12
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
        fontFamily: "Montserrat-SemiBold"

    },
    arrivalSubTitle: {
        color: color.gray,
        // fontWeight: "300",
        marginVertical: 2,
        fontFamily: "Montserrat-Regular",
        fontSize: 12


    },
    arrivalPrice: {
        color: color.theme,
        // fontWeight: "500",
        fontFamily: "Montserrat-SemiBold"

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