// AppRouter.js

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Layout from './src/screens/Layout/layout';
import SignIn from './src/screens/SignIn/SignIn';
import SignUp from './src/screens/SignUp/SignUp';
import Test from './src/screens/Test/Test';
import Welcome from './src/screens/Welcome/Welcome';
import Home from './src/screens/Home/Home';

const Stack = createNativeStackNavigator();

function AppRouter() {
 
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Layout" component={Layout} />
        {/* <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Test" component={Test} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppRouter;
