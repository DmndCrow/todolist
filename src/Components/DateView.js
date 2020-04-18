import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

import moment from 'moment'

function DateView() {

  const [day, setDay] = React.useState(moment().format('ddd'))
  const [date, setDate] = React.useState(moment().format('D'))
  const [month, setMonth] = React.useState(moment().format('MMMM'))

  return (
    <View style={styles.container}>
      <Text style={styles.day}>{day.toString().toUpperCase()}</Text>
      <Text style={styles.date}>{date}</Text>
      <Text style={styles.month}>{month.toString().toUpperCase()}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  day: {
    color: 'white',
    fontSize: 10,
    fontWeight: '400',
  },
  date: {
    color: 'white',
    fontSize: 30,
    fontWeight: '600',
  },
  month: {
    color: 'white',
    fontSize: 8,
    fontWeight: '400',
  },
})

export default DateView
