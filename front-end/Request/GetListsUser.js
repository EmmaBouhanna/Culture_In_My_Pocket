import {encode} from 'base-64'
import {token} from './TryToConnect'

export default function GetListsUser(updateFunction) {
    const route = "/meslistes"
    const url = new URL(route, 'http://localhost:5000/')
    url.searchParams.append('token', token)
    console.log("Requesting get lists user" + url.toString())
    fetch(url, {
        method: 'GET'
    }
    ).then((response) => response.json()).then(updateFunction).catch(
        (e) => {alert('Something went wrong ' + e.message)}
      )
}
