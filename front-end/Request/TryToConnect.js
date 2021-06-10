

import { encode } from 'base-64'
import { useNavigation } from '@react-navigation/native'
import { AsyncStorage } from "@react-native-async-storage/async-storage"




var token = ''
function TryToConnect(pseudo, password, navigation) {

  const route = "/login"
  const url = new URL(route, 'http://localhost:5000/')
  url.searchParams.append('pseudo', pseudo)
  url.searchParams.append('password', password)
  console.log("Requesting " + url.toString())
  fetch(url, {
    method: 'GET'
  }
  ).then((response) => response.json()).then((data) => { connectionReaction(data, navigation) }).then((data) => console.log(data))

  

  function connectionReaction (connectionAnswer, navigation) { 
    console.log('status'+connectionAnswer['status'])
    switch(connectionAnswer['status']){
      case 404 :
      alert ("Le mot de passe ou le pseudo que vous avez saisi est incorrect ") ;
      break ;
      case 401 :
      alert ("Le mot de passe ou le pseudo que vous avez saisi est incorrect");
      case 400 :
      alert ("Le mot de passe ou le pseudo que vous avez saisi est incorrect");
      break ;
      case 200 :
      token = connectionAnswer['TOKEN']
      navigation.navigate('TabNavigation');
      console.log('my Answer'+connectionAnswer['TOKEN']) ; 
      break ; 
    } 
  }
}

export {token}
export default TryToConnect ;
