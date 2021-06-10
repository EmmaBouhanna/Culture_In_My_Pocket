// Components/ListeItem.js

import React, { useState } from 'react'
import { StyleSheet, View, Image, Text, TouchableOpacity, TextInput } from 'react-native'
import PostBookToList from '../Request/PostBookToList'
import Icon from 'react-native-vector-icons/Ionicons'

export default function ListeItem(props) {
  const list = props.list
  const livreid = props.livreid
  function close() { () => props.close }
  return (
      <TouchableOpacity style={styles.main_container} title="ClicktoList" onPress={() => { PostBookToList(livreid, list[1]); close() }}>
        <View style={styles.content_container}>
          <View style={styles.header_container}>
            <Text style={styles.title_text}>{list[1]}</Text>
          </View>
        </View>
      </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  main_container: {
      backgroundColor: 'white',
      borderRadius: 6,
      margin:5,
      height: 50,
      borderColor: '#00BCD4',
      borderWidth: 2,
      paddingLeft: 5
  },
  deletebttn: {
    height: 60,
    flex: 1,
    borderColor: 'black',
    borderWidth: 1,
    padding: 1,
    margin: 5
  },
  image: {
    width: 120,
    height: 180,
    margin: 5,
  },
  content_container: {
    flex: 1,
    margin: 5,
    flexDirection: 'column'
  },
  header_container: {
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center'
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 20,
    flex: 1,
    alignContent: 'center',
    flexWrap: 'wrap',
    paddingRight: 5,
    alignItems: 'center'
  },
  vote_text: {
    fontWeight: 'bold',
    fontSize: 13,
    color: '#666666'
  },
  description_container: {
    flex: 7
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666'
  },
  date_container: {
    flex: 1
  },
  date_text: {
    textAlign: 'right',
    fontSize: 14
  }
})
