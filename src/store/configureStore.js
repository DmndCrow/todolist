import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage'

import rootReducer from "./reducers";

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default function configureStore() {
  let store = createStore(persistedReducer, applyMiddleware(thunk, logger))
  let persistor = persistStore(store)
  return { store, persistor }
}
