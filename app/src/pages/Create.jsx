import React from 'react'
import { 
    View,
    Text,
    SafeAreaView, 
    StyleSheet, 
    TextInput, 
    Button
} from "react-native"
import { Picker } from '@react-native-picker/picker'
import publicRequest from '../requestMethods'

export default function Create() {
  const [nameTarget, setText] = React.useState('')
  const [priceTarget, setValue] = React.useState('')
  const [selectedValue, setSelectedValue] = React.useState(false)
  const [agree, setAgree] = React.useState(false)
  const submitForm = async () => {
    alert('button ok!')
    // await publicRequest.post('/actions/create', 
    //   {
    //     transaction:nameTarget, 
    //     value:priceTarget, 
    //     type:selectedValue, 
    //     super:agree
    //   }
    // ).then((res) => {
    // }).catch((err) => {
    //   console.log(err)
    // })
  }

  return (<>
    <View style={styles.wrapper}>
      <Text></Text>
      <SafeAreaView style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Nome: Casa Florianópolis"
          placeholderTextColor="gray" 
          onChangeText={setText}
        />
        <TextInput
          style={styles.input}
          placeholder="Descrição: O imóvel possui 4 quartos..."
          placeholderTextColor="gray" 
          onChangeText={setText}
        />
        <TextInput
          style={styles.input}
          placeholder="Bairro"
          placeholderTextColor="gray" 
          onChangeText={setText}
        />
        <TextInput
          style={styles.input}
          onChangeText={setValue}
          placeholder="Valor"
          placeholderTextColor="gray" 
        />
        <View style={styles.boxSelection}>
            <Picker
                selectedValue={selectedValue}
                style={{ height: 50, width: 150, color:'gray'}}
                onValueChange={(itemValue) => setSelectedValue(itemValue)}
            >
                <Picker.Item label="Categorias" setSelectedValue/>
                <Picker.Item label="Diarias" value={true} />
                <Picker.Item label="Mensal" value={false} />
            </Picker>
            <Text style={styles.editText}>Desconto(%): </Text>
            <TextInput
                style={styles.miniBox}
                keyboardType="number-pad"
                onChangeText={setValue}
                placeholder="20"
                placeholderTextColor="gray" 
            />
        </View>   
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
  }
});