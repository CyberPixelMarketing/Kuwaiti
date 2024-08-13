import { FlatList, ImageBackground, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ExportSvg from '../../constants/ExportSvg'
import SearchInput from '../../components/SearchInput'
import { allProducts } from '../../constants/data'
import { color } from '../../constants/color'
import { categoriesList } from '../../services/UserServices'
import ScreenLoader from '../../components/ScreenLoader'
import SearchModal from '../../components/SearchModal'
import { useDispatch } from 'react-redux'
import { DrawerActions } from '@react-navigation/native'

const AllProducts = ({ navigation }) => {
const dispatch = useDispatch()
    const [storeCat, setStoreCat] = useState()
    const [isLoader, setIsLoader] = useState(false)
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        getCatList()
    }, [])

    const getCatList = async () => {
        setIsLoader(true)
        try {
            const response = await categoriesList()
            if (response?.status) {
                setIsLoader(false)
                setStoreCat(response?.data)
            }
        } catch (error) {
            setIsLoader(false)
            console.log(error)
        }
    }

    const renderItem = ({ item, index }) => {
        const isTextLeft = index % 2 === 0;
        return (
            <TouchableOpacity onPress={() => navigation.navigate('SameProduct', {
                text: item?.name
            })}>

                <ImageBackground source={{ uri: item?.image }} borderRadius={10} style={styles.bgContainer}>
                    {
                        isTextLeft ?
                            <View style={styles.leftBox}>
                                <Text style={styles.titleTxt}>{item?.name}</Text>
                                <Text style={styles.subTxt}>{item?.total_products}</Text>
                            </View>
                            :

                            <View style={styles.rightBox}>
                                <Text style={styles.titleTxt}>{item?.name}</Text>
                                <Text style={styles.subTxt}>{item?.total_products}</Text>
                            </View>
                    }

                </ImageBackground>
            </TouchableOpacity>

        )
    }

    if (isLoader) {
        return (
            <ScreenLoader />
        )
    }


    return (
        <View style={styles.mainContainer}>
            <View style={styles.headerContainer}>
                {/* <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ExportSvg.ClickMenuBar />
                </TouchableOpacity> */}
                  <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                    <ExportSvg.MenuBar />
                </TouchableOpacity>
                <ExportSvg.SmallLogo />
             <TouchableOpacity onPress={()=>navigation.navigate('MyCart')}>
             <ExportSvg.Cart /> 
             </TouchableOpacity>
            </View>


            <View style={styles.searchContainer}>


                <TouchableOpacity style={[styles.searchBox]} onPress={() => setModalVisible(true)}>
                    <ExportSvg.Search style={{
                        marginLeft: 18,
                        marginRight: 10
                    }} />
                    <Text style={{color:"#00000080"}}>Search Here...</Text>
                </TouchableOpacity>
            </View>


            <FlatList
                data={storeCat}
                key={(item, index) => index?.toString()}
                renderItem={renderItem}
                contentContainerStyle={{ paddingBottom: 90 }}
                showsVerticalScrollIndicator={false}
            />

            <View>
                <SearchModal
                    setModalVisible={setModalVisible}
                    modalVisible={modalVisible}
                    navigation={navigation}
                />
            </View>

        </View>
    )
}

export default AllProducts

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        paddingTop: Platform.OS == 'ios' ? 40 : 20,
        paddingHorizontal: 15,
        backgroundColor: "#fff"


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
    searchBox: {
        backgroundColor: color.gray.concat('10'),
        flexDirection: "row",
        alignItems: "center",
        height: 50,
        borderRadius: 30,
        width: "100%",
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
        color: color.theme,
        textTransform:"capitalize"
    },
    subTxt: {
        fontSize: 12,
        fontWeight: "500",
        color: color.theme,
        marginTop: 3,
        fontFamily: "Montserrat-SemiBold"
    }
})