// Components/AuthorItem.js

import  React, { useState } from 'react'
import { StyleSheet, View, Image, Text, TouchableOpacity, TextInput} from 'react-native'
import { useNavigation } from '@react-navigation/native';


export function AuthorItem(props) {
  const theme = props.theme
  const navigation = useNavigation(); 
  return (
    <TouchableOpacity style={styles.main_container} title = "ClicktoTheme" onPress={() => navigation.navigate('Description du thème', {theme: theme})}>
      <View style={styles.content_container}>
        <View style={styles.header_container}>
          <Text style={styles.title_text}>{theme}</Text>

        </View>
      </View>
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  main_container: {
    height: 50,
    flexDirection: 'row',
    borderColor: '#00BCD4',
    borderRadius: 10,
    borderWidth: 1,
    padding: 1,
    margin: 5,
    backgroundColor: 'rgba(10, 150, 180, 0.3)'
  },
  image: {
    width: 120,
    height: 180,
    margin: 5,
  },
  content_container: {
    flex: 1,
    margin: 5
  },
  header_container: {
    flex: 3,
    flexDirection: 'row'
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 20,
    flex: 1,
    flexWrap: 'wrap',
    paddingRight: 5
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

export default AuthorItem;

