import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Container, Content, List, Button, Text} from 'native-base'
import {useSelector, useDispatch} from 'react-redux'

import Item from './Item'
import {todoListReset, todoListUpdate} from '../../store/Todo/actions'
import FloatingButton from '../../Components/FloatingButton'

function ListScreen({navigation}) {

  const dispatch = useDispatch()
  const reduxItems = useSelector(state => state.todo.items)

  const [items, setItems] = React.useState([])


  React.useEffect(() => {
    setItems(reduxItems)
  }, [reduxItems])

  const update = () => {
    dispatch(todoListUpdate())
  }

  const reset = () => {
    dispatch(todoListReset())
  }

  const handleAddItem = () => {
    navigation.navigate('Add')
  }

  return (
    <Container>
      <Content>
        <Button onPress={() => update()}><Text>Update</Text></Button>
        <Button onPress={() => reset()}><Text>Reset</Text></Button>
        <List>
          {items.map((item, i) => {
            return <Item key={i} item={item} navigation={navigation} />
          })}
        </List>
      </Content>
      <FloatingButton style={{ bottom: 100, marginLeft: '60%' }} addItem={handleAddItem} />
    </Container>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
})

export default ListScreen
