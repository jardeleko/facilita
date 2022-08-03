import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { useSelector } from 'react-redux'
import publicRequest from '../requestMethods'

export default function Chat(data) {
    const [conversation, setConversation] = useState(data.route.params.conversation ? data.route.params.conversation : null)
    const [dataHouse, setData] = useState(data.route.params.data ? data.route.params.data : null)
    const idReceiver = dataHouse?.userId ? dataHouse.userId : conversation.messages[0].user.idPub    
    const currentUser = useSelector((state) => state.currentUser)
    const [messages, setMessages] = useState([])    
    const [control, setControl] = useState(false) 
    console.log(messages)

    useEffect(() => {
        if(conversation === null){
            const getData = async () => {
                await publicRequest.get(`/converse/findbyus/${currentUser._id}`).then((res) => {
                    const aux = res.data.messages
                    let index = []
                    for(let i = 0; i < aux.length; i++){  
                        if(filters[i][0].user._id === dataHouse.userId || filters[i][0].user.dataHouse.userId) index.push(i)
                    }
                    let result = aux[index]
                    result.sort(function(a , b) {
                        return a.messages.createdAt - b.messages.createdAt
                    })
                    if(result) {
                        setMessages(
                            result
                            )
                        setControl(true)
                    } 
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
                }).catch((err) => {
                    console.log(err)
                })
            }
            getConversation()
        }
    }, [currentUser, conversation, control, dataHouse]) //IDreceiver

    const asyncSubmitMessage = async (mess) => {        
        if(control === false) {
            await publicRequest.post('/message', mess).then((res) => {
                }).catch((err) => { 
                    console.log(err)
            })
            await publicRequest.post('/converse', {messages:[mess]}).then((res) => {
                setConversation(res.data)
                console.log('create new converse')
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
                console.log(res.data)
                console.log('put converse')
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
                _id: idReceiver,
                idPub: currentUser._id,
                name: currentUser.name
            }}
        />
    )
}