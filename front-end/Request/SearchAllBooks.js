

import {encode} from 'base-64'

export function SearchAllBooks(key,updateFunction) {
    const route = "/auteurs/"+key
    const url = new URL(route, 'http://localhost:5000/')
    console.log("Requesting " + url.toString())
    fetch(url, {
      method : 'GET'
    }
    ).then((response) => response.json()).then(updateFunction).catch(
      (e) => {alert('Something went wrong ' + e.message)}
    )
  }

export default SearchAllBooks;