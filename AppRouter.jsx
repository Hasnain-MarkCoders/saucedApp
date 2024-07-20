// AppRouter.js

import * as React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PublicStack from './src/screens/PublicStack/PublicStack';
import { useSelector } from 'react-redux';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import DrawerStack from './src/screens/DrawerStack/DrawerStack';
import Product from './src/screens/Product/Product';
import EditModal from './src/components/EditModal.jsx/EditModal';
import SettingScreen from './src/screens/SettingScreen/SettingScreen';
import Home from './src/screens/Home/Home';
import home from './assets/images/home.png';

import CheckinScreen from './src/screens/CheckinScreen/CheckinScreen';
import SouceDetails from './src/screens/SouceDetails/SouceDetails';
import ExternalProfileScreen from './src/screens/ExternalProfileScreen/ExternalProfileScreen';
import AddReview from './src/screens/AddReview/AddReview';
import AllReviewsScreen from './src/screens/AllReviewsScreen/AllReviewsScreen';
import QRScreen from './src/screens/QRScreen/QRScreen';
import AllCheckinsScreen from './src/screens/AllCheckinsScreen/AllCheckinsScreen';
import auth from '@react-native-firebase/auth';
import { ActivityIndicator, ImageBackground, View } from 'react-native';
import BootSplash from "react-native-bootsplash";

const Stack = createNativeStackNavigator();
function AppRouter() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false)
  const [initialState, setInitialState] = React.useState(true)
  const userAUth  = useSelector(state=>state.auth)
  React.useEffect(() => {
    const subscriber = auth().onAuthStateChanged(user => {
      if (user && userAUth?.authenticated) {
        setIsAuthenticated(true)
        setInitialState(false)
      } else {
        setIsAuthenticated(false)
        setInitialState(false)
      }
    });
    return subscriber; // unsubscribe on unmount
  }, [userAUth?.authenticated]);

  
  if (initialState) {
    return <ImageBackground style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }} source={home}>
    <ActivityIndicator color="#FFA100" size="large" />
  </ImageBackground>
  }

  return (
    <GestureHandlerRootView>
      <NavigationContainer
       onReady={() => BootSplash.hide({ fade: true })}
      >
        <Stack.Navigator screenOptions={{ headerShown: false,  animationEnabled: false }}>{

          isAuthenticated ? <>

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
