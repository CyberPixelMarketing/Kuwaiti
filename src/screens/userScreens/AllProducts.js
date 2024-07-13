import { FlatList, ImageBackground, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import ExportSvg from '../../constants/ExportSvg'
import SearchInput from '../../components/SearchInput'
import { allProducts } from '../../constants/data'
import { color } from '../../constants/color'

const AllProducts = ({navigation}) => {

    const renderItem = ({ item, index }) => {
        const isTextLeft = index % 2 === 0;
        return (
            <TouchableOpacity onPress={()=>navigation.navigate('SameProduct',{
                text:item?.title
            })}>

                <ImageBackground source={item?.img} borderRadius={10} style={styles.bgContainer}>
                    {
                        isTextLeft ?
                            <View style={styles.leftBox}>
                                <Text style={styles.titleTxt}>{item?.title}</Text>
                                <Text style={styles.subTxt}>{item?.products}</Text>
                            </View>
                            :

                            <View style={styles.rightBox}>
                                <Text style={styles.titleTxt}>{item?.title}</Text>
                                <Text style={styles.subTxt}>{item?.products}</Text>
                            </View>
                    }

                </ImageBackground>
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


            <View style={styles.searchContainer}>
                <SearchInput />
            </View>


            <FlatList
                data={allProducts}
                key={(item, index) => index?.toString()}
                renderItem={renderItem}
               contentContainerStyle={{paddingBottom:90}}
               showsVerticalScrollIndicator={false}


            />

        </View>
    )
}

export default AllProducts

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        paddingTop: Platform.OS=='ios' ?40 :20,
        paddingHorizontal: 15,
        backgroundColor:"#fff"


    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 15
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 20
    },
    leftBox: {
        flex: 1,
        justifyContent: "center",
        paddingLeft: 20,
    },
    rightBox: {
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-end",
        paddingRight: 15
    },
    bgContainer: {
        width: "100%",
        height: 100,
        marginBottom: 15
    },
    titleTxt: {
        fontSize: 15,
        fontWeight: "700",
        color: color.theme
    },
    subTxt: {
        fontSize: 12,
        fontWeight: "500",
        color: color.theme,
        marginTop: 3,
        fontFamily:"Montserrat-SemiBold"
    }
})