

import {encode} from 'base-64'

export function SearchLivreByTitle(key,updateFunction) {
    const route = "/livres"
    const url = new URL(route, 'http://localhost:5000/')
    url.searchParams.append('titre', '%'+key+'%')
    console.log("Requesting " + url.toString())
    fetch(url, {
      method : 'GET'
    }
    ).then((response) => response.json()).then(updateFunction).catch(
      (e) => {alert('Something went wrong ' + e.message)}
    )
  }

export default SearchLivreByTitle ;