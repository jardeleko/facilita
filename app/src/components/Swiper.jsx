import React, { useState } from 'react'
import { View, StyleSheet, Image} from 'react-native'
import Swiper from 'react-native-swiper'

export default function SwiperComponent({images}) {
  let count = 0
  images?.forEach(element => {
    count++
  })
  
  return (
    <Swiper
      style={styles.wrapper}
      dotStyle={{
        backgroundColor: '#000',
        borderColor: '#000',
        borderWidth: 1,
        width: 10,
        height: 10,
        borderRadius: 10,
      }}
      key={count}
      activeDotColor="#FFF"
      activeDotStyle={{
        borderColor: '#000',
        borderWidth: 1,
        width: 10,
        height: 10,
        borderRadius: 10,
      }}
    >
    {images?.map((img) => (
      <View style={styles.slide} >
        <Image
          source={{uri: img}}
          style={styles.imageContainer}
        />
      </View>
    ))}
    </Swiper>
  );
}

const styles = StyleSheet.create({
  wrapper:{

  },
  slide:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  imageContainer: {
    width: '100%', 
    height: 400
  }
})