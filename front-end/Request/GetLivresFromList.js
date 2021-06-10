import {encode} from 'base-64'
import {token} from './TryToConnect'

export default function GetLivresFromList(nomliste, updateFunction, TOKEN=token) {
    const route = "/meslistes/" + nomliste
    const url = new URL(route, 'http://localhost:5000/')
    url.searchParams.append('token', TOKEN)
    console.log(nomliste)
    console.log("Requesting : get book from list" + url.toString())
    fetch(url, {
        method: 'GET'
    }
    ).then((response) => response.json()).then(updateFunction).catch(
        (e) => {alert('Something went wrong ' + e.message)}
      )
}