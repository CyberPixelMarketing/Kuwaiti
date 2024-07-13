import { Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import ExportSvg from '../../constants/ExportSvg'
import { color } from '../../constants/color'

const UserProfile = ({ navigation }) => {


    const UserNavigation = ({ SVG, title }) => {
        return (
            <TouchableOpacity style={styles.userContainer}>
                {SVG}
                <Text style={styles.navigationTxt}>{title}</Text>
                <ExportSvg.RightArrow style={{ marginLeft: "auto" }} />
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
                <TouchableOpacity>
                    <ExportSvg.Settings />
                </TouchableOpacity>
            </View>


            <View style={styles.profileContainer}>
                <Image source={require('../../assets/images/userImage.png')} />
                <View style={{ marginLeft: 10, marginTop: 7 }}>
                    <Text style={styles.userName}>Hasan Mahmud</Text>
                    <Text style={styles.userEmail}>rikafashionshop@gmail.com</Text>
                </View>
            </View>


            <ScrollView showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: 90
                }} >

                <View style={[styles.Wrapper]}>
                    <UserNavigation
                        SVG={<ExportSvg.User />}
                        title={'User Profile'}
                    />


                    <UserNavigation
                        SVG={<ExportSvg.MyOrder />}
                        title={'My Orders'}
                    />


                    <UserNavigation
                        SVG={<ExportSvg.MyFavrt />}
                        title={'My Favourites'}
                    />


                    <UserNavigation
                        SVG={<ExportSvg.ShippingAddress />}
                        title={'Shipping Address'}
                    />

                    <UserNavigation
                        SVG={<ExportSvg.MyCard />}
                        title={'My Card'}
                    />

                    <UserNavigation
                        SVG={<ExportSvg.UserSetting />}
                        title={'Settings'}
                    />

                </View>
    

                <View style={[styles.Wrapper]}>
                    <UserNavigation
                        SVG={<ExportSvg.Faq />}
                        title={'FAQs'}
                    />


                    <UserNavigation
                        SVG={<ExportSvg.Privacy />}
                        title={'Privacy Policy'}
                    />
                </View>
            </ScrollView>

        </View>
    )
}

export default UserProfile

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
    profileContainer: {
        flexDirection: "row",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        backgroundColor: "#fff",
        elevation: 5,
        padding: 10,
        borderRadius: 13
    },
    userName: {
        fontSize: 17,
        fontFamily: "Montserrat-Regular",
        color: color.theme,
        fontWeight: "600"
    },
    userEmail: {
        fontSize: 13,
        color: "#AAA",
        fontFamily: "Montserrat-Regular",
        marginTop: 2

    },
    Wrapper: {
        borderWidth: 1,
        borderRadius: 20,
        paddingVertical: 20,
        paddingHorizontal: 15,
        borderColor: "#DDD",
        marginTop: 30
    },
    userContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10
    },
    navigationTxt: {
        fontFamily: "Montserrat-SemiBold",
        color: color.theme,
        marginLeft: 10
    },

})