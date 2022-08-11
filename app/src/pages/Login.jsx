import { 
	View, 
	Text, 
	StyleSheet,
	TouchableOpacity,   
	TextInput,
	ImageBackground,
	Image,
	Alert,
	LogBox
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { login } from '../redux/apiCalls'
import * as WebBrowser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'
import publicRequest from '../requestMethods'

WebBrowser.maybeCompleteAuthSession()
LogBox.ignoreLogs(["EventEmitter.removeListener"])

export default function Login() {
	const dispatch = useDispatch()
	const navigation = useNavigation()
	const [user, setUser] = useState(null)
	const [passwd, setPasswd] = useState(null)
	const [accessTk, setAccessTk] = useState(null)
	const [userInfo, setUserInfo] = useState(null)
	const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
		expoClientId: '347880960520-sje8ods0rcbl5v6lpadu6pmsjo1p9280.apps.googleusercontent.com',
		androidClientId: '347880960520-of68n10pgllkm6nn61ppnb5v351ik7lu.apps.googleusercontent.com',
		iosClientId: '347880960520-9fjc5ff6vqgrc3li9k3jdvllma8opme0.apps.googleusercontent.com'
	})
	if(userInfo !== null) {
		const newUser = {name: userInfo.name, email: userInfo.email, avatar:userInfo.picture, accessTk}
		const createNewUser = async () => {
			await publicRequest.post('/register', newUser).then((res) => {
				login(dispatch, res.data) 
			}).catch(() =>{
				login(dispatch, newUser)
			})
		}
		createNewUser()
	}

	useEffect(() => {
		if(response?.type ==='success'){
			setAccessTk(response.params.id_token)
			accessTk && fetchUserInfo()
		}
	},[response, accessTk])

	async function fetchUserInfo(){
		let response = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${accessTk}`)
		const userInfo = await response.json()
		setUserInfo(userInfo)
	}

	const submitForm = async () => {
		if(user === null && passwd === null) Alert.alert('Necessário incluir suas credenciais!')
		else if(user === null) Alert.alert('Necessário username para prosseguir...')
		else if(passwd === null) Alert.alert('Necessário incluir senha cadastrada!')
		else login(dispatch, {user, passwd})
	}
	const createRequest = () => {
		navigation.navigate('register')
	}

	return (
	<View style={styles.container}>
		<ImageBackground 
			resizeMode='center'
			style={{marginBottom: 420, padding:20}}
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
			<TouchableOpacity style={{alignItems:'center', justifyContent:'center'}} onPress={() => promptAsync()}> 
				<Image 
					resizeMode='center'
					style={{width:130, height:40, borderRadius: 4}}
					source={require('../../assets/signGoogle.jpg')}
				/>
			</TouchableOpacity>

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
		marginTop:550,
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