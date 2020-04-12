/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react'
import 'react-native-gesture-handler'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {createDrawerNavigator} from '@react-navigation/drawer'

import {Provider as StoreProvider} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'
import {configureStore} from './store'

import ListScreen from './Screens/List'
import DetailsScreen from './Screens/Details'
import AddScreen from './Screens/AddScreen'

const TodoStack = createStackNavigator()
const {store, persistor} = configureStore()

const App: () => React$Node = () => {
  return (
    <StoreProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <TodoStack.Navigator initialRouteName={'Home'}>
            <TodoStack.Screen name={'Home'} component={ListScreen} />
            <TodoStack.Screen name={'Add'} component={AddScreen} />
            <TodoStack.Screen name={'Details'} component={DetailsScreen} />
          </TodoStack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </StoreProvider>
  )
}

export default App
