import React, { useEffect, useState } from 'react';
import { Text, View, SafeAreaView, ImageBackground, TouchableOpacity, Dimensions, ScrollView, Alert } from 'react-native';
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
import auth from '@react-native-firebase/auth';
import FacebookSignInBTN from '../../components/FacebookSignInBTN/FacebookSignInBTN';
import GoogleSignInBTN from '../../components/GoogleSignInBTN/GoogleSignInBTN';
import useAxios from '../../../Axios/useAxios';
// Get screen dimensions
const { width } = Dimensions.get('window');

// Utility for responsive font size
const responsiveFontSize = (f) => {
  const tempHeight = (16 / 9) * width;
  return Math.sqrt(Math.pow(tempHeight, 2) + Math.pow(width, 2)) * (f / 100);
};

const SignIn = () => {
  const dispatch = useDispatch()
  const [isEnabled, setIsEnabled] = useState(true);
const [loading, setLoading] = useState(false)
  const axiosInstance = useAxios()
  const navigation = useNavigation()
  const [data, setData] = useState({
    email: "",
    password: ""
  });
  handleLogin = async () => {
    try {
      setIsEnabled(false); // Disable login button or other elements
      setLoading(true)
      // Input validation
      if (!data.email) {
        Alert.alert("Email is required!");
        return;
      }
      if (!data.password) {
        Alert.alert("Password is required!");
        return;
      }

      // Firebase authentication
      const userCredential = await auth().signInWithEmailAndPassword(data.email, data.password);
      const user = userCredential.user;

      if (user) {
        const token = await user?.getIdToken();
        console.log('Firebase Token:', token);

        // Your API authentication
        const myuser = await axiosInstance.post("/auth/firebase-authentication", { accessToken: token });
        console.log("Authenticated user details:", myuser?.data?.user);
        if (myuser) {
          dispatch(
            handleAuth({
              "token": myuser?.token,
              "uid": myuser?.token,
              "name": myuser?.name,
              "email": myuser?.email,
              "provider": myuser?.provider,
              "type": myuser?.type,
              "status": myuser?.status,
              "_id": myuser?._id,
              "url":myuser?.image,
              "authenticated": true,
            }))
        }
        // Optional: Update state or handle user authentication details
      } else {
        console.log('No user found');
        Alert.alert('No user found');
      }
    } catch (error) {
      // Handle specific errors
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('That email address is already in use!');
      } else if (error.code === 'auth/invalid-email') {
        Alert.alert('That email address is invalid!');
      } else {
        console.error(error);
        Alert.alert('An error occurred during login');
      }
    } finally {
      setIsEnabled(true); // Re-enable button or other elements
      setLoading(false)
    }
  }

  useEffect(() => {
    console.log(data)
  }, [data])
  const navigateToSignUp = () => {
    navigation.navigate('SignUp')
    // console.log("hello from hasnain")
  }
  return (
    <ImageBackground style={{ flex: 1, width: '100%', height: '100%' }} source={home}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}>
          <Header cb={navigateToSignUp} title="Sign in" description="Sign in with your data that you entered during registration." />
          <View style={{ paddingHorizontal: 20, flex: 1, justifyContent: "space-between", paddingVertical: 40, paddingBottom: 100, gap: responsiveFontSize(10) }}>
            <View style={{
              gap: 20
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
            <View style={{ alignItems: "center", gap: 20 }}>
              <CustomButtom
              loading={loading}
                buttonTextStyle={{ fontSize: responsiveFontSize(2) }}
                buttonstyle={{ width: "100%", borderColor: "#FFA100", padding: 15, backgroundColor: "#2E210A" }}
                onPress={isEnabled ? handleLogin : null}
                title={"Sign In"}
              />
              <View style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"
              }}>
                <GoogleSignInBTN onPress={() => console.log("hello from Google login")} url={google} />
                <IconButton onPress={() => console.log("hello from Apple login")} url={apple} />
                <FacebookSignInBTN onPress={() => console.log("hello from Facebook login")} url={fb} />
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
