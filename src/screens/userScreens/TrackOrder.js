import { Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import ExportSvg from '../../constants/ExportSvg'
import SearchInput from '../../components/SearchInput'
import { color } from '../../constants/color'
import ProgressBar from '../../components/ProgressBar'
import PaymentSuccessModal from '../../components/PaymentSuccessModal'

const TrackOrder = ({ navigation }) => {
    const [currentPosition, setCurrentPosition] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);


    const TrackingBox = ({ trackingSvg, TrackingId, TrackingAddress, TrackingStatus }) => {
        return (
            <View style={styles.TrackingStatusBox}>
                {trackingSvg}
                <View style={{ marginLeft: 10 }}>
                    <Text style={styles.trackingNo}>{TrackingId}</Text>
                    <Text style={styles.expressTxt}>{TrackingAddress}</Text>
                </View>
                <Text style={[styles.TrackingTxt, { color: TrackingStatus == 'Delivered' ? '#AAAAAA' : TrackingStatus == 'On the way' ? color.theme : '#333333' }]}>{TrackingStatus}</Text>
            </View>
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
                <View style={{ width: "82%" }}>
                    <SearchInput />
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('Filters')}>
                    <ExportSvg.Scanner />
                </TouchableOpacity>
            </View>

            <View style={styles.TrackingNumberBox}>
                <ExportSvg.CurveIcon style={{ marginTop: 4 }} />
                <View style={{ marginLeft: 10 }}>
                    <Text style={styles.trackingNo}>6556 23341 8090</Text>
                    <Text style={styles.expressTxt}>Ena Express</Text>
                </View>
                <Text style={styles.orderPlacedTxt}>Order Placed</Text>
            </View>
            <ProgressBar
                currentPosition={currentPosition}
                setCurrentPosition={setCurrentPosition}
            />

            <View style={styles.dateLocationBox}>
                <TouchableOpacity onPress={() => setCurrentPosition(currentPosition < 3 ? currentPosition + 1 : 3)}>
                    <Text style={styles.expressTxt}>25 June,2021</Text>
                    <Text style={styles.trackingNo}>Warehouse 01</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setCurrentPosition(currentPosition != 0 ? currentPosition - 1 : 0)}>
                    <Text style={styles.expressTxt}>25 June,2021</Text>
                    <Text style={styles.trackingNo}>Hawali-Kuwait</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Text style={styles.TitleTracking}>Tracking</Text>
            </TouchableOpacity>

            <TrackingBox
                trackingSvg={<ExportSvg.Car />}
                TrackingId={'US 2343445668'}
                TrackingAddress={'Hawali - Kuwait'}
                TrackingStatus={'Delivered'}

            />

            <TrackingBox
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

            />

            <PaymentSuccessModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}

            />


        </View>
    )
}

export default TrackOrder

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        paddingTop: 40,
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