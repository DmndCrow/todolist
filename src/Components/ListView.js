import React from 'react'
import {FlatList, View, StyleSheet, Dimensions} from 'react-native'
import SwipeView from 'react-native-swipeview'
import Item from './Item'
import Icon from 'react-native-vector-icons/FontAwesome'


function ListView(props){

  const leftOpenValue = Dimensions.get('window').width
  const rightOpenValue = -Dimensions.get('window').width
  const { items, viewType, openDetails, deleteAction, completeAction } = props

  return(
    <FlatList
      data={items}
      keyExtractor={todo => todo.id}
      enableEmptySections={true}
      ItemSeparatorComponent={() => <View style={styles.separator}/>}
      renderItem={({item, index}) => (
        <SwipeView
          key={item.id}
          renderVisibleContent={() => (
            // render current tasks from redux current list
            <Item
              func={openDetails}
              viewType={viewType}
              key={item.id}
              item={{...item}}
              time={item.date}
            />
          )}
          renderLeftView={() => (
            // on swipe from the left, show icon check
            <View style={styles.rowLeft}>
              <Icon
                style={styles.icon}
                name={'check'}
                size={20}
              />
            </View>
          )}
          renderRightView={() => (
            // on swipe from the right, show icon x
            <View style={styles.rowRight}>
              <Icon
                style={styles.icon}
                name={'times'}
                size={20}
              />
            </View>
          )}
          leftOpenValue={leftOpenValue}
          rightOpenValue={rightOpenValue}
          swipeDuration={200}
          swipeToOpenPercent={40}
          onSwipedLeft={() => deleteAction(index)} // on swipe from right, remove item
          onSwipedRight={() => completeAction(index)} // on swipe from left, move item to completed list
        />
      )}
    />
  )
}

const styles = StyleSheet.create({
  rowLeft: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: 'green',
  },
  rowRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#FE4D33',
  },
  icon: {
    color: 'white',
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#182129',
  },
})

export default ListView;
