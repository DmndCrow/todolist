import { combineReducers } from 'redux'

import { todoReducer } from './Todo/reducers'

// join all reducers
export default combineReducers({
  todo: todoReducer
})
