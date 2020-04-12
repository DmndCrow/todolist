import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

function Panel({ style }){

  return(
    <View style={[styles.container, style]}>
      <Text>my panel</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
})

export default Panel;
