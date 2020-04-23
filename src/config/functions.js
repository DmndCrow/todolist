import PushNotification from 'react-native-push-notification'
import BackgroundTimer from 'react-native-background-timer'
import {
  todoListAddItem,
  todoListChangeCurrentCompletedByTitle,
} from '../store/Todo/actions'

export const sendNotification = (dispatch, message, date) => {

  // generate unique id using date and 32 bits
  const notificationId = (date.getTime() & 0xffffffff).toString()

  console.log('will receive notification at ' + date)

  // send notification with given message at the given date
  PushNotification.localNotificationSchedule({
    id: notificationId,
    message: message,
    date: date
  })

  // move task from current to completed list at the given date
  const timeoutId = BackgroundTimer.setTimeout(() => {
    console.log('got at ' + new Date() + ' with title ' + message)
    dispatch(todoListChangeCurrentCompletedByTitle({
      title: message,
      date: date
    }))
  }, (date.getTime() - new Date().getTime()))

  return {
    notificationId: notificationId,
    timeoutId: timeoutId
  }
}

// remove notification and cancel move to completed list
export const removeNotication = (item) => {

  PushNotification.cancelLocalNotifications({
    id: item.notificationId
  })

  BackgroundTimer.clearTimeout(item.timeoutId)
}

// get index and list type, to which opened task belongs
export const getType = (data, item) => {
  let currentIndex = data.current.findIndex(t => {
    return t.title === item.title && t.date === item.date && t.description === item.description
  })
  let completedIndex = data.completed.findIndex(t => {
    return t.title === item.title && t.date === item.date && t.description === item.description
  })
  let dailyIndex = data.daily.findIndex(t => {
    return t.title === item.title && t.date === item.date && t.description === item.description
  })

  if (currentIndex !== -1) return {type: 'current', index: currentIndex}
  if (completedIndex !== -1) return {type: 'completed', index: completedIndex}
  if (dailyIndex !== -1) return {type: 'daily', index: dailyIndex}
}

export const handleSaveCurrentItem = (name, date, description) => {
  return (dispatch) => {
    // send notification at the given time
    const notificationIds = sendNotification(dispatch, name, date)

    // add item to the store
    dispatch(todoListAddItem({
      title: name,
      description: description,
      date: date,
      notificationId: notificationIds.notificationId,
      timeoutId: notificationIds.timeoutId
    }))
  }
}

export const handleSaveDailyItem = (name, date, description) => {
  return (dispatch) => {

  }
}
