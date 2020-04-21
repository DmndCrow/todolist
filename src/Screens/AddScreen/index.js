import React from 'react'
import {Container, Textarea} from 'native-base'
import {View, ImageBackground, StyleSheet} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'

import {constants} from '../../config/constants'

import {todoListAddItem} from '../../store/Todo/actions'
import {sendNotification} from '../../config/functions'

import SaveButton from '../../Components/SaveButton'
import DateView from '../../Components/DateView'
import Input from '../../Components/Input'

import noteImage from '../../assets/img/note.png'

function AddScreen({route, navigation}) {

  const dispatch = useDispatch()

  const [name, setName] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [date, setDate] = React.useState(new Date())

  // add title from constants
  React.useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: constants.title.newItem
    })
  }, [])

  // for every change of react hooks
  React.useEffect(() => {
    if (name.length || description.length) {
      // add check icon at the top right corner to save new task
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
      setName(temp[0]) // if name is not given, take first line of the description
    }

    // send notification at the given time
    const notificationIds = sendNotification(dispatch,name.length === 0 ? temp[0] : name, date)

    // add item to the store
    dispatch(todoListAddItem({
      title: name.length === 0 ? temp[0] : name,
      description: description,
      date: date,
      notificationId: notificationIds.notificationId,
      timeoutId: notificationIds.timeoutId
    }))

    // navigate to home screen
    navigation.navigate('Home')
  }


  return (
    <Container>
      <ImageBackground source={noteImage} style={styles.backgroundImage}>
        <View style={styles.header}>
          <View style={styles.inputContainer}>
            {/* input to get task name */}
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
          {/* Date field to know when send notification */}
          <DateView date={date} setDate={setDate}/>
        </View>

        {/* description of the task */}
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

export default AddScreen

