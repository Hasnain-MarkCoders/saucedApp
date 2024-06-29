import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Animated, Image, Text, View } from 'react-native'; // Import Animated for creating custom animations

import Home from '../Home/Home';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import Welcome from '../Welcome/Welcome';
import AllSauces from '../AllSauces/AllSauces';
import homeIcon from "./../../../assets/images/homeicon.png"
import searchIcon from "./../../../assets/images/searchicon.png"
import barcodeIcon from "./../../../assets/images/barcode.png"
import awardicon from "./../../../assets/images/awardicon.png"
import usericon from "./../../../assets/images/usericon.png"




const Tab = createBottomTabNavigator();

const Layout = () => {
  return (
    <Tab.Navigator
    screenOptions={{
      tabBarShowLabel: false,
        headerShown: false,
        tabBarIcon: () => null,
        tabBarStyle:{
      backgroundColor:"#FFA100",
      position:"absolute",
      height:100,
    
      elevation:5,
          left:0,
          right:0,
          bottom:0
    }

    }}
      // screenOptions={({ route }) => ({
      //   headerShown: false,
      //   tabBarIcon: ({ focused, color, size }) => {
      //     let iconName;
      //     switch (route.name) {
      //       case 'Home':
      //         iconName = focused ? 'home' : 'home-outline';
      //         break;
      //       case 'SignIn':
      //         iconName = focused ? 'log-in' : 'log-in-outline';
      //         break;
      //       case 'SignUp':
      //         iconName = focused ? 'person-add' : 'person-add-outline';
      //         break;
      //       case 'Welcome':
      //         iconName = focused ? 'happy' : 'happy-outline';
      //         break;
      //       case 'AllSauces':
      //         iconName = focused ? 'list' : 'list-outline';
      //         break;
      //       default:
      //         iconName = 'circle';
      //     }

      //     // Wrap the icon in an Animated component for animation
      //     const scale = focused ? 1.1 : 1; // Change scale when focused
      //     return (
      //       <Animated.View style={{ transform: [{ scale }] }}>
      //         <Ionicons name={iconName} size={size} color={color} />
      //       </Animated.View>
      //     );
      //   },
      //   // tabBarActiveTintColor: 'tomato',
      //   // tabBarInactiveTintColor: 'gray',
      //   // tabBarStyle: {
      //   //     backgroundColor: 'transparent',
      //   //     position: 'absolute',
      //   //     borderTopWidth: 0
      //   //   },
      //   // tabBarLabelStyle: {
      //   //   fontSize: 12, // Customize label style
      //   // },
      // })}
    >
      <Tab.Screen
        options={{tabBarIcon: ({focused}) => (<View style={{
          gap:8,
          alignItems:"center"
        }}>
          <Image source={homeIcon}/>
          <Text style={{
            fontSize:12,
            lineHeight:18,
            color:"white"
          }}>
          Home
          </Text>
        </View>)}}
      
      name="Home" component={Home} />
      <Tab.Screen
          options={{tabBarIcon: ({focused}) => (<View style={{
            gap:8,
            alignItems:"center"
          }}>
            <Image source={searchIcon}/>
            <Text style={{
              fontSize:12,
              lineHeight:18,
              color:"white"
            }}>
            Search
            </Text>
          </View>)}}
      
      name="SignIn" component={SignIn} />
      <Tab.Screen
       options={{tabBarIcon: ({focused}) => (<View style={{
        backgroundColor:"white",
        alignItems:"center",
        justifyContent:"center",
        padding:25,
        borderRadius:50
      }}>
        <Image source={barcodeIcon}/>
      
      </View>)}}
      
      name="SignUp" component={SignUp} />
      <Tab.Screen 
       options={{tabBarIcon: ({focused}) => (<View style={{
        gap:8,
        alignItems:"center"
      }}>
        <Image source={awardicon}/>
        <Text style={{
          fontSize:12,
          lineHeight:18,
          color:"white"
        }}>
        Awards
        </Text>
      </View>)}}
      
      name="Welcome" component={Welcome} />
      <Tab.Screen
      
      options={{tabBarIcon: ({focused}) => (<View style={{
        gap:8,
        alignItems:"center"
      }}>
        <Image source={usericon}/>
        <Text style={{
          fontSize:12,
          lineHeight:18,
          color:"white"
        }}>
        Profile
        </Text>
      </View>)}}
      
      
      name="AllSauces" component={AllSauces} />
    </Tab.Navigator>
  );
};

export default Layout;
