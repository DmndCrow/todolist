import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button } from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome'


function Item({item, time, func}) {

  return (
    <Button style={styles.row} onPress={() => func(item)}>
      <View style={styles.timeline}>
        <View style={styles.timelineVerticalLink}/>
        <Icon
          style={styles.icon}
          name={'circle'}
          size={6}
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.text}>{item.title}</Text>
        <Text style={styles.time}>{time}</Text>
      </View>
    </Button>
  )
}

const ROW_HEIGHT = 70

const styles = StyleSheet.create({
  row: {
    backgroundColor: '#313842',
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: ROW_HEIGHT,
  },
  timeline: {
    height: ROW_HEIGHT,
    width: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timelineVerticalLink: {
    height: ROW_HEIGHT,
    width: 1,
    backgroundColor: '#526373',
    justifyContent: 'center',
  },
  icon: {
    color: '#e7d629',
    backgroundColor: 'transparent',
    position: 'absolute',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 10,
  },
  text: {
    fontSize: 17,
    fontWeight: '500',
    color: 'white',
  },
  time: {
    fontSize: 10,
    fontWeight: '400',
    color: '#828B7B',
  },
})


export default Item
