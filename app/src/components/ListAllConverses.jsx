import { useState } from 'react'
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Image
} from 'react-native'
import format from 'dateformat'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import publicRequest from '../requestMethods'

export default function ListAllConverses({ data }) {
	const filters = data.messages
	const size = filters.length

	const currentUser = useSelector((state) => state.currentUser)
	const [otherName, setOtherName] = useState('default')
	
	async function getName() {
		await publicRequest.get(`/user/findname/${filters[0].user.idRec}`).then((res) => {
			setOtherName(res.data)
		}).catch((err) => {
			console.log(err)
		})
	}
	let identify
	let aux
	if (filters[0].user._id === currentUser._id) identify = true, getName() //nao precisa mudar
	else identify = false
	for (let i = 0; i < filters.length; i++) {
			if (filters[i].user.name !== currentUser.name) aux = filters[i].user.name
	}

	const navigation = useNavigation()
	const redirectToChat = (conversation) => {
		navigation.navigate('chat', conversation = { conversation })
	}

	return (
		<TouchableOpacity style={styles.container} onPress={(e) => redirectToChat(data)}>
			<View style={styles.content}>
				<Text style={styles.label}>{identify ? otherName : data.messages[0].user.name}</Text>
				<View>
					<Image style={styles.avatar}
							source={{ uri: 'https://www.ecp.org.br/wp-content/uploads/2017/12/default-avatar.png' }}
					/>
				</View>
			</View>

			<Text style={styles.buyAt}>{format(data.messages[size-1].createdAt, "dd/mmm, yyyy HH':'mm':'ss")}</Text>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		marginTop: 10,
		backgroundColor: 'white',
		borderRadius: 20,
		flex: 1,
		marginBottom: 24,
		borderBottomWidth: 0.5,
		borderBottomColor: 'teal',
	},
	content: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 2,
		marginBottom: 8
	},
	date: {
	color: '#dadada',
	fontWeight: 'bold'
	},
	label: {
		fontSize: 16,
		fontWeight: 'bold',
		color: 'gray'
	},
	avatar: {
		width: 40,
		height: 40,
		borderRadius: 40
	},
	buyAt: {
		marginLeft: 14,
		color: 'gray'
	}
})