#! /usr/bin/env python3
#
# Test against a running local kiva server, including expected failures.
#
# The test assumes some initial data and resets the database
# to the initial state, so that it can be run several times
# if no failure occurs.
#
# The test could initialiaze some database, but I also want to
# use it against a deployed version and differing databases,
# so keep it light.

import re
from os import environ as ENV
from typing import Dict, Union, Tuple

# local flask server test by default
URL = ENV.get('APP_URL', 'http://0.0.0.0:5000')

# real (or fake) authentication

AUTH: Dict[str, Union[str, None]] = {}
if 'APP_AUTH' in ENV:
    # we are running with a real server with authentication
    for up in ENV['APP_AUTH'].split(','):
        user, pw = up.split(':', 2)
        AUTH[user] = pw
    real_auth = True
else:
    # else we assume 3 test users
    AUTH['19boubou'] = None
    AUTH['cimp'] = None
    AUTH['19trin'] = None
    AUTH['19frode'] = None
    real_auth = False

# reuse connections…
from requests import Session
requests = Session()

#
# Convenient function to send an http request and check the result with a re
#
# Note: the "login" parameter special handling allows to run auth tests on a
# local server without actual authentication. By default, ADMIN is assumed, use
# None to skip auth.
#
# check_api(method: str,         # 'GET', 'POST', 'PUT', 'PATCH', 'DELETE'
#           path: str,           # '/some/url'
#           status: int,         # 200, 201, 204, 400, 401, 403, 404…
#           content: str,        # regexpr to match: r'\[.*\]', r'"calvin"'…
#           login: str,          # auth: login=ADMIN (defaut), WRITE or READ
#           data: Dict[str,str], # http parameters: data={"id": "calvin, …}
#           json: Dict[str,str]) # json parameters: json={"id": "hobbes", …}
#
# Examples:
#
#    check_api("PUT", "/store", 405)
#    check_api("GET", "/store", 200, r'"hobbes"')
#    check_api("POST", "/store", 201, data={"key": "Roméo", "val": "Juliette"})
#    check_api("POST", "/store", 201, json={"key": "Roméo", "val": "Juliette"})
#    check_api("DELETE", "/store", 204)
#
def check_api(method: str, path: str, status: int, content: str = None,
              **kwargs):
    # work around Werkzeug inability to handle authentication transparently
    # auth: Union[Tuple[str, Union[str, None]], None] = None
    # if login is not None:
    #     if real_auth:
    #         # real http server which handles authentication
    #         auth = (login, AUTH[login])
    #     else:
    #         # test against local http server, apply work around
    #         if 'json' in kwargs:
    #             kwargs['json']['LOGIN'] = login
    #         elif 'data' in kwargs:
    #             kwargs['data']['LOGIN'] = login
    #         else:
    #             kwargs['data'] = {'LOGIN': login}
    # else:
    #     auth = None
    r = requests.request(method, URL + path,
                         **kwargs)  # type: ignore
    assert r.status_code == status
    if content is not None:
        assert re.search(content, r.text, re.DOTALL) is not None
    return r.text

# sanity check
def test_sanity():
    assert re.match(r"https?://", URL)
    # assert 'cimp' in AUTH
    # assert '19trin' in AUTH
    # assert '19frode' in AUTH
    # assert '19boubou' in AUTH

# /whatever # BAD URI
def test_whatever():
    check_api('GET', '/whatever', 404)
    check_api('POST', '/whatever', 404)
    check_api('DELETE', '/whatever', 404)
    check_api('PUT', '/whatever', 404)
    check_api('PATCH', '/whatever', 404)

# /version
def test_version():
    # only GET is implemented
    # check_api('GET', '/version', 200, '"CIMP"', login='cimp')
    check_api('GET', '/version', 200, '"CIMP"')
    # check_api('GET', '/version', 403, '"kiva"', login=NONE)
    check_api('POST', '/version', 405)
    check_api('DELETE', '/version', 405)
    check_api('PUT', '/version', 405)
    check_api('PATCH', '/version', 405)


'''Search Engine'''
# GET /livres?langue=&note=&titre=
def test_get_books():
    check_api('GET', '/livres', 200, r'.', data={'note':2})
    check_api('GET', '/livres', 200, r'.', data={'langue':'Français'})

#GET /themes
def test_get_themes():
    check_api('GET', '/themes', 200, r'.')

# GET /themes/<string:tnom>
def test_get_books_themes():
    check_api('GET', '/themes/Angleterre', 200, r'.')
    check_api('GET', '/themes/coucou', 404)

# GET /auteurs/<string:anom>
def test_get_books_aut():
    check_api('GET', '/auteurs/Austen', 200, r'.')

# GET /collections
def test_get_collections():
    check_api('GET', '/collections', 200, r'.')

# GET /collections/<int:cid>
def test_books_collections():
    check_api('GET', '/collections/2', 200, r'.')
    check_api('GET', '/collections/345', 404)




''' Methods that require Authentification'''

# GET /users/<int:userid>
def test_user_auth():
    check_api('POST', '/signup', 402, data={'pseudo':'mathieu', 'password':'yo'})
    check_api('POST', '/signup', 201, r'.', data={'pseudo':'marina', 'password':'jesuisbelle'})
    check_api('GET', '/login', 400, data={'pseudo':'didou'})
    token_auth = check_api('GET', '/login', 200, data={'pseudo':'marina','password':'jesuisbelle'})
    check_api('GET', '/monprofile', 200, data={'token':token_auth[14:-22]}) # because of regular expressions


# # GET /users
# def test_get_all_users():
#     check_api('GET', '/users', 200, r'.')


# GET /users/<int:userid>/listes or POST /users/<int:userid>/listes?listenom=
def test_workflow_listes_of_user():
    '''Sign up a new user and get its token and id'''
    check_api('POST', '/signup', 201, data={'pseudo':'mathieu','password':'coucou1234'})
    token_auth = check_api('GET', '/login', 200, data={'pseudo':'mathieu','password':'coucou1234'})
    token_auth = token_auth[14:-22]
    '''Post its first list'''
    # no authentification
    check_api('POST', '/meslistes', 401, data={'listenom':'chill'}) 
    # authentification but no list to post
    check_api('POST', '/meslistes', 400, data={'token':token_auth}) 
    # perfect query
    check_api('POST', '/meslistes', 201, data={'token':token_auth,'listenom':'chill'})

    '''Get access to its lists'''
    # no authentification given
    check_api('GET', '/meslistes', 401) 
    check_api('GET', '/meslistes', 200, data={'token':token_auth})

    '''Post a new book in his new list'''
    check_api('POST', '/meslistes/chill', 201, data={'lid':1,'token':token_auth})

    '''Get access to the books in his new list'''
    # no authorisation given
    check_api('GET', '/meslistes/chill', 401)
    # authorisation given but list does not exist
    check_api('GET', '/meslistes/woua', 404, data={'token':token_auth})
    # Perfect query
    check_api('GET', '/meslistes/chill', 200, data={'token':token_auth})
    '''Delete a book from a list'''
    # no authentification
    check_api('DELETE', '/meslistes/chill', 401)
    # no book to delete
    check_api('DELETE', '/meslistes/chill', 400, data={'token':token_auth})
    # perfect query
    check_api('DELETE', '/meslistes/chill', 204, data={'lid':1,'token':token_auth})
    

    
    
