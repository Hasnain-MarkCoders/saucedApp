// AppRouter.js

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PublicStack from './src/screens/PublicStack/PublicStack';
import { useSelector } from 'react-redux';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import DrawerStack from './src/screens/DrawerStack/DrawerStack';
import Product from './src/screens/Product/Product';
const Stack = createNativeStackNavigator();
function AppRouter() {
  const auth = useSelector(state => state.auth)
  const { authenticated } = auth

  return (
    <GestureHandlerRootView>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>{

          authenticated ? <>
                            <Stack.Screen name="Drawer" component={DrawerStack}/>
                            <Stack.Screen name="ProductDetail" component={Product}/>
          
                        </>
            :
            <Stack.Screen name="Public" component={PublicStack} />}
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>

  );
}

export default AppRouter;
