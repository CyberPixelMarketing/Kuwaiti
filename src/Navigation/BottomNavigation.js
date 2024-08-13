import { Platform, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/userScreens/HomeScreen';
import UserProfile from '../screens/userScreens/UserProfile';
import MyCart from '../screens/userScreens/MyCart';
import ExportSvg from '../constants/ExportSvg';
import Icon from '../assets/svg/BottomSvg/Index';
import Notification from '../screens/userScreens/Notification';
import HomeNavigation from './HomeNavigation';
import AllProducts from '../screens/userScreens/AllProducts';
import MyFavorite from '../screens/userScreens/MyFavorite';
import ProfileTab from './ProfileTab';
import AllProductsTab from './AllProductsTab';
const Tab = createBottomTabNavigator();
const BottomNavigation = () => {

    return (
        <Tab.Navigator initialRouteName='HomeNavigation' screenOptions={{
            headerShown: false,
            tabBarStyle: {
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                position: "absolute",
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                backgroundColor: "#fff",
                elevation: 5,
                paddingHorizontal: 15,
                paddingTop: 20,
                height: Platform.OS == 'ios' ? 79 : 60

            },
            tabBarHideOnKeyboard: 'true',
            
        }}>
            <Tab.Screen
                name="HomeNavigation"
                component={HomeNavigation}
                options={{
                    tabBarIcon: ({ color, size, focused }) => {
                        return (
                            <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: "#eee", borderRadius: 30 }}>
                                <View style={[styles.iconContainer, focused && { backgroundColor: "#67300F" }]}>
                                    <Icon.Home color={focused ? "#fff" : "#67300F"} />
                                </View>
                                {focused && <Text style={styles.tabTxt}>Home</Text>}
                            </View>
                        )
                    },
                    title: "",
                }}
            />


            <Tab.Screen


                name="AllProductsTab"
                component={AllProductsTab}
                options={{
                    tabBarIcon: ({ size, color, focused }) => {
                        return (
                            <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: "#eee", borderRadius: 30 }}>
                                <View style={[styles.iconContainer, focused && { backgroundColor: "#67300F" }]}>
                                    <Icon.BottomCart color={focused ? "#fff" : "#67300F"} />
                                </View>
                                {focused && <Text style={styles.tabTxt}>Cart</Text>}
                            </View>
                        )
                    },
                    title: ""


                }}
            />

            <Tab.Screen
                name="MyFavorite"
                component={MyFavorite}
                options={{
                    tabBarIcon: ({ size, color, focused }) => {
                        return (
                            <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: "#eee", borderRadius: 30 }}>
                                <View style={[styles.iconContainer, focused && { backgroundColor: "#67300F" }]}>
                                    <Icon.heartOutline color={focused ? "#fff" : "#67300F"} />
                                </View>
                                {focused && <Text style={styles.tabTxt}>My Favorite</Text>}
                            </View>
                        )
                    },
                    title: ""

                }}
            />


            <Tab.Screen
                name="ProfileTab"
                component={ProfileTab}
                options={{
                    tabBarIcon: ({ size, color, focused }) => {
                        return (
                            <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: "#eee", borderRadius: 30 }}>
                                <View style={[styles.iconContainer, focused && { backgroundColor: "#67300F" }]}>
                                    <Icon.ProfileUser color={focused ? "#fff" : "#67300F"} />
                                </View>
                                {focused && <Text style={styles.tabTxt}>Profile</Text>}
                            </View>
                        )
                    },
                    title: ""
                }}
            />
        </Tab.Navigator>
    )
}

export default BottomNavigation

const styles = StyleSheet.create({
    iconContainer: {
        width: 30,
        height: 30,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50,
        backgroundColor: "#fff"
    },
    tabTxt: {
        paddingLeft: 5,
        paddingRight: 10,
        color: "#000"
    }
})