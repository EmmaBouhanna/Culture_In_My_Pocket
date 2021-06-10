import React, { useState } from 'react'
import { ActivityIndicator, TouchableOpacity, ImageBackground, Image, StyleSheet, View, TextInput, Button, FlatList, Text, ScrollView } from 'react-native'
import LivreItem from './LivreItem.js'
import AuthorItem from './AuthorItem.js'
import { encode } from 'base-64'
import SearchLivreByTitle from '../Request/SearchLivreByTitle.js'
import SearchAuthorByPseudo from '../Request/SearchAuthorByPseudo.js'
import { AsyncStorage } from "@react-native-async-storage/async-storage"
import Icon from "react-native-vector-icons/AntDesign"
import Afficher from './Afficher'
import SearchLivreByFilter from '../Request/SearchByFilter'

const image = { uri: "https://image.freepik.com/vector-gratis/fondo-azul-suave-acuarela_3785-161.jpg" };

export function Search() {
  const [clef, setClef] = useState("%")
  const [listeParTitre, setListeParTitre] = useState([])
  const [listeParAuteur, setListeParAuteur] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [token, setToken] = useState()
  const [filtre, setFiltre] = useState([])

  return (
    <ScrollView style={styles.container}>
      <ImageBackground source={image} style={styles.image}>
        {/* <Text style={styles.txt}>What are you searching for?</Text> */}
        <TextInput placeholder="Recherche livre ou auteurs" style={styles.textinput} onChangeText={(txt) => { setClef(txt) }} onSubmitEditing={(evt) => { launchResearch(clef, filtre, setListeParAuteur, setListeParTitre, setIsLoaded) }} />
        <View style={styles.bttn_icon_container}>
        <TouchableOpacity style={styles.buttoncontainer} onPress={(evt) => { launchResearch(clef, filtre, setListeParAuteur, setListeParTitre, setIsLoaded) }}>
          <Icon style={styles.bttn} size={30} name='enter' />
        </TouchableOpacity>
        </View>
        <View style={styles.space} />
        <TouchableOpacity style={filtre === 'categorie' ? styles.selected : styles.normal} onPress={(evt) => { setFiltre('categorie') }}><Text>Par catégorie</Text></TouchableOpacity>
        <TouchableOpacity style={filtre === 'titre' ? styles.selected : styles.normal} onPress={(evt) => { setFiltre('titre') }}><Text>Par titre ou nom d'auteur</Text></TouchableOpacity>
        <TouchableOpacity style={filtre === 'note' ? styles.selected : styles.normal} onPress={(evt) => { setFiltre('note') }}><Text>Par note minimale</Text></TouchableOpacity>
        {isLoaded ?
          <Afficher listeParAuteur={listeParAuteur} listeParTitre={listeParTitre} /> :
          <Image style={styles.logo} source={require('../Images/logo_small.png')} />}

      </ImageBackground>
    </ScrollView>
  )
}

function launchResearch(clef, filtre, setListeParAuteur, setListeParTitre, setIsLoaded) {
  if (clef.length > 0) {
    setIsLoaded(false);
    Promise.all([SearchLivreByFilter(clef, filtre, setListeParTitre), SearchAuthorByPseudo(clef, filtre, setListeParAuteur)]).then((evt) => { setIsLoaded(true) })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  bttn_icon_container:{
    flexDirection: 'column',
    alignContent: 'space-between',
    alignItems: 'flex-end'
  },
  buttoncontainer: {
    marginTop: -40,
    flexDirection: 'row',
    

  },
  bttn:{
    flex:0.1,
    flexDirection: 'row',
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
  logo: {
    resizeMode: "center",
    flex: 0.5
  },
  txt: {
    color: "#00BCD4",
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    justifyContent: 'space-around'
  },
  space: {
    height: 10,
    width: '100%'
  }


});


export default Search;

