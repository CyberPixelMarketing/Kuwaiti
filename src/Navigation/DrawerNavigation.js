import { LogBox, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import BottomNavigation from './BottomNavigation';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { color } from '../constants/color';
import { useNavigation } from '@react-navigation/native';
import SameProduct from '../screens/userScreens/SameProduct';
import MyCart from '../screens/userScreens/MyCart';
import ExportSvg from '../constants/ExportSvg';

LogBox.ignoreAllLogs();
const DrawerContent = ({ }) => {
    const navigation = useNavigation()
    const [activeItem, setActiveItem] = useState("Home");

    const handlePress = screenName => {
        navigation.navigate(screenName);
        setActiveItem(screenName);
    };

    const handleCloseDrawer = () => {
        navigation.dispatch(DrawerActions.closeDrawer());
    };

    return (
        <View style={styles.container}>


<ExportSvg.SmallLogo/>


            <View style={styles.menuContainer}>
                <TouchableOpacity
                    onPress={() => handlePress('HomeScreen')}
                    activeOpacity={0.8}
                    style={[
                        styles.menuItem,
                        activeItem === 'HomeScreen' && styles.activeMenuItem,
                    ]}>

                    <Text style={styles.menuText}>Home</Text>
                </TouchableOpacity>
                <View style={styles.border} />
                <TouchableOpacity
                    onPress={() => handlePress('MyFavorite')}
                    activeOpacity={0.8}
                    style={[
                        styles.menuItem,
                    ]}>
                    <Text style={[styles.menuText, activeItem === 'MyFavorite' && styles.activeMenuItem,]}>Favorite</Text>
                </TouchableOpacity>
                <View style={styles.border} />

                <TouchableOpacity
                    onPress={() => handlePress('ProfileTab')}
                    activeOpacity={0.8}
                    style={[
                        styles.menuItem,
                        activeItem === 'ProfileTab' && styles.activeMenuItem,
                    ]}>
                    <Text style={styles.menuText}>Profile</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
};


export const StackNavigation = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator >

            <Stack.Screen
                name={'BottomNavigation'}
                component={BottomNavigation}
                options={{ headerShown: false }}
            />

{/* <Stack.Screen
                name={'MyCart'}
                component={MyCart}
                options={{ headerShown: false }}
            /> */}
           
            
              

        </Stack.Navigator>
    )
}



export const DrawerNavigation = () => {
    const Drawer = createDrawerNavigator();

    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false,
            }}
            drawerContent={() => <DrawerContent />}>

            <Drawer.Screen
                name="StackNavigation"
                component={StackNavigation}
                options={{
                    drawerItemStyle: { height: 0 },
                }}
            />

        </Drawer.Navigator>
    );
};


export const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 40,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    appName: {
        fontFamily: 'Play-Bold',
        fontSize: 28,
        color: '#D1CBD8',
    },
    menuContainer: {
        paddingTop: 30,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingLeft: 10
    },
    activeMenuItem: {
        color: color.theme,
    },
    menuText: {
        fontFamily: 'Montserrat-Medium',
        color: '#000',
    },
    footerContainer: {
        gap: 15,
        alignItems: 'center',
        bottom: '10%',
        alignSelf: 'center',
    },
    footerText: {
        fontFamily: 'Play-Regular',
        fontSize: 16,
        color: '#D1CBD8',
    },
    socialIconsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },
    border: {
        width: "100%",
        height: 1,
        backgroundColor: "#eee",
        marginVertical: 10
    }
});