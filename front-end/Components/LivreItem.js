// Components/LivreItem.js

import  React, { useState } from 'react'
import { StyleSheet, View, Image, Text, TouchableOpacity, TextInput} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import StarRating from 'react-native-star-rating'

export function LivreItem(props) {
  const livre = props.livre
  const navigation = useNavigation(); 
  return (
    <TouchableOpacity style={styles.main_container} title = "ClicktoBook" onPress={() => navigation.navigate('Livre', {lid : livre[0], titre : livre[1], tome : livre[2] , date : livre[3], categorie : livre[4], photo : livre[10], description: livre[7], auteur : livre[11]})}>
      <Image
        style={styles.image}
        source={{ uri: livre[10] }}
      />
      <View style={styles.content_container}>
        <View style={styles.header_container}>
          <Text style={styles.title_text}>{livre[1]}</Text>
          {/* <Text style={styles.vote_text}>{livre[6]}/5.0</Text> */}
        </View>
        <View style={styles.description_container}>
          <Text style={styles.description_text} numberOfLines={6}>{livre[4]}</Text>
          {/* La propriété numberOfLines permet de couper un texte si celui-ci est trop long, il suffit de définir un nombre maximum de ligne */}
        </View>
        <View style={styles.date_container}>
          <Text style={styles.vote_text}>{livre[11]}</Text>  
          </View>
          <View style={styles.date_container}>
          <StarRating disabled={false} maxStars={5} rating={livre[6]} fullStarColor='#ffa500' emptyStarColor='#ffa500' selectedStar={() => {}} />  
        </View>   
        </View>   
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({

  main_container: {
    flex: 1,
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
    margin: 5,
    flexDirection: 'column'
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
    flex: 10
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666'
  },
  date_container: {
    flex:5,
    maxWidth: 200,
  },
  date_text: {
    textAlign: 'right',
    fontSize: 14
  }
})

export default LivreItem;

