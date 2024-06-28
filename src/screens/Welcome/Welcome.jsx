import {  Text, View, SafeAreaView, Image, Dimensions } from 'react-native'
import React from 'react'
import { ImageBackground } from 'react-native';
import home from './../../../assets/images/home.png';
import WelcomeLists from '../../components/WelcomeList/WelcomeList';
import back from "./../../../assets/images/back.png"
import CustomButtom from '../../components/CustomButtom/CustomButtom';
import Header from '../../components/Header/Header';
import BottomNavigation from '../../components/BottomNavigation/BottomNavigation';
const { width } = Dimensions.get('window');

// Utility for responsive font size
const responsiveFontSize = (f) => {
  const tempHeight = (16 / 9) * width;
  return Math.sqrt(Math.pow(tempHeight, 2) + Math.pow(width, 2)) * (f / 100);
};
const Welcome = () => {
  return (
    <ImageBackground style={{
      flex: 1,
      width: '100%',
      height: '100%',
    }} source={home} >
      <SafeAreaView style={{
        flex: 1,
      }}>

        <View style={{
          paddingHorizontal: 20,
          paddingBottom:80,
          gap:40,
          justifyContent:"space-between",
          flex:1
        }}>
          <View>
          <Header isWelcome ={ true} title={"Welcome to"} />
            <WelcomeLists />
          </View>
         <CustomButtom
          buttonTextStyle={{ fontSize: responsiveFontSize(2) }}
              buttonstyle={{ width: "100%", borderColor: "#FFA100", padding: 15, backgroundColor: "#2E210A" }}
              onPress={() => console.log("hello from get next")}
              title={"Next"}
              />

        </View>


      </SafeAreaView>

    </ImageBackground>

  )
}

export default Welcome

