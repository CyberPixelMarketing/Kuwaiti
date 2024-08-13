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
import { Provider, useSelector } from 'react-redux'
import { store, persistor } from './src/redux/store'
import ShippingAddress from './src/screens/userScreens/ShippingAddress'
import { StripeProvider } from '@stripe/stripe-react-native'
import { SP_KEY } from './src/constants/data'
import { DrawerNavigation } from './src/Navigation/DrawerNavigation'
import { PersistGate } from "redux-persist/es/integration/react";
import AuthNavigation from './src/Navigation/AuthNavigation'
const App = () => {

  return (
    // <Provider store={store}>
    //     <NavigationContainer>
    //       <AppNavigation />
    //     </NavigationContainer>
    // </Provider> 

    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
        <AppNavigation/>
        </NavigationContainer>
      </PersistGate>
    </Provider>

    // <ShippingAddress/>




  )
}

export default App

const styles = StyleSheet.create({})