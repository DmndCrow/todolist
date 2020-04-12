import {TODO_LIST_GET_DETAILS, TODO_LIST_SET_DETAILS, TODO_LIST_RESET, TODO_LIST_ADD_ITEM} from '../types'

const initialState = {
  items: []
}

export const todoReducer = (state = initialState, action) => {
  switch (action.type) {

    case TODO_LIST_ADD_ITEM: {
      return {
        ...state,
        items: [...state.items, {
          name: action.payload.name,
          description: action.payload.description
        }]
      }
    }

    case TODO_LIST_GET_DETAILS: {
      return state
    }

    case TODO_LIST_SET_DETAILS: {
      return {
        ...state,
        items: [
          {name: 'First', description: 'This is First note'},
          {name: 'Second', description: 'This is Second note'},
          {name: 'Third', description: 'This is Third note'},
          {name: 'Fourth', description: 'This is Fourth note'},
          {name: 'Fifth', description: 'This is Fifth note'},
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


