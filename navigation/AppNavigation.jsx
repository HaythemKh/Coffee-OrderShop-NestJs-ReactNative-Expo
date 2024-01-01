import { View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import tw from 'twrnc';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { COLORS } from '../Constants/theme';
import {
  HomeIcon as HomeOutline,
  HeartIcon as HeartOutline,
  ShoppingBagIcon as BagOutline,
} from 'react-native-heroicons/outline';

import {
  HomeIcon as HomeSolid,
  HeartIcon as HeartSolid,
  ShoppingBagIcon as BagSolid,
} from 'react-native-heroicons/solid';

import ProductScreen from '../screens/ProductScreen';
import CartScreen from '../screens/CartScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import { GlobalContext } from '../context/GlobalWrapper';
import ProfileScreen from '../screens/ProfileScreen';
import HomeScreen from '../screens/HomeScreen';
import OrdersScreen from '../screens/OrdersScreen';
import { FontAwesome } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AppNavigation = () => {
  const { isLoggedIn, Logout } = useContext(GlobalContext);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
        setIsLogged(await isLoggedIn());
    };
    checkAuthentication();
  }, [isLoggedIn]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ contentStyle: { backgroundColor: 'white' }, headerShown: false }}
        initialRouteName={isLogged?'HomeTab' : 'Home'}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="HomeTab" component={HomeTabs} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="Product" component={ProductScreen} />
        <Stack.Screen name="Orders" component={OrdersScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;

const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({ focused, color, size }) => menuIcons(route, focused),
        tabBarStyle: {
          marginBottom: 20,
          borderRadius: 50,
          backgroundColor: COLORS.bgLight,
          height: 75,
          marginHorizontal: 70,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Orders" component={OrdersScreen} />
    </Tab.Navigator>
  );
};

const menuIcons = (route, focused) => {
  let icon;
  if (route.name === 'Home') {
    icon = focused ? (
      <HomeSolid style={{ padding: 20 }} size={50} color={COLORS.primaryBlackHex} />
    ) : (
      <HomeOutline size={25} strokeWidth={2} color="white" />
    );
  } else if (route.name === 'Cart') {
    icon = focused ? <BagSolid size={50} color={COLORS.primaryBlackHex} /> : <BagOutline size={25} strokeWidth={2} color="white" />;
  }else if (route.name === 'Orders')
  {
    icon = focused ? <Fontisto name="history" size={50} color={COLORS.primaryBlackHex} /> : <Octicons name="history" strokeWidth={2} size={24} color="white" />
    ;
  }
  let buttonStyle = focused ? 'bg-white' : '';
  return (
    <View style={[tw`flex items-center rounded-full p-3` + buttonStyle]}>
      {icon}
    </View>
  );
};
