import { 
    View, 
    Text, 
    StyleSheet,
    TouchableOpacity,   
    TextInput,
    Alert,
    ImageBackground
} from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { login } from '../redux/apiCalls'

export default function Login() {

    const [user, setUser] = useState('')
    const [passwd, setPasswd] = useState('')
    const dispatch = useDispatch()
    const navigation = useNavigation()

    const submitForm = async () => {
        login(dispatch, {user, passwd})
    }
    const createRequest = () => {
        navigation.navigate('register')
    }
    return (
    <View style={styles.container}>
        <ImageBackground 
            resizeMode='center'
            style={{marginBottom: 300, padding:20}}
            source={{uri:'https://cdn-icons-png.flaticon.com/512/33/33248.png'}}
        >
        <View style={styles.boxLogin}>
            <View style={{display:'flex', flexDirection:'row', justifyContent: 'space-between'}}>
                <Text style={{color:'white', marginTop:15}}>Username: </Text>
                <TextInput 
                    style={styles.input}
                    onChangeText={setUser}
                    placeholder="Digite seu user"
                    placeholderTextColor="gray" 
                />
            </View>
    
            <View style={{display:'flex', flexDirection:'row', justifyContent: 'space-between'}}>

                <Text style={{color:'white', marginTop:15, marginRight: 30}}>Senha: </Text>
                <TextInput 
                    style={styles.input} 
                    onChangeText={setPasswd}
                    secureTextEntry={true}
                    placeholder="Digite sua senha"
                    placeholderTextColor="gray"    
                />
            </View>
            <TouchableOpacity style={{alignItems:'center', justifyContent:'center'}} onPress={submitForm}>
                <Text style={styles.sendBtn}>Entrar</Text>
            </TouchableOpacity>
            <View style={{flexDirection:'row', textAlign:'justify'}}>
            <Text style={{marginTop:20, color:'white'}}>Ou Cadastre-se agora, </Text>
            <TouchableOpacity onPress={createRequest}>
                <Text style={{marginTop:20, color:'#ff8936'}}>clique aqui!</Text>
            </TouchableOpacity>
        </View>
        </View>
        
        </ImageBackground>
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
        marginTop:450,
        height: 240,
        width: 290,
        margin: 10,
        opacity: 0.95,
        borderRadius: 4,
        backgroundColor: 'black',
        borderWidth: 0.6,
        
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