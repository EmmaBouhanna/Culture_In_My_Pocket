import React, { useState } from 'react'
import { StyleSheet, View, Image, Text, ImageBackground, TouchableOpacity, TextInput, Button } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import PostNewAccount from '../Request/PostNewAccount'
import DatePicker from 'react-native-date-picker'
import Icon from 'react-native-vector-icons/Foundation'


const image = { uri: "https://image.freepik.com/vector-gratis/fondo-azul-suave-acuarela_3785-161.jpg" };


export function SignInView() {
  const [pseudo, setPseudo] = useState()
  const [passWord, setPassWord] = useState()
  const navigation = useNavigation()
  const [presentation, setPresentation] = useState()
  const [date, setDate] = useState(new Date())
  return (
    <View style={styles.main_container}>
      <ImageBackground source={image} style={styles.image}>
        <Image style={styles.logo} source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMZ3COy3CDtchK1KxmCKZbIcpTsHN6oUt5qw&usqp=CAU' }} />
        <View style={styles.space} />
        <TextInput placeholder="Pseudo (*)" style={styles.textinput} onChangeText={(txt) => { setPseudo(txt) }} />
        <View style={styles.space} />
        <TextInput secureTextEntry={true} placeholder="Mot de passe (*)" style={styles.textinput} onChangeText={(txt) => { setPassWord(txt) }} />
        <View style={styles.space} />
        <Text style={styles.txt}>Date de naissance (*)</Text>
        <DatePicker
          mode='date'
          date={date}
          onDateChange={setDate} />
        <View style={styles.space} />
        <TextInput placeholder="Présentation" style={styles.textinput} onChangeText={(txt) => { setPresentation(txt) }} />
        <Text>* Champs obligatoires </Text>
        <TouchableOpacity style={styles.bttn} onPress={() => { PostNewAccount(pseudo, passWord, date, presentation, navigation) }}>
          <Text style={styles.txt1}>Inscris-toi!</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  )
}


const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    marginTop: 10
  },

  space: {
    height: 20,
    width: '100%'
  },
  txt: {
    color: "black",
    padding: 5,
    fontSize: 16,
    fontWeight: "normal",
    textAlign: "left",
    justifyContent: 'space-around'
  },
  txt1: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    justifyContent: 'space-around'
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
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"

  },
  logo: {
    resizeMode: "center",
    flex: 0.25,
    width: 2,
    height: 2

  },
  space0: {
    height: 100,
    width: '100%'
  },
  space: {
    height: 20,
    width: '100%'
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

})


export default SignInView;
