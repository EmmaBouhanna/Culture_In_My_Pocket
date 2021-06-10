// Components/ListeItem.js

import React, { useState } from 'react'
import { StyleSheet, View, Image, Text, TouchableOpacity, TextInput } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'
import DelListe from '../Request/DeleteListe.js'



export default function ListeItem(props) {
  const list = props.list
  const navigation = useNavigation();
  return (
    <View style={styles.main_container}>
      <TouchableOpacity style={{flex: 6}} title="ClicktoList" onPress={() => navigation.navigate('Liste', { listid: list[0], titre: list[1] })}>
        <View style={styles.content_container}>
          <View style={styles.header_container}>
            <Text style={styles.title_text}>{list[1]}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deletebttn} onPress={() => {DelListe(list[1])}}>
        <Icon name="trash-outline" size={30} />
      </TouchableOpacity>
    </View>
  )
}


const styles = StyleSheet.create({
  main_container: {
    flexDirection: 'row',
    borderColor: '#00BCD4',
    borderRadius: 10,
    borderWidth: 1,
    padding: 1,
    margin: 5,
    justifyContent: 'center'
  },
  deletebttn: {flex: 1, justifyContent: 'center', alignItems: 'center'},
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
