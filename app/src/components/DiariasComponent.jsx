import React from 'react'
import { View, Text, StyleSheet, Image, ScrollView} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

export default function DiariasComponent({data}) {
  const history = useNavigation()
  return ( 
    <View  style={styles.container} >
      <Image
        source={{uri: data.imgs[0]}}
        style={styles.cover}
      />
      <View style={styles.content}>
        <Text style={styles.title}>{data.name.toUpperCase()}</Text>
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
          <View style={{width: '100%', marginLeft: 25}}>
            <Ionicons name="ios-add-circle" size={24} color="#23bde8" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container:{
    marginTop: 10,
    backgroundColor: '#FFF',
    width: "98%",
    height: 340,
    elevation: 2,
    borderRadius: 0,
    padding: 15,
    marginRight: 10,
    marginLeft: 2,
    marginBottom: 5,
  },
  cover:{
    marginLeft: 6,
    width: "96%",
    height: 160,
    resizeMode: 'cover',
    borderRadius: 4,
  },
  content:{
   flexDirection: 'row',
   justifyContent:'center',
   marginVertical: 10, 
  },
  title:{
    fontFamily: 'Montserrat_700Bold',
    fontSize:12,
    textAlign: 'center',
    color: '#4f4a4a'
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