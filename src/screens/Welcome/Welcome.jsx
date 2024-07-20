import {   View, SafeAreaView } from 'react-native'
import React from 'react'
import { ImageBackground } from 'react-native';
import home from './../../../assets/images/home.png';
import WelcomeLists from '../../components/WelcomeList/WelcomeList';
import CustomButtom from '../../components/CustomButtom/CustomButtom';
import Header from '../../components/Header/Header';
import { scale } from 'react-native-size-matters';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { host } from '../../../Axios/useAxios';

const Welcome = () => {
const userAuth = useSelector(state=>state.auth)
  const handleWelcome = async()=>{
      try {
        const response = await axios.post(host + "/welcome", {
          headers: {
            Authorization: `Bearer ${userAuth.token}`, // Assuming userAuth is defined and accessible
          }
        });

      } catch (error) {
        console.log("Error: ", error);
      }
  }
  return (
    <ImageBackground style={{
      flex: 1,
      width: '100%',
      height: '100%',
    }} source={home} >
      <SafeAreaView style={{
        flex: 1,
      }}>

        <View style={{
          paddingHorizontal: 20,
          paddingBottom:100,
          gap:40,
          justifyContent:"space-between",
          flex:1
        }}>
          <View>
          <Header isWelcome ={ true} title={"Welcome to"} />
            <WelcomeLists />
          </View>
         <CustomButtom
          buttonTextStyle={{ fontSize: scale(20) }}
              buttonstyle={{ width: "100%", borderColor: "#FFA100", padding: 15, backgroundColor: "#2E210A" }}
              onPress={() => handleWelcome()}
              title={"Next"}
              />

        </View>


      </SafeAreaView>

    </ImageBackground>

  )
}

export default Welcome

