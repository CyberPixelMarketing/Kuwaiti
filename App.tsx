import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SplashScreen from './src/SplashScreen'
import HomeScreen from './src/screens/userScreens/HomeScreen'
import AllProducts from './src/screens/userScreens/AllProducts'
import SameProduct from './src/screens/userScreens/SameProduct'
import { NavigationContainer } from '@react-navigation/native'
import AppNavigation from './src/Navigation/AppNavigation'
import Login from './src/screens/auth/Login'
import OrderDetails from './src/screens/userScreens/OrderDetails'
import PaymentOrder from './src/screens/userScreens/PaymentOrder'
import UserProfile from './src/screens/userScreens/UserProfile'
import BottomNavigation from './src/Navigation/BottomNavigation'
import TrackOrder from './src/screens/userScreens/TrackOrder'
import CategoriesList from './src/screens/userScreens/CategoriesList'
import Testing from './src/screens/userScreens/Testing'

const App = () => {
  return (
    <NavigationContainer>
      <AppNavigation />
    </NavigationContainer>

  )
}

export default App

const styles = StyleSheet.create({})