import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./userRedux"
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConf = {
    key: 'root',
    version: 1,
    storage: AsyncStorage
}
const persisted = persistReducer(persistConf, userReducer)

export const store = configureStore({
    reducer: persisted,
    middleware:(getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: {
                ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            },        
        }),
})

export const persistor = persistStore(store)