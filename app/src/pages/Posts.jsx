import React, { 
    useEffect, 
    useState,
  } from 'react'
import { 
    View, 
    Text, 
    StyleSheet, 
    FlatList, 
} from 'react-native'
import { 
    ScrollView, 
    TextInput 
} from 'react-native-gesture-handler'
import {Feather} from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import DiariasComponent from '../components/DiariasComponent'
import { useSelector } from 'react-redux'
import axios from 'axios'

  export default function Diarias() {
    const [tmplist, setFilter] = useState([])
    const [masterData, masterTemp] = useState([])
    const [search, setSearch] = useState('')
    const currentUser = useSelector((state) => state.currentUser)
    const navigation = useNavigation()
    
    const BASE_URL = 'http://192.168.0.243:5000/api'
    const userRequest = axios.create({
        baseURL: BASE_URL,
        headers: {token: `Bearer ${currentUser.accessTk}`}
    })
    const searchFilter = (text) => {
      if(text) {
        const newData = masterData.filter((item) => {
          const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase()
          const textData = text.toUpperCase()
          return itemData.indexOf(textData) > -1
        })
        setFilter(newData)
        setSearch(text)
      }else {
        setFilter(tmplist)
        setSearch(text)
      }
    }
  
    useEffect(() => {
      const getItems = async() =>{
        await userRequest.get(`/house/getpost/${currentUser._id}`).then((res) => {
          setFilter(res.data)
          masterTemp(res.data)
        }).catch((err) => {
          console.log(err)
        })
      }
      getItems()
    },[currentUser])
  
  
   return (
    <ScrollView 
      showsVerticalScrollIndicator={false}
      style={{backgroundColor: '#FFF' }}
    >
      <View style={styles.header}>
        <View style={styles.inputArea}>
          <Feather name="search" size={24} color="black" />
          <TextInput
            value={search}
            onChangeText={(text) => searchFilter(text)}
            placeholder="O que está procurando?"
            style={styles.input}
          />
        </View>
      </View>
  
      <View style={styles.contentNew}>
        <Text style={styles.title}>Imóveis anunciados</Text>
      </View>
  
      <ScrollView scrollEnabled>
        <View style={{flexGrow: 1, paddingHorizontal:10}}>
          <FlatList 
            style={{overflow: 'visible'}}
            data={tmplist}
            nestedScrollEnabled={true}
            keyExtractor={(item, index) => index.toString()}
            vertical
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => <DiariasComponent data={item} />}
          />
        </View>
      </ScrollView>
    </ScrollView>
    );
  }
  
const styles = StyleSheet.create({
    header:{
        paddingHorizontal: 10,
        flexDirection: 'column',
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
        paddingHorizontal: 15,
        fontFamily: 'Montserrat_700Bold',
        fontSize: 18,
        color: '#4f4a4a'
    }
})