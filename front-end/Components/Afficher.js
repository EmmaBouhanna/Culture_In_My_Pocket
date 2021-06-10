import React, { useState } from 'react'
import { ActivityIndicator, TouchableOpacity, ImageBackground, StyleSheet, View, TextInput, Button, FlatList, Text, ScrollView } from 'react-native'
import LivreItem from './LivreItem.js'
import AuthorItem from './AuthorItem.js'
function Afficher(props){
    const listeParAuteur = props.listeParAuteur ;
    const listeParTitre = props.listeParTitre ;
    return(
      <View style={styles.container}>
    <Text style={styles.text}>Livres</Text>
    <ScrollView>
    <FlatList horizontal={true}
      data={listeParTitre}
      keyExtractor={(item) => item[0]}
      renderItem={({ item }) => <LivreItem livre={item} />}
    />
    </ScrollView>
    <Text style={styles.text}>Auteur</Text>
    <ScrollView>
    <FlatList horizontal={true}
      data={listeParAuteur}
      keyExtractor={(item) => item[0]}
      renderItem={({ item }) => <AuthorItem author={item} />}
    /> 
    </ScrollView>
    </View>)
  }


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      justifyContent: 'space-around'
    },
    buttoncontainer: {
      marginTop: -40,
      flexDirection: 'row',
      marginLeft: 250,
      justifyContent:'flex-end'
  
    },
    image: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "center"
    },
    textinput: {
      color: "black",
      backgroundColor: "white",
      fontSize: 15,
      fontWeight: "bold",
      textAlign: "left"
    },
  
    text: {
      color: "#00BCD4",
      fontSize: 42,
      fontWeight: "bold",
      textAlign: "center",
      justifyContent: 'space-around'
    },
    text_button: {
      textAlign: 'right',
      color: 'white',
      fontWeight: 'bold'
    },
    normal: {
      flexDirection: 'row',
      borderColor: '#00BCD4',
      borderRadius: 10,
      borderWidth: 1,
      padding: 1,
      margin: 5,
      justifyContent: 'center'
  },
  selected: {
      flexDirection: 'row',
      borderColor: '#00BCD4',
      borderRadius: 10,
      borderWidth: 1,
      padding: 1,
      margin: 5,
      justifyContent: 'center',
      backgroundColor: '#00BCD4',
  
  },
  
  
  });
export default Afficher;
