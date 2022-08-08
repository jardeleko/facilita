import React from 'react'
import { View, StyleSheet, Image} from 'react-native'
import Swiper from 'react-native-swiper'

export default function SwiperComponent({images}) {  
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
      key={images}
      activeDotColor="#FFF"
      activeDotStyle={{
        borderColor: '#000',
        borderWidth: 1,
        width: 10,
        height: 10,
        borderRadius: 10,
      }}
    >
    {images?.map((img, index) => (
      <View key={index} style={styles.slide}>
        <Image
          key={index}
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
    objectFit: 'cover',
    overflow: 'hidden'
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