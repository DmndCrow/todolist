import React from 'react'
import { Container, Textarea } from 'native-base'

function DetailsScreen({ route, navigation }) {

  const params = route.params
  const [description, setDescription] = React.useState('')

  React.useEffect(() => {
    navigation.setOptions({title: params.item.name})

    setDescription(params.item.description)
  }, [])

  return (
    <Container>
      <Textarea value={description} onChange={message => setDescription(message.nativeEvent.text)}/>
    </Container>
  );
}

export default DetailsScreen;
