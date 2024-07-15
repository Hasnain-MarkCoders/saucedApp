import React, { useEffect, useState } from 'react';
import { Text, View, SafeAreaView, ImageBackground, TouchableOpacity, Dimensions, ScrollView, Alert, Image, Vibration } from 'react-native';
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
import { scale } from 'react-native-size-matters';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

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
    setIsEnabled(false); // Disable the button at the start
    setLoading(true)
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



  async function onFacebookButtonPress() {
    // Attempt login with permissions
    try{
        const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
  
        if (result.isCancelled) {
          throw 'User cancelled the login process';
        }
      
        // Once signed in, get the users AccessToken
        const data = await AccessToken.getCurrentAccessToken();
      
        if (!data) {
          throw 'Something went wrong obtaining access token';
        }
      
        // Create a Firebase credential with the AccessToken
        const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
      
        // Sign-in the user with the credential
        const userCredential = await auth().signInWithCredential(facebookCredential);
        const firebaseIdToken = await userCredential.user.getIdToken();
        const myuser = await axiosInstance.post("/auth/firebase-authentication", { accessToken: firebaseIdToken });
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


  const signInWithGoogle = async () => {
    try{
     await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true})
     const { idToken } = await GoogleSignin.signIn();
     const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const res =   await auth().signInWithCredential(googleCredential)
      const firebaseToken = await res.user.getIdToken();
      console.log(firebaseToken)
      const myuser = await axiosInstance.post("/auth/firebase-authentication", { accessToken: firebaseToken });
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

 };
 useEffect(() => {
  GoogleSignin.configure({
   scopes: ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile'], // what API you want to access on behalf of the user, default is email and profile
   webClientId: '406307069293-kgffko9vq29heap8t2pmvrih1qbea6bi.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
   offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
   hostedDomain: '', // specifies a hosted domain restriction
   loginHint: '', // specifies an email address or subdomain that will be pre-filled in the login hint field
   forceCodeForRefreshToken: true, // [Android] if you want to force code for refresh token
   accountName: '', // [Android] specifies an account name on the device that should be used,
   
 });
}, []);


  return (
    <ImageBackground style={{ flex: 1, width: '100%', height: '100%', }} source={home}>
      <SafeAreaView style={{ flex: 1}}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
         >
          <Header cb={()=>{navigateToSignIn(); Vibration.vibrate(10)}} title="Sign up" description="Sign up with one of the following." />
          <View style={{ paddingHorizontal: scale(20), flex: 1, justifyContent: "space-between", paddingVertical:scale(30), gap: 40 }}>
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
                buttonTextStyle={{ fontSize: scale(14) }}
                buttonstyle={{ width: "100%", borderColor: "#FFA100", padding: 15, backgroundColor: "#2E210A" }}
                onPress={() => isEnabled ? (handleSignUp(), Vibration.vibrate(10)) : null}
                title={"Sign Up"}
              />
              {/* <View style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"
              }}>
                 <GoogleSignInBTN onPress={() => console.log("hello from Google Sign Up")} url={google} />
                <IconButton onPress={() => console.log("hello from Apple Sign Up")} url={apple} />
                <FacebookSignInBTN onPress={() => console.log("hello from Facebook Sign Up")} url={fb} />
              </View> */}
                <Text style={{
              color:"#FFA100",
              fontSize:scale(25),
              lineHeight:scale(30),
              fontWeight:500,
              marginVertical:scale(15)
            }}>
              OR
            </Text>
            <View style={{
             width:"100%",
             gap:scale(20)
            }}>

<CustomButtom
                showIcon={true}
                Icon={()=><Image style={{width:24, height:24}}  source={google} />}
                buttonTextStyle={{ fontSize: scale(14) }}
                buttonstyle={{ width: "100%", borderColor: "#FFA100", padding: 15, backgroundColor: "#2E210A",justifyContent:"start",  display:"flex", gap:10, flexDirection:"row", alignItems:"center", justifyContent:"center" }}
                onPress={()=>{signInWithGoogle(); Vibration.vibrate(10)}}
                title={"Sign Up With Google"}
              />
            <CustomButtom
                showIcon={true}
                Icon={()=><Image style={{width:24, height:24}}  source={fb} />}
                buttonTextStyle={{ fontSize: scale(14) }}
                buttonstyle={{ width: "100%", borderColor: "#FFA100", padding: 15, backgroundColor: "#2E210A" ,justifyContent:"start",  display:"flex", gap:10, flexDirection:"row", alignItems:"center", justifyContent:"center"}}
                onPress={()=>{onFacebookButtonPress(); Vibration.vibrate(10)}}
                title={"Sign Up With Facebook"}
              />
            </View>
              <View style={{ flexDirection: "row", marginTop:scale(20), alignItems:"center" }}>
                <Text style={{ color: "white", fontSize: responsiveFontSize(1.6), lineHeight: 18 }}>Already Have an account? </Text>
                <TouchableOpacity onPress={() => [navigateToSignIn(), Vibration.vibrate(10)]} >
                  <Text style={{ color: "#FFA100", fontSize: scale(14), marginTop:scale(3),lineHeight: 18 , paddingHorizontal:scale(4)}}>Login</Text>
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
