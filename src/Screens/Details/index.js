import React from 'react'
import { Container, Textarea } from 'native-base'

function DetailsScreen({ route, navigation }) {

  const params = route.params
  const [text, setText] = React.useState('')

  React.useEffect(() => {
    navigation.setOptions({title: params.item.name})

    setText(params.item.text)
  }, [])

  return (
    <Container>
      <Textarea value={text} onChange={message => setText(message.nativeEvent.text)}/>
    </Container>
  );
}

export default DetailsScreen;
