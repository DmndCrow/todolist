import React, {Component} from 'react'
import {StyleSheet, View, TouchableOpacity, Text, TextInput} from 'react-native'


function TimerView({ hours, setHours, minutes, setMinutes }) {

  const onChange = (text, type) => {
    if (type === 'hours'){
      if (text.match(/^[0-9]+$/)) {
        let res = Math.min(parseInt(text), 23)
        setHours(res.toString())
      }
      else setHours('')
    }else{
      if (text.match(/^[0-9]+$/)){
        let res = Math.min(parseInt(text), 59)
        setMinutes(res.toString())
      }
      else setMinutes('')
    }
  }

  return (
    <TouchableOpacity style={styles.container}>
      <TextInput
        style={[styles.input, { height: 35, borderColor: 'gray', borderWidth: 0.5 }]}
        onChangeText={text => onChange(text, 'hours')}
        value={hours}
        keyboardType={'phone-pad'}
        placeholder={'00h'}
      />
      <Text> : </Text>
      <TextInput
        style={[styles.input, { height: 35, borderColor: 'gray', borderWidth: 0.5 }]}
        onChangeText={text => onChange(text, 'minutes')}
        value={minutes}
        keyboardType={'phone-pad'}
        placeholder={'00m'}
      />
    </TouchableOpacity>
  )

}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  input: {
    color: 'black',
    fontSize: 12,
    fontWeight: '400',
  },
})

export default TimerView
