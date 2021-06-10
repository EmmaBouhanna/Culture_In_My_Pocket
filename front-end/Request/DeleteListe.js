import {token} from './TryToConnect'

export default function DelListe(listenom, TOKEN=token)  {
      const route = "/meslistes"
      const url = new URL(route, 'http://localhost:5000/')
      url.searchParams.append('listenom',listenom)
      url.searchParams.append('token', TOKEN)
      console.log("Requesting Delete list" + url.toString())
      fetch(url, {
        method : 'DELETE'
      }
      ).then((response) => console.log(response))
    }