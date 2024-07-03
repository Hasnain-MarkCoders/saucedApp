import React, { useEffect, useState } from 'react';
import { Text, View, SafeAreaView, ImageBackground, TouchableOpacity, Dimensions , ScrollView} from 'react-native';
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

// Get screen dimensions
const { width } = Dimensions.get('window');

// Utility for responsive font size
const responsiveFontSize = (f) => {
  const tempHeight = (16 / 9) * width;
  return Math.sqrt(Math.pow(tempHeight, 2) + Math.pow(width, 2)) * (f / 100);
};

const SignUp = () => {
  const navigation = useNavigation()
  const [data, setData] = useState({
    fullName: "",
    email: "",
    password: ""
  });

  useEffect(() => {
    console.log(data)
  }, [data])


  const navigateToSignIn = ()=>{
    navigation.navigate('SignIn')
  }
  return (
    <ImageBackground style={{ flex: 1, width: '100%', height: '100%', }} source={home}>
      <SafeAreaView style={{ flex: 1, marginBottom:50}}>
        <ScrollView style={{
          flex:1,
        }}>
        <Header cb={navigateToSignIn} title="Sign up" description="Sign up with one of the following." />
        <View style={{ paddingHorizontal: 20, flex: 1, justifyContent: "space-between", paddingVertical: 40,paddingBottom:100, gap:40 }}>
          <View style={{gap:20}}>
            <CustomInput
              onChange={handleText}
              updaterFn={setData}
              value={data.fullName}
              title="Full Name"
              name="fullName"
            />
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
              onPress={() => console.log("hello from sign in")}
              title={"Sign Up"}
            />
            <View style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center"
            }}>
              <IconButton onPress={() => console.log("hello from Google Sign up")} url={google} />
              <IconButton onPress={() => console.log("hello from Apple Sign Up")} url={apple} />
              <IconButton onPress={() => console.log("hello from Fb Sign up")} url={fb} />
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ color: "white", fontSize: responsiveFontSize(1.6), lineHeight: 18 }}>Already Have an account? </Text>
              <TouchableOpacity onPress={() => navigateToSignIn()} >
                <Text style={{ color: "#FFA100", fontSize: responsiveFontSize(1.6), lineHeight: 18 }}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

export default SignUp;
