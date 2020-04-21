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
import {DeviceEventEmitter, Text} from 'react-native'

import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'


import {Provider as StoreProvider} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'
import {configureStore} from './store'
import PushNotification from 'react-native-push-notification'
import PushNotificationAndroid from 'react-native-push-notification'

import CurrentListScreen from './Screens/CurrentList'
import CompletedListScreen from './Screens/CompletedList'
import DailyListScreen from './Screens/Daily'

import DetailsScreen from './Screens/Details'
import AddScreen from './Screens/AddScreen'

const TodoStack = createStackNavigator()
const Tab = createBottomTabNavigator()
const {store, persistor} = configureStore()

// remove warnings
console.disableYellowBox = true

// add notification config
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



// create current, completed and daily tabs
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
      <Tab.Screen name={'EveryDay'} component={DailyListScreen}/>
    </Tab.Navigator>
  )
}

// main component of the app that renders everything
const App: () => React$Node = () => {
  return (
    // store for redux
    <StoreProvider store={store}>
      {/* persistor to keep redux data saved even after update */}
      <PersistGate loading={null} persistor={persistor}>
        {/* create navigation container to move between routes */}
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
