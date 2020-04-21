import React from 'react'
import {ImageBackground, StyleSheet, View} from 'react-native'
import {Container, Textarea} from 'native-base'

import {useDispatch, useSelector} from 'react-redux'

import {constants} from '../../config/constants'
import {getType, removeNotication, sendNotification} from '../../config/functions'

import noteImage from '../../assets/img/note.png'
import Input from '../../Components/Input'
import DateView from '../../Components/DateView'
import SaveButton from '../../Components/SaveButton'
import {todoListUpdateCurrent} from '../../store/Todo/actions'



function DetailsScreen({route, navigation}) {

  const params = route.params

  const dispatch = useDispatch()
  const redux = useSelector(state => state.todo)


  const [name, setName] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [date, setDate] = React.useState(new Date())

  const [todo, setTodo] = React.useState({})

  // run at the beginning
  React.useEffect(() => {
    // add title
    navigation.setOptions({
      headerShown: true,
      title: constants.title.itemDetails
    })

    // set data from redux store
    setName(params.item.title)
    setDescription(params.item.description)
    setDate(new Date(params.item.date))
    setTodo(getType(redux, params.item))
  }, [])

  // for every change of name, description or date
  React.useEffect(() => {
    if (name.length || description.length) {
      // if condition is valid, add check icon to save changes
      navigation.setOptions({
        headerRight: () => (
          <SaveButton saveItem={saveItem} style={{marginRight: 10}}/>
        ),
      })
    } else {
      navigation.setOptions({
        headerRight: () => undefined,
      })
    }
  }, [name, description, date])


  const saveItem = () => {
    let temp = description.split('\n')
    if (name.length === 0) {
      setName(temp[0]) // if name is empty, get first line of description
    }

    if (todo.type === 'current'){
      console.log(redux.current[todo.index])
      // remove all notification of original
      removeNotication(redux.current[todo.index])

      // send notification for updated task
      const notificationIds = sendNotification(dispatch, name.length === 0 ? temp[0] : name, date)

      const item = {
        title: name.length === 0 ? temp[0] : name,
        description: description,
        date: date,
        notificationId: notificationIds.notificationId,
        timeoutId: notificationIds.timeoutId
      }

      // save task by updating current list
      dispatch(todoListUpdateCurrent({
        item: item, index: todo.index
      }))

    }else if (todo.type === 'completed'){

    }else{

    }

    navigation.navigate('Home')

  }

  return (
    <Container>
      <ImageBackground source={noteImage} style={styles.backgroundImage}>
        <View style={styles.header}>
          <View style={styles.inputContainer}>
            {/* input field to change name of the task */}
            <Input
              name={name}
              setName={setName}
              placeholder={constants.placeholder.inputName}
              placeholderTextColor={'white'}
              selectionColor={'#e7d629'}
              underlineColorAndroid={'transparent'}
              maxLength={32}
              clearTextOnFocus={true}
            />
          </View>
          {/* date field to change notification date */}
          <DateView date={date} setDate={setDate}/>
        </View>

        {/* text area field to change description */}
        <Textarea
          value={description}
          placeholder={'your description'}
          onChange={message => setDescription(message.nativeEvent.text)}
        />
      </ImageBackground>
    </Container>
  )
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'contain',
  },
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 5,
  },
})

export default DetailsScreen
