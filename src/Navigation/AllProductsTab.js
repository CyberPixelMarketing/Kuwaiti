import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SameProduct from '../screens/userScreens/SameProduct';
import AllProducts from '../screens/userScreens/AllProducts';
import { createStackNavigator } from '@react-navigation/stack';
import MyCart from '../screens/userScreens/MyCart';
import ProductDetails from '../screens/userScreens/ProductDetails';

const AllProductsTab = () => {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='UserProfile'>
            <Stack.Screen
                name="AllProducts"
                component={AllProducts}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="SameProduct"
                component={SameProduct}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="MyCart"
                component={MyCart}
                options={{ headerShown: false }}
            />  
            
            
             <Stack.Screen
                name="ProductDetails"
                component={ProductDetails}
                options={{ headerShown: false }}
            />



        </Stack.Navigator>
    )
}

export default AllProductsTab

const styles = StyleSheet.create({})