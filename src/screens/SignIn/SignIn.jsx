import React, { useEffect, useState } from 'react';
import { Text, View, SafeAreaView, ImageBackground, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import home from './../../../assets/images/home.png';
import Header from '../../components/Header/Header';
import CustomInput from '../../components/CustomInput/CustomInput';
import { handleText } from '../../../utils';
import CustomButtom from '../../components/CustomButtom/CustomButtom';
import google from "./../../../assets/images/google-icon.png";
import apple from "./../../../assets/images/apple-icon.png";
import fb from "./../../../assets/images/facebook-icon.png";
import IconButton from '../../components/IconButton/IconButton';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { handleAuth } from '../../../android/app/Redux/userReducer';

// Get screen dimensions
const { width } = Dimensions.get('window');

// Utility for responsive font size
const responsiveFontSize = (f) => {
  const tempHeight = (16 / 9) * width;
  return Math.sqrt(Math.pow(tempHeight, 2) + Math.pow(width, 2)) * (f / 100);
};

const SignIn = () => {
const dispatch =  useDispatch()
  handleLogin = ()=>{
    dispatch(handleAuth({
      user:{
        name:"hasnain",
        url:"https://avatars.githubusercontent.com/u/105921794?v=4",
        email:"hasnaindeveloper786@gmail.com",
      },
      accessToken:"hasnain123",
      refreshToken:"hasnain1234",
      authenticated:true
    }))

  }

  const navigation = useNavigation()
  const [data, setData] = useState({
    email: "",
    password: ""
  });

  useEffect(() => {
    console.log(data)
  }, [data])
const navigateToSignUp = ()=>{
  navigation.navigate('SignUp')
  // console.log("hello from hasnain")
}
  return (
    <ImageBackground style={{ flex: 1, width: '100%', height: '100%' }} source={home}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
        <Header cb={navigateToSignUp} title="Sign in" description="Sign in with your data that you entered during registration." />
        <View style={{ paddingHorizontal: 20, flex: 1, justifyContent: "space-between", paddingVertical: 40,paddingBottom:100, gap:responsiveFontSize(10) }}>
          <View style={{
            gap:20
          }}>
            <CustomInput
              onChange={handleText}
              updaterFn={setData}
              value={data.email}
              title="Email"
              name="email"
            />
            <CustomInput
              onChange={handleText}
              updaterFn={setData}
              value={data.password}
              title="Password"
              name="password"
              secureTextEntry={true}
            />
          </View>
          <View style={{ alignItems: "center", gap:20 }}>
            <CustomButtom
              buttonTextStyle={{ fontSize: responsiveFontSize(2) }}
              buttonstyle={{ width: "100%", borderColor: "#FFA100", padding: 15, backgroundColor: "#2E210A" }}
              onPress={handleLogin}
              title={"Sign In"}
            />
            <View style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center"
            }}>
              <IconButton onPress={() => console.log("hello from Google login")} url={google} />
              <IconButton onPress={() => console.log("hello from Apple login")} url={apple} />
              <IconButton onPress={() => console.log("hello from Facebook login")} url={fb} />
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ color: "white", fontSize: responsiveFontSize(1.6), lineHeight: 18 }}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => navigateToSignUp()} style={{ verticalAlign: "middle" }}>
                <Text style={{ color: "#FFA100", fontSize: responsiveFontSize(1.6), lineHeight: 18 }}>Register</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        </ScrollView>

      </SafeAreaView>
    </ImageBackground>
  );
};

export default SignIn;
