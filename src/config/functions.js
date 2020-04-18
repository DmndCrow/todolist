import PushNotification from 'react-native-push-notification'

export const sendNotification = (message, date) => {
  PushNotification.localNotificationSchedule({
    message: message,
    date: date
  });
}


