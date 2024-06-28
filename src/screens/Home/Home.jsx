import { Dimensions, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ImageBackground } from 'react-native';
import getStartedbackground from './../../../assets/images/getStartedbackground.png';
import CustomButtom from '../../components/CustomButtom/CustomButtom';
import saucedLogo from "./../../../assets/images/saucedlogo.png"
import BottomNavigation from '../../components/BottomNavigation/BottomNavigation';
const { width } = Dimensions.get('window');

// Utility for responsive font size
const responsiveFontSize = (f) => {
  const tempHeight = (16 / 9) * width;
  return Math.sqrt(Math.pow(tempHeight, 2) + Math.pow(width, 2)) * (f / 100);
};
const Home = () => {
  return (
    <ImageBackground source={getStartedbackground} style={styles.background}>
    <SafeAreaView style={styles.container}>
      <Image style={{
        width:150,
        height:150
      }} source={saucedLogo}/>
      <View
      style={{
        width:"100%",
        gap:40
      }}
      >
        <Text style={{
          textAlign:"center",
          color:"white",
          fontSize:30,
          lineHeight:40,
        }}>Discover your perfect flavor with our extensive sauce collection.</Text>
        <CustomButtom
              buttonTextStyle={{ fontSize: responsiveFontSize(2) }}
              buttonstyle={{ width: "100%", borderColor: "#FFA100", padding: 15, backgroundColor: "#2E210A" }}
              onPress={() => console.log("hello from get started")}
              title={"Get Started"}
            />
      </View>
    </SafeAreaView>
             </ImageBackground>  

  );
};

export default Home;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',

  },
  container: {
    flex: 1,
    paddingHorizontal:20,
    paddingTop:80,
    paddingBottom:80,
    justifyContent:"flex-end",
    alignItems:"center",
    gap:20
  },
});
