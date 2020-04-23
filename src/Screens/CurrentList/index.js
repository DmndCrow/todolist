import React from 'react'
import {StyleSheet, ImageBackground } from 'react-native'
import { Button, Text } from 'native-base'
import { Container } from 'native-base'
import { useSelector, useDispatch } from 'react-redux'

import {
  todoListReset,
  todoListUpdate,
  todoListCurrentDelete,
  todoListChangeCurrentCompletedByIndex
} from '../../store/Todo/actions'

import FloatingButton from '../../Components/FloatingButton'
import todoImage from '../../assets/img/todo.jpg'
import Title from '../../Components/Title'

import { constants } from '../../config/constants'
import ListView from '../../Components/ListView'


function CurrentListScreen({navigation}) {

  const dispatch = useDispatch()
  const redux = useSelector(state => state.todo)

  const [items, setItems] = React.useState([])

  // run after each redux store update
  React.useEffect(() => {
    setItems(redux.current) // get todo tasks from redux store

    navigation.setOptions({ headerShown: false }) // remove header
  }, [redux])

  // run function from redux actions that loads initial data for testing
  const update = () => {
    dispatch(todoListUpdate())
  }

  // run function from redux actions that removes all data from redux store
  const reset = () => {
    dispatch(todoListReset())
  }

  // navigate to 'Add' route
  const handleAddItem = () => {
    navigation.navigate('Add', {
      route: 'current'
    })
  }

  // remove item from redux store
  const deleteAction = (index) => {
    dispatch(todoListCurrentDelete(index))
  }

  // move item from current to completed array in redux store
  const completeAction = (index) => {
    dispatch(todoListChangeCurrentCompletedByIndex(index))
  }

  // navifate to details of a certain task with route props
  const openDetails = (item) => {
    navigation.navigate('Details', {
      item: item
    })
  }


  return (
    <Container>
      {/* title of the route at the top of the screen */}
      <Title title={constants.title.current + ' - ' + items.length} />
      <ImageBackground source={todoImage} style={styles.backgroundImage}>

        <Button onPress={() => update()}><Text>Update</Text></Button>
        <Button onPress={() => reset()}><Text>Reset</Text></Button>

        <ListView
          items={items}
          openDetails={openDetails}
          deleteAction={deleteAction}
          completeAction={completeAction}
        />

        {/* Component that renders + button, to add new task */}
        <FloatingButton style={{bottom: 100, marginLeft: '65%'}} addItem={handleAddItem}/>
      </ImageBackground>
    </Container>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
  },

})

export default CurrentListScreen
