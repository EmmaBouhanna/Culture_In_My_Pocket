import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, FlatList, View, Button, TextInput, TouchableOpacity, ScrollView, ImageBackground, RefreshControl } from 'react-native'
import GetListsUser from '../Request/GetListsUser'
import ListeItem from '../Components/ListeItem.js'
import PostNewList from '../Request/CreateNewList.js'
import DelListe from '../Request/DeleteListe.js'
import Modal from 'react-native-modal'
import Icon from 'react-native-vector-icons/Ionicons'
import { set } from 'react-native-reanimated';

export default function ListesView() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [lists, setLists] = useState([]);
    const [Newlists, setNewLists] = useState([]);
    const [Dellists, setDelLists] = useState([]);
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [refreshing, setRefreshing] = useState(false)

    // useEffect(() => {GetListsUser(setLists), setIsLoaded(false)}, [Newlists, Dellists])

    const togglePopup = () => { setPopupVisible(!isPopupVisible) }
    const image = { uri: "https://image.freepik.com/vector-gratis/fondo-azul-suave-acuarela_3785-161.jpg" };

    useEffect(() => setRefreshing(false), lists)

    if (isLoaded) {
        return (
            <ImageBackground source={image} style={styles.image}>
                <ScrollView>
                    <View style={styles.icon_container}>
                        <Text style={styles.title_text}>Mes Listes</Text>

                        <TouchableOpacity style={styles.bttn_icon_container} onPress={togglePopup}>
                            <Icon name='add-circle' style={styles.icon} size={30} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ justifyContent: 'center' }}>
                        <Modal isVisible={isPopupVisible} style={styles.popup} onBackdropPress={togglePopup}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.popup_text}> Créer une liste :</Text>
                                <TextInput placeholder="Nom de ta liste" style={styles.textinput} onChangeText={(txt) => { setNewLists(txt) }} />
                                <TouchableOpacity style={styles.bttn} onPress={(evt) => { PostNewList(Newlists), setIsLoaded(false), togglePopup }}>
                                    <Text style={styles.txt} > Créer </Text>
                                </TouchableOpacity>
                            </View>
                        </Modal>
                    </View>

                    <FlatList
                        data={lists}
                        keyExtractor={(item) => item[0]}
                        renderItem={({ item }) => <ListeItem list={item} refresh={setIsLoaded}/>}
                        refreshControl= {<RefreshControl refreshing={refreshing} onRefresh={() => {GetListsUser(setLists); setRefreshing(true); setTimeout(() => setRefreshing(false), 2500)}} />} 
                    />
                    <View style={styles.space0} />
                </ScrollView>
            </ImageBackground>
        )
    }
    else {
        GetListsUser(setLists);
        setIsLoaded(true);

    }
}

const styles = StyleSheet.create({
    txt: {
        color: "white",
        fontSize: 15,
        fontWeight: "bold",
        textAlign: "center",
    },
    icon_container: {
        flexDirection: 'column',
        alignContent: 'space-between',
        alignItems: 'center'
    },
    button_icon_container: {
        marginTop: -40,
        flexDirection: 'row',

    },
    icon: {
        flexDirection: 'row',
    },
    textinput: {
        backgroundColor: 'white',
        borderRadius: 6,
        marginLeft: 5,
        marginRight: 5,
        height: 50,
        borderColor: '#00BCD4',
        borderWidth: 2,
        paddingLeft: 5
    },
    bttn: {
        marginTop: 10,
        paddingTop: 15,
        paddingBottom: 15,
        marginLeft: 100,
        marginRight: 100,
        backgroundColor: '#00BCD4',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff'
    },
    popup: {
        flex: 1,
        backgroundColor: 'white',
        maxHeight: 185,
        justifyContent: 'center',
        textAlign: 'center',
        alignContent: 'center',

    },
    title_text: {
        fontWeight: 'bold',
        fontSize: 35,
        flexWrap: 'wrap',
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        marginBottom: 10,
        color: '#00BCD4',
        textAlign: 'center'
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
    space0: {
        height: 50,
        width: '100%'
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
})
