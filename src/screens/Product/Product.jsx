import { ImageBackground, SafeAreaView, Text, View, Keyboard } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header.jsx'
import getStartedbackground from './../../../assets/images/getStartedbackground.png';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { UNSPLASH_URL, VITE_UNSPLASH_ACCESSKEY } from "@env"
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import SauceList from '../../components/SauceList/SauceList.jsx';
import { topRatedSauces } from '../../../utils.js';
import ProductsBulletsList from '../../components/ProductsBulletsList/ProductsBulletsList.jsx';
import ProductCard from '../../components/ProductCard/ProductCard.jsx';
const Product = () => {
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false);
  const [isKeyBoard, setIsKeyBoard] = useState(false)

  const navigation = useNavigation()
  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setIsKeyBoard(true)
      console.log('Keyboard is open');
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setIsKeyBoard(false)
      console.log('Keyboard is closed');
    });

    // Cleanup function
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  useEffect(() => {
    const fetchPhotos = async () => {
      if (!hasMore || loading) return;
      setLoading(true);
      try {
        const res = await axios.get(`${UNSPLASH_URL}/photos`, {
          params: {
            client_id: VITE_UNSPLASH_ACCESSKEY,
            page: page
          }
        });
        console.log("page", page)
        if (res.data.length === 0) {
          setHasMore(false);
        } else {
          setData(prevData => [...prevData, ...res.data]);
        }
      } catch (error) {
        console.error('Failed to fetch photos:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPhotos();
  }, [page]);
  return (
    <ImageBackground style={{ flex: 1, width: '100%', height: '100%' }} source={getStartedbackground}>
      <SafeAreaView style={{ flex: 1, paddingBottom: isKeyBoard ? 0 : verticalScale(75) }}>
        <Header cb={() => navigation.navigate("Home")} showProfilePic={false} headerContainerStyle={{
          paddingBottom: scale(20)
        }} title={"Followers"} showText={false} />

        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={[1, 1, 1, 1]}
          renderItem={({ item, index }) => {
            return (
              <View style={{
                width: "100%",
                flex: 1,
                paddingHorizontal: scale(20),

              }}>

                {
                  index == 0 && <View style={{
                    marginBottom:scale(20)
                  }}>
                    <ProductCard />
                  </View>
                }

                {
                  index == 1 && <View style={{
                    marginBottom: scale(20),
                    gap: scale(20)
                  }}>


                    <Text style={{
                      color: "white",
                      lineHeight: verticalScale(29),
                      fontSize: moderateScale(24),
                      fontWeight: "600",
                    }}>
                      About Hot Sauce

                    </Text>

                    <ProductsBulletsList />

                  </View>
                }
                {
                  index == 2 && <View style={{
                    marginTop: scale(20)
                  }}>
                    <View style={{
                      gap: scale(30)
                    }}>

                      <SauceList title='Chili peppers used' data={topRatedSauces} />
                      <SauceList title='Ingredients' data={topRatedSauces} />
                      <SauceList title='Shared Images' data={topRatedSauces} />
                    </View>


                  </View>


                }
              </View>
            )
          }}
        />
      </SafeAreaView>
    </ImageBackground>
  )
}

export default Product
