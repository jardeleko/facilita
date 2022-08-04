import axios from 'axios'
// import AsyncStorage from '@react-native-async-storage/async-storage'

const APIURL = 'http://192.168.0.243:5000/api'

const publicRequest = axios.create({
    baseURL: APIURL,
    timeout:3000,
    headers: {
        'Content-Type': 'application/json'
    }
})

export default publicRequest