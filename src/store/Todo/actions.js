import {
  TODO_LIST_ADD_ITEM,
  TODO_LIST_RESET,
  TODO_LIST_SET_DETAILS,
  TODO_LIST_DELETE_ITEM,
  TODO_LIST_CHANGE_CURRENT_COMPLETED
} from '../types'

export const todoListUpdate = () => ({
  type: TODO_LIST_SET_DETAILS
})

export const todoListReset = () => ({
  type: TODO_LIST_RESET
})

export const todoListAddItem = (data) => ({
  type: TODO_LIST_ADD_ITEM,
  payload: data
})

export const todoListDelete = (index) => ({
  type: TODO_LIST_DELETE_ITEM,
  payload: index
})

export const todoListChangeCurrentCompleted = (index) => ({
  type: TODO_LIST_CHANGE_CURRENT_COMPLETED,
  payload: index
})
