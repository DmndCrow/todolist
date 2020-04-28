import React from 'react'
import {Container, Textarea} from 'native-base'
import {View, ImageBackground, StyleSheet} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'

import {constants} from '../../config/constants'

import {handleSaveCurrentItem, handleSaveDailyItem, pushNewNotification} from '../../config/functions'

import SaveButton from '../../Components/SaveButton'
import DateViewCurrent from './DateViewCurrent'
import Input from '../../Components/Input'

import noteImage from '../../assets/img/note.png'
import DateViewDaily from './DateViewDaily'
import {todoListAddDailyItem} from '../../store/Todo/actions'
import TimerView from './TimerView'
import moment from 'moment'

function AddScreen({route, navigation}) {

  const dispatch = useDispatch()

  const listType = route.params.route

  const [name, setName] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [date, setDate] = React.useState(new Date())

  const [changedDate, setChangedDate] = React.useState(false)
  const [hours, setHours] = React.useState('')
  const [minutes, setMinutes] = React.useState('')

  // add title from constants
  React.useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: constants.title.newItem,
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
  }, [name, description, date, hours, minutes])

  const saveItem = () => {
    let temp = description.split('\n')
    if (name.length === 0) {
      setName(temp[0]) // if name is not given, take first line of the description
    }

    if (listType === 'current') {

      if (changedDate && (hours !== '' || minutes !== '')){
        let h = hours || '0'
        let m = minutes || '0'
        let res = parseInt(h) * 60 + parseInt(m)
        pushNewNotification(name.length === 0 ? temp[0] : name, moment(date).subtract(res, 'minutes'))
      }

      dispatch(handleSaveCurrentItem(name.length === 0 ? temp[0] : name, date, description, changedDate))


    } else if (listType === 'daily') {
      const notificationIds = dispatch(handleSaveDailyItem(name.length === 0 ? temp[0] : name, date))

      dispatch(todoListAddDailyItem({
        title: name.length === 0 ? temp[0] : name,
        date: date,
        description: description,
        notificationId: notificationIds.notificationId,
        timeoutId: notificationIds.timeoutId,
      }))
    }
    // navigate to home screen
    navigation.navigate('Home')
  }

  const saveTimer = () => {

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

          {/* Different timers and date inputs */}
          {listType === 'current' ?
            <View>
              <TimerView
                hours={hours} setHours={setHours}
                minutes={minutes} setMinutes={setMinutes}
              />
              <DateViewCurrent date={date} setDate={setDate} setChanged={setChangedDate} />
            </View>
            :
            <DateViewDaily date={date} setDate={setDate}/>
          }

        </View>
        {/* description of the task */}
        <Textarea
          value={description}
          placeholder={constants.placeholder.inputTextarea}
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
    alignItems: 'center',
    padding: 10
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 5,
  },
  icons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
})

export default AddScreen

