import React from 'react'
import { Container, Textarea } from 'native-base'
import { View, TextInput, StyleSheet } from 'react-native'
import { useDispatch } from 'react-redux'
import PushNotification from 'react-native-push-notification'

import { constants } from '../../config/constants'
import SaveButton from '../../Components/SaveButton'
import { todoListAddItem } from '../../store/Todo/actions'
import DateView from '../../Components/DateView'
import {sendNotification} from '../../config/functions'

function AddScreen({route, navigation}) {

  const dispatch = useDispatch()

  const [name, setName] = React.useState('')
  const [description, setDescription] = React.useState('')

  React.useEffect(() => {
    navigation.setOptions({ headerShown: true, title: constants.title.newItem })
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
  }, [name, description])

  const saveItem = () => {
    let temp = description.split('\n')
    if (name.length === 0) {
      setName(temp[0])
    }
    dispatch(todoListAddItem({
      title: name.length === 0 ? temp[0] : name, description: description,
    }))
    // sendNotification(name.length === 0 ? temp[0] : name, new Date(Date.now() + 4 * 1000))
    navigation.navigate('Home')
  }

  return (
    <Container>
      <View style={styles.header}>
        <View style={styles.inputContainer}>
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            placeholder={'Enter item name'}
            onChangeText={text => setName(text)}
            value={name}
          />
        </View>
        <DateView />
      </View>


      <Textarea
        value={description}
        placeholder={'your description'}
        onChange={message => setDescription(message.nativeEvent.text)}
      />

      {/*<Panel style={{ bottom: 0}} />*/}


    </Container>
  )
}

const styles = StyleSheet.create({
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

