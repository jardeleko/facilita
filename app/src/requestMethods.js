import axios from 'axios'
// import AsyncStorage from '@react-native-async-storage/async-storage'

const APIURL = 'https://backend-facilita.herokuapp.com/api'

const publicRequest = axios.create({
    baseURL: APIURL,
    timeout:3000,
    headers: {
        'Content-Type': 'application/json'
    }
})

export default publicRequest