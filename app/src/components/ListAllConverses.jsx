import {React} from 'react'
import { 
    View, 
    Text, 
    StyleSheet,
    TouchableOpacity, 
    Image
} from 'react-native'
import format from 'dateformat'
import {useNavigation} from '@react-navigation/native'

export default function ListAllConverses({data}) {
    const navigation = useNavigation()
    
    const redirectToChat = (conversation) => {
        navigation.navigate('chat', conversation={conversation})    
    }

    return (
    <TouchableOpacity style={styles.container} onPress={(e) => redirectToChat(data)}>
        <View style={styles.content}> 
            <Text style={styles.label}>{data.messages[0].user.name}</Text>
            <View>
                <Image style={styles.avatar}
                    source={{uri:'https://www.ecp.org.br/wp-content/uploads/2017/12/default-avatar.png'}}
                /> 
            </View>
        </View>
        
        <Text style={styles.buyAt}>{format(data.createdAt, "dd/mmm, yyyy")}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        backgroundColor:'white',
        borderRadius: 20,
        flex:1,
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
        fontWeight:'bold'
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color:'gray'
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 40
    },
    buyAt: {
        marginLeft:14,
        color: 'white'
    }
})