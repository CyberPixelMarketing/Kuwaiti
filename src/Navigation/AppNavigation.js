import { LogBox, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import { createStackNavigator } from '@react-navigation/stack';
import AllProducts from '../screens/userScreens/AllProducts';
import ProductDetails from '../screens/userScreens/ProductDetails';
import BottomNavigation from './BottomNavigation';
import SplashScreen from '../SplashScreen';
import Login from '../screens/auth/Login';
import TrackOrder from '../screens/userScreens/TrackOrder';
import CategoriesList from '../screens/userScreens/CategoriesList';
import SignUp from '../screens/auth/SignUp';
import MyOrder from '../screens/userScreens/profile/MyOrder';
import MyFavorite from '../screens/userScreens/MyFavorite';
import AuthNavigation from './AuthNavigation';
import { useSelector } from 'react-redux';
import { DrawerNavigation } from './DrawerNavigation';
import { NavigationContainer } from '@react-navigation/native';
LogBox.ignoreAllLogs();
const Stack = createStackNavigator();
const AppNavigation = ({ navigation }) => {
  const [isSplashScreen, setIsSplashScreen] = useState(true)
  const token = useSelector((state) => state.auth.token)
  const tryAutoLogin = useSelector((state) => state.auth.tryAutoLogin)
  const autoLogin = useSelector((state) => state.auth.autoLogin)

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setIsSplashScreen(false)
    }, 2000)

    return () => clearTimeout(timeOut)
  }, [])


  if (isSplashScreen) {
    return (
      <SplashScreen />
    )
  }



  return (
    <>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {token ? (
          <Stack.Screen name="DrawerNavigation" component={DrawerNavigation} />
        ) : (
          <Stack.Screen name="AuthNavigation" component={AuthNavigation} />
        )}
      </Stack.Navigator>
    </>

  )
}

export default AppNavigation

const styles = StyleSheet.create({})







































































// import { LogBox, StyleSheet, Text, View } from 'react-native'
// import React, { useEffect, useState } from 'react'

// import { createStackNavigator } from '@react-navigation/stack';
// import AllProducts from '../screens/userScreens/AllProducts';
// import ProductDetails from '../screens/userScreens/ProductDetails';
// import BottomNavigation from './BottomNavigation';
// import SplashScreen from '../SplashScreen';
// import Login from '../screens/auth/Login';
// import TrackOrder from '../screens/userScreens/TrackOrder';
// import CategoriesList from '../screens/userScreens/CategoriesList';
// import SignUp from '../screens/auth/SignUp';
// import MyOrder from '../screens/userScreens/profile/MyOrder';
// import MyFavorite from '../screens/userScreens/MyFavorite';
// import AuthNavigation from './AuthNavigation';
// import { useSelector } from 'react-redux';
// import { DrawerNavigation } from './DrawerNavigation';
// import { NavigationContainer } from '@react-navigation/native';
// LogBox.ignoreAllLogs();
// const Stack = createStackNavigator();
// const AppNavigation = ({ navigation }) => {
//   const [isSplashScreen, setIsSplashScreen] = useState(true)
//   const token = useSelector((state) => state.auth.token)
//   const tryAutoLogin = useSelector((state) => state.auth.tryAutoLogin)
//   const autoLogin = useSelector((state) => state.auth.autoLogin)

//   // useEffect(()=>{
//   //  const timeOut = setTimeout(()=>{
//   //     setIsSplashScreen(false)
//   //   },[2000])

//   //   return ()=>clearTimeout(timeOut)
//   // },[])


//   // if(isSplashScreen){
//   //   return(
//   //     <SplashScreen/>
//   //   )
//   // }

//   // useEffect(() => {

//   // }, [autoLogin])

//   return (
//     <Stack.Navigator initialRouteName={'SplashScreen'} screenOptions={{ headerShown: false }} >
//      {  !token && !tryAutoLogin  && <Stack.Screen component={SplashScreen} name='SplashScreen' screenOptions={{ headerShown: false }} />}
//      { !token && autoLogin&& <Stack.Screen component={AuthNavigation} name='AuthNavigation' screenOptions={{ headerShown: false }} />}
//      { token && <Stack.Screen component={DrawerNavigation} name='DrawerNavigation' screenOptions={{ headerShown: false }} />}
//     </Stack.Navigator>
//   )
// }

// export default AppNavigation

// const styles = StyleSheet.create({})





























// // import BottomNavigation from './BottomNavigation';
// // import SplashScreen from '../SplashScreen';
// // import Login from '../screens/auth/Login';
// // import TrackOrder from '../screens/userScreens/TrackOrder';
// // import CategoriesList from '../screens/userScreens/CategoriesList';
// // import SignUp from '../screens/auth/SignUp';
// // import MyOrder from '../screens/userScreens/profile/MyOrder';
// // import MyFavorite from '../screens/userScreens/MyFavorite';
// // LogBox.ignoreAllLogs();
// // const Stack = createStackNavigator();
// // const AppNavigation = () => {
// //   return (
// //     <Stack.Navigator screenOptions={{ headerShown: false  }} >
// //       <Stack.Screen name="SplashScreen" component={SplashScreen} />
// //       <Stack.Screen name="BottomNavigation" component={BottomNavigation} />
// //       <Stack.Screen name="Login" component={Login} />
// //       <Stack.Screen name="SignUp" component={SignUp} />
// //       <Stack.Screen name="AllProducts" component={AllProducts} />
// //       <Stack.Screen name="ProductDetails" component={ProductDetails} />
// //       <Stack.Screen name="TrackOrder" component={TrackOrder} />
// //       <Stack.Screen name="CategoriesList" component={CategoriesList} />
// //       <Stack.Screen name="MyOrder" component={MyOrder} />
// //       <Stack.Screen name="MyFavorite" component={MyFavorite} />
// //     </Stack.Navigator>
// //   )
// // }

// // export default AppNavigation

// // const styles = StyleSheet.create({})



