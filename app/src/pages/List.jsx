import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList,
  RefreshControl
} from 'react-native'
import { useCallback, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import publicRequest from '../requestMethods'
import { useSelector } from 'react-redux'
import ListAllConverses from '../components/ListAllConverses'

export default function Home() {
  const [data, setData] = useState({})
  const [refreshing, setRefreshing] = useState(false)
  const history = useNavigation()
  const currentUser = useSelector((state) => state.currentUser)

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false)
      history.navigate('list')
    }, 1000)
  }, [])
  
  useEffect(() => {
    const getData = async () => {
      await publicRequest.get(`/converse/findbyus/${currentUser._id}`).then((response) => {
        const filters = response.data.map((item) => item.messages)
        console.log('teste')
        console.log(filters)
        setData(response.data)
        console.log(response.data)
      }).catch((err) => {
        console.log(err)
      })
    }
    getData()
    if(refreshing) getData()
  },[currentUser, refreshing])

  return (
    <View style={styles.container}>
        <Text style={styles.title}> Últimas notificações </Text>
        <FlatList 
          style={styles.list}
          data={data}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          keyExtractor={(item) => String(item._id)}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => <ListAllConverses data={item} />}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: 'black',
    backgroundColor: 'white'
  },
  title: {
    fontSize:14,
    color: 'black',
    fontWeight:'bold',
    margin:14,
  }, 
  list: {
    marginLeft:20,
    marginStart: 14,
    marginEnd: 14,
  }
});