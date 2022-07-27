import { Picker } from '@react-native-picker/picker'
import publicRequest from '../requestMethods'
import { firebase } from '../../firebase'
import * as ImagePicker from 'expo-image-picker'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'

import { 
    View,
    Text,
    SafeAreaView, 
    StyleSheet, 
    TextInput, 
    TouchableOpacity,
    Image,
    Alert
} from "react-native"

export default function Create() {
  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')
  const [region, setRegion] = useState('')
  const [price, setPrice] = useState('')
  const [offer, setOFF] = useState(0)
  const [temp, setSelectedValue] = useState(false)
  const [uploading, setChange] = useState(false)
  const [img, setImg] = useState(null)
  const [images, setImages] = useState([])
  const history = useNavigation()

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        const source = {uri: result.uri}
        console.log(source)
        setImg(source)
      }
    } catch {
      console.log("Upload error!")
    }
  }

  const uploadImage = async () => {
    setChange(true)
    const response = await fetch(img.uri) 
    const blob = await response.blob()
    const filename = img.uri.substring(img.uri.lastIndexOf('/')+1)
    var ref = firebase.storage().ref().child(filename).put(blob)
    try {
      await ref.then((res) => {
        res.ref.getDownloadURL().then((url) => {
          setImages(old => [...old, url])
          history.navigate('/')
        })
      })
    } catch (error) {
      console.log(error)
    }
    setChange(false)
    Alert.alert("Já pode selecionar a imagem seguinte!")
    setImg([])
  }
  
  const submitForm = async () => {
    const body = {name, desc, imgs:images, bairro:region, price, offer, temp}
    await publicRequest.post('house', body).then((res) => {
      alert('Os dados foram enviados!')
    }).catch((err) => {
      console.log(err)
    })
  }

  return (<>
    <View style={styles.wrapper}>
      <SafeAreaView style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Nome: Casa Florianópolis"
          placeholderTextColor="gray" 
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Descrição: O imóvel possui 4 quartos..."
          placeholderTextColor="gray" 
          onChangeText={setDesc}
        />
        <TextInput
          style={styles.input}
          placeholder="Bairro"
          placeholderTextColor="gray" 
          onChangeText={setRegion}
        />
        <TextInput
          style={styles.input}
          onChangeText={setPrice}
          placeholder="Valor"
          placeholderTextColor="gray" 
        />
        <View style={styles.boxSelection}>
          <Picker
            selectedValue={temp}
            style={{ height: 50, width: 150, color:'gray'}}
            onValueChange={(itemValue) => setSelectedValue(itemValue)}
          >
            <Picker.Item label="Tipo" selectedValue/>
            <Picker.Item label="Dia" value={true} />
            <Picker.Item label="Mes" value={false} />
          </Picker>
          <Text style={styles.editText}>Desconto(%): </Text>
          <TextInput
            style={styles.miniBox}
            keyboardType="number-pad"
            onChangeText={setOFF}
            placeholder="20"
            placeholderTextColor="gray" 
          />
        </View>   
        
        <SafeAreaView style={styles.safeImageload}>
          <TouchableOpacity onPress={pickImage}>
            <Image 
              source={{uri: "https://cdn-icons-png.flaticon.com/128/126/126494.png"}}
              style={{width:40, height:40}}
            />
          </TouchableOpacity>
          
          <View style={styles.imageContainer}> 
            {img && <Image source={{uri: img.uri}} style={styles.positionImg}/>}
          </View>

          <TouchableOpacity style={styles.sendBtn} onPress={uploadImage}> 
            <Text style={styles.buttonText}>Upload</Text>
          </TouchableOpacity>

        </SafeAreaView>

        <View style={styles.buttonCreate}>
            <Text style={styles.buttonResize} onPress={submitForm}> Adicionar </Text>
        </View>
       
      </SafeAreaView>
    </View>
    </>)
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
        color:'#transparent',
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
  }
});