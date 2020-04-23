import React from 'react'
import {TouchableOpacity, Text, StyleSheet} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment'

function DateViewDaily({ date, setDate }) {

  const [mode, setMode] = React.useState('time')
  const [show, setShow] = React.useState(false)

  const onChange = (event, selectedDate) => {
    setShow(Platform.OS === 'ios')
    let newDate = selectedDate || date
    setDate(newDate)
  }

  const showMode = currentMode => {
    setShow(true)
    setMode(currentMode)
  }

  const showDatePicker = () => {
    showMode('time');
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

export default DateViewDaily
