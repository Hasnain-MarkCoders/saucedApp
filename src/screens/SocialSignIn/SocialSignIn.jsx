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
import { useDispatch } from 'react-redux';
import { handleAuth } from '../../../android/app/Redux/userReducer';
import { scale } from 'react-native-size-matters';
import envelope from "./../../../assets/images/envelope.png";
import {
  GoogleSignin,
  isErrorWithCode,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import auth from '@react-native-firebase/auth';
import useAxios from '../../../Axios/useAxios';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';

// Get screen dimensions
const { width } = Dimensions.get('window');

// Utility for responsive font size
// const scale = (f) => {
//   const tempHeight = (16 / 9) * width;
//   return Math.sqrt(Math.pow(tempHeight, 2) + Math.pow(width, 2)) * (f / 100);
// };

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


  const axiosInstance = useAxios()
    const dispatch = useDispatch()
    const [isEnabled, setIsEnabled] = useState(true);
    const [loading, setLoading] = useState(false)
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





  return (
    <ImageBackground style={{ flex: 1, width: '100%', height: '100%' }} source={home}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
        
        showsHorizontalScrollIndicator={false} 
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}>
          <Header cb={()=>{navigateToSignUp(); Vibration.vibrate(10)}} title="Sign in" description="Sign in with your data that you entered during registration." />
          <View style={{ paddingHorizontal: 20, flex: 1, justifyContent: "space-between", paddingVertical: 40, paddingBottom: 100, gap: scale(10) }}>

            <View style={{ alignItems: "center", gap: 20 }}>
            <CustomButtom
                Icon={()=><Image style={{width:28, height:20}} source={envelope} />}
                showIcon={true}
                buttonTextStyle={{ fontSize: scale(14) }}
                buttonstyle={{ width: "100%", borderColor: "#FFA100", padding: 15, backgroundColor: "#2E210A",  display:"flex", gap:10, flexDirection:"row", alignItems:"center", justifyContent:"center"}}
                onPress={()=>{navigation.navigate("SignIn"); Vibration.vibrate(10)}}
                title={"Sign In With Email"}
              />
              <CustomButtom
                showIcon={true}
                Icon={()=><Image style={{width:24, height:24}}  source={google} />}
                buttonTextStyle={{ fontSize: scale(14) }}
                buttonstyle={{ width: "100%", borderColor: "#FFA100", padding: 15, backgroundColor: "#2E210A",justifyContent:"start",  display:"flex", gap:10, flexDirection:"row", alignItems:"center", justifyContent:"center" }}
                onPress={()=>{signInWithGoogle(); Vibration.vibrate(10)}}
                title={"Sign In With Google"}
              />
              <CustomButtom
                showIcon={true}
                Icon={()=><Image style={{width:24, height:24}}  source={fb} />}
                buttonTextStyle={{ fontSize: scale(14) }}
                buttonstyle={{ width: "100%", borderColor: "#FFA100", padding: 15, backgroundColor: "#2E210A" ,justifyContent:"start",  display:"flex", gap:10, flexDirection:"row", alignItems:"center", justifyContent:"center"}}
                onPress={()=>{onFacebookButtonPress();  Vibration.vibrate(10)}}
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
                buttonTextStyle={{ fontSize: scale(14) }}
                buttonstyle={{ width: "100%", borderColor: "#FFA100", padding: 15, backgroundColor: "#2E210A" ,justifyContent:"start",  display:"flex", gap:10, flexDirection:"row", alignItems:"center", justifyContent:"center"}}
                onPress={()=>{navigation.navigate("SignUp");  Vibration.vibrate(10)}}
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
