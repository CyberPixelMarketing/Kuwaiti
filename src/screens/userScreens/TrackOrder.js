import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ExportSvg from '../../constants/ExportSvg'
import SearchInput from '../../components/SearchInput'
import { color } from '../../constants/color'
import ProgressBar from '../../components/ProgressBar'
import PaymentSuccessModal from '../../components/PaymentSuccessModal'
import { getOrder } from '../../services/UserServices'
import { useSelector } from 'react-redux'
import ScreenLoader from '../../components/ScreenLoader'

const TrackOrder = ({ navigation }) => {

    const userId = useSelector((state) => state.auth?.userId)
    const [currentPosition, setCurrentPosition] = useState(0);
    const [storeOrder, setStoreOrder] = useState([]);
    const [singleOrder, setSingleOrder] = useState('');
    const [isRefresh, setIsRefresh] = useState(false);
    const [isLoader, setIsLoader] = useState(false);


    useEffect(() => {
        orderData()
    }, [])


    useEffect(() => {

        if (singleOrder?.order_status == 'confirmed') {
            setCurrentPosition(0)
        } else if (singleOrder?.order_status == 'processing') {
            setCurrentPosition(1)
        } else if (singleOrder?.order_status == 'delivery') {
            setCurrentPosition(2)
        } else if(singleOrder?.order_status == 'completed') {
            setCurrentPosition(3)
        }

    }, [singleOrder])





    const orderData = async () => {
        setIsLoader(true)
        try {
            const response = await getOrder(userId)
            if (response?.status == 'success') {
                setIsLoader(false)
                setStoreOrder(response?.data)
                setSingleOrder(response?.data[0])
            }else{
                setIsLoader(false)
            }
        } catch (error) {
            setIsLoader(false)
            console.log(error)
        }
    }


    const onOrderPress = (item) => {
        setSingleOrder(item)
        if (item?.order_status == 'confirmed') {
            setCurrentPosition(0)
        } else if (item?.order_status == 'processing') {
            setCurrentPosition(1)
        }
    }


    const renderItem = ({ item, index }) => {
        const text = item?.order_status.charAt(0).toUpperCase() + item?.order_status.slice(1).toLowerCase();
        return (
            <TouchableOpacity onPress={() => onOrderPress(item)} style={styles.TrackingStatusBox}>
                <ExportSvg.Car />
                <View style={{ marginLeft: 10 }}>
                    <Text style={styles.trackingNo}>{item?.track_number}</Text>
                    <Text style={styles.expressTxt}>{item?.address}</Text>
                </View>
                {/* <Text style={[styles.TrackingTxt, { color: TrackingStatus == 'Delivered' ? '#AAAAAA' : TrackingStatus == 'On the way' ? color.theme : '#333333' }]}>{item?.order_status}</Text> */}
                <Text style={[styles.TrackingTxt,{color:item?.order_status == 'confirmed'  ? '#333333' : item?.order_status == 'processing' ? '#AAAAAA' : item?.order_status == 'delivery' ?'#AAAAAA': 'green'}]}>{text}</Text>
            </TouchableOpacity>
        )
    }

    const onRefresh = async()=>{
        setIsRefresh(true)
        try {
            const response = await getOrder(userId)
            if (response?.status == 'success') {
                setIsRefresh(false)
                setStoreOrder(response?.data)
                setSingleOrder(response?.data[0])
            }else{
                setIsRefresh(false)
            }
        } catch (error) {
            console.log(error)
            setIsRefresh(false)

        }
    }

    if(isLoader){
     return(
        <ScreenLoader/>
     )
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ExportSvg.ClickMenuBar />
                </TouchableOpacity>
                <ExportSvg.SmallLogo />
               {/* <TouchableOpacity onPress={()=>navigation.navigate('MyCart')}> 
               <ExportSvg.Cart />
               </TouchableOpacity> */}
            </View>

            {/* <View style={styles.searchContainer}>
                <View style={{ width: "82%" }}>
                    <SearchInput />
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('Filters')}>
                    <ExportSvg.Scanner />
                </TouchableOpacity>
            </View> */}

            <View style={styles.TrackingNumberBox}>
                <ExportSvg.CurveIcon style={{ marginTop: 4 }} />
                <View style={{ marginLeft: 10 }}>
                    <Text style={styles.trackingNo}>{singleOrder?.track_number}</Text>
                    <Text style={styles.expressTxt}>Ena Express</Text>
                </View>
                <Text style={styles.orderPlacedTxt}>Order Placed</Text>
            </View>
            <ProgressBar
                currentPosition={currentPosition}
                setCurrentPosition={setCurrentPosition}
            />

            {/* <View style={styles.dateLocationBox}>
                <TouchableOpacity onPress={() => setCurrentPosition(currentPosition < 3 ? currentPosition + 1 : 3)}>
                    <Text style={styles.expressTxt}>25 June,2021</Text>
                    <Text style={styles.trackingNo}>Warehouse 01</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setCurrentPosition(currentPosition != 0 ? currentPosition - 1 : 0)}>
                    <Text style={styles.expressTxt}>25 June,2021</Text>
                    <Text style={styles.trackingNo}>Hawali-Kuwait</Text>
                </TouchableOpacity>
            </View> */}

                <Text style={styles.TitleTracking}>Tracking</Text>

            <FlatList
                data={storeOrder}
                refreshing={isRefresh}
                onRefresh={onRefresh}
                keyExtractor={(item, index) => index?.toString()}
                renderItem={renderItem}
                contentContainerStyle={{ paddingHorizontal: 5, paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}

            />


            {/* <TrackingBox
                trackingSvg={<ExportSvg.Car />}
                TrackingId={'US 2343445668'}
                TrackingAddress={'Hawali - Kuwait'}
                TrackingStatus={'Delivered'}

            /> */}

            {/* <TrackingBox
                trackingSvg={<ExportSvg.Bike />}
                TrackingId={'US 2343445652'}
                TrackingAddress={'Hawali - Kuwait'}
                TrackingStatus={'On the way'}

            />

            <TrackingBox
                trackingSvg={<ExportSvg.Van />}
                TrackingId={'US 2343445638'}
                TrackingAddress={'Haali - Kuwait'}
                TrackingStatus={'Confirmed'}

            /> */}

        </View>
    )
}

export default TrackOrder

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        paddingTop: 40,
        paddingHorizontal: 15,
        // marginHorizontal: 15,
        backgroundColor: "#fff"


    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 15,
        width:"70%"
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 20
    },
    TrackingNumberBox: {
        flexDirection: "row",
        paddingLeft: 20,
        marginTop: 30,
        marginBottom: 10
    },
    trackingNo: {
        fontFamily: "Montserrat-Bold",
        fontWeight: "600",
        color: color.theme,
    },
    expressTxt: {
        fontFamily: "Montserrat-Regular",
        color: color.gray,
        fontSize: 11
    },
    orderPlacedTxt: {
        marginLeft: "auto",
        fontFamily: "Montserrat-Bold",
        color: color.theme,
        fontWeight: "600",
        fontSize: 11
    },
    dateLocationBox: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        // marginTop: 30,
        paddingLeft: 15,
        paddingRight: 10
    },
    TitleTracking: {
        fontWeight: "600",
        fontSize: 15,
        fontFamily: "Montserrat-Bold",
        color: color.theme,
        marginTop: 40

    },
    TrackingStatusBox: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 13
    },
    TrackingTxt: {
        marginLeft: "auto",
        fontFamily: "Montserrat-SemiBold",
        color: color.theme,
        fontWeight: "600",
        fontSize: 13
    },
    // Modal

})