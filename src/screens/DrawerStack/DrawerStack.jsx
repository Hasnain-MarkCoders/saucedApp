import React from 'react';
import { View, Image, Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import FollowerScreen from '../FollowerScreen/FollowerScreen';
import FollowingScreen from '../FollowingScreen/FollowingScreen';
import SettingScreen from '../SettingScreen/SettingScreen';
import EditProfileScreen from '../EditProfileScreen/EditProfileScreen';
import PrivateStack from '../PrivateStack/PrivateStack';



const Drawer = createDrawerNavigator();

const DrawerStack = () => {
    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false,
                drawerActiveTintColor: 'black',
                drawerInactiveTintColor: 'white',
                drawerType: 'front',
                drawerPosition: 'right',
                drawerStyle: {
                    backgroundColor: "#FFA100",
                    width: 240,
                }
            }}
        >
            <Drawer.Screen name="Profile" component={PrivateStack} />
            <Drawer.Screen name="Following" component={FollowingScreen} />
            <Drawer.Screen name="Follower" component={FollowerScreen} />
            <Drawer.Screen name="Setting" component={SettingScreen} />
            <Drawer.Screen name="Edit Profile" component={EditProfileScreen} />

        </Drawer.Navigator>
    );
};

export default DrawerStack;
