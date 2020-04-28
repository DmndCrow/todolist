import PushNotification from 'react-native-push-notification'
import BackgroundTimer from 'react-native-background-timer'
import {
  todoListAddItem,
  todoListChangeCurrentCompletedByTitle, todoListUpdateDaily,
} from '../store/Todo/actions'
import moment from 'moment'

export const sendNotification = (dispatch, message, date) => {

  // generate unique id using date and 32 bits
  const notificationId = (date.getTime() & 0xffffffff).toString()

  console.log('will receive notification at ' + date)

  // send notification with given message at the given date
  PushNotification.localNotificationSchedule({
    id: notificationId,
    message: message,
    date: date,
  })

  // move task from current to completed list at the given date
  const timeoutId = BackgroundTimer.setTimeout(() => {
    console.log('got at ' + new Date() + ' with title ' + message)
    dispatch(todoListChangeCurrentCompletedByTitle({
      title: message,
      date: date,
    }))
  }, (date.getTime() - new Date().getTime()))

  return {
    notificationId: notificationId,
    timeoutId: timeoutId,
  }
}

// remove notification and cancel move to completed list
export const removeNotication = (item) => {
  if (item.notificationId) {
    try {
      PushNotification.cancelLocalNotifications({
        id: item.notificationId,
      })
    } catch (err) {
      console.log(err)
    }
  }

  if (item.timeoutId) {
    try {
      BackgroundTimer.clearTimeout(item.timeoutId)
    } catch (err) {
      console.log(err)
    }
  }

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

export const handleSaveCurrentItem = (name, date, description, changedDate) => {
  return (dispatch) => {
    // send notification at the given time
    let notificationIds = {
      notificationId: null, timeoutId: null,
    }
    if (changedDate) notificationIds = sendNotification(dispatch, name, date)

    // add item to the store
    dispatch(todoListAddItem({
      title: name,
      description: description,
      date: date,
      notificationId: notificationIds.notificationId,
      timeoutId: notificationIds.timeoutId,
    }))
  }
}

export const handleSaveDailyItem = (message, date) => {
  return (dispatch) => {
    const notificationId = (date.getTime() & 0xffffffff).toString()

    // let tomorrow = date.getTime() < new Date().getTime() ? new Date(moment(date).add(2, 'minutes')) : date

    PushNotification.localNotificationSchedule({
      id: notificationId,
      message: message,
      repeatType: 'time',
      repeatTime: 24 * 60 * 60 * 1000,
      date: new Date(date.getTime() + 24 * 60 * 60 * 1000),
    })

    return {
      notificationId: notificationId,
      timeoutId: null,
    }
  }
}

export const pushNewNotification = (message, date = null) => {
  console.log(message, date ? new Date(date) : new Date())

  PushNotification.localNotificationSchedule({
    message: message,
    date: date ? new Date(date) : new Date(),
  })
}
