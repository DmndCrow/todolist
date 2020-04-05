import { TODO_LIST_GET_DETAILS, TODO_LIST_SET_DETAILS, TODO_LIST_RESET } from '../types'

const initialState = {
  items: []
}

export const todoReducer = (state = initialState, action) => {
  switch (action.type) {

    case TODO_LIST_GET_DETAILS: {
      return state
    }

    case TODO_LIST_SET_DETAILS: {
      return {
        ...state,
        items: [
          {name: 'First', text: 'This is First note'},
          {name: 'Second', text: 'This is Second note'},
          {name: 'Third', text: 'This is Third note'},
          {name: 'Fourth', text: 'This is Fourth note'},
          {name: 'Fifth', text: 'This is Fifth note'},
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


