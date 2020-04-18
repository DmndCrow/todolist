import React from 'react'
import {TouchableOpacity, Text, StyleSheet} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment'

function DateView({ date, setDate }) {

  const [mode, setMode] = React.useState('date')
  const [show, setShow] = React.useState(false)

  const onChange = (event, selectedDate) => {
    setShow(Platform.OS === 'ios')
    let newDate = selectedDate || date
    setDate(newDate)

    if (mode == 'date') {
      setMode('time')
      setShow(Platform.OS !== 'ios') // to show time
    } else {
      setShow(Platform.OS === 'ios') // to hide back the picker
      setMode('date') // defaulting to date for next open
    }
  }

  const showMode = currentMode => {
    setShow(true)
    setMode(currentMode)
  }

  const showDatePicker = () => {
    showMode('date');
  }

  return (
    <TouchableOpacity style={styles.container} onPress={() => showDatePicker()}>

      {show && (
        <DateTimePicker
          value={date}
          minimumDate={Date.parse(new Date())}
          display='default'
          mode={mode}
          onChange={onChange}
        />
      )}

      <Text style={styles.hour}>{moment(date).format('LT').toUpperCase()}</Text>
      <Text style={styles.month}>{moment(date).format('D MMMM YYYY').toUpperCase()}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hour: {
    color: 'black',
    fontSize: 17,
    fontWeight: '600',
  },
  month: {
    color: 'black',
    fontSize: 9,
    fontWeight: '400',
  },
})

export default DateView
