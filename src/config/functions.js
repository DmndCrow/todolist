import PushNotification from 'react-native-push-notification'
import BackgroundTimer from 'react-native-background-timer'
import {todoListChangeCurrentCompletedByTitle} from '../store/Todo/actions'

export const sendNotification = (dispatch, message, date) => {

  // generate unique id using date and 32 bits
  const notificationId = (date.getTime() & 0xffffffff).toString()

  PushNotification.localNotificationSchedule({
    id: notificationId,
    message: message,
    date: date
  })

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

export const removeNotication = (item) => {

  PushNotification.cancelLocalNotifications({
    id: item.notificationId
  })

  BackgroundTimer.clearTimeout(item.timeoutId)
}

