
import CustomNavigationBar from './components/Navbar'
import {  NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Home from './pages/Home'
import Detail from './pages/Detail'
import Create from './pages/Create'
import Diarias from './pages/Diarias'
import Mensal from './pages/Mensal'
import React from 'react'
import Login from './pages/Login'
import Register from './pages/Register'

const Stack = createStackNavigator()

function Routes(){
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="home"
        screenOptions={{
          header: (props) => <CustomNavigationBar {...props} />,
        }}
      > 
        <Stack.Screen name="home" component={Home} />
        <Stack.Screen name="detail" component={Detail} />
        <Stack.Screen name="create" component={Create} />
        <Stack.Screen name="diarias" component={Diarias} />
        <Stack.Screen name="mensal" component={Mensal} />
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="register" component={Register} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes