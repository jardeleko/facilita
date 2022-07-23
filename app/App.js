
import { useFonts, Montserrat_400Regular, Montserrat_500Medium, Montserrat_700Bold} from '@expo-google-fonts/montserrat'
import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import AppLoading from 'expo-app-loading'
import Routes from './src/router'
import { Provider } from 'react-native-paper'

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
    <Provider>
      <StatusBar style="light" backgroundColor="#000" translucent={true} />
      <Routes/>
    </Provider>
  );
}
