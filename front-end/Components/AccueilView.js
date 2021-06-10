import React, { useState, useEffect } from 'react'
import { ActivityIndicator, TouchableOpacity, ImageBackground, StyleSheet, View, TextInput, Button, FlatList, Text, ScrollView, Touchable } from 'react-native'
import LivreItem from './LivreItem'
import GetThemes from '../Request/GetThemes'
import SearchLivreByCategorie from '../Request/SearchLivreByCategorie'
import { useNavigation } from '@react-navigation/native'

const image = { uri: "https://image.freepik.com/vector-gratis/fondo-azul-suave-acuarela_3785-161.jpg" };

export function AccueilView(){
    const [isLoaded, setIsLoaded] = useState(false)
    const [themes, setThemes] = useState([])
    const [listeParCat1, setListeParCat1] = useState([])
    const [listeParCat2, setListeParCat2] = useState([])
    const [listeParCat3, setListeParCat3] = useState([])
    console.log(isLoaded)
    useEffect(()=>{SearchLivreByCategorie(themes[1], setListeParCat2); SearchLivreByCategorie(themes[0], setListeParCat1); SearchLivreByCategorie(themes[2], setListeParCat3)},[themes])
    useEffect(() => {setIsLoaded(true)}, [listeParCat1])


    if (isLoaded){
        const theme2 = themes[1]
        const theme1 = themes[0]
        const theme3 = themes[2]
        console.log(themes[0])
        console.log(themes[1])

        return(
        <ImageBackground source={image} style={styles.image}>
            <View style={styles.head_container}>
            <Text style={styles.titre}>Nos suggestions</Text>
            </View>
            <ScrollView style={styles.container}>
            <View>
                {/* <TouchableOpacity title='montheme' style={styles.theme} onPress={(evt) => {SearchLivreByCategorie(theme2, setListeParCat2)}}><Text style={styles.text}> Dans le thème {theme2}</Text></TouchableOpacity> */}
                <View style={styles.themes}>
                    <Text style={styles.text}> Dans le thème {theme2}</Text>
                </View>
                <FlatList horizontal={true}
                    data={listeParCat2}
                    keyExtractor={(item) => item[0]}
                    renderItem={({ item }) => <LivreItem livre={item} />}
                />
                </View>
            <View>
            {/* <TouchableOpacity title='montheme' style={styles.theme} onPress={(evt) => {SearchLivreByCategorie(theme1, setListeParCat1)}}><Text style={styles.text}> Dans le thème {theme1}</Text></TouchableOpacity> */}
            <View style={styles.themes}>
            <Text style={styles.text}> Dans le thème {theme1}</Text>
            </View>

            <FlatList horizontal={true}
                data={listeParCat1}
                keyExtractor={(item) => item[0]}
                renderItem={({ item }) => <LivreItem livre={item} />}
            />
            </View>
            <View>
                {/* <TouchableOpacity title='montheme' style={styles.theme} onPress={(evt) => {SearchLivreByCategorie(theme3, setListeParCat3)}}><Text style={styles.text}>Dans le thème {theme3}</Text></TouchableOpacity> */}
                <View style={styles.themes}>
                <Text style={styles.text}> Dans le thème {theme3}</Text>
                </View>
                <FlatList horizontal={true}
                    data={listeParCat3}
                    keyExtractor={(item) => item[0]}
                    renderItem={({ item }) => <LivreItem livre={item} />}
                />
            </View>
        </ScrollView>
        </ImageBackground>)
    
    }

    else{
        GetThemes(setThemes) 
        return(<ActivityIndicator/>)
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

export default AccueilView;