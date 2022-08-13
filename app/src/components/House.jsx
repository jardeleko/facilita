import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { View, Text, StyleSheet, Image} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function House({data}) {
  const history = useNavigation()
  return (
  <TouchableOpacity onPress={() => history.navigate('detail', {id: data._id})}>
    <View style={styles.container}>
      <View>
        <Image
        source={{uri: data.imgs[1]}}
        style={styles.cover}
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.description}>
          {data.desc.split(', ', 1)+'.'}
        </Text>
        <Text style={styles.price}>
          R$ {data.offer > 0 ? ((parseFloat(data.price) - (parseFloat(data.price)*(data.offer/100))).toFixed(2)).replace('.', ',') : parseFloat(data.price).toFixed(2).replace('.', ',')}
        </Text>
      </View> 
    </View>
  </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container:{
    flexDirection: 'row',
    width: 260,
    height: 70,
    backgroundColor: '#FFF',
    elevation: 2,
    padding: 6,
    marginVertical: 5,
    marginRight: 20,
    marginLeft: 2,
    borderRadius: 10,
  },
  cover:{
    borderRadius: 10,
    width: 60,
    height: 60,
    resizeMode: 'cover',
  },
  content:{
    width: '65%',
    justifyContent:'flex-end',
    paddingHorizontal: 10,
    height: '100%'
  },
  description:{
    margin:7,
    fontSize: 9,
    fontFamily: 'Montserrat_500Medium'
  },
  price:{
    fontSize: 12,
    color: '#4f4a4a',
    fontFamily: 'Montserrat_700Bold'
  }
});