
import {encode} from 'base-64'

export function SearchLivreByFilter(key, filtre, updateFunction) {
    const route = "/livres"
    const url = new URL(route, 'http://localhost:5000/')
    if (filtre==='note'){
      url.searchParams.append(filtre, key)
    }
    else{
    url.searchParams.append(filtre, '%'+key+'%')
    }
    console.log("Requesting " + url.toString())
    fetch(url, {
      method : 'GET'
    }
    ).then((response) => response.json()).then(updateFunction).catch(
      (e) => {alert('Something went wrong ' + e.message)}
    )
  }

export default SearchLivreByFilter ;