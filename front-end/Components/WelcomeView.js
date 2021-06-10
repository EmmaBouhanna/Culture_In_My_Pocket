//Components/WelcomeView.js

import  React, { useState }from 'react'
import { StyleSheet, View, Image, ImageBackground, Text, TouchableOpacity, TextInput, Button} from 'react-native'
import { useNavigation } from '@react-navigation/native';


const image = { uri: "https://image.freepik.com/vector-gratis/fondo-azul-suave-acuarela_3785-161.jpg" };



export function WelcomeView(){
    const navigation = useNavigation()
    return (
        <View  style={styles.main_container}>
        <ImageBackground source={image} style={styles.image}>    
        <Image style={styles.logo} source={require('../Images/logo_small.png')}/>
        <View style={styles.space}/>
        <Text style={{color:'black', fontSize:20, textAlign:'center'}}>Bienvenue sur CIMP !</Text>
        <View style={styles.space}/>
        <Text style={styles.txt2}>Déjà inscrit ? </Text>
        <TouchableOpacity style={styles.bttn}  onPress={() => navigation.navigate('Login')}>
              <Text style={styles.txt1}>Connecte-toi!</Text>
        </TouchableOpacity>
        <View style={styles.space}/>
        <Text style={styles.txt2}>Tu souhaites nous rejoindre ?</Text>
        <TouchableOpacity style={styles.bttn}  onPress={() => navigation.navigate('Inscription')}>
           <Text style={styles.txt1}>Inscris-toi!</Text>
        </TouchableOpacity>            
        </ImageBackground>
        </View>)}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    marginTop: 10
  },
  
  space:{
    height:20,
    width: '100%'
},
  txt:{
    color: "black",
    padding: 5,
    fontSize: 16,
    fontWeight: "normal",
    textAlign: "left",
    justifyContent:'space-around'
},
  txt1:{
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    justifyContent:'space-around'
}, 
txt2:{
  color: "black",
  fontSize: 15,
  fontWeight: "bold",
  textAlign: "center",
  justifyContent:'space-around'
},    
  bttn:{
    marginTop:10,
    paddingTop:15,
    paddingBottom:15,
    marginLeft:30,
    marginRight:30,
    backgroundColor:'#00BCD4',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff'
},
  image: {
    flex:1,
    resizeMode: "cover",
    justifyContent: "center"

},  
  logo: {
    resizeMode: "center",
    flex:0.5,
    
},
  space0:{
    height:100,
    width: '100%'
},
  space:{
    height:20,
    width: '100%'
},    
  textinput: {
    backgroundColor:'white',
    borderRadius:6,
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: '#00BCD4',
    borderWidth: 2,
    paddingLeft: 5
  }
})

export default WelcomeView ;