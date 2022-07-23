import React from 'react';
import {  NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Home from './pages/Home'
import Detail from './pages/Detail'
import Create from './pages/Create'
import CustomNavigationBar from './components/Navbar'

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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes