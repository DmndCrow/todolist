import {
  TODO_LIST_GET_DETAILS,
  TODO_LIST_SET_DETAILS,
  TODO_LIST_RESET,
  TODO_LIST_ADD_ITEM,
  TODO_LIST_DELETE_CURRENT_ITEM,
  TODO_LIST_CHANGE_CURRENT_COMPLETED_BY_INDEX,
  TODO_LIST_CHANGE_CURRENT_COMPLETED_BY_TITLE,
  TODO_LIST_DELETE_COMPLETED_ITEM,
  TODO_LIST_DELETE_DAILY_ITEM,
} from '../types'

import moment from 'moment'

import {removeNotication} from '../../config/functions'

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
          date: action.payload.date,
          description: action.payload.description,
          notificationId: action.payload.notificationId,
          timeoutId: action.payload.timeoutId
        }, ...state.current]
      }
    }

    case TODO_LIST_DELETE_CURRENT_ITEM: {
      let temp = state.current

      removeNotication(temp[action.payload])

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

    case TODO_LIST_CHANGE_CURRENT_COMPLETED_BY_INDEX: {

      let item = state.current[action.payload]
      let temp = state.current
      temp.splice(action.payload, 1)

      return {
        ...state,
        current: temp,
        completed: [item, ...state.completed]
      }
    }

    case TODO_LIST_CHANGE_CURRENT_COMPLETED_BY_TITLE: {

      let index = state.current.findIndex(p => {
        return p.title === action.payload.title && p.date === action.payload.date
      })

      let item = index !== -1 ? state.current[index] : null
      let temp = state.current

      if (index != -1){
        temp.splice(action.payload, 1)
      }

      return {
        ...state,
        current: temp,
        completed: index !== -1 ? [item, ...state.completed] : state.completed
      }
    }

    case TODO_LIST_GET_DETAILS: {
      return state
    }

    case TODO_LIST_SET_DETAILS: {
      return {
        ...state,
        current: [
          {
            id: 1,
            title: 'Жоба жасау',
            description: 'React Native көмегімен қосымша жасау',
            date: moment([2020, 5, 5]),
            notificationId: 1,
            timeoutId: 1
          },
          {
            id: 2,
            title: 'Сыйлық сатып алу',
            description: 'This is Second note',
            date: moment([2020, 10, 7]),
            notificationId: 2,
            timeoutId: 2
          },
          {
            id: 3,
            title: 'Android Studio қосымшасын жүктеу',
            description: 'This is Third note',
            date: moment([2020, 6, 5]),
            notificationId: 3,
            timeoutId: 3
          },
        ],
        completed: [

        ],
        daily: [

        ]
      }
    }

    case TODO_LIST_RESET: {

      for (const item in state.current){
        removeNotication(item)
      }

      return initialState
    }

    default: {
      return state;
    }
  }
}


