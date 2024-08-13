import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import TrackOrder from '../screens/userScreens/TrackOrder';
import UserProfile from '../screens/userScreens/UserProfile';
import MyFavorite from '../screens/userScreens/MyFavorite';
import ShippingAddress from '../screens/userScreens/ShippingAddress';


const ProfileTab = () => {
    const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName='UserProfile'>
          <Stack.Screen name="UserProfile" component={UserProfile} />
          <Stack.Screen name="TrackOrder" component={TrackOrder} />
          <Stack.Screen name="MyFavorite" component={MyFavorite} />
          <Stack.Screen name="ShippingAddress" component={ShippingAddress} />
    </Stack.Navigator>
  )
}

export default ProfileTab

const styles = StyleSheet.create({})