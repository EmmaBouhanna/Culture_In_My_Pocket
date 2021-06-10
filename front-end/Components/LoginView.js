import  React, { useState } from 'react'
import { StyleSheet, View, Image, ImageBackground, Text, TouchableOpacity, TextInput, Button, justifyContent} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import TryToConnect from '../Request/TryToConnect'
import GetListAlu from '../Request/GetListAlu'

const image = { uri: "https://image.freepik.com/vector-gratis/fondo-azul-suave-acuarela_3785-161.jpg" };

getTokenValue = async(setValue)=>{
  try {
    const value = await AsyncStorage.getItem('TOKEN').then((value) => (console.log('token' + value))).then(setValue(value))}
    catch(e){}
    console.log('hellooo')
  }


export function LoginView() {
    const [pseudo, setPseudo] = useState("defaultLogin")
    const [passWord, setPassWord] = useState("defaultPassWord")
    const navigation = useNavigation()
    const [token, setToken] = useState()
    

    return (
      <View  style={styles.main_container}>
        <ImageBackground source={image} style={styles.image}>
          <Image style={styles.logo} source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMZ3COy3CDtchK1KxmCKZbIcpTsHN6oUt5qw&usqp=CAU'}}/>
          <View style={styles.space0} />
          <TextInput   placeholder="Pseudo" style={styles.textinput} onChangeText={(txt) => { setPseudo(txt) }} />
          <View style={styles.space} />
          <TextInput secureTextEntry={true} placeholder="Password" style={styles.textinput} onChangeText={(txt) => { setPassWord(txt) }} />
          <View style={styles.space} />
          <TouchableOpacity style={styles.bttn}  onPress={() => {TryToConnect(pseudo, passWord, navigation) , getTokenValue(setToken)} }>
            <Text style={styles.txt}>LOGIN</Text>
          </TouchableOpacity>
        </ImageBackground>
      
      </View>
  )}



const styles = StyleSheet.create({
  main_container: {
      flex: 1,
      marginTop: 10
  },
  txt:{
    color: "white",
    fontSize: 20,
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
  space0:{
    height:100,
    width: '100%'
  },
  space:{
    height:20,
    width: '100%'
  },
  logo: {
    resizeMode: "center",
    flex:0.25,
    width:2,
    height:2
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


export default LoginView;