// AppRouter.js

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PublicStack from './src/screens/PublicStack/PublicStack';
import { useSelector } from 'react-redux';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import DrawerStack from './src/screens/DrawerStack/DrawerStack';
import Product from './src/screens/Product/Product';
import EditModal from './src/components/EditModal.jsx/EditModal';
import SettingScreen from './src/screens/SettingScreen/SettingScreen';
import Home from './src/screens/Home/Home';
import CheckinScreen from './src/screens/CheckinScreen/CheckinScreen';
import SouceDetails from './src/screens/SouceDetails/SouceDetails';
import ExternalProfileScreen from './src/screens/ExternalProfileScreen/ExternalProfileScreen';
import AddReview from './src/screens/AddReview/AddReview';
import AllReviewsScreen from './src/screens/AllReviewsScreen/AllReviewsScreen';
import QRScreen from './src/screens/QRScreen/QRScreen';
import AllCheckinsScreen from './src/screens/AllCheckinsScreen/AllCheckinsScreen';
const Stack = createNativeStackNavigator();
function AppRouter() {
  const auth = useSelector(state => state.auth)
  const { authenticated } = auth

  return (
    <GestureHandlerRootView>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>{

          authenticated ? <>

            <Stack.Screen name="Drawer" component={DrawerStack} />
            <Stack.Screen name="AllReviews" component={AllReviewsScreen} />
            <Stack.Screen name="AllCheckinsScreen" component={AllCheckinsScreen} />
            <Stack.Screen name="QRScreen" component={QRScreen} />
            <Stack.Screen name="Checkin" component={CheckinScreen} />
            <Stack.Screen name="AddReview" component={AddReview} />
            <Stack.Screen name="ExternalProfileScreen" component={ExternalProfileScreen} />
            <Stack.Screen name="SauceDetails" component={SouceDetails} />
            <Stack.Screen name="ProductDetail" component={Product} />


          </>
            :
            <Stack.Screen name="Public" component={PublicStack} />}
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>

  );
}

export default AppRouter;
