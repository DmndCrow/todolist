import React from 'react'
import { Text, View, StyleSheet, Animated, TouchableWithoutFeedback } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'


function FloatingButton({style, addItem}){

  return (
    <View style={[styles.container, style]}>
      <TouchableWithoutFeedback>
        <Animated.View style={[styles.button, styles.menu]}>
          <Icon name={'plus'} size={24} color={'#FFF'} onPress={() => addItem()} />
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
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowRadius: 10,
    shadowColor: '#F02A4B',
    shadowOpacity: 0.3,
    shadowOffset: { height: 10 }
  },
  menu: {
    backgroundColor: '#F02A4B'
  }
})

export default FloatingButton;
