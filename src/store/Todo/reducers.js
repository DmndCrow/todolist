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
  TODO_LIST_UPDATE_CURRENT,
  TODO_LIST_UPDATE_COMPLETED,
  TODO_LIST_CHANGE_COMPLETED_CURRENT_BY_INDEX,
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
        current: [action.payload, ...state.current] // put new task at the top of list
      }
    }

    case TODO_LIST_DELETE_CURRENT_ITEM: {
      let temp = state.current

      removeNotication(temp[action.payload]) // remove all notifications related to given task

      temp.splice(action.payload, 1)

      return {
        ...state,
        current: temp
      }
    }

    // same as above, but for completed list
    case TODO_LIST_DELETE_COMPLETED_ITEM: {
      let temp = state.completed
      temp.splice(action.payload, 1)
      return {
        ...state,
        completed: temp
      }
    }

    // same as above, but for daily list
    case TODO_LIST_DELETE_DAILY_ITEM: {
      let temp = state.daily
      temp.splice(action.payload, 1)
      return {
        ...state,
        daily: temp
      }
    }

    // move form current to completed list, by using index of the task
    case TODO_LIST_CHANGE_CURRENT_COMPLETED_BY_INDEX: {

      let item = state.current[action.payload]

      removeNotication(item)

      let temp = state.current
      temp.splice(action.payload, 1)

      return {
        ...state,
        current: temp,
        completed: [{
          ...item,
          date: null
        }, ...state.completed]
      }
    }

    // same as above, but initially need to find index of the task
    case TODO_LIST_CHANGE_CURRENT_COMPLETED_BY_TITLE: {

      let index = state.current.findIndex(p => {
        return p.title === action.payload.title && p.date === action.payload.date
      })

      let item = index !== -1 ? state.current[index] : null
      item.date = null
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

    case TODO_LIST_CHANGE_COMPLETED_CURRENT_BY_INDEX: {
      let temp = state.completed
      temp.splice(action.payload.index, 1)

      return {
        ...state,
        completed: temp,
        current: [action.payload.item, ...state.completed]
      }
    }

    // update current list by removing its initial data
    // and push update at the top of the list
    case TODO_LIST_UPDATE_CURRENT: {
      let temp = state.current
      temp.splice(action.payload.index, 1)

      return {
        ...state,
        current: [action.payload.item, ...temp]
      }
    }

    case TODO_LIST_UPDATE_COMPLETED: {
      let temp = state.completed
      temp.splice(action.payload.index, 1)

      return {
        ...state,
        completed: [action.payload.item, ...temp]
      }
    }

    case TODO_LIST_GET_DETAILS: {
      return state
    }

    // random data
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

    // reset all items
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


