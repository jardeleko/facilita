import {createSlice} from '@reduxjs/toolkit'
import { Alert } from 'react-native'

const userSlice = createSlice({
    name:"user",
    initialState: {
        currentUser: null,
        isFetching:false,
        error:false
    },
    reducers:{
        loginStart:(state) => {
            state.isFetching=true
            state.error=false
        },
        loginSuccess:(state, action) => {
            state.isFetching = false
            state.error = false
            state.currentUser = action.payload
            Alert.alert('Olá, ' + state.currentUser.name)
        },
        loginFailure:(state) => {
            state.isFetchcing = false
            state.error = true        
            Alert.alert('Usuário não encontrado!')
        },
        logOut: (state, action) => {
            state.currentUser = null
            state.isFetching = false
            state.error = false
        }      
    },
})
export const { loginStart, loginSuccess, loginFailure, logOut } = userSlice.actions
export default userSlice.reducer