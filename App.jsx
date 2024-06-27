
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/Home/Home';
import About from './src/screens/Welcome/Welcome';
import Contact from './src/screens/Contact/Contact';
import SignIn from './src/screens/SignIn/SignIn';
import SignUp from './src/screens/SignUp/SignUp';
import Test from './src/screens/Test/Test';
import Welcome from './src/screens/Welcome/Welcome';

const Stack = createNativeStackNavigator();
function App() {

  return (
    
    <NavigationContainer>
    <Stack.Navigator screenOptions={{
    headerShown: false
  }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="Test" component={Test} />
      <Stack.Screen name="Contact" component={Contact} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}

export default App;
