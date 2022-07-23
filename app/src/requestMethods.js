import axios from 'axios'

const APIURL = 'http://192.168.0.121:5000/api'

const publicRequest = axios.create({
    baseURL: APIURL,
    timeout:1000,
    headers: {
        'Content-Type': 'application/json'
    }
})

export default publicRequest