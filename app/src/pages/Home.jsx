import React, { 
  useEffect, 
  useState,
 } from 'react'
import { View, Text, StyleSheet, FlatList, RefreshControl} from 'react-native'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import {Feather} from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import New from '../components/New'
import House from '../components/House'
import Recommended from '../components/Recommended'
import publicRequest from '../requestMethods'


export default function Home() {
  const [datalist, setData] = useState([])
  const [tmplist, setTemp] = useState([])
  const [offerlist, setOffer] = useState([])
  
  useEffect(() => {
    const getItems = async() =>{
      await publicRequest.get('/house/find').then((res) => {
        const responseTemp = res.data?.filter((items) => items.temp)
        const responseData = res.data?.filter((items) => items.offer)
        responseData.sort(function(a, b){return b.offer - a.offer})
        setData(res.data)
        setTemp(responseTemp)
        setOffer(responseData)
      }).catch((err) => {
        console.log(err)
      })
    }
    getItems()
  },[])

  const navigation = useNavigation();

 return (
  <ScrollView 
    showsVerticalScrollIndicator={false}
    style={{backgroundColor: '#FFF' }}
  >
    <View style={styles.contentNew}>
      <Text style={styles.title}>Novidades</Text>
    </View>

    <ScrollView scrollEnabled>
      <View style={{flexGrow: 1, paddingHorizontal:15}}>
        <FlatList 
          style={{overflow: 'visible'}}
          data={datalist}
          nestedScrollEnabled={true}
          keyExtractor={(item) => String(item._id)}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => <New data={item} />}
        />
      </View>
    </ScrollView>
  
    <View style={{ flexDirection: 'row', marginBottom:10, alignItems: 'center' }}>
      <Text style={[styles.title, { marginTop: 20 } ]}> Diárias </Text>
    </View>  

    <ScrollView scrollEnabled>
      <View style={{flexGrow: 1, paddingHorizontal:15}}>
        <FlatList 
          style={{overflow: 'visible'}}
          data={tmplist}
          // refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          nestedScrollEnabled={true}
          keyExtractor={(item) => String(item._id)}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => <House data={item} />}
        />
      </View>
    </ScrollView>
    
    <Text style={[styles.title, { marginTop: 20 } ]}>
      Dica do dia
    </Text>

    <ScrollView scrollEnabled>
      <View style={{flexGrow: 1, paddingHorizontal:15}}>
        <FlatList 
          style={{overflow: 'visible'}}
          data={offerlist}
          // refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          nestedScrollEnabled={true}
          keyExtractor={(item) => String(item._id)}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => <Recommended data={item} />}
        />
      </View>
    </ScrollView>
  </ScrollView>
  );
}

const styles = StyleSheet.create({
  header:{
   paddingHorizontal: 15,
   flexDirection: 'row',
   alignItems: 'center',
   justifyContent: 'center',
   width: '100%',
   marginVertical: 20, 
  },
  inputArea:{
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    width: '98%',
    backgroundColor:  '#FFF',
    elevation: 2,
    paddingHorizontal: 10,
    height: 37,
    borderRadius: 10,
  },
  input:{
    fontFamily: 'Montserrat_500Medium',
    paddingHorizontal: 10,
    fontSize: 13,
    width: '90%'
  },
  contentNew:{
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center'
  },
  title:{
    marginTop: 20,
    paddingHorizontal: 15,
    fontFamily: 'Montserrat_700Bold',
    fontSize: 18,
    color: '#4f4a4a'
  }
});