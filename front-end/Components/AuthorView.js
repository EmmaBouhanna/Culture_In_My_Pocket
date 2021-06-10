// Components/AuthorView.js

import React, { useState , useEffect} from 'react'
import { StyleSheet, View, Image, Text, TouchableOpacity, FlatList, Button, ImageBackground} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import LivreItem from './LivreItem.js'
import { encode } from 'base-64'
import SearchAllBooks from '../Request/SearchAllBooks.js' ;

const image = { uri: "https://image.freepik.com/vector-gratis/fondo-azul-suave-acuarela_3785-161.jpg" };

export function AuthorView(props) {
  const pseudo = props.pseudo
  const prenom = props.prenom
  const nom = props.nom
  const naissance = props.naissance
  const mort = props.mort
  const navigation = useNavigation(); 
  const [liste, setListe] =useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  

    if (isLoaded){
      return(
    <ImageBackground source={image} style={styles.image}>  
    <View style={styles.head_container}>
            <Text style={styles.titre}>{pseudo}</Text>
            </View>
    <View>
    <View style={styles.themes}>
                    <Text style={styles.text}> Informations sur l'auteur</Text>
                </View>

    <Text> Nom : {nom}</Text>
    <Text> Prénom : {prenom}</Text>
    <Text> {naissance }</Text>
    <Text> {mort}</Text>
    <View style={styles.themes}>
                    <Text style={styles.text}> Ses livres</Text>
                </View>
    </View>
    <View style = {styles.container}>
      <FlatList
        data={liste}
        keyExtractor={(item) => item[0]}
        renderItem={({ item }) => <LivreItem livre={item} />}
       
      />
    </View>
    
    </ImageBackground> )
    }
    else {
      SearchAllBooks(pseudo, setListe) ;
      setIsLoaded(true);

    }
  
}


const styles = StyleSheet.create({
  head_container:{
      flex: 0.10,
      flexDirection: "column",
      justifyContent: 'center'

  },
  container: {
      flex: 1,
      flexDirection: "column",
      marginBottom: 50
  },
  buttoncontainer: {
      marginTop: 10,
      paddingTop: 15,
      paddingBottom: 15,
      marginLeft: 150,
      marginRight: 150,
      backgroundColor: '#00BCD4',
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#fff'
  },
  image: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "center"
  },
  titre: {
      color: "#00BCD4",
      fontSize: 40,
      fontWeight: "bold",
      textAlign: "center",
      justifyContent: 'space-around'
  },

  text: {
      color: "white",
      fontSize: 20,
      fontWeight: "bold",
      textAlign: "center",
      justifyContent: 'space-around'
  },
  text_button: {
      textAlign: 'center',
      color: 'white',
      fontWeight: 'bold'
  },
  themes: {
      flexDirection: 'row',
      borderColor: '#00BCD4',
      backgroundColor: '#00BCD4',
      borderWidth: 1,
      padding: 1,
      marginVertical: 5,
      justifyContent: 'center'
  },
});

export default AuthorView;
