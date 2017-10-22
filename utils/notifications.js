import { Notifications } from 'expo'

function createNotification () {
  return {
    title: 'Hello from UdaciCards!',
    body: "Don't forget to study your cards.",
    priority: 'high',
    android: {
      sound: true,
      vibrate: true
    }
  }
}

function createSchedule () {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  tomorrow.setHours(18)
  tomorrow.setMinutes(0)
  tomorrow.setSeconds(0)

  return {
    time: tomorrow,
    repeat: 'day'
  }
}

export function cancelNotifications () {
  Notifications.cancelAllScheduledNotificationsAsync()
}

export function setNotification () {
  cancelNotifications()

  Notifications.scheduleLocalNotificationAsync(
    createNotification(),
    createSchedule()
  )
}
