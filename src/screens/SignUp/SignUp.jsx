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
import auth from '@react-native-firebase/auth';
import { useDispatch } from 'react-redux';
import { handleAuth } from '../../../android/app/Redux/userReducer';
import useAxios from '../../../Axios/useAxios';
import GoogleSignInBTN from '../../components/GoogleSignInBTN/GoogleSignInBTN';
import FacebookSignInBTN from '../../components/FacebookSignInBTN/FacebookSignInBTN';

// Get screen dimensions
const { width } = Dimensions.get('window');

// Utility for responsive font size
const responsiveFontSize = (f) => {
  const tempHeight = (16 / 9) * width;
  return Math.sqrt(Math.pow(tempHeight, 2) + Math.pow(width, 2)) * (f / 100);
};

const SignUp = () => {
  const dispatch = useDispatch()
  const axiosInstance = useAxios()
  const [isEnabled, setIsEnabled] = useState(true);
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation()
  const [data, setData] = useState({
    fullName: "",
    email: "",
    password: ""
  });

  const handleSignUp = async () => {
    setIsEnabled(false); // Disable the button at the start
    setLoading(true)

    // Input validation
    if (!data.fullName) {
      setIsEnabled(true); // Re-enable the button
      return Alert.alert("Full Name is required!");
    }
    if (!data.email) {
      setIsEnabled(true); // Re-enable the button
      return Alert.alert("Email is required!");
    }
    if (!data.password) {
      setIsEnabled(true); // Re-enable the button
      return Alert.alert("Password is required!");
    }

    try {
      // Create user with email and password
      const userCredentials = await auth().createUserWithEmailAndPassword(data.email, data.password);
      const user = userCredentials.user;

      // Update the user profile
      if (user) {
        await user.updateProfile({ displayName: data.fullName });
        console.log('Display Name updated successfully!');

        // Fetch the token
        const token = await user.getIdToken();
        console.log('Firebase Token:', token);

        // API call for additional authentication or user setup
        const myuser = await axiosInstance.post("/auth/firebase-authentication", { accessToken: token , name:data?.fullName});
        if (myuser) {
          dispatch(
            handleAuth({
              "token": myuser?.data?.user?.token,
              "uid": myuser?.data?.user?.token,
              "name": myuser?.data?.user?.name,
              "email": myuser?.data?.user?.email,
              "provider": myuser?.data?.user?.provider,
              "type": myuser?.data?.user?.type,
              "status": myuser?.data?.user?.status,
              "_id": myuser?.data?.user?._id,
              "url":myuser?.data?.user?.image,
              "authenticated": true,
              "welcome":myuser?.data?.user?.welcome
            }))
        }
     
      } else {
        console.log('No user found');
        Alert.alert('No user found');
      }
    } catch (error) {
      console.error(error);
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('That email address is already in use!');
      } else if (error.code === 'auth/invalid-email') {
        Alert.alert('That email address is invalid!');
      } else {
        Alert.alert(`An error occurred: ${error.message || error.toString()}`);
      }
    } finally {
      setIsEnabled(true); // Re-enable the button regardless of outcome
      setLoading(false)
    }
  };


  const navigateToSignIn = () => {
    navigation.navigate('SignIn')
  }
  useEffect(() => {
    console.log(data)
  }, [data])
  return (
    <ImageBackground style={{ flex: 1, width: '100%', height: '100%', }} source={home}>
      <SafeAreaView style={{ flex: 1, marginBottom: 50 }}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={{
            flex: 1,
          }}>
          <Header cb={navigateToSignIn} title="Sign up" description="Sign up with one of the following." />
          <View style={{ paddingHorizontal: 20, flex: 1, justifyContent: "space-between", paddingVertical: 40, paddingBottom: 100, gap: 40 }}>
            <View style={{ gap: 20 }}>
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
            <View style={{ alignItems: "center", gap: 20 }}>
              <CustomButtom
              loading={loading}
                buttonTextStyle={{ fontSize: responsiveFontSize(2) }}
                buttonstyle={{ width: "100%", borderColor: "#FFA100", padding: 15, backgroundColor: "#2E210A" }}
                onPress={() => isEnabled ? handleSignUp() : null}
                title={"Sign Up"}
              />
              <View style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"
              }}>
                 <GoogleSignInBTN onPress={() => console.log("hello from Google Sign Up")} url={google} />
                <IconButton onPress={() => console.log("hello from Apple Sign Up")} url={apple} />
                <FacebookSignInBTN onPress={() => console.log("hello from Facebook Sign Up")} url={fb} />
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
