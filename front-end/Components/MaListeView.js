import React, {useState} from 'react'
import { StyleSheet, View, ScrollView, Image, Text, TouchableOpacity, ImageBackground, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import GetLivresFromList from '../Request/GetLivresFromList'
import LivreItem from './LivreItem'

const image = { uri: "https://image.freepik.com/vector-gratis/fondo-azul-suave-acuarela_3785-161.jpg" };

export default function MaListeView(props) {
    const titre = props.titre
    const listeid = props.listeid
    const navigation = useNavigation()
    const [isLoaded, setIsLoaded] = useState(false)
    const [listelivres, setListelivres] = useState([])

    if (isLoaded) {
        console.log("Liste livre : " + listelivres)
        return (
            <ImageBackground source={image} style={styles.image}>
            <View>
                <Text style={styles.titre} >{titre}</Text>
                <ScrollView>
                    <FlatList
                        data={listelivres}
                        keyExtractor={(item) => item[0]}
                        renderItem={({ item }) => <LivreItem livre={item} />}
                    />
                </ScrollView>

            </View>
            </ImageBackground>)
    }
    else {
        GetLivresFromList(encodeURIComponent(titre), setListelivres);
        setIsLoaded(true);

    }
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        resizeMode: "cover",
    },
    titre: {
        color: "#00BCD4",
        fontSize: 40,
        fontWeight: "bold",
        textAlign: "center",
        justifyContent: 'space-around'
    },      
    
})
