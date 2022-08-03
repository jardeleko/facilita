import publicRequest from '../requestMethods'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import {Feather} from '@expo/vector-icons'
import { 
    View,
    Text,
    SafeAreaView, 
    StyleSheet, 
    TextInput, 
    TouchableOpacity,
    Alert,
} from "react-native"
import { ScrollView } from 'react-native-gesture-handler'

export default function Register() {
  const [name, setName] = useState('')
  const [user, setUser] = useState('')
  const [email, setEmail] = useState('')
  const [age, setAge] = useState(0)
  const [passwd, setPasswd] = useState('')
  const [city, setCity] = useState('')
  const navigation = useNavigation()

  const submitForm = async () => {
    const body = {name, user, email, age, passwd, city}
    await publicRequest.post('/register', body).then((res) => {
      Alert.alert('Cliente ' + res.data.name + ' criado com sucesso!')
      navigation.navigate('login')
    }).catch((err) =>{
      console.log(err)
      Alert.alert('error na criação do usuario')
    })
  }

  return (<>
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{backgroundColor: '#ffcc64'}}
    >
      <Text style={styles.title}>Encontre seu imóvel na Facilita,</Text>
      <Text style={styles.title}>Entre Agora!</Text>

      <View style={styles.wrapper}>
        <SafeAreaView style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Nome: Bardoso da Silva"
            placeholderTextColor="gray" 
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="email: mymail@exemplo.com"
            placeholderTextColor="gray" 
            onChangeText={setEmail}
          />
          <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <TextInput
              style={styles.input}
              placeholder="@user: bardosinho"
              placeholderTextColor="gray" 
              onChangeText={setUser}
            />
            <TextInput
              style={styles.input}
              onChangeText={setAge}
              keyboardType={'number-pad'}
              placeholder="Idade: 20"
              placeholderTextColor="gray" 
            />
          </View>
          <TextInput
            style={styles.input}
            onChangeText={setPasswd}
            secureTextEntry={true}
            placeholder="Pass: ASD!@#123"
            placeholderTextColor="gray" 
          />
  
          <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <TextInput
              style={styles.input}
              placeholder="Cidade: Rosul, RS"
              placeholderTextColor="gray" 
              onChangeText={setCity}
              />
            <TouchableOpacity onPress={submitForm} style={styles.buttonBG}>
              <Feather name='send' size={26} color='white'/>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    </ScrollView>

    </>)
}

const styles = StyleSheet.create({
    wrapper: {
      flex: 1,
      margin: 20,
      backgroundColor: '#ffcc64',
    },  
    container: {
      borderWidth: 1,
      borderColor: 'black',
      opacity: 1,
      borderRadius: 2,
      backgroundColor: 'black',
    },
    title: {
      marginTop: 10,
      marginBottom: 2,
      fontSize: 14,
      fontFamily: 'Montserrat_500Medium',
      textAlign: 'center'
      
  },
    input: {
        height: 40,
        margin: 10,
        borderWidth: 0.6,
        padding: 10,
        color:'white',
        borderTopColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: '#ffcc64'
  },
  buttonBG: {
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: '#dadada',
    opacity: 0.5,
    margin:14, 
    padding:10, 
    borderRadius:30
  }
});