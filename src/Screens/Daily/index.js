import React from 'react'
import {StyleSheet, FlatList, ImageBackground, View, Dimensions} from 'react-native'
import { Container } from 'native-base'
import { useSelector, useDispatch } from 'react-redux'
import SwipeView from 'react-native-swipeview'
import moment from 'moment'

import Icon from 'react-native-vector-icons/FontAwesome'

import Item from '../../Components/Item'
import {todoListDailyDelete, todoListReset, todoListUpdate} from '../../store/Todo/actions'
import FloatingButton from '../../Components/FloatingButton'
import todoImage from '../../assets/img/todo.jpg'
import Title from '../../Components/Title'

import { constants } from '../../config/constants'


function DailyListScreen({navigation}) {

  const dispatch = useDispatch()
  const redux = useSelector(state => state.todo)

  const leftOpenValue = Dimensions.get('window').width
  const rightOpenValue = -Dimensions.get('window').width

  const [items, setItems] = React.useState([])


  React.useEffect(() => {
    setItems(redux.daily)

    navigation.setOptions({headerShown: false})
  }, [redux])

  const update = () => {
    dispatch(todoListUpdate())
  }

  const reset = () => {
    dispatch(todoListReset())
  }

  const handleAddItem = () => {
    navigation.navigate('Add')
  }

  const deleteActiveTodo = (index) => {
    dispatch(todoListDailyDelete(index))
  }

  const completeTodo = (index) => {
    console.log(items[index])
  }


  return (
    <Container>
      <Title title={constants.title.daily} />
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
              key={index}
              renderVisibleContent={() => (
                <Item
                  item={{...item}}
                  time={moment().startOf('hour').fromNow()}
                />
              )}
              renderLeftView={() => (
                <View style={styles.rowLeft}>
                  <Icon
                    style={styles.icon}
                    name={'check'}
                    size={20}
                  />
                </View>
              )}
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
              onSwipedLeft={() => deleteActiveTodo(index)}
              onSwipedRight={() => {
                completeTodo(index)
                deleteActiveTodo(index)
              }}
            />
          )}
        />
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

export default DailyListScreen
