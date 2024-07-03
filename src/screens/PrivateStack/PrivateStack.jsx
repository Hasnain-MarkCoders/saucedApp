import React, { useState, useEffect } from 'react';
import { Keyboard, View, Image, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import Home from '../Home/Home';
import homeIcon from "./../../../assets/images/homeicon.png";
import Logout from '../../components/Logout/Logout';
import Awards from '../Awards/Awards';
import awardicon from  "./../../../assets/images/awardicon.png"
import profileicon from  "./../../../assets/images/profileicon.png"
import FollowerScreen from '../FollowerScreen/FollowerScreen';
import FollowingScreen from '../FollowingScreen/FollowingScreen';
import ProfileScreen from '../Profile/Profile';
import SettingScreen from '../SettingScreen/SettingScreen';
import EditProfileScreen from '../EditProfileScreen/EditProfileScreen';

const LogoutScreen = () => {
    return null;
};

const Tab = createBottomTabNavigator();

const PrivateStack = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                tabBarHideOnKeyboard:true,
                headerShown: false,
                tabBarIcon: () => null,
                tabBarStyle: {
                    backgroundColor: "#FFA100",
                    position: "absolute",
                    height: 80,
                    elevation: 5,
                    left: 0,
                    right: 0,
                    bottom: 0
                }
            }}
            sceneContainerStyle={{ backgroundColor: 'transparent' }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ gap: 8, alignItems: "center" }}>
                            <Image source={homeIcon} />
                            <Text style={{ fontSize: 12, lineHeight: 18, color: "white" }}>Home</Text>
                        </View>
                    ),
                    animation: "fade"
                }}
            />

            <Tab.Screen
                name="Awards"
                component={Awards}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ gap: 8, alignItems: "center" }}>
                            <Image source={awardicon} />
                            <Text style={{ fontSize: 12, lineHeight: 18, color: "white" }}>Awards</Text>
                        </View>
                    ),
                    animation: "fade"
                }}
            />
               
              
             <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ gap: 8, alignItems: "center" }}>
                            <Image source={profileicon} />
                            <Text style={{ fontSize: 12, lineHeight: 18, color: "white" }}>Profile</Text>
                        </View>
                    ),
                    animation: "fade"
                }}
            />
            <Tab.Screen
                name="Logout"
                component={LogoutScreen}
                options={{
                    tabBarIcon: ({ focused }) => <Logout />,
                    animation: "fade"
                }}
            />
        </Tab.Navigator>
    );
};

export default PrivateStack;