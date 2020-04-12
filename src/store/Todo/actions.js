import {TODO_LIST_ADD_ITEM, TODO_LIST_RESET, TODO_LIST_SET_DETAILS} from '../types'

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
