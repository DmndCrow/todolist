import {
  TODO_LIST_GET_DETAILS,
  TODO_LIST_SET_DETAILS,
  TODO_LIST_RESET,
  TODO_LIST_ADD_ITEM,
  TODO_LIST_DELETE_CURRENT_ITEM,
  TODO_LIST_CHANGE_CURRENT_COMPLETED,
  TODO_LIST_DELETE_COMPLETED_ITEM,
  TODO_LIST_DELETE_DAILY_ITEM
} from '../types'

const initialState = {
  current: [],
  completed: [],
  daily: []
}

export const todoReducer = (state = initialState, action) => {
  switch (action.type) {

    case TODO_LIST_ADD_ITEM: {
      return {
        ...state,
        current: [{
          title: action.payload.title,
          description: action.payload.description
        }, ...state.current]
      }
    }

    case TODO_LIST_DELETE_CURRENT_ITEM: {
      let temp = state.current
      temp.splice(action.payload, 1)
      return {
        ...state,
        current: temp
      }
    }

    case TODO_LIST_DELETE_COMPLETED_ITEM: {
      let temp = state.completed
      temp.splice(action.payload, 1)
      return {
        ...state,
        completed: temp
      }
    }

    case TODO_LIST_DELETE_DAILY_ITEM: {
      let temp = state.daily
      temp.splice(action.payload, 1)
      return {
        ...state,
        daily: temp
      }
    }

    case TODO_LIST_CHANGE_CURRENT_COMPLETED: {
      let item = state.current[action.payload]
      let temp = state.current
      temp.splice(action.payload, 1)

      return {
        ...state,
        current: temp,
        completed: [item, ...state.completed]
      }
    }

    case TODO_LIST_GET_DETAILS: {
      return state
    }

    case TODO_LIST_SET_DETAILS: {
      return {
        ...state,
        current: [
          {id: 1, title: 'Жоба жасау', description: 'React Native көмегімен қосымша жасау'},
          {id: 2, title: 'Сыйлық сатып алу', description: 'This is Second note'},
          {id: 3, title: 'Android Studio қосымшасын жүктеу', description: 'This is Third note'},
        ],
        completed: [

        ],
        daily: [

        ]
      }
    }

    case TODO_LIST_RESET: {
      return initialState
    }

    default: {
      return state;
    }
  }
}


