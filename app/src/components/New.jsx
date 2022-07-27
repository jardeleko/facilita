import React from 'react'
import { View, Text, StyleSheet, Image, ScrollView} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

export default function New({data}) {
  const history = useNavigation()
  return ( 
    <View  style={styles.container} >
      <Image
        source={{uri: data.imgs[0]}}
        style={styles.cover}
      />
      <View style={styles.content}>
        <View style={styles.dot}>
        </View>
        <Text style={styles.title}>{data.name}</Text>
      </View>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        style={{backgroundColor: '#fff' }}
      >
        <Text style={styles.description}>
          {data.desc}
        </Text>
      </ScrollView>

      <View style={styles.footer}>
        <View style={{width: '80%'}}>
          <Text style={styles.price}>R$ {data.offer > 0 ? ((parseFloat(data.price) - (parseFloat(data.price)*(data.offer/100))).toFixed(2)).replace('.', ',') : data.price}</Text>
        </View>
        <TouchableOpacity onPress={() => history.navigate('detail', {id: data._id})}>
          <View style={{width: '100%', marginLeft:10}}>
            <Ionicons name="ios-add-circle" size={24} color="#23bde8" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container:{
    marginTop: 20,
    backgroundColor: '#FFF',
    height: 280,
    width: 200,
    elevation: 2,
    borderRadius: 10,
    padding: 15,
    marginRight: 30,
    marginLeft: 2,
    marginBottom: 5,
  },
  cover:{
    width: 170,
    height: 110,
    borderRadius: 10,
  },
  content:{
   flexDirection: 'row',
   alignItems: 'center',
   marginVertical: 10, 
  },
  title:{
    fontFamily: 'Montserrat_700Bold',
    fontSize:12,
    color: '#4f4a4a'
  },
  dot:{
    float: 'right',
    width: 4,
    height: 4,
    borderRadius: 4,
    backgroundColor: 'green',
    marginHorizontal: 4,
  },

  description:{
    fontFamily: 'Montserrat_400Regular',
    fontSize: 9,
    color:'#4f4a4a'
  },
  footer:{
    flexDirection: 'row',
    marginTop: 5,
    alignItems: 'center',
    width: '100%'
  },
  price:{
    fontSize: 15,
    color: '#4f4a4a',
    fontFamily: 'Montserrat_700Bold'
  }
});