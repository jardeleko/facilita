import { Picker } from '@react-native-picker/picker'
import publicRequest from '../requestMethods'
import { firebase } from '../../firebase'
import * as ImagePicker from 'expo-image-picker'
import React, { useCallback, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import {Feather} from '@expo/vector-icons'

import { 
    View,
    Text,
    SafeAreaView, 
    StyleSheet, 
    TextInput, 
    TouchableOpacity,
    Image,
    Alert,
    ScrollView,
    RefreshControl
} from "react-native"
import { useSelector } from 'react-redux'

export default function User() {
  const currentUser = useSelector((state)=> state.currentUser)
  const [refreshing, setRefreshing] = useState(false)
  const [temp, setSelectedValue] = useState(false)
  const [uploading, setChange] = useState(false)
  const [img, setImg] = useState(null)
  const [inputs, setInputs] = useState({})
  const history = useNavigation()
  const [control, setControl] = useState(false)
  
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false)
    }, 1000);
  }, []);

  const createTwoButtonAlert = (index) =>{
    Alert.alert(
    "Apagar imagem",
    `de número ${index+1}`,
    [
      {
        text: "Cancelar",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { 
        text: "OK", onPress: () => {
          images.splice(index, 1)
          setImages(images)
          onRefresh()
          setControl(true)          
        }
      }
    ])
  }

  const BASE_URL = 'https://backend-facilita.herokuapp.com/api'
  const userRequest = axios.create({
      baseURL: BASE_URL,
      headers: {token: `Bearer ${currentUser.accessTk}`}
  })

  const uploadImage = async () => {
    setChange(true)
    if(img === null) {
      setChange(false)
      Alert.alert(
        "Necessario selecionar uma imagem antes",
        `aperte em voltar para continuar`,
      [
        {
          text: "Voltar",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
      ])
    }
    else{
      const response = await fetch(img.uri) 
      const blob = await response.blob()
      const filename = img.uri.substring(img.uri.lastIndexOf('/')+1)
      var ref = firebase.storage().ref().child(filename).put(blob)
      try {
          await ref.then((res) => {
            res.ref.getDownloadURL().then((url) => {
            setImages(old => [...old, url])
            setControl(true)          
          })
        })
      } catch (error) {
          console.log(error)
      }
      setChange(false)
      Alert.alert("Já pode selecionar a imagem seguinte!")
      setImg([])
    }
  }
  
  const pickImage = async () => {
      try {
      let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [5, 6],
          quality: 1,
      });
      if (!result.cancelled) {
          const source = {uri: result.uri}
          setImg(source)
      }
      } catch {
      console.log("Upload error!")
    }
  }

  const submitForm = async () => {
    var body
    if(control && temp){
      const aux = images
      body = {userId, temp, imgs:aux, ...inputs}
      setControl(false)
    }
    else if(control){
      const aux = images
      body = {userId, imgs:aux, ...inputs}
    }
    else if(temp){
        body = {userId, temp, ...inputs}
    }
    else {
        body = {userId, ...inputs}
    }

    console.log(body)

    await userRequest.put(`/user/${currentUser._id}`, body).then((res) => {
        // console.log(res.data)
        alert('Os dados foram enviados!')
        history.navigate('home')
    }).catch((err) => {
        console.log(err)
    })
  }
  const removePost = () => {
    Alert.alert(
      "Tem certeza que deseja apagar seu anuncio?",
      "Clique em ok para apagar...",
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { 
        text: "OK", onPress: async () => {
          await publicRequest.delete(`/user/${currentUser._id}`).then((res) => {
            console.log(res.data)
            onRefresh()
            history.navigate('home')
          }).catch((err) => {
            console.log(err)
          })     
        }
      }
    ])
  }

  return (
    <ScrollView 
        showsVerticalScrollIndicator={false}
        style={{backgroundColor: '#FFF' }}
    >
    <Text style={{fontSize:14, fontFamily:'Montserrat_500Medium', textAlign: 'center', marginTop: 14}}>Atualize seu perfil</Text>
        <View style={styles.wrapper}>
        <SafeAreaView style={styles.container}>
            <TextInput
              style={styles.input}
              placeholder={"Nome: " + currentUser.name}
              placeholderTextColor="gray" 
              onChangeText={(text) => setInputs({...inputs, name: text})}
            />
            <TextInput
            style={styles.input}
            placeholder={"Username: " + currentUser.user}
            placeholderTextColor="gray" 
            onChangeText={(text) => setInputs({...inputs, desc: text})}
            />
            <TextInput
            style={styles.input}
            placeholder={"Email: "+currentUser.email}
            placeholderTextColor="gray" 
            onChangeText={(text) => setInputs({...inputs, bairro: text})}
            />
            <TextInput
              style={styles.input}
              onChangeText={(text) => setInputs({...inputs, price: text})}
              placeholder={"Cidade: " +currentUser.city}
              placeholderTextColor="gray" 
            />
            <View style={styles.boxSelection}>
              <Picker
                selectedValue={temp}
                style={{ height: 50, width: 150, color:'gray'}}
                onValueChange={(itemValue) => setSelectedValue(itemValue)}
              >
                <Picker.Item label="UF" selectedValue/>
                <Picker.Item label="SC" value={true} />
                <Picker.Item label="RS" value={false} />
              </Picker>
             
              <Text style={styles.editText}>Idade: </Text>
              <TextInput
                style={styles.miniBox}
                keyboardType="number-pad"
                onChangeText={(text) => setInputs({...inputs, offer: parseInt(text)})}
                placeholder={currentUser.age || 'null'}
                placeholderTextColor="gray" 
              />
            </View>   

            {uploading 
              ? <Image 
                  resizeMode='center'
                  style={{width:100, height:100, marginLeft:'30%'}}
                  source={require('../../assets/loader.gif')}
                />
              : null
            }
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false} 
              refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
            <TouchableOpacity style={styles.slide} onLongPress={() =>  createTwoButtonAlert(currentUser._id)}>
              <Image
                source={{uri: currentUser.avatar}}
                style={{width: 90, height: 90, borderRadius: 8}}
              />
            </TouchableOpacity>
            </ScrollView>


            <SafeAreaView style={styles.safeImageload}>

              <TouchableOpacity onPress={pickImage}> 
                  <Image 
                  source={{uri: "https://cdn-icons-png.flaticon.com/128/126/126494.png"}}
                  style={{width:40, height:40}}
                  />
              </TouchableOpacity>
              
              <View style={styles.imageContainer}> 
                  {img && <Image source={{uri: currentUser.avatar}} style={styles.positionImg}/>}
              </View>

              <TouchableOpacity style={styles.sendBtn} onPress={uploadImage}> 
                <Text style={styles.buttonText}>Upload</Text>
              </TouchableOpacity>
              <TouchableOpacity  onPress={removePost}> 
                <Feather name="trash-2" size={36} color="red" />
              </TouchableOpacity>

            </SafeAreaView>


            <TouchableOpacity style={styles.buttonCreate} onPress={submitForm}>
                <Text style={styles.buttonResize}> Atualizar </Text>
            </TouchableOpacity>
        
        </SafeAreaView>
        </View>
    </ScrollView>
    )
}

