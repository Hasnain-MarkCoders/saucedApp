import React from 'react';
import { View, Image, Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';

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
import PrivateStack from '../PrivateStack/PrivateStack';

const LogoutScreen = () => {
    return null;
};

const Drawer = createDrawerNavigator();

const DrawerStack = () => {
    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false,
                drawerType: 'front',
                drawerStyle: {
                    backgroundColor: "#FFA100",
                    width: 240,
                }
            }}
        >
            <Drawer.Screen name="Main" component={PrivateStack} />
            <Drawer.Screen name="Following" component={FollowingScreen} />
            <Drawer.Screen name="Setting" component={SettingScreen} />
            <Drawer.Screen name="Edit Profile" component={EditProfileScreen} />

        </Drawer.Navigator>
    );
};

export default DrawerStack;
