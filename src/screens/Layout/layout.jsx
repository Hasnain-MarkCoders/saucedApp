import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Animated } from 'react-native'; // Import Animated for creating custom animations

import Home from '../Home/Home';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import Welcome from '../Welcome/Welcome';
import AllSauces from '../AllSauces/AllSauces';

const Tab = createBottomTabNavigator();

const Layout = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'SignIn':
              iconName = focused ? 'log-in' : 'log-in-outline';
              break;
            case 'SignUp':
              iconName = focused ? 'person-add' : 'person-add-outline';
              break;
            case 'Welcome':
              iconName = focused ? 'happy' : 'happy-outline';
              break;
            case 'AllSauces':
              iconName = focused ? 'list' : 'list-outline';
              break;
            default:
              iconName = 'circle';
          }

          // Wrap the icon in an Animated component for animation
          const scale = focused ? 1.1 : 1; // Change scale when focused
          return (
            <Animated.View style={{ transform: [{ scale }] }}>
              <Ionicons name={iconName} size={size} color={color} />
            </Animated.View>
          );
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
            backgroundColor: 'transparent',
            position: 'absolute',
            borderTopWidth: 0
          },
        tabBarLabelStyle: {
          fontSize: 12, // Customize label style
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="SignIn" component={SignIn} />
      <Tab.Screen name="SignUp" component={SignUp} />
      <Tab.Screen name="Welcome" component={Welcome} />
      <Tab.Screen name="AllSauces" component={AllSauces} />
    </Tab.Navigator>
  );
};

export default Layout;
