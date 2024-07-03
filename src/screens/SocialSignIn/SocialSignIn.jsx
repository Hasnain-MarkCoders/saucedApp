import React, { useEffect, useState } from 'react';
import { Text, View, SafeAreaView, ImageBackground, TouchableOpacity, Dimensions, ScrollView, Alert, Image } from 'react-native';
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
import { scale } from 'react-native-size-matters';
import envelope from "./../../../assets/images/envelope.png";

// Get screen dimensions
const { width } = Dimensions.get('window');

// Utility for responsive font size
const responsiveFontSize = (f) => {
  const tempHeight = (16 / 9) * width;
  return Math.sqrt(Math.pow(tempHeight, 2) + Math.pow(width, 2)) * (f / 100);
};

const SocialSignIn = () => {

  const navigation = useNavigation()
  const [data, setData] = useState({
    email: "",
    password: ""
  });

  useEffect(() => {
    console.log(data)
  }, [data])
  const navigateToSignUp = () => {
    navigation.navigate('SignUp')
  }
  return (
    <ImageBackground style={{ flex: 1, width: '100%', height: '100%' }} source={home}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          <Header cb={navigateToSignUp} title="Sign in" description="Sign in with your data that you entered during registration." />
          <View style={{ paddingHorizontal: 20, flex: 1, justifyContent: "space-between", paddingVertical: 40, paddingBottom: 100, gap: responsiveFontSize(10) }}>

            <View style={{ alignItems: "center", gap: 20 }}>
            <CustomButtom
                Icon={()=><Image style={{width:28, height:20}} source={envelope} />}
                showIcon={true}
                buttonTextStyle={{ fontSize: responsiveFontSize(2) }}
                buttonstyle={{ width: "100%", borderColor: "#FFA100", padding: 15, backgroundColor: "#2E210A",  display:"flex", gap:10, flexDirection:"row", alignItems:"center", justifyContent:"center"}}
                onPress={()=>navigation.navigate("SignIn")}
                title={"Sign In With Email"}
              />
              <CustomButtom
                showIcon={true}
                Icon={()=><Image style={{width:24, height:24}}  source={google} />}
                buttonTextStyle={{ fontSize: responsiveFontSize(2) }}
                buttonstyle={{ width: "100%", borderColor: "#FFA100", padding: 15, backgroundColor: "#2E210A",justifyContent:"start",  display:"flex", gap:10, flexDirection:"row", alignItems:"center", justifyContent:"center" }}
                onPress={()=>Alert.alert("sign in wih google")}
                title={"Sign In With Google"}
              />
              <CustomButtom
                showIcon={true}
                Icon={()=><Image style={{width:24, height:24}}  source={fb} />}
                buttonTextStyle={{ fontSize: responsiveFontSize(2) }}
                buttonstyle={{ width: "100%", borderColor: "#FFA100", padding: 15, backgroundColor: "#2E210A" ,justifyContent:"start",  display:"flex", gap:10, flexDirection:"row", alignItems:"center", justifyContent:"center"}}
                onPress={()=>Alert.alert("sign in wih fb")}
                title={"Sign In With Facebook"}
              />
            <Text style={{
              color:"#FFA100",
              fontSize:scale(25),
              lineHeight:scale(30),
              fontWeight:500,
              marginVertical:scale(40)
            }}>
              OR
            </Text>
            <CustomButtom
                buttonTextStyle={{ fontSize: responsiveFontSize(2) }}
                buttonstyle={{ width: "100%", borderColor: "#FFA100", padding: 15, backgroundColor: "#2E210A" ,justifyContent:"start",  display:"flex", gap:10, flexDirection:"row", alignItems:"center", justifyContent:"center"}}
                onPress={()=>navigation.navigate("SignUp")}
                title={"Sign Up"}
              />
          
            </View>
          </View>
        </ScrollView>

      </SafeAreaView>
    </ImageBackground>
  );
};

export default SocialSignIn;
