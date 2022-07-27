import { 
    View, 
    Text, 
    StyleSheet,
    TouchableOpacity,   
    TextInput,
    Alert,
} from 'react-native'
import React, { useState } from 'react'
import publicRequest from '../requestMethods'
import { useNavigation } from '@react-navigation/native'

export default function Login() {
    const [user, setUser] = useState('')
    const [passwd, setPasswd] = useState('')
    const [currentUser, setCurrentUser] = useState({})
    const navigation = useNavigation()
    //history.navigate('detail', {id: data._id})}
    console.log(currentUser)

    const submitForm = async () => {
        const query = {user, passwd}
        publicRequest.post('/login', query).then((res) => {
            setCurrentUser(res.data)
            Alert.alert('Bem vindo, '+res.data.name)
            navigation.navigate('home', {data: res.data})
        }).catch((err) => {
            Alert.alert('Credenciais erradas!')
            console.log(err)
        })
    }

    return (
    <View style={styles.container}>
        <Text style={styles.title}>Facilita Imóveis</Text>
            <View style={styles.boxLogin}>
                <View style={{display:'flex', flexDirection:'row', justifyContent: 'space-between'}}>
                    <Text style={{color:'white', marginTop:15}}>Username: </Text>
                    <TextInput 
                        style={styles.input}
                        onChangeText={setUser}
                        placeholder="exemple_apelido12"
                        placeholderTextColor="gray" 
                    />
                </View>
        
                <View style={{display:'flex', flexDirection:'row', justifyContent: 'space-between'}}>

                    <Text style={{color:'white', marginTop:15, marginRight: 30}}>Senha: </Text>
                    <TextInput 
                        style={styles.input} 
                        onChangeText={setPasswd}
                        secureTextEntry={true}
                        placeholder="ASD!@#123"
                        placeholderTextColor="gray"    
                    />
                </View>
                <TouchableOpacity style={{alignItems:'center', justifyContent:'center'}} onPress={submitForm}>
                    <Text style={styles.sendBtn}>Entrar</Text>
                </TouchableOpacity>
            </View>
            
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#ffcc64',
        alignItems: 'center',
        justifyContent: 'center'
    },
    boxLogin: {
        height: 200,
        width: 290,
        margin: 10,
        opacity: 0.9,
        backgroundColor: '#343434',
        borderWidth: 0.6,
        borderRadius: 20,
        flexDirection:'column',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    title: {
        marginBottom: 20,
        fontSize: 20,
        fontFamily: 'Montserrat_500Medium'
    },
    input: {
        margin: 10,
        padding:2,
        borderWidth: 0.6,
        borderTopColor: 'transparent',
        borderLeftColor:'transparent',
        borderRightColor:'transparent',
        borderBottomColor: 'gray',
        color: 'white',
        borderRadius: 4,
        width: 130,
        height: 30,
    },
    sendBtn: {
        marginTop: 20,
        width: 110,
        height: 30,
        padding: 4,
        textAlign: 'center',
        marginLeft: 100,
        alignItems: 'center',
        fontSize: 14,
        backgroundColor: '#ff8936',
        color: 'black',
        borderRadius: 4,
        position: 'relative'
    }
})