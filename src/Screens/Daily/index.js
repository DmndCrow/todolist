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
import ListView from '../../Components/ListView'


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
    navigation.navigate('Add', {
      route: 'daily'
    })
  }

  const deleteAction = (index) => {
    dispatch(todoListDailyDelete(index))
  }

  const completeAction = (index) => {
    console.log(items[index])
  }

  const openDetails = (item) => {
    navigation.navigate('Details', {
      item: item
    })
  }


  return (
    <Container>
      <Title title={constants.title.daily} />
      <ImageBackground source={todoImage} style={styles.backgroundImage}>

        {/*<Button onPress={() => update()}><Text>Update</Text></Button>*/}
        {/*<Button onPress={() => reset()}><Text>Reset</Text></Button>*/}

        <ListView
          items={items}
          openDetails={openDetails}
          deleteAction={deleteAction}
          completeAction={completeAction}
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
  }
})

export default DailyListScreen
