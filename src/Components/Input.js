import React from 'react'
import { Dimensions, TextInput, StyleSheet } from 'react-native'

function Input(props) {

  return (
    <TextInput
      style={styles.input}
      value={props.name}
      placeholder={props.placeholder}
      placeholderTextColor={props.placeholderTextColor}
      selectionColor={props.selectionColor}
      underlineColorAndroid={props.underlineColorAndroid}
      maxLength={props.maxLength}
      clearTextOnFocus={props.clearTextOnFocus}
      onChangeText={text => props.setName(text)}
    />
  )
}

const styles = StyleSheet.create({
  input: {
    padding: 12,
    backgroundColor: '#526373',
    color: 'white',
    fontSize: 15,
    borderRadius: 3,
    width: Dimensions.get('window').width * 0.7,
  }
})

export default Input
