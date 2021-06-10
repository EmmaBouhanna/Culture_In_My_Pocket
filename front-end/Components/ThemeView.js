import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Image, Text, ImageBackground, TouchableOpacity, TouchableHighlight, TextInput, FlatList, Button } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import PostNewAccount from '../Request/PostNewAccount'
import SearchAllThemes from '../Request/SearchAllThemes'
import PostFavouriteThemes from '../Request/PostFavouriteThemes'

const image = { uri: "https://image.freepik.com/vector-gratis/fondo-azul-suave-acuarela_3785-161.jpg" };

export function ThemeView() {
    const [isLoaded, setIsLoaded] = useState(false)
    const [ListeThemes, setListeThemes] = useState([])
    const [Selected, setSelected] = useState([])
    const navigation = useNavigation()
    const [isselected, setIsSelected] = useState ([])
    useEffect(()=>{for (var i = 0; i < 36; i++){setIsSelected((isselected) => [...isselected, false])}}, [isLoaded])

    function SelectThemes(item) {
        let test = Selected
        const index_selected = test.findIndex((i) => (i === item))
        console.log(test)
        console.log(isselected)
        if (index_selected !== -1) {
            setSelected(test.filter((i) => (i !== item)))
            isselected[item] = false// pas dedans donc on le rajoute
        }
        else {
            setSelected((Selected) => [...Selected, item])// onl'enlève
            isselected[item] = true
        }
        return item;
    }
    function mystyle(item) {
        if (isselected[item] === true) {
            return (styles.selected)

        }
        else {
            return (styles.normal)
        }
    }
    if (isLoaded) {
        return (
            <ImageBackground source={image} style={styles.image}>
                <View style={styles.container}>
                    <Text style={styles.titre}>Choisissez vos thèmes préférés</Text>
                    <FlatList data={ListeThemes} keyExtractor={(item) => item[0]}
                        renderItem={({ item }) =>
                        (<View style={styles.content_container}>
                            <TouchableHighlight style={mystyle(item[0])} underlayColor='white' activeOpacity={0.3} title='ClickToSelect' onPress={(evt) => { SelectThemes(item[0]); console.log(Selected) }}>
                                <Text>{item[1]}</Text>
                            </TouchableHighlight>
                        </View>)
                        } />
                    <View style={styles.content_container} />
                    <TouchableOpacity style={styles.bttn} title='Finidechoisir' onPress={(evt) => PostFavouriteThemes(Selected, navigation)}><Text style={styles.txt}>C'est parti</Text></TouchableOpacity>
                </View>
            </ImageBackground>
        )
    }
    else {
        SearchAllThemes(setListeThemes)
        setIsLoaded(true);
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: 'space-around'
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
    content_container: {
        flex: 1,
        margin: 5,
        flexDirection: 'column'
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
    bttn_container: {
        height: 20,
        width: '100%'
    },
    bttn: {
        marginTop: 10,
        paddingTop: 15,
        paddingBottom: 15,
        marginLeft: 30,
        marginRight: 30,
        backgroundColor: '#00BCD4',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff'
    },
    txt: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        justifyContent: 'space-around'
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
    }
})

export default ThemeView;