import React from 'react'
import {Container, Textarea} from 'native-base'
import {View, ImageBackground, StyleSheet} from 'react-native'
import {useDispatch} from 'react-redux'
import BackgroundTimer from 'react-native-background-timer'

import {constants} from '../../config/constants'

import {todoListAddItem} from '../../store/Todo/actions'
import {sendNotification} from '../../config/functions'

import SaveButton from '../../Components/SaveButton'
import DateView from '../../Components/DateView'
import Input from '../../Components/Input'

import noteImage from '../../assets/img/note.png'
import moment from 'moment'

function AddScreen({route, navigation}) {

  const dispatch = useDispatch()

  const [name, setName] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [date, setDate] = React.useState(new Date())

  React.useEffect(() => {
    navigation.setOptions({headerShown: true, title: constants.title.newItem})
  }, [])

  React.useEffect(() => {
    if (name.length || description.length) {
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
      setName(temp[0])
    }

    dispatch(todoListAddItem({
      title: name.length === 0 ? temp[0] : name, description: description, date: date,
    }))

    sendNotification(name.length === 0 ? temp[0] : name, date)

    // Incorrect work, need to fix
    BackgroundTimer.setTimeout(() => {
      console.log('got at ' + new Date())
    }, Math.abs(date.getDate() - new Date().getDate()))


    navigation.navigate('Home')
  }


  return (
    <Container>
      <ImageBackground source={noteImage} style={styles.backgroundImage}>
        <View style={styles.header}>
          <View style={styles.inputContainer}>
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
          <DateView date={date} setDate={setDate}/>
        </View>


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

