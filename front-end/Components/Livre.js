// Components/Livre.js
import Icon from 'react-native-vector-icons/Ionicons'
import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Image, Text, TouchableOpacity, ImageBackground, ScrollView, Button, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import SearchAuthorByPseudo from '../Request/SearchAuthorByPseudo';
import { token } from '../Request/TryToConnect'
import Modal from 'react-native-modal'
import GetListsUser from '../Request/GetListsUser'
import ListeItemAdd from './ListeItemAdd'




const imageb = { uri: "https://image.freepik.com/vector-gratis/fondo-azul-suave-acuarela_3785-161.jpg" };

export function Livre(props) {
  const titre = props.titre
  const date = props.date
  const auteur = props.auteur
  const categorie = props.categorie
  const lid = props.lid
  const photo = props.photo
  const description = props.description
  const [resAuteur, setResAuteur] = useState()
  const [isPopupVisible, setPopupVisible] = useState(false);
  const navigation = useNavigation();
  const [lists, setLists] = useState([]);



  function _toggleAlu() {
    const action = { type: "TOGGLE_ALU", value: lid, TOKEN: token }
    props.dispatch(action)
    console.log('TOGGLE ALU MARCHE. ID = ' + lid)
  }

  function _displayAluImage() {
    var sourceImage = require('../Images/emptychecked.png')
    var iconname = 'checkmark-circle-outline'
    if (props.aluLivres.findIndex((item) => item === lid) !== -1) {
      // Film dans nos favoris
      iconname = 'checkmark-circle'
    }
    return (
      <View style={styles.iconalu}><Text>Je l'ai lu !</Text>
        <Icon name={iconname} color={'black'} size={50} />
      </View>

    )
  }

  const togglePopup = () => { setPopupVisible(!isPopupVisible), GetListsUser(setLists) }

  return (
    <ImageBackground source={imageb} style={styles.imageB}>
      <ScrollView style={styles.ScrollView_container}>
        <Image style={styles.photoLivre} source={{ uri: photo }} />
        <Text style={styles.title_text}>{titre}</Text>
        <Text style={styles.description_text}> {description}</Text>
        <Text style={styles.txt}>{titre}</Text>
        <Text style={styles.txt}>{date}</Text>
        <Text style={styles.txt}>Date de publication : {date}</Text>
        <TouchableOpacity onPress={() => allerVersAuteur(auteur, navigation, resAuteur, setResAuteur)}><Text style={styles.txt}>Auteur : {auteur}</Text></TouchableOpacity>
        <Text style={styles.txt}>Catégorie : {categorie}</Text>
        <TouchableOpacity
          style={styles.alu_container}
          onPress={() => _toggleAlu()}>
          {_displayAluImage()}
        </TouchableOpacity>

        {/* // Ajouter à une liste */}
        <TouchableOpacity style={styles.bttn} onPress={togglePopup}>
        <Text>Je l'ajoute dans mes listes</Text>
        <Icon name="add-circle" size={50} />
        </TouchableOpacity>
        <View style={{ justifyContent: 'center' }}>
          <Modal isVisible={isPopupVisible} style={styles.popup} onBackdropPress={togglePopup}>
            <View style={{ flex: 1 }}>
              <Text style={styles.popup_text}>Choisi ta liste :</Text>
              <FlatList
                data={lists}
                keyExtractor={(item) => item[0]}
                renderItem={({ item }) => <ListeItemAdd list={item} livreid={lid} close={togglePopup} />}
              />
            </View>
          </Modal>
        </View>


      </ScrollView>
    </ImageBackground>
  )
}


const mapStateToProps = (state) => {
  return { aluLivres: state.aluLivres }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: (action) => { dispatch(action) }
  }
}

function allerVersAuteur(auteur, navigation, resAuteur, setResAuteur) {
  SearchAuthorByPseudo(auteur, setResAuteur).then((evt) => navigation.navigate('Author', { pseudo: resAuteur, prenom: resAuteur[1], nom: resAuteur[2], naissance: resAuteur[3], mort: resAuteur[4] }))

}


export default connect(mapStateToProps, mapDispatchToProps)(Livre)


const styles = StyleSheet.create({
  imageB: {
    resizeMode: 'cover',
    flex: 1,
    justifyContent: "flex-end"
  },
  popup: {
    flex: 1,
    backgroundColor: 'white',
    maxHeight: 300,
    justifyContent: 'center',
    textAlign: 'center',

  },
  bttn:
  {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    resizeMode: "center",
    width: 200,
    height: 200,
    top: 60,

  },
  popup_text: {
    fontWeight: 'bold',
    fontSize: 20,
    flexWrap: 'wrap',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
    color: '#000000',
    textAlign: 'center'
},
  iconalu: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  block1: {
    backgroundColor: "#ffffff",
    flex: 0.1,
    top: "49%"
  },
  block2: {
    backgroundColor: "#ffffff",
    flex: 0.05,
    top: -45
  },
  space: {
    height: 20,
    width: '100%'
  },
  txt: {
    color: "black",
    padding: 7,
    fontSize: 17,
    fontWeight: "normal",
    textAlign: "left",
    justifyContent: 'space-around',
    paddingLeft: 30,
    paddingTop: 1,


  },
  logoBackground: {
    backgroundColor: `#b0e0e6`,
    flex: 1
  },
  textConteiner: {
    backgroundColor: "red",
    flex: 1
  },
  content_container: {
    margin: 5,
    backgroundColor: "black"
  },
  header_container: {

    flexDirection: 'row'
  },
  vote_text: {
    fontWeight: 'bold',
    fontSize: 13,
    color: '#666666'
  },
  description_container: {

  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666'
  },
  date_container: {

  },
  date_text: {
    textAlign: 'right',
    fontSize: 14
  },
  ScrollView_container: {
    flex: 1,
    marginBottom: 60
  },
  photoLivre: {
    height: 169,
    margin: 5
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 35,
    flex: 1,
    flexWrap: 'wrap',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
    color: '#00BCD4',
    textAlign: 'center'
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666',
    margin: 5,
    marginBottom: 15
  }
})// rajouter des style pour le titre, la description, l'image et le scrollview. 
