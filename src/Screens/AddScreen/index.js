import React from 'react'
import { Container, Textarea } from 'native-base'
import { TextInput, Button } from 'react-native'

import Panel from './panel'
import SaveButton from '../../Components/SaveButton'

function AddScreen({ route, navigation }){

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
    console.log(name, description)
    if (name.length === 0){
      let temp = description.split('\n')
      setName(temp[0])
    }

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
