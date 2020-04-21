import React from 'react'
import {StyleSheet, FlatList, ImageBackground, View, Dimensions } from 'react-native'
import { Container } from 'native-base'
import { useSelector, useDispatch } from 'react-redux'
import SwipeView from 'react-native-swipeview'
import moment from 'moment'

import Icon from 'react-native-vector-icons/FontAwesome'

import Item from '../../Components/Item'
import {
  todoListReset, todoListUpdate,
  todoListCurrentDelete, todoListChangeCurrentCompletedByIndex
} from '../../store/Todo/actions'

import FloatingButton from '../../Components/FloatingButton'
import todoImage from '../../assets/img/todo.jpg'
import Title from '../../Components/Title'

import { constants } from '../../config/constants'


function CurrentListScreen({navigation}) {

  const dispatch = useDispatch()
  const redux = useSelector(state => state.todo)

  const leftOpenValue = Dimensions.get('window').width
  const rightOpenValue = -Dimensions.get('window').width

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
    navigation.navigate('Add')
  }

  // remove item from redux store
  const deleteActiveTodo = (index) => {
    dispatch(todoListCurrentDelete(index))
  }

  // move item from current to completed array in redux store
  const completeTodo = (index) => {
    dispatch(todoListChangeCurrentCompletedByIndex(index))
  }

  // navifate to details of a certain todo task with route props
  const openItem = (item) => {
    navigation.navigate('Details', {
      item: item
    })
  }


  return (
    <Container>
      {/* title of the route at the top of the screen */}
      <Title title={constants.title.current + ' - ' + items.length} />
      <ImageBackground source={todoImage} style={styles.backgroundImage}>

        {/*<Button onPress={() => update()}><Text>Update</Text></Button>*/}
        {/*<Button onPress={() => reset()}><Text>Reset</Text></Button>*/}

        <FlatList
          data={items}
          keyExtractor={todo => todo.id}
          enableEmptySections={true}
          ItemSeparatorComponent={() => <View style={styles.separator}/>}
          renderItem={({item, index}) => (
            <SwipeView
              key={item.id}
              {/* render current tasks from redux current list */}
              renderVisibleContent={() => (
                <Item
                  func={openItem}
                  key={item.id}
                  item={{...item}}
                  time={moment(item.date).from(new Date())}
                />
              )}
              {/* on swipe from the left, show icon check */}
              renderLeftView={() => (
                <View style={styles.rowLeft}>
                  <Icon
                    style={styles.icon}
                    name={'check'}
                    size={20}
                  />
                </View>
              )}
              {/* on swipe from the right, show icon x */}
              renderRightView={() => (
                <View style={styles.rowRight}>
                  <Icon
                    style={styles.icon}
                    name={'times'}
                    size={20}
                  />
                </View>
              )}
              leftOpenValue={leftOpenValue}
              rightOpenValue={rightOpenValue}
              swipeDuration={200}
              swipeToOpenPercent={40}
              onSwipedLeft={() => deleteActiveTodo(index)} // on swipe from right, remove item
              onSwipedRight={() => completeTodo(index)} // on swipe from left, move item to completed list
            />
          )}
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
  rowLeft: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: 'green',
  },
  rowRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#FE4D33',
  },
  icon: {
    color: 'white',
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#182129',
  },
})

export default CurrentListScreen
