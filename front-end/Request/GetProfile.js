import {encode} from 'base-64'
import {token} from './TryToConnect'

export function GetProfile(updateFunction) {
    const route = "/monprofile"
    const url = new URL(route, 'http://localhost:5000/')
    url.searchParams.append('token', token)
    console.log("Requesting " + url.toString())
    return(fetch(url, {
      method : 'GET'
    }
    ).then((response) => response.json()).then((response)=>{updateFunction(response[0])}).catch(
      (e) => {alert('Something went wrong ' + e.message)}
    ))
  }

export default GetProfile ;