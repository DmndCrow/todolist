import React from 'react'
import {TouchableOpacity, Text, StyleSheet} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'

import moment from 'moment'

function DateView(props) {

  const [mode, setMode] = React.useState('date')
  const [show, setShow] = React.useState(false)

  const onChange = (event, selectedValue) => {
    setShow(Platform.OS === 'ios')
    if (mode == 'date') {
      const currentDate = selectedValue || new Date()
      props.setDate(currentDate)
      setMode('time')
      setShow(Platform.OS !== 'ios') // to show time
    } else {
      const selectedTime = selectedValue || new Date()
      props.setDate(selectedTime)
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
          value={props.date}
          // minimumDate={Date.parse(new Date())}
          display='default'
          mode={mode}
          onChange={onChange}
        />
      )}

      <Text style={styles.hour}>{moment(props.date).format('LT').toUpperCase()}</Text>
      <Text style={styles.month}>{moment(props.date).format('D MMMM YYYY').toUpperCase()}</Text>
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
