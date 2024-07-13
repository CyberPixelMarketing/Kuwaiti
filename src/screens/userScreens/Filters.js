import { FlatList, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import ExportSvg from '../../constants/ExportSvg'
import { color } from '../../constants/color'
import { filters, ratingStar, sorted } from '../../constants/data'
import CustomButton from '../../components/CustomButton'

const Filters = ({ navigation }) => {
    const [activeRating, setActiveRating] = useState()

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.filterBox}>
                <Text style={styles.filterTxt}>{item?.title}</Text>
            </TouchableOpacity>
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


            <Text style={styles.catTxt}>Categories</Text>


            <View>
                <FlatList
                    data={filters}
                    keyExtractor={(item, index) => index?.toString()}
                    renderItem={renderItem}
                    numColumns={4}
                />
            </View>


            <Text style={[styles.catTxt, { marginTop: 30 }]}>Sorted by</Text>

            {/* Sorting */}
            <View style={styles.sortContainer}>
                {
                    sorted?.map((item, index) => {
                        return (
                            <TouchableOpacity key={index} style={styles.sortBox}>
                                <Text style={styles.sortTxt}>{item?.title}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>


            <Text style={[styles.catTxt, { marginTop: 30 }]}>Ratting</Text>

            {/* Rating */}
            <View >
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
            </View>


            <View style={styles.btnContainer}>
                <CustomButton />
            </View>
        </View>
    )
}

export default Filters

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        paddingTop: Platform.OS == 'ios'? 40 : 20,
        paddingHorizontal: 15

    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 15
    },
    catTxt: {
        fontSize: 18,
        fontWeight: "700",
        color: color.theme
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
    btnContainer:{
      flex:1,
      justifyContent:"flex-end",
      marginBottom:70
    }
})