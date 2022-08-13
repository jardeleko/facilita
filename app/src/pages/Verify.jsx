import { 
  View, 
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert
} from 'react-native'
import publicRequest from '../requestMethods'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'

export default function Verify(id) {
  const userId = id.route.params.id
  const [inputs, setInputs]= useState()
  const history = useNavigation()

  const submitForm = async () => {
    if(inputs.passwd === inputs.confirm){
      await publicRequest.put(`/user/${userId}`, inputs).then((res) => {
        alert('Seus dados foram atualizados!')
        history.navigate('login')
      }).catch((err) => {
        console.log(err)
      })
    }else{
      Alert.alert('Algo deu erradoo, os dois campos precisam ser preenchidos iguais.')
    }
  }

  return (
    <View style={styles.container}> 
      <Text style={styles.title}>Para sua segurança, considere incluir pelo menos 7 caracteres...</Text>
      <SafeAreaView style={styles.wrapper}>
        <TextInput
          style={styles.input}
          placeholder="Nova senha "
          secureTextEntry={true}
          placeholderTextColor="gray"
          onChangeText={(text) => setInputs({ ...inputs, passwd: text })}
        />
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder={"Confirme " }
          placeholderTextColor="gray"
          onChangeText={(text) => setInputs({ ...inputs, confirm: text })}
        />
        <TouchableOpacity onPress={() => submitForm()} style={styles.buttonBG}>
            <Text>Redefinir senha</Text>
          </TouchableOpacity>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffcc64'
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 10,
  },
  wrapper: {
    marginTop: 50,
    margin: 15,
    alignContent:'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    borderRadius: 10,
    height: 250,
    backgroundColor: 'black'
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
})