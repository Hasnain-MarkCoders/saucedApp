import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import back from "./../../../assets/images/back.png"

const Header = ({
  title = "",
  description = "",
  isWelcome=false
}) => {

  const titleArray = title?.split(" ")
  return (
    <View style={{
      paddingHorizontal: 20,
      paddingTop: 80
    }}>
      <View style={{
        marginBottom: 20
      }}>
        <TouchableOpacity onPress={() => console.log("hello from back button")} >
          <Image style={{
            display: "flex"
          }} source={back} />
        </TouchableOpacity>

      </View>
      <View style={{
        flexDirection: "row",
        gap: 10
      }}>
        {
          titleArray?.map((x, i) => (<Text
            key={i}
            style={{
              color: "white",
              fontWeight: 600,
              fontSize: 35,
              lineHeight: 50

            }}>{x.length > 1 ? `${x.charAt(0).toLocaleUpperCase()}${x.slice(1)}` : x}</Text>))


        }
        {
          isWelcome &&  
          <Text style={{
            color: "#FFA100",
            fontWeight: 600,
            fontSize: 35,
            lineHeight: 50

          }}>Sauced</Text>
        }
      </View>
      <Text style={{
        color: "white",
        marginTop: 15,
        fontFamily: "Montserrat",
        fontSize: 14,
        fontWeight: 600
      }}>
        {description}
      </Text>

    </View>

  )
}

export default Header

const styles = StyleSheet.create({})