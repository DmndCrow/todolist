import React from 'react'
import { Container, Textarea } from 'native-base'

function DetailsScreen({ route, navigation }) {

  const params = route.params
  const [description, setDescription] = React.useState('')

  React.useEffect(() => {
    navigation.setOptions({ headerShown: true, title: params.item.title })

    setDescription(params.item.description)
  }, [])

  return (
    <Container>
      <Textarea value={description} onChange={message => setDescription(message.nativeEvent.text)}/>
    </Container>
  );
}

export default DetailsScreen;
