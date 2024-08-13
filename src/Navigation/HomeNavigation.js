import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/userScreens/HomeScreen';
import SameProduct from '../screens/userScreens/SameProduct';
import AllProducts from '../screens/userScreens/AllProducts';
import Filters from '../screens/userScreens/Filters';
import ProductDetails from '../screens/userScreens/ProductDetails';
import MyCart from '../screens/userScreens/MyCart';
import CategoriesList from '../screens/userScreens/CategoriesList';
import ShippingAddress from '../screens/userScreens/ShippingAddress';
import OrderDetails from '../screens/userScreens/OrderDetails';
import PaymentOrder from '../screens/userScreens/PaymentOrder';

const Stack = createStackNavigator();
const HomeNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='HomeScreen'>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="Filters" component={Filters} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
      <Stack.Screen name="CategoriesList" component={CategoriesList} />
      <Stack.Screen name="MyCart" component={MyCart} />
      <Stack.Screen name="ShippingAddress" component={ShippingAddress} options={{
        presentation: "modal",
        gestureEnabled: true,
      }} />
      <Stack.Screen name="OrderDetails" component={OrderDetails} />
      <Stack.Screen name="PaymentOrder" component={PaymentOrder} />
    </Stack.Navigator>
  )
}

export default HomeNavigation

const styles = StyleSheet.create({})



