import React from 'react'
import { Container, Header, Content, List, ListItem, Text } from 'native-base';

function Item({ item, navigation }) {

  const handleOnPress = () => {
    navigation.navigate('Details', {
      item: item
    })
  }

  return (
    <ListItem onPress={() => handleOnPress()}>
      <Text>{item.name}</Text>
    </ListItem>
  )
}

export default Item
