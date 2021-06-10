
import {encode} from 'base-64'

export function PostNewAccount(pseudo, password, date, presentation, navigation) {
    const route = "/signup"
    
    const url = new URL(route, 'http://localhost:5000')

    url.searchParams.append('pseudo', pseudo)
    url.searchParams.append('password', password)
    url.searchParams.append('naissance', date.toISOString().split('T')[0])
    url.searchParams.append('pres', presentation)
    console.log('Requesting' + url.toString())

    fetch(url, {
      method : 'POST'
    }
    ).then((response) => signUpReaction(response, navigation)
    )


  }

function signUpReaction (answer, navigation){
  switch(answer.status){
    case 401 :
      alert("Vous devez entrer un mot de passe et un pseudo")
      break ;
    case  402 : 
      alert("Le mot de passe doit contenir au moins 8 caractères")
      break ;
    case 403 :
      alert("Le pseudo est déjà utilisé")
      break ;
    case 201 : 
      alert ("Vous avez rejoint CIMP !") ;
      console.log(answer['resultat'])
      navigation.navigate('Theme') ;
      break ; 
  }
}





export default PostNewAccount;