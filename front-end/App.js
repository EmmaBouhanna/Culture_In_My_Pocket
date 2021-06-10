import React from 'react';
import { View } from 'react-native';
import Search from './Components/Search.js';
import MyStack, { MyTabs } from './Navigation/Navigation';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux'
import Store from './Store/configureStore'


const CIMP = () => {
  return (
    <Provider store={Store} >
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </Provider>
  )
}
export default CIMP;