const styles = StyleSheet.create({
    wrapper: {
      flex: 1,
      backgroundColor: 'white'
    },  
    container: {
      margin: 14,
      backgroundColor: 'white',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        color:'black',
        borderTopColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: 'darkblue'
  },
  boxSelection: {
    display: 'flex',
    flexDirection:'row',
    justifyContent:'space-evenly',
    fontSize:10
  },
  miniBox: {
    marginTop:0,
    marginRight: 10,
    height:35, 
    borderWidth: 0.5, 
    padding: 10, 
    borderTopColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'darkblue'
  },
  editText:{
    marginTop: 10,
    color: 'gray'
  },
  buttonResize: {
    padding: 8,
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 16,
    color:'white',
    backgroundColor: 'darkblue',
  },
  safeImageload: {
    display: 'flex', 
    flexDirection:'row', 
    justifyContent:'space-between', 
    marginTop: 10, 
    marginLeft:8,
    marginRight: 5,
    marginBottom: 20
  },
  sendBtn: {
    marginTop: 5,
    width: 70,
    height: 30,
    borderRadius: 4,
    backgroundColor: 'darkblue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white'
  },
  positionImg: {
    width:50, 
    height:50,
  },
  slide:{
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    height: 90,
    height: 90,
    borderRadius: 8,
    marginRight: 20,
  },
});