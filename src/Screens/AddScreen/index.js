import React from 'react'
import { Container, Textarea } from 'native-base'
import { TextInput, Button } from 'react-native'
import { useDispatch } from 'react-redux'

import Panel from './panel'
import SaveButton from '../../Components/SaveButton'
import { todoListAddItem } from '../../store/Todo/actions'

function AddScreen({ route, navigation }){

  const dispatch = useDispatch()

  const [name, setName] = React.useState('')
  const [description, setDescription] = React.useState('')

  React.useEffect(() => {
    navigation.setOptions({title: ''})
  }, [])

  React.useEffect(() => {
    if (name.length || description.length){
      navigation.setOptions({
        headerRight: () => (
          <SaveButton saveItem={saveItem} style={{ marginRight: 10 }} />
        )
      });
    }else{
      navigation.setOptions({
        headerRight: () => undefined
      });
    }
  }, [name, description])

  const saveItem = () => {
    let temp = description.split('\n')
    if (name.length === 0){
      setName(temp[0])
    }
    dispatch(todoListAddItem({
      name: name.length === 0 ? temp[0] : name, description: description
    }))
  }

  return (
    <Container>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        placeholder={'Enter item name'}
        onChangeText={text => setName(text)}
        value={name}
      />

      <Textarea
        value={description}
        placeholder={'your description'}
        onChange={message => setDescription(message.nativeEvent.text)}
      />

      {/*<Panel style={{ bottom: 0}} />*/}


    </Container>
  );
}

export default AddScreen;
