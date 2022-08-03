import { useFonts, Montserrat_400Regular, Montserrat_500Medium, Montserrat_700Bold} from '@expo-google-fonts/montserrat'
import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import AppLoading from 'expo-app-loading'
import Routes from './src/router'
import { Provider } from 'react-native-paper'
import {Provider as ProviderRedux} from 'react-redux'
import { persistor, store } from './src/redux/store'
import { PersistGate } from 'redux-persist/integration/react'

export default function App() {
  let [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_700Bold
  });

  if(!fontsLoaded){
    return <AppLoading/>;
  }

  return (
    <ProviderRedux store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Provider >
          <StatusBar style="light" backgroundColor="#000" translucent={true} />
          <Routes/>
        </Provider>
      </PersistGate>
    </ProviderRedux>
  );
}
