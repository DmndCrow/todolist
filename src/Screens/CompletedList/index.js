import React from 'react'
import {StyleSheet, FlatList, ImageBackground } from 'react-native'
import { Container } from 'native-base'
import { useSelector, useDispatch } from 'react-redux'

import {todoListCompletedDelete, todoListReset, todoListUpdate} from '../../store/Todo/actions'
import todoImage from '../../assets/img/todo.jpg'
import Title from '../../Components/Title'

import { constants } from '../../config/constants'
import ListView from '../../Components/ListView'
import moment from 'moment'


function CompletedListScreen({navigation}) {

  const dispatch = useDispatch()
  const redux = useSelector(state => state.todo)

  const [items, setItems] = React.useState([])


  React.useEffect(() => {
    setItems(redux.completed)
    navigation.setOptions({headerShown: false})
  }, [redux])

  const update = () => {
    dispatch(todoListUpdate())
  }

  const reset = () => {
    dispatch(todoListReset())
  }

  const deleteAction = (index) => {
    dispatch(todoListCompletedDelete(index))
  }

  const completeAction = (index) => {
    console.log(index)
  }

  const openDetails = (item) => {
    navigation.navigate('Details', {
      item: item
    })
  }


  return (
    <Container>
      <Title title={constants.title.completed} />
      <ImageBackground source={todoImage} style={styles.backgroundImage}>

        {/*<Button onPress={() => update()}><Text>Update</Text></Button>*/}
        {/*<Button onPress={() => reset()}><Text>Reset</Text></Button>*/}


        <ListView
          viewType={'completed'}
          items={items}
          openDetails={openDetails}
          deleteAction={deleteAction}
          completeAction={completeAction}
        />

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

export default CompletedListScreen
