export function PostFavouriteThemes(selected, navigation) {
    const route = "/mesthemes"
    const url = new URL(route, 'http://localhost:5000/')
    url.searchParams.append('listethemes', selected)
    console.log("Requesting " + url.toString())
    fetch(url, {
      method : 'POST'
    }
    ).then((response) => preferencesReaction(response, navigation))
  }

function preferencesReaction (answer, navigation){
  switch(answer.status){
    case 201 : 
      alert ("Préférences enregistrées !") ;
      console.log(answer[0])
      navigation.navigate('Accueil') ;
      break ; 
  }
}

export default PostFavouriteThemes;
  