import { Alert, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import {
    GoogleSignin,
    isErrorWithCode,
    statusCodes,
  } from "@react-native-google-signin/google-signin";
import google from "./../../../assets/images/google-icon.png"
import { useDispatch } from 'react-redux';
import { handleAuth } from '../../../android/app/Redux/userReducer';

const GoogleSignInBTN = ({
    onPress = () => {},
    buttonstyle={},
    imageStyle={},
    url=google
}) => {
    const dispatch = useDispatch()
    const [user, setUser] = useState(null);
    
    useEffect(() => {
             GoogleSignin.configure();
    }, []);

    const signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices()

        const userInfo = await GoogleSignin.signIn();
        const email = userInfo?.user?.email;
        console.log('User Info --> ', userInfo);
          if(userInfo){
            Alert.alert(`user with email: ${email} loggedin`)
          }else {
            Alert.alert("user logged in ni howa")
          }
          console.log(userInfo)
          dispatch(handleAuth(
         {   ...userInfo,
            authenticated:true}
          ))
          setUser({ userInfo, error: undefined });
        } catch (error) {
          if (isErrorWithCode(error)) {
            switch (error.code) {
              case statusCodes.SIGN_IN_CANCELLED:
                // user cancelled the login flow
                console.log(" user cancelled the login flow",error)
                break;
              case statusCodes.IN_PROGRESS:
                // operation (eg. sign in) already in progress
                console.log(" operation (eg. sign in) already in progress",error)

                break;
              case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
                // play services not available or outdated
                console.log("play services not available or outdated",error)

                break;
              default:
              // some other error happened
              console.log("some other error happened",error)

            }
          } else {
            // an error that's not related to google sign in occurred
          }
        }
      };

    return (
        <TouchableOpacity
    onPress={signIn}
    style={{
      alignItems:"center",
      justifyContent:"center",
      padding: 20,
      borderRadius: 50,
      width:40,
      height:40,
      ...buttonstyle
    }}>
      <Image
        source={url}
      style={{
        // minWidth:40,
        // minHeight:40,
        ...imageStyle
      }}/>
  </TouchableOpacity>
    );
};

export default GoogleSignInBTN;
