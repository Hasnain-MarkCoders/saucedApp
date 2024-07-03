import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FollowerScreen from '../FollowerScreen/FollowerScreen';

const Stack = createNativeStackNavigator();

const UserStack = () => {
  return (
    <Stack.Navigator
    screenOptions={{
        headerShown: false,
        animation: 'fade'
    }}
>
    <Stack.Screen name="Followers" component={FollowerScreen} />

</Stack.Navigator>
  )
}

export default UserStack
