import {token} from './TryToConnect'

export default function PostNewListe(listenom, TOKEN=token)  {
    const route = "/meslistes"
    const url = new URL(route, 'http://localhost:5000/')
    url.searchParams.append('listenom',listenom)
    url.searchParams.append('token', TOKEN)
    console.log("Requesting Create new list" + url.toString())
    fetch(url, {
      method : 'POST'
    }
    ).then((response) => console.log(response))
  }

 