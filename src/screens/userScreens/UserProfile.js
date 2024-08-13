import { Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ExportSvg from '../../constants/ExportSvg'
import { color } from '../../constants/color'
import { baseUrl } from '../../constants/data'
import { useDispatch, useSelector } from 'react-redux'
import { personalData } from '../../services/UserServices'
import { logout } from '../../redux/reducer/Auth'
import { DrawerActions } from '@react-navigation/native'

const UserProfile = ({ navigation }) => {
    const dispatch = useDispatch()
    const userId = useSelector((state) => state.auth?.userId)
    const ssss = useSelector((state) => state.auth)

    const [userData, setUserData] = useState('')

    const UserNavigation = ({ SVG, title, onPress }) => {
        return (
            <TouchableOpacity onPress={onPress} style={styles.userContainer}>
                {SVG}
                <Text style={styles.navigationTxt}>{title}</Text>
                <ExportSvg.RightArrow style={{ marginLeft: "auto" }} />
            </TouchableOpacity>
        )
    }


    useEffect(() => {
        profileData()
    }, [])

    const profileData = async () => {
        try {
            const response = await personalData(userId)
            if (response?.status) {
                setUserData(response?.data)
            }
        } catch (error) {
            console.log(error)
        }
    }


    const LogoutPress = () => {
        dispatch(logout())
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
                <TouchableOpacity>
                    {/* <ExportSvg.Settings /> */}
                </TouchableOpacity>
            </View>


            <View style={styles.profileContainer}>
                <Image source={require('../../assets/images/userImage.png')} />
                <View style={{ marginLeft: 10, marginTop: 7 }}>
                    <Text style={styles.userName}>{userData?.name}</Text>
                    <Text style={styles.userEmail}>{userData?.phone}</Text>
                </View>
            </View>

            {/* <View style={styles.profileContainer}>
                <Image source={require('../../assets/images/userImage.png')} />
                <View style={{ marginLeft: 10, marginTop: 7 }}>
                    <Text style={styles.userName}>{userData?.name}</Text>
                    <Text style={styles.userEmail}>rikafashionshop@gmail.com</Text>
                </View>
            </View> */}


            <ScrollView showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: 90
                }} >

                <View style={[styles.Wrapper]}>
                    {/* <UserNavigation
                        SVG={<ExportSvg.User />}
                        title={'User Profile'}
                    /> */}


                    <UserNavigation
                        SVG={<ExportSvg.MyOrder />}
                        title={'My Orders'}
                        onPress={() => navigation.navigate('TrackOrder')}
                    />


                    <UserNavigation
                        SVG={<ExportSvg.MyFavrt />}
                        title={'My Favourites'}
                        onPress={() => navigation.navigate('MyFavorite')}

                    />


                    <UserNavigation
                        SVG={<ExportSvg.ShippingAddress />}
                        title={'Shipping Address'}
                        onPress={() => navigation.navigate('ShippingAddress', {
                            btnText: "Save"
                        })}
                    />

                    {/* <UserNavigation
                        SVG={<ExportSvg.MyCard />}
                        title={'My Card'}
                    /> */}

                    <TouchableOpacity onPress={LogoutPress} style={styles.userContainer}>
                        <View style={{ width: 40, height: 40, alignItems: "center", justifyContent: "center", backgroundColor: "#cecece90", borderRadius: 7 }}>
                            <ExportSvg.logoutUser />
                        </View>
                        <Text style={styles.navigationTxt}>Logout</Text>
                        <ExportSvg.RightArrow style={{ marginLeft: "auto" }} />
                    </TouchableOpacity>

                    {/* <UserNavigation
                        SVG={<ExportSvg.UserSetting />}
                        title={'Settings'}
                    /> */}

                </View>

                {/* 
                <View style={[styles.Wrapper]}>
                    <UserNavigation
                        SVG={<ExportSvg.Faq />}
                        title={'FAQs'}
                    />


                    <UserNavigation
                        SVG={<ExportSvg.Privacy />}
                        title={'Privacy Policy'}
                    />
                </View> */}
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
        marginBottom: 15,
        width: "90%"
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