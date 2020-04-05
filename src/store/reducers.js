import { combineReducers } from 'redux'

import { todoReducer } from './Todo/reducers'

export default combineReducers({
  todo: todoReducer
})
