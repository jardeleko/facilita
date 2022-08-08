import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { View, StyleSheet, ImageBackground, Text} from 'react-native'
import { useNavigation } from '@react-navigation/native'

export default function Recommended({data}) {
  const history = useNavigation()
  return (
  <TouchableOpacity onPress={() => history.navigate('detail', {id: data._id})}>
    <ImageBackground
      source={{uri: data.imgs[1]}}
      style={styles.container}
      blurRadius={10}
    >
      <Text style={[styles.house, styles.shadow]}>
        {data.name}
      </Text>

      <Text style={[styles.description, styles.shadow]}>
        {data.offer}% OFF
      </Text>
    </ImageBackground>
  </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container:{
    height: 130,
    width: 230,
    marginRight: 20,
    marginBottom: 40,
    opacity: 0.8,
    backgroundColor: '#000',
    marginLeft: 3,
    padding: 12,
    marginTop: 20,
  },
  house:{
   fontFamily: 'Montserrat_700Bold',
   color: '#FFF',
   fontSize: 15,
  },
  description:{
    fontSize: 12,
    fontFamily: 'Montserrat_700Bold',
    color: '#FFF',
  },
  shadow:{
    textShadowOffset: { width: 1, height: 2},
    textShadowRadius: 3,
    textShadowColor: '#000'
  }
});