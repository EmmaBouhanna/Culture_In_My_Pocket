import React, { useState, useEffect } from 'react'
import { ActivityIndicator, TouchableOpacity, ImageBackground, StyleSheet, View, TextInput, Button, FlatList, Text, ScrollView, Touchable } from 'react-native'
import LivreItem from './LivreItem'
import GetThemes from '../Request/GetThemes'
import SearchLivreByCategorie from '../Request/SearchLivreByCategorie'
import { useNavigation } from '@react-navigation/native'

const image = { uri: "https://image.freepik.com/vector-gratis/fondo-azul-suave-acuarela_3785-161.jpg" };

export function ThemeDescriptionView (props){
    const theme = props.theme
    const [liste, setListe] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    useEffect(() => {setIsLoaded(true)}, [liste])



    if (isLoaded){
        return(
            <ImageBackground source={image} style={styles.image}>
                <View style={styles.head_container}>
            <Text style={styles.titre}>Les livres dans le thème "{theme}"</Text>
            </View>
            <ScrollView style={styles.container}>
        <FlatList 
                    data={liste}
                    keyExtractor={(item) => item[0]}
                    renderItem={({ item }) => <LivreItem livre={item} />}
                /></ScrollView>
                </ImageBackground>)
        
    
    }

    else{
        SearchLivreByCategorie(theme, setListe)
        return(<ActivityIndicator/>)
    }
}

const styles = StyleSheet.create({
    head_container:{
        flex: 0.10,
        flexDirection: "column",
        justifyContent: 'center',
        margin:20

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
export default ThemeDescriptionView;
