import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View, ImageBackground } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

import getStartedbackground from './../../../assets/images/getStartedbackground.png';
import CustomButtom from '../../components/CustomButtom/CustomButtom';
import saucedLogo from "./../../../assets/images/saucedlogo.png"
import BottomNavigation from '../../components/BottomNavigation/BottomNavigation';

const Home = () => {
  return (
    <ImageBackground source={getStartedbackground} style={styles.background}>
      <SafeAreaView style={styles.container}>
        <Image style={styles.logo} source={saucedLogo}/>
        <View style={styles.contentContainer}>
          <Text style={styles.titleText}>
            Discover your perfect flavor with our extensive sauce collection.
          </Text>
          <CustomButtom
            buttonTextStyle={{ fontSize: moderateScale(16) }}  // example fontSize scaling
            buttonstyle={styles.buttonStyle}
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
    paddingHorizontal: moderateScale(20),
    paddingTop: verticalScale(80),
    paddingBottom: verticalScale(80),
    justifyContent: "flex-end",
    alignItems: "center",
    gap: verticalScale(20),
  },
  logo: {
    width: scale(150),
    height: scale(150),
  },
  contentContainer: {
    width: "100%",
    gap: scale(40),
  },
  titleText: {
    textAlign: "center",
    color: "white",
    fontSize: moderateScale(30),
    lineHeight: verticalScale(40),
  },
  buttonStyle: {
    width: "100%",
    borderColor: "#FFA100",
    padding: moderateScale(15),
    backgroundColor: "#2E210A"
  },
});
