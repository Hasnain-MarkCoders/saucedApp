
import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomButtom from '../CustomButtom/CustomButtom';

const BottomNavigation = () => {
  const navigation = useNavigation();

  return (
    <View style={{
        flexDirection:"row", gap:10,
        flexWrap:"wrap"
    }}>
        <CustomButtom  onPress={() => navigation.navigate('Home')} title='Home'/>
      <CustomButtom title="About" onPress={() => navigation.navigate('SignIn')} />
      <CustomButtom title="Contact" onPress={() => navigation.navigate('SignUp')} />
      <CustomButtom title="Welcome" onPress={() => navigation.navigate('Welcome')} /> 
    </View>
  );
};

const styles = StyleSheet.create({
});

export default BottomNavigation;
