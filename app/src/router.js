
import CustomNavigationBar from './components/Navbar'
import {  NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { useSelector } from 'react-redux'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Passwd from './pages/Passwd'
import Verify from './pages/Verify'
import Detail from './pages/Detail'
import Diarias from './pages/Diarias'
import Mensal from './pages/Mensal'
import Create from './pages/Create'
import Posts from './pages/Posts'
import Edit from './pages/Edit'
import Chat from './pages/Chat'
import List from './pages/List'
import User from './pages/User'
import React from 'react'

const Stack = createStackNavigator()

function Routes(){
  const currentUser = useSelector((state) => state.currentUser)
  return(
  <>
    {currentUser
    ?
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
      <Stack.Screen name="posts" component={Posts} /> 
      <Stack.Screen name="chat" component={Chat} />                       
      <Stack.Screen name="edit" component={Edit} />       
      <Stack.Screen name="list" component={List} />       
      <Stack.Screen name="user" component={User} />       
    </Stack.Navigator>
    </NavigationContainer>
    :
    <NavigationContainer>
      <Stack.Navigator initialRouteName="login" component={Login} screenOptions={{title:'Facilita Imóveis'}}> 
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="register" component={Register} />      
        <Stack.Screen name="forgot" component={Passwd} />       
        <Stack.Screen name="verify" component={Verify} />       
      </Stack.Navigator>
    </NavigationContainer>
    }
  </>)}

export default Routes

 