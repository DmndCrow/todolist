import React from 'react'
import { StyleSheet, View } from 'react-native';
import { Container, Content, List, Button, Text } from 'native-base';
import { useSelector, useDispatch } from 'react-redux'
import ActionButton from 'react-native-action-button'
import Icon from 'react-native-vector-icons/Ionicons';

import Item from './Item'
import {todoListReset, todoListUpdate} from '../../store/Todo/actions'

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

  return (
    <Container>
      <Content>
        {/*<Button onPress={() => update()}><Text>Update</Text></Button>*/}
        {/*<Button onPress={() => reset()}><Text>Reset</Text></Button>*/}
        <List>
          {items.map((item, i) => {
            return <Item key={i} item={item} navigation={navigation} />
          })}
        </List>
        <View style={{flex:1, backgroundColor: '#f3f3f3'}}>
          {/* Rest of the app comes ABOVE the action button component !*/}
          <ActionButton buttonColor="rgba(231,76,60,1)">
            <ActionButton.Item buttonColor='#9b59b6' title="New Task" onPress={() => console.log("notes tapped!")}>
              <Icon name="md-create" style={styles.actionButtonIcon} />
            </ActionButton.Item>
            <ActionButton.Item buttonColor='#3498db' title="Notifications" onPress={() => {}}>
              <Icon name="md-notifications-off" style={styles.actionButtonIcon} />
            </ActionButton.Item>
            <ActionButton.Item buttonColor='#1abc9c' title="All Tasks" onPress={() => {}}>
              <Icon name="md-done-all" style={styles.actionButtonIcon} />
            </ActionButton.Item>
          </ActionButton>
        </View>
      </Content>
    </Container>
  )
}

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});

export default ListScreen
