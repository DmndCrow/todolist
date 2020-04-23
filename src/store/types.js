// todoReducer types
export const TODO_LIST_ADD_ITEM = 'TODO_LIST_ADD_ITEM' // add item to list

export const TODO_LIST_GET_DETAILS = 'TODO_LIST_GET_DETAILS' // get list
export const TODO_LIST_SET_DETAILS = 'TODO_LIST_SET_DETAILS' // update list
export const TODO_LIST_RESET = 'TODO_LIST_RESET' // reset list

export const TODO_LIST_UPDATE_CURRENT = 'TODO_LIST_UPDATE_CURRENT' // update item from current list
export const TODO_LIST_DELETE_CURRENT_ITEM = 'TODO_LIST_DELETE_CURRENT_ITEM' // delete item from array 'current'
export const TODO_LIST_CHANGE_CURRENT_COMPLETED_BY_INDEX = 'TODO_LIST_CHANGE_CURRENT_COMPLETED_BY_INDEX' // move item from one list to another
export const TODO_LIST_CHANGE_CURRENT_COMPLETED_BY_TITLE = 'TODO_LIST_CHANGE_CURRENT_COMPLETED_BY_TITLE'

export const TODO_LIST_UPDATE_COMPLETED = 'TODO_LIST_UPDATE_COMPLETED' // update item from completed list
export const TODO_LIST_DELETE_COMPLETED_ITEM = 'TODO_LIST_DELETE_COMPLETED_ITEM' // delete item from array 'competed'
export const TODO_LIST_CHANGE_COMPLETED_CURRENT_BY_INDEX = 'TODO_LIST_CHANGE_COMPLETED_CURRENT_BY_INDEX' // move from completed to current

export const TODO_LIST_DELETE_DAILY_ITEM = 'TODO_LIST_DELETE_DAILY_ITEM' // delete item from array 'competed' based on index
