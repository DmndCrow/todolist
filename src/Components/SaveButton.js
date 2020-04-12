import React from 'react'
import {View, StyleSheet, Animated, TouchableWithoutFeedback} from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'

function SaveButton({style, saveItem}) {

  return (
    <View style={[styles.container, style]}>
      <TouchableWithoutFeedback>
        <Animated.View style={styles.button}>
          <Icon
            name={'check'}
            onPress={() => saveItem()}
            size={24}
          />
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  button: {

  }
})

export default SaveButton
