import {token} from './TryToConnect'

export default function PostBookToList(livreid, listenom, TOKEN=token) {
    const route = "/meslistes/"+listenom
    const url = new URL(route, 'http://localhost:5000/')
    url.searchParams.append('lid', livreid)
    url.searchParams.append('token', TOKEN)
    console.log("Requesting " + url.toString())
    fetch(url, {
      method : 'POST'
    }
    ).then((response) => console.log(response))
  }

// Récupérer la bonne version du back pour avoir le post qui est défini et surtout récup les tokens


