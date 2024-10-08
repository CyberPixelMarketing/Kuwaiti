import { Dimensions, FlatList, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ExportSvg from '../../constants/ExportSvg'
import { color } from '../../constants/color'
import { filters, ratingStar, sorted } from '../../constants/data'
import CustomButton from '../../components/CustomButton'
import { fetchAllProducts, filterData } from '../../services/UserServices'
import FlatListData from '../../components/FlatListData'
import ScreenLoader from '../../components/ScreenLoader'
import CatModal from '../../components/CatModal'
import MultiSlider from '@ptomasroos/react-native-multi-slider';
const { width } = Dimensions.get('screen')


const Filters = ({ navigation }) => {
    const [activeRating, setActiveRating] = useState()
    const [selectedCat, setSelectedCat] = useState([])
    const [selectedSort, setSelectedSort] = useState([])
    const [selectGender, setSelectedGender] = useState([])
    const [selectAge, setSelectedAge] = useState([])


    const [startingPrice, setStartingPrice] = useState(0);
    const [endPrice, setEndPrice] = useState(10);

    const [isLoader, setIsLoader] = useState(false)
    const [storeFilter, setStoreFilter] = useState('')
    const [storeProducts, setStoreProducts] = useState([])
    const [showFilterProduct, setShowFilterProduct] = useState([])
    const [modalVisible, setModalVisible] = useState(false)



    // ++++++++

    const onAgeRangeChange = values => {
        setStartingPrice(values[0]);
        setEndPrice(values[1]);
    };

    const sliderSet = (a, b) => {
        console.log('val', a)
        console.log('valb', b)
    };



    // ++++++++




    useEffect(() => {
        getFilterData()
        getAllProducts()
    }, [])

    const getFilterData = async () => {
        setIsLoader(true)
        try {
            const response = await filterData()
            if (response?.status) {
                setIsLoader(false)
                setStoreFilter(response?.data)
            } else {
                setIsLoader(false)
            }
        } catch (error) {
            setIsLoader(false)
            console.log(error)
        }
    }

    const getAllProducts = async () => {
        try {
            const response = await fetchAllProducts()
            if (response?.length > 0) {
                setStoreProducts(response)
            } else {
                console.log(response)
            }
        } catch (error) {
            console.log(error)
        }
    }

    // if (isLoader) {
    //     return (
    //         <ScreenLoader />
    //     )
    // }




    const onPress = () => {
        const showProducts = storeProducts?.filter((product) =>
            product?.categories?.some(category => selectedCat?.includes(category))
        );
        setShowFilterProduct(showProducts)

        if (showProducts?.length > 0) {
            setModalVisible(true)
        }
    }


    return (
        <View style={styles.mainContainer}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ExportSvg.ClickMenuBar />
                </TouchableOpacity>
                <ExportSvg.SmallLogo />
                <TouchableOpacity onPress={() => navigation.navigate("MyCart")}>
                    <ExportSvg.Cart />
                </TouchableOpacity>
            </View>

            <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1, paddingBottom: 60 }} showsVerticalScrollIndicator={false}>
                <FlatListData
                    data={storeFilter?.categories}
                    selectedItem={selectedCat}
                    setSelectedItem={setSelectedCat}
                    title={'Categories'}
                />

                <View style={{ marginTop: 20 }}>
                    <Text style={styles.catTxt}>Price Range</Text>
                </View>

                <View style={{ alignItems: "center" }}>
                    <MultiSlider
                        values={[startingPrice, endPrice]}
                        sliderLength={width / 1.2}
                        onValuesChange={onAgeRangeChange}
                        onValuesChangeFinish={() => sliderSet(startingPrice, endPrice)}
                        min={0}
                        max={100}
                        step={1}
                        isMarkersSeparated={true}
                        customMarkerLeft={(e) => {
                            return (
                                <View style={{ width: 15, height: 15, borderWidth: 2, borderRadius: 50, marginTop: 5, left: -5, }} />
                            )
                        }}

                        customMarkerRight={(e) => {
                            return (
                                <View style={{ width: 15, height: 15, borderWidth: 2, borderRadius: 50, marginTop: 5, right: -5, }} />
                            )
                        }}

                        selectedStyle={{ backgroundColor: color.theme }}
                        unselectedStyle={{ backgroundColor: '#00000010' }}
                        trackStyle={{ height: 7 }}
                    />

                </View>
                <View style={styles.sliderBox}>
                    <Text style={styles.ageText}>    ${startingPrice} </Text>
                    <Text style={styles.ageText}>   ${endPrice} </Text>
                </View>







                <FlatListData
                    data={sorted}
                    selectedItem={selectedSort}
                    setSelectedItem={setSelectedSort}
                    title={'Sorting'}
                />

                {/* <Text style={[styles.catTxt, { marginTop: 30 }]}>Ratting</Text> */}

                {/* Rating */}
                {/* <View >
                    {
                        ratingStar?.map((item, index) => {
                            return (
                                <TouchableOpacity onPress={() => setActiveRating(item?.rating)} key={index} style={styles.ratingBox}>
                                    <View>
                                        {item?.star}
                                    </View>

                                    {
                                        activeRating == item?.rating ?

                                            <ExportSvg.ActiveRadio />
                                            :
                                            <ExportSvg.Radio
                                            />
                                    }
                                </TouchableOpacity>

                            )
                        })
                    }
                </View> */}


                <View style={styles.btnContainer}>
                    <CustomButton
                        title={'Apply'}
                        onPress={onPress}
                        disabled={selectedCat?.length == 0}
                    />
                </View>

            </ScrollView>


            <CatModal
                setModalVisible={setModalVisible}
                modalVisible={modalVisible}
                showFilterProduct={showFilterProduct}
                navigation={navigation}
            />

        </View>
    )
}

export default Filters

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        paddingTop: Platform.OS == 'ios' ? 40 : 20,
        paddingHorizontal: 15

    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    catTxt: {
        fontSize: 18,
        fontWeight: "700",
        color: color.theme,
        marginTop: 10
    },
    filterBox: {
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginRight: 10,
        borderRadius: 50,
        marginTop: 10,
        borderColor: color.lightGray
    },
    filterTxt: {
        // fontWeight: "600",
        color: color.theme,
        fontFamily: "Montserrat-SemiBold",
    },
    sortContainer: {
        flexDirection: "row",
        justifyContent: "space-between"

    },
    sortBox: {
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginRight: 10,
        borderRadius: 50,
        marginTop: 10,
        borderColor: color.lightGray
    },
    sortTxt: {
        color: color.theme,
        fontFamily: "Montserrat-SemiBold",

    },
    ratingBox: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 15
    },
    btnContainer: {
        flex: 1,
        justifyContent: "flex-end",
        marginBottom: 70
    },
    catTxt: {
        fontSize: 18,
        fontWeight: "700",
        color: color.theme
    },
    sliderBox: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: -10
    },
    ageContainer: {
        // alignSelf: 'flex-end',
    },
    ageText: {
        color: '#AAAAAA',
        fontWeight: '500',
        fontSize: 15,
    },
    yrsText: {
        color: '#808080',
        fontSize: 15,
    },
})