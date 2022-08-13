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

export default function Passwd() {
  const [inputs, setInputs] = useState({})
  const [control, setControl] = useState(false)
  const [response, setResponse] = useState(null)
  const history = useNavigation()
    
  const submitForm = async () => {
    await publicRequest.post('/forgot', inputs).then((res) => {
      setResponse(res.data)
      Alert.alert("Email encaminhado, verifique também sua caixa de spam..")
      setControl(true)
    }).catch((err) => {
      console.log(err)
      Alert.alert('error: ' + err)
    })
  }

  const verifyToken = async () => {
    if(String(inputs.code) == String(response)){
      await publicRequest.post('/user/find/email', inputs).then((res) => {
        console.log(res.data)
        const id = res.data
        history.navigate('verify', {id})
      }).catch((err) => {
        console.log(err)
      })
    } 
    else{
      Alert.alert('O token fornecido não corresponde.')
    }
  }

  return (<>
    {control
    ?
    <View style={styles.wrapperTwo}>
      <View>
      <Text style={styles.verify}>Insira o código de verificação enviado no email.</Text>
        <SafeAreaView style={styles.container}>
          <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <Text style={{color:'white', marginTop: 30}}>Código:</Text>
            <TextInput
              style={styles.input}
              keyboardType='number-pad'
              placeholder="10203"
              placeholderTextColor="gray" 
              onChangeText={(text) => setInputs({...inputs, code: text})}
            />
            <TouchableOpacity onPress={() => verifyToken()} style={styles.buttonBG}>
              <Feather name='send' size={26} color='white'/>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => setControl(false)} style={styles.buttonBG}>
            <Text>Reenviar email</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    </View>
    :
    <View style={styles.wrapper}>
      <Text style={styles.title}>Necessário incluir um email para recuperação.</Text>
      <View style={styles.wrapper}>
        <SafeAreaView style={styles.container}>
          <Text style={{color:'white'}}>Email:</Text>
          <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <TextInput
              style={styles.input}
              placeholder="mymail@exemplo.com"
              placeholderTextColor="gray" 
              onChangeText={(text) => setInputs({...inputs, email: text})}
              onSubmitEditing={clearImmediate()}
            />
            <TouchableOpacity onPress={() => {submitForm()}} style={styles.buttonBG}>
              <Feather name='send' size={26} color='white'/>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    </View>
    }
    </>)
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#ffcc64',
  },  
  wrapperTwo:{
    flex: 1,
    backgroundColor: 'black',
    opacity: 0.98
  },
  verify: {
    marginTop: 30,
    marginBottom: 2,
    fontSize: 24,
    fontFamily: 'Montserrat_500Medium',
    textAlign: 'center',
    color: 'white',
  },  
  container: {
    marginTop: 40,
    marginLeft:20,
    width: '90%',
    borderWidth: 1,
    borderColor: 'black',
    opacity: 1,
    padding: 30,
    borderRadius: 12,
    backgroundColor: 'black',
  },
  title: {
    marginTop: 30,
    marginBottom: 2,
    fontSize: 20,
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