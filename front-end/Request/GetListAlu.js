export default function GetListAlu(updateFunction, token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MTI1MjE0OTIsImlhdCI6MTYxMjQzNTA4Nywic3ViIjo0fQ.1whutwBUkiZ2leq8gPbiuzvoySEtsASCxLmh0vhIy9w") {
    const route = "/meslistes/deja%lu"
    const url = new URL(route, 'http://localhost:5000/')
    url.searchParams.append('token', token)
    console.log("Requesting " + url.toString())
    fetch(url, {
        method: 'GET'
    }
    ).then(updateFunction).then((response) => console.log("liste alu : " + response))
}