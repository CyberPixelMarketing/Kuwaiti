import { LogBox, StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/userScreens/HomeScreen';
import SameProduct from '../screens/userScreens/SameProduct';
import AllProducts from '../screens/userScreens/AllProducts';
import Filters from '../screens/userScreens/Filters';
import ProductDetails from '../screens/userScreens/ProductDetails';
import MyCart from '../screens/userScreens/MyCart';
import BottomNavigation from './BottomNavigation';
import OrderDetails from '../screens/userScreens/OrderDetails';
import PaymentOrder from '../screens/userScreens/PaymentOrder';
import SplashScreen from '../SplashScreen';
import Login from '../screens/auth/Login';
import TrackOrder from '../screens/userScreens/TrackOrder';
import CategoriesList from '../screens/userScreens/CategoriesList';
LogBox.ignoreAllLogs();
const Stack = createStackNavigator();
const AppNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false  }} >
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="BottomNavigation" component={BottomNavigation} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SameProduct" component={SameProduct} />
      <Stack.Screen name="AllProducts" component={AllProducts} />
      <Stack.Screen name="Filters" component={Filters} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
      <Stack.Screen name="MyCart" component={MyCart} />
      <Stack.Screen name="OrderDetails" component={OrderDetails} />
      <Stack.Screen name="PaymentOrder" component={PaymentOrder} />
      <Stack.Screen name="TrackOrder" component={TrackOrder} />
      <Stack.Screen name="CategoriesList" component={CategoriesList} />
    </Stack.Navigator>
  )
}

export default AppNavigation

const styles = StyleSheet.create({})



