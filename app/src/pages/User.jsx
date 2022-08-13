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
  RefreshControl,
  Dimensions
} from "react-native"
import { useSelector } from 'react-redux'
import publicRequest from '../requestMethods'
import { firebase } from '../../firebase'
import * as ImagePicker from 'expo-image-picker'
import React, { useCallback, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'
import ImageZoom from 'react-native-image-pan-zoom'

export default function User() {
  const currentUser = useSelector((state) => state.currentUser)
  const [refreshing, setRefreshing] = useState(false)
  const [temp, setUF] = useState('')
  const [uploading, setChange] = useState(false)
  const [pressed, setPressed] = useState(false)
  const [img, setImg] = useState(null)
  const [newUP, setUP] = useState(null)
  const [inputs, setInputs] = useState({})
  const history = useNavigation()
  const [control, setControl] = useState(false)

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false)
    }, 1000);
  }, []);

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [5, 6],
        quality: 1,
      });
      if (!result.cancelled) {
        const source = { uri: result.uri }
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
    const filename = img.uri.substring(img.uri.lastIndexOf('/') + 1)
    var ref = firebase.storage().ref().child(filename).put(blob)
    try {
      await ref.then((res) => {
        res.ref.getDownloadURL().then((url) => {
          setUP(url)
          setControl(true)
          onRefresh()
        })
      })
    } catch (error) {
      console.log(error)
    }
    Alert.alert("Imagem de perfil carregada!")
    setChange(false)
  }

  async function submitForm(id) {
    var body
    if (control && temp) {
      inputs.city.length 
      ?  
        inputs.city = inputs.city.concat(', ').concat(temp)
      :
        setInputs({...inputs, city: temp})

      body = { avatar: newUP, ...inputs }
    }
    else if(temp){
      inputs.city = inputs.city.concat(', ').concat(temp)
      body = {...inputs }
    }
    else {
      body = { ...inputs }
    }
    console.log(body)
    await publicRequest.put(`/user/${id}`, body).then((res) => {
      console.log(res.data)
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
      style={{ backgroundColor: '#FFF', flex: 1 }}
    >
      {pressed
        ?
        <View style={{flex: 1 }}>
          <TouchableOpacity onPress={() => setPressed(!pressed)}>
            <Feather name="x" size={26} color="gray" style={{margin:5, position: 'relative', textAlign: 'right' }} />
          </TouchableOpacity>
          <ImageZoom cropWidth={Dimensions.get('window').width}
            cropHeight={Dimensions.get('window').height}
            imageWidth={300}
            imageHeight={600}>
            <Image
              source={{ uri: newUP ? newUP : currentUser.avatar }}
              style={{ height: 600, width: '100%', resizeMode:'cover', borderRadius: 2 }}
            />
          </ImageZoom>
        </View>
        :
        <>
          <Text style={{ fontSize: 14, fontFamily: 'Montserrat_500Medium', textAlign: 'center', marginTop: 14 }}>Atualize seu perfil</Text>
          <View style={styles.wrapper}>

            <SafeAreaView style={styles.container}>
              <TextInput
                style={styles.input}
                placeholder={"Nome: " + currentUser.name}
                placeholderTextColor="gray"
                onChangeText={(text) => setInputs({ ...inputs, name: text })}
              />
              <TextInput
                style={styles.input}
                placeholder={"Username: " + currentUser.user}
                placeholderTextColor="gray"
                onChangeText={(text) => setInputs({ ...inputs, user: text })}
              />
              <TextInput
                style={styles.input}
                placeholder={"Email: " + currentUser.email}
                placeholderTextColor="gray"
                onChangeText={(text) => setInputs({ ...inputs, email: text })}
              />
              <TextInput
                style={styles.input}
                onChangeText={(text) => setInputs({ ...inputs, city: text })}
                placeholder= {currentUser.city || 'Cidade: null'}
                placeholderTextColor="gray"
              />
              <View style={styles.boxSelection}>
                <Text style={styles.editText}> UF: </Text>
                <TextInput
                  style={styles.miniBox}
                  onChangeText={(text) => setUF(text)}
                  placeholder={currentUser.city || 'null'}
                  placeholderTextColor="gray"
                />

                <Text style={styles.editText}>Idade: </Text>
                <TextInput
                  style={styles.miniBox}
                  keyboardType="number-pad"
                  onChangeText={(text) => setInputs({ ...inputs, age: parseInt(text) })}
                  placeholder='0 <> 100'
                  placeholderTextColor="gray"
                />
              </View>

              {uploading
                ? <Image
                  resizeMode='center'
                  style={{ width: 100, height: 100, marginLeft: '30%' }}
                  source={require('../../assets/loader.gif')}
                />
                : null
              }
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
              >
                <TouchableOpacity style={styles.slide} onPress={() => setPressed(!pressed)}>
                  <Image
                    source={{ uri: newUP ? newUP : currentUser.avatar }}
                    style={{ width: 90, height: 90, borderRadius: 8 }}
                  />
                </TouchableOpacity>

              </ScrollView>
              <SafeAreaView style={styles.safeImageload}>
                <TouchableOpacity onPress={pickImage}>
                  <Image
                    source={{ uri: "https://cdn-icons-png.flaticon.com/128/126/126494.png" }}
                    style={{ width: 40, height: 40 }}
                  />
                </TouchableOpacity>

                <View style={styles.imageContainer}>
                  {control && <Image source={{ uri: img.uri }} style={styles.positionImg} />}
                </View>

                <TouchableOpacity style={styles.sendBtn} onPress={uploadImage}>
                  <Text style={styles.buttonText}>Upload</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={removePost}>
                  <Feather name="trash-2" size={36} color="red" />
                </TouchableOpacity>

              </SafeAreaView>

              <TouchableOpacity style={styles.buttonCreate} onPress={() => submitForm(currentUser._id)}>
                <Text style={styles.buttonResize}> Atualizar </Text>
              </TouchableOpacity>

            </SafeAreaView>
          </View>
        </>
      }
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
    color: 'black',
    borderTopColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'darkblue'
  },
  boxSelection: {
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    fontSize: 10
  },
  miniBox: {
    marginTop: 0,
    marginRight: 10,
    height: 35,
    borderWidth: 0.5,
    padding: 10,
    borderTopColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'darkblue'
  },
  editText: {
    marginTop: 10,
    color: 'gray'
  },
  buttonResize: {
    padding: 8,
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 16,
    color: 'white',
    backgroundColor: 'darkblue',
  },
  safeImageload: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginLeft: 8,
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
    width: 50,
    height: 50,
  },
  slide: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    height: 90,
    height: 90,
    borderRadius: 8,
    marginRight: 20,
  },
})
