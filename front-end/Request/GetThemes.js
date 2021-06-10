import {token} from './TryToConnect'

export function GetThemes(update) {
    const route = "/mesthemes"
    const url = new URL(route, 'http://localhost:5000/')
    url.searchParams.append('token', token)
    console.log("Requesting " + url.toString())
    return(fetch(url, {
      method : 'GET'
    }
    ).then((response) => response.json()).then((data) => {update(data);console.log(data)}).catch(
      (e) => {alert('Something went wrong ' + e.message)}
    ))
  }

export default GetThemes ;
