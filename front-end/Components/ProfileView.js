import  React, { useState, useEffect } from 'react'
import { StyleSheet, View, Image, FlatList, ImageBackground, Text, ScrollView, TouchableOpacity, TextInput, Button, justifyContent, ActivityIndicator} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import TryToConnect from '../Request/TryToConnect'
import GetProfile from '../Request/GetProfile'
import GetThemes from '../Request/GetThemes'
import ThemeItemLarge from './ThemeItemLarge'
import Icon from 'react-native-vector-icons/Ionicons'


const image = { uri: "https://image.freepik.com/vector-gratis/fondo-azul-suave-acuarela_3785-161.jpg" };

export function ProfileView(props) {
    const [profile, setProfile] = useState({}) 
    const [isLoaded, setIsLoaded] = useState(false)
    const [pseudo, setPseudo] = useState([])
    const [date, setDate] = useState([])
    const [presentation, setPresentation] = useState([])
    const [themes, setThemes] = useState([])
    const navigation = useNavigation();
    useEffect(()=>{setPseudo(profile[1]); setDate(profile[3]); setPresentation(profile[4]); console.log('mon profil'+profile)}, [profile])

    if(!isLoaded) {
      GetProfile(setProfile) ;
      GetThemes(setThemes) 
      setIsLoaded(true);
      return(<ActivityIndicator/>)

    } 
    else {

      return (
        <ImageBackground source={image} style={styles.image}>
          
            <View style={styles.head_container}>
            <Text style={styles.titre}>Mon profil</Text>
            </View>
            
            <View style={styles.themes}>
            <Text style={styles.text}> Vos informations </Text>
            </View>
        <View style={styles.main_container_info}>
          <View>
            <Text style={styles.txt}>Pseudo : {pseudo}</Text>
            <Text style={styles.txt}>Date de naissance : {date}</Text>
            <Text style={styles.txt}>Presentation : {presentation}</Text>
            </View>
        </View>
        <View style={styles.themes}>
            <Text style={styles.text}> Vos thèmes de prédilection </Text>
            </View>
        <View style={styles.main_container}>
        <FlatList 
                    data={themes}
                    keyExtractor={(item) => item[0]}
                    renderItem={({ item }) => <ThemeItemLarge theme={item}/> }
                /><View/>
                
               
        <View style = {styles.icon_container}>
      
        <TouchableOpacity style={styles.bttn_icon_container} onPress={(evt)=>{navigation.popToTop()}}>
                            <Icon name='log-out-outline' style={styles.icon} size={30} />
                        </TouchableOpacity>    
      </View>
        </View>
        
        
        </ImageBackground>
    )
    }

    }
    const styles = StyleSheet.create({
      icon_container: {
        flex : 4, 
        flexDirection: 'column',
        alignContent: 'space-between',
        alignItems: 'center'
    },
      themes: {
        flexDirection: 'row',
        flex : 1,
        borderColor: '#00BCD4',
        backgroundColor: '#00BCD4',
        borderWidth: 1,
        padding: 1,
        marginVertical: 5,
        justifyContent: 'center'
    },
      text: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        justifyContent: 'space-around'
    },
      head_container:{
        flex: 4,
        flexDirection: "column",
        justifyContent: 'center'

    },
    titre: {
      color: "#00BCD4",
      fontSize: 40,
      fontWeight: "bold",
      textAlign: "center",
      justifyContent: 'space-around'
  },
      main_container: {
        flex: 20,
        marginTop: 10,
        justifyContent:'space-around'
      },
      main_container_info: {
        flex: 6,
        marginTop: 10,
        justifyContent:'space-around'
      },
      container_modif: {
        flex: 2,
        marginTop: 10,
        justifyContent:'space-around'
      },
      icon: {
        flexDirection: 'row',
    },
      image: {
        flex:1,
        resizeMode: "cover",
        justifyContent: "center"
     },
     button_icon_container: {
      marginTop: -40,
      flexDirection: 'row',

  },
      txt:{
        color: "black",
        padding: 5,
        fontSize: 18,
        fontWeight: "normal",
        textAlign: "left",
      }


    })

  






export default ProfileView;