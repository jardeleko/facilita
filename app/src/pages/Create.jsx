import { Picker } from '@react-native-picker/picker'
import { firebase } from '../../firebase'
import publicRequest from '../requestMethods'
import * as ImagePicker from 'expo-image-picker'
import React, { useCallback, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
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

export default function Create() {
  const currentUser = useSelector((state)=> state.currentUser)
  const userId = currentUser ? currentUser._id : null
  const [refreshing, setRefreshing] = useState(false)
  const [temp, setSelectedValue] = useState(false)
  const [uploading, setChange] = useState(false)
  const [img, setImg] = useState(null)
  const [images, setImages] = useState([])
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

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchCameraAsync({
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
          setControl(true)          
          history.navigate('create')
        })
      })
    } catch (error) {
      console.log(error)
    }
    setChange(false)
    Alert.alert("Já pode selecionar a imagem seguinte!")
    setImg(null)
  }
  
  const submitForm = async () => {
    const body = {userId, ...inputs, imgs:images, temp}
    await publicRequest.post('house', body).then((res) => {
      alert('Os dados foram enviados!')
      history.navigate('home')
    }).catch((err) => {
      console.log(err)
    })
  }

  return (
    <ScrollView 
      showsVerticalScrollIndicator={false}
      style={{backgroundColor: '#FFF' }}
    >
    <Text style={{fontSize:14, fontFamily:'Montserrat_500Medium', textAlign: 'center', marginTop: 14}}>Crie seu Anúncio</Text>
        <View style={styles.wrapper}>
        <SafeAreaView style={styles.container}>
            <TextInput
            style={styles.input}
            placeholder='Nome: Casa em Florianópolis'
            placeholderTextColor="gray" 
            onChangeText={(text) => setInputs({...inputs, name: text})}
            />
            <TextInput
            style={styles.input}
            placeholder='Descrição: Possui 4 quartos...'
            placeholderTextColor="gray" 
            onChangeText={(text) => setInputs({...inputs, desc: text})}
            />
            <TextInput
            style={styles.input}
            placeholder='Cidade, Bairro, UF'
            placeholderTextColor="gray" 
            onChangeText={(text) => setInputs({...inputs, bairro: text})}
            />
            <TextInput
            style={styles.input}
            onChangeText={(text) => setInputs({...inputs, price: text})}
            placeholder='500,00 / 500.00'
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
                onChangeText={(text) => setInputs({...inputs, offer: parseInt(text)})}
                placeholder="0 <> 100"
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
              style={{paddingHorizontal: 15, 
              marginTop: 35 }}
              refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
            {images.length > 0   
            ? <View style={styles.slide}>
                {images?.map((img, index) => (
                <TouchableOpacity key={index} onLongPress={() => createTwoButtonAlert(index)}>
                    <Image
                      key={index}
                      source={{uri: img}}
                      style={{width: 90, height: 90, borderRadius: 8, marginRight: 10}}
                    />
                </TouchableOpacity>
                ))}
            </View>
            : null}
            </ScrollView>

            <SafeAreaView style={styles.safeImageload}>
              <TouchableOpacity onPress={pickImage}> 
                  <Image 
                  source={{uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0vqDxBy86tHQMwT_a4waw7eCLIXoW6wH6LQ&usqp=CAU"}}
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


            <TouchableOpacity style={styles.buttonCreate} onPress={submitForm}>
                <Text style={styles.buttonResize}> Adicionar </Text>
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
    flexDirection: 'row',
    backgroundColor: '#FFF',
    height: 90,
    height: 90,
    borderRadius: 8,
  },
});
  
