import {encode} from 'base-64'

export function SearchAuthorByPseudo(key, filter, updateFunction) {
    const route = "/auteurs"
    const url = new URL(route, 'http://localhost:5000/')
    if (filter === 'note'){
      url.searchParams.append('pseudo', key)
    }  
    else{
      url.searchParams.append(filter, '%'+key+'%') // pour avoir les auteurs qui correspondent au filtre!
    }
    console.log("Requesting " + url.toString())
    return(
      fetch(url, {
      method : 'GET'
    }
    ).then((response) => response.json()).then(updateFunction).catch(
      (e) => {alert('Something went wrong ' + e.message)}
    ))
  }

export default SearchAuthorByPseudo ;