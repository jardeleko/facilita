import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD--smTot1sfrqy-bQk4-DltzGRZz1i-3g",
  authDomain: "facilitastorage.firebaseapp.com",
  projectId: "facilitastorage",
  storageBucket: "facilitastorage.appspot.com",
  messagingSenderId: "347880960520",
  appId: "1:347880960520:web:e842e502afa6909bd1d7bd",
  measurementId: "G-L3DPK8GNZ5"
}

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig)
}



export { firebase }