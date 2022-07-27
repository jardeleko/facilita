import axios from 'axios'

const APIURL = 'http://192.168.0.121:5000/api'

// const user = JSON.parse(localStorage.getItem("persist:root"))?.user
// const currentUser = user && JSON.parse(user)?.currentUser
// const TOKEN = currentUser?.accessTk

// export const userRequest = axios.create({
//     baseURL: BASE_URL,
//     headers: {token: `Bearer ${TOKEN}`}
//})

const publicRequest = axios.create({
    baseURL: APIURL,
    timeout:1000,
    headers: {
        'Content-Type': 'application/json'
    }
})

export default publicRequest