import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { useSelector } from 'react-redux'
import publicRequest from '../requestMethods'

export default function Chat(data) {
	const [conversation, setConversation] = useState(data.route.params.conversation ? data.route.params.conversation : null)
	const [dataHouse, setData] = useState(data.route.params.data ? data.route.params.data : null)
	const [idReceiver, setIdRec] = useState(dataHouse ? dataHouse.userId : 'defaultId') 
	const idHouse = dataHouse?._id ? dataHouse._id : conversation.messages[0].user.idHouse    
	const currentUser = useSelector((state) => state.currentUser)
	const [messages, setMessages] = useState([])    
	const [control, setControl] = useState(false) 
	
	console.log(idReceiver)
	
	async function getIdRecAsync(result) {
		console.log('teste')
		await publicRequest.get(`/message/find/${result._id}`).then((res) => {
			const data = res.data
			console.log(data)						
			if(data.user._id === currentUser._id) setIdRec(data.user.idRec)
			else setIdRec(data.user._id) 
		}).catch((err) => {
			console.log(err)
		})
	} 
	
	useEffect(() => {
		if(conversation === null){
			const getData = async () => {
				await publicRequest.get(`/converse/findbyus/${currentUser._id}`).then((res) => {
					const filters = res.data.map((item) => item.messages)
					let aux
					for(let i = 0; i < filters.length; i++) {
						if(filters[i][0].user.idHouse === dataHouse._id) {
							aux = i
						}
					}
					const result = filters[aux].sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
					setMessages(result)
					setConversation(res.data[aux])
					setControl(true)
					getIdRecAsync(result[0])					
				}).catch((err) => {
					console.log(err)
				})
			}
			getData()	
		}
		else {
			const getConversation = async () => {
				await publicRequest.get(`/converse/find/${conversation._id}`).then((res)=> {
					const aux = res.data.messages
					const result = aux.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
					setMessages(result) 
					setControl(true)   
					getIdRecAsync(result[0])              
				}).catch((err) => {
					console.log(err)
				})
			}
			getConversation()
		}
	}, [currentUser, getIdRecAsync, conversation, control, dataHouse]) //IDreceiver

	const asyncSubmitMessage = async (mess) => {   
		
		if(control === false) {
			await publicRequest.post('/message', mess).then((res) => {
				const data = res.data
				setIdRec(data.user.idRec)

			}).catch((err) => { 
				console.log(err)
			})

			mess.user.idRec = dataHouse.userId 
			await publicRequest.post('/converse', {messages:[mess]}).then((res) => {
				setConversation(res.data)
			}).catch((err) => {
				console.log(err)
			})
			
			setControl(true)
		}
		else {
			await publicRequest.post('/message', mess).then((res) => {
			}).catch((err) => { 
				console.log(err)
			})
			var aux = messages
			aux.push(mess)
			await publicRequest.put(`/converse/${conversation._id}`, {messages:aux}).then((res) => {
			}).catch((err) => {
				console.log(err)
			})
			setControl(true)
		}
	}
       
	const onSend = useCallback((messages = []) => {
		setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
		asyncSubmitMessage(messages[0])
	}, [control])

	return (
		<GiftedChat
			messages={messages}
			onSend={text => onSend(text)}
			user={{
					_id: currentUser._id,
					idRec: idReceiver !== currentUser._id ? idReceiver : "errorId",
					name: currentUser.name,
					idHouse: idHouse
			}}
		/>
	)
}