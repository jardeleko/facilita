import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import {Feather, Ionicons} from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import Stars from 'react-native-stars';
import SwiperComponent from '../components/Swiper';
import publicRequest from '../requestMethods';

export default function Detail(id) {
  const newGet = JSON.parse(JSON.stringify(id.route.params)).id
  const [house, setHouse] = useState({})
  const [offer, setOffer] = useState(0)
  const [images, setImages] = useState([])
  useEffect(() => {
    const getHouse = async () => {
      await publicRequest.get(`/house/find/${newGet}`).then((house) => {
        setHouse(house.data)
        setOffer(house.data.offer)
        const tmp = house.data.imgs?.filter((img) => img)
        setImages(tmp) 
      }).catch((err) => {
        console.log(err)
      })
    } 
    getHouse()
  },[newGet])

  return (
    <ScrollView 
      showsVerticalScrollIndicator={false}
      style={{backgroundColor: '#FFF' }}
    >
    <View style={styles.container}>
      <View style={styles.swiperContent}>
          <SwiperComponent images={images} offer={offer}/>
      </View>

      <View style={styles.headerContent}>
        {offer > 0 ?
          <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '80%'}}>
            <Text style={styles.houseOne}>{house.name}</Text>
            <Text style={styles.fontOffer}>{offer}% OFF</Text>
          </View>
          :
          <View style={{ width: '100%' }}>
            <Text style={styles.house}>{house.name}</Text>
          </View>
        }
      </View>

      <Text style={styles.price}>
        R$ {house.offer > 0 ? ((parseFloat(house.price) - (parseFloat(house.price)*(house.offer/100))).toFixed(2)).replace('.', ',') : parseFloat(house.price).toFixed(2).replace('.', ',')}
      </Text>
      <Text style={styles.description}>
      {house.desc}
      </Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{paddingHorizontal: 15, marginTop: 35 }}>
        {house.imgs?.map((img) => (
          <View style={styles.slide}>
            <Image
              source={{uri: img}}
              style={{width: 90, height: 90, borderRadius: 8}}
            />
          </View>
        ))}
      </ScrollView>

    </View>
  </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#FFF',
    marginBottom: 20
  },
  swiperContent:{
    flexDirection: 'row',
    height: 340,
    width: '100%',
  },
  headerContent:{
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
  },
  houseOne:{
    fontFamily: 'Montserrat_700Bold',
    fontSize: 18,
    color: '#4f4a4a',
    marginBottom: 10
  },
  house:{
    marginBottom: 10,
    fontFamily: 'Montserrat_700Bold',
    fontSize: 18,
    color: '#4f4a4a'
  },
  fontOffer: {
    marginLeft:20, 
    color: '#a134eb',
    textShadowOffset: {width: 1, height: 1},
    textShadowColor: '#000',
    fontFamily: 'Montserrat_700Bold', 
    fontSize: 10
  },
  price:{
    paddingHorizontal: 20,
    fontFamily: 'Montserrat_700Bold',
    fontSize: 16,
    color: 'gray'
  },
  description:{
    fontFamily: 'Montserrat_500Medium',
    paddingHorizontal: 20,
    color: '#b3aeae',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 20,
  },
  slide:{
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    height: 90,
    height: 90,
    borderRadius: 8,
    marginRight: 20,
  }
});