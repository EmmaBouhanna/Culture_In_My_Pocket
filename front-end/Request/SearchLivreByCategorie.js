export function SearchLivreByCategorie(key,update) {
    const route = "/livres"
    const url = new URL(route, 'http://localhost:5000/')
    url.searchParams.append('categorie', '%'+key+'%')
    console.log("Requesting thème = " + key)
    fetch(url, {
      method : 'GET'
    }
    ).then((response) => response.json()).then(update).catch(
      (e) => {alert('Something went wrong ' + e.message)}
    )
  }

export default SearchLivreByCategorie ;