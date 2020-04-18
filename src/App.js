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
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {Text} from 'react-native'

import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'


import {Provider as StoreProvider} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'
import {configureStore} from './store'
import PushNotification from 'react-native-push-notification'

import CurrentListScreen from './Screens/CurrentList'
import CompletedListScreen from './Screens/CompletedList'
import EveryDayListScreen from './Screens/EveryDayList'

import DetailsScreen from './Screens/Details'
import AddScreen from './Screens/AddScreen'

const TodoStack = createStackNavigator()
const Tab = createBottomTabNavigator()
const {store, persistor} = configureStore()

console.disableYellowBox = true

PushNotification.configure({
  onRegister: function (token) {
    console.log('TOKEN:', token)
  },

  // (required) Called when a remote or local notification is opened or received
  onNotification: function (notification) {
    console.log('NOTIFICATION:', notification)

  },


  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  popInitialNotification: true,
  requestPermissions: true,
})


function HomeTabs() {
  return (
    <Tab.Navigator screenOptions={({route}) => ({
      tabBarIcon: ({focused, color, size}) => {
        let iconName

        if (route.name === 'Current') {
          return <Entypo name={'list'} size={size} color={color}/>
        } else if (route.name === 'Completed') {
          return <AntDesign name={'check'} size={size} color={color}/>
        } else if (route.name === 'EveryDay') {
          return <Entypo name={'hour-glass'} size={size} color={color}/>
        }
      },
      tabBarLabel: () => {
        if (route.name === 'Current') {
          return <Text>жасау</Text>
        } else if (route.name === 'Completed') {
          return <Text>орындалды</Text>
        } else if (route.name === 'EveryDay') {
          return <Text>күнделікті</Text>
        }
      },
    })} tabBarOptions={{
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    }}>
      <Tab.Screen name={'Current'} component={CurrentListScreen}/>
      <Tab.Screen name={'Completed'} component={CompletedListScreen}/>
      <Tab.Screen name={'EveryDay'} component={EveryDayListScreen}/>
    </Tab.Navigator>
  )
}

const App: () => React$Node = () => {
  return (
    <StoreProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <TodoStack.Navigator
            initialRouteName={'Home'}
            screenOptions={{
              headerShown: false,
            }}
          >
            <TodoStack.Screen name={'Home'} component={HomeTabs}/>
            <TodoStack.Screen name={'Add'} component={AddScreen}/>
            <TodoStack.Screen name={'Details'} component={DetailsScreen}/>
          </TodoStack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </StoreProvider>
  )
}

export default App
