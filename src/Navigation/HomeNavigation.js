import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/userScreens/HomeScreen';
import SameProduct from '../screens/userScreens/SameProduct';
import AllProducts from '../screens/userScreens/AllProducts';
import Filters from '../screens/userScreens/Filters';
import ProductDetails from '../screens/userScreens/ProductDetails';
import MyCart from '../screens/userScreens/MyCart';

const Stack = createStackNavigator();
const HomeNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
    <Stack.Screen name="HomeScreen" component={HomeScreen} />
    <Stack.Screen name="SameProduct" component={SameProduct} />
    <Stack.Screen name="AllProducts" component={AllProducts} />
    <Stack.Screen name="Filters" component={Filters} />
    <Stack.Screen name="ProductDetails" component={ProductDetails} />
  </Stack.Navigator>
  )
}

export default HomeNavigation

const styles = StyleSheet.create({})



