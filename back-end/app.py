import logging as log
log.basicConfig(level=log.INFO)

import datetime as dt
started = dt.datetime.now()

# get running version information
with open("VERSION") as VERSION:
    branch, commit, date = VERSION.readline().split(" ")

# start flask service
from flask import Flask, jsonify, request, Response
app = Flask("CIMP")

# load configuration, fall back on environment
from os import environ as ENV

# security for password
from werkzeug.security import generate_password_hash, check_password_hash
import jwt

if "APP_CONFIG" in ENV:
    app.config.from_envvar("APP_CONFIG")
    CONF = app.config  # type: ignore
else:
    CONF = ENV  # type: ignore

# create $database connection and load queries
import anodb  # type: ignore
db = anodb.DB(
    CONF["DB_TYPE"], CONF["DB_CONN"], CONF["DB_SQL"], CONF["DB_OPTIONS"]
)

#
# Request parameters as a dict, in json, form or args
#
PARAMS = {}

def set_params():
    global PARAMS
    PARAMS = request.values if request.json is None else request.json

app.before_request(set_params)

# ensures commit after each request
def must_commit(res:Response):
    db.commit()
    return(res)

app.after_request(must_commit)

# define rights
def is_admin(userid):
    res = db.isAdmin(userid=userid)
    db.commit()
    app.logger.debug(res[0][0])
    return(res[0][0]) # returns boolean

def can_read(userid):
    res = db.canRead(userid=userid)
    db.commit()
    return(res[0][0])

def can_write(userid):
    res = db.canWrite(userid=userid)
    db.commit()
    return(res[0][0])


#
# GET /version
#
# general information about the application
#
@app.route("/version", methods=["GET"])
def get_version():
    now = db.now()[0][0]
    db.commit()
    return jsonify(
        {
            "app": app.name,
            "variant": "anodb",
            "version": 4,
            "db": CONF["DB_TYPE"],
            "started": str(started),
            "branch": branch,
            "commit": commit,
            "date": date,
            "now": now,
        }
    ), 200

'''Search Engine
Everyone can have access to it even though not connected
'''

# GET /livres?categorie=&titre=&note=
@app.route("/livres", methods=['GET'])
def get_books():
    '''
    Returns all the books available filtered by one or several params
    :params
        - categorie (string default %)
        - titre (string default %)
        - note (float default 0) : the minimal average note we want
    '''
    res=db.get_books(categorie=PARAMS.get('categorie', '%'), titre=PARAMS.get('titre', '%'), note=PARAMS.get('note', 0.0))
    return(jsonify(res), 200)

#GET /themes
@app.route("/themes", methods=['GET'])
def get_theme():
    '''
    Returns all the themes of the database
    '''
    res=db.get_themes()
    return(jsonify(res), 200)

# GET /auteurs?prenom=&nom=&pseudo=
@app.route("/auteurs", methods=['GET'])
def get_auteurs():
    '''
    Returns all the authors filtered by one or several params
    :params
        - prenom (string default %)
        - nom (string default %)
        - pseudo (string default %)
        - categorie (string default %)
        - minimal note (float default 0.0)
    '''
    res = db.get_authors(categorie=PARAMS.get('categorie', '%'), titre=PARAMS.get('titre', '%'), note=float(PARAMS.get('note', 0.0)))
    db.commit()
    return(jsonify(res), 200)

# GET /themes/<tnom>
@app.route("/themes/<string:tnom>", methods=['GET'])
def get_books_of_theme(tnom):
    '''
    Returns all the books matching a given theme
    '''
    res = db.get_books_of_theme(nom=tnom)
    if res==[]:
        return(Response(status=404)) # case there is no theme that correspond to the one given
    else:
        return(jsonify(res), 200)

# GET /auteurs/<anom>
@app.route("/auteurs/<string:anom>", methods=['GET'])
def get_books_of_aut(anom):
    '''
    Returns all the books whose author have the same name,
    pseudo, or first name than the one that is searched
    '''
    res = db.get_books_of_aut(anom=anom)
    return(jsonify(res), 200)

# GET /collections
@app.route("/collections", methods=['GET'])
def get_collections():
    '''
    Returns all collections
    '''
    res = db.get_collections()
    return(jsonify(res), 200)

# GET /collections/<cid>
@app.route("/collections/<int:cid>", methods=['GET'])
def get_books_collections(cid):
    '''
    Returns all the books of a given collection 
    (symbolized by its id because two collections can have the same name)
    '''
    res = db.get_books_of_collec(cid=cid)
    if res == []:
        return(Response(status=404))
    else:
        return(jsonify(res), 200)


'''
Authentification
'''

SECRET_KEY = CONF['SECRET_KEY']
def encode_auth_token(userid):
    """
    Generates the Auth Token
    :return: string
    """
    try:
        payload = {
            'exp': dt.datetime.utcnow() + dt.timedelta(days=1, seconds=5),
            'iat': dt.datetime.utcnow(),
            'sub': userid
        }
        encoded = jwt.encode(payload, SECRET_KEY, algorithm='HS256')
        return (encoded)
    except Exception as e:
        return e

def decode_auth_token(auth_token):
    """
    Decodes the auth token
    :param auth_token
    :return: integer|string
    """
    try:
        payload = jwt.decode(auth_token, SECRET_KEY, algorithms=["HS256"])
        return (payload['sub']) # which is the userid
    except jwt.ExpiredSignatureError:
        return 'Signature expired. Please log in again.'
    except jwt.InvalidTokenError:
        return 'Invalid token. Please log in again.' 

# Verifies the authorization of the user through its token
# One user can only have access to his information for now
# def verify_token(userid, token):
#     if token == '':
#         return(False)
#     else:
#         decoded = decode_auth_token(token)
#         app.logger.debug('key decoded', decoded)
#         if userid == decoded:
#             return(True) 
#         else:
#             return(False)

# POST /signup
@app.route('/signup', methods=['POST'])
def post_user():
    '''
    Post a new user in the database
    :return : id of the user
    '''
    pseudo, mdp = PARAMS.get('pseudo', None), PARAMS.get('password', None)
    naissance, pres = PARAMS.get('naissance', None), PARAMS.get('pres', 'not given')
    pseudo_existing = [x[1] for x in db.get_all_users()]
    if pseudo is None or mdp is None:
        return('You need to add a login and a password',  401)
    elif len(mdp)<8:
        return ('Password needs at least 8 characters', 402)
    elif pseudo in pseudo_existing:
        return ('You are already a member', 403)
    else:
        mdp = generate_password_hash(mdp)
        res = db.post_user(pseudo=pseudo, mdp=mdp, naissance=naissance, pres=pres) # we get the corresponding userid
        # create an empty list 'deja lu' for new user
        app.logger.debug(res[0])
        db.post_a_list(userid=res[0], nom='Deja lu')
        return('You are in', 201)

# GET /mesthemes or POST /mesthemes?listethemes
@app.route('/mesthemes', methods=['POST', 'GET'])
def post_themes():
    '''
    GET : returns all the themes of a given user
        :params
            - token (string default '')
    POST : post the preferences of a user
         :params
            - listenom (list defaut '')
    '''
    listethemes = list(PARAMS.get('listethemes', ''))
    app.logger.debug(listethemes)
    if listethemes == '':
        return('you need to select some themes', 400)
    else:
        if request.method == 'POST':
            userid = db.get_lastuser()[0]
            app.logger.debug(userid)
            listethemes = ''.join(listethemes)
            listethemes = listethemes.split(',')
            app.logger.debug(listethemes)
            for x in listethemes:
                app.logger.debug(x)
                db.post_themes(userid=userid, tid=x)
            return('Saved preferences', 201)
        else:
            token = PARAMS.get('token', '')
            app.logger.debug('token user', token)
            if token == '':
                return('you need to log in', 401)
            else:
                userid = decode_auth_token(token)
                if type(userid)==str:
                    return('you need to log in', 401)
                else:
                    res = db.get_suggestions(userid=userid)
                    return(jsonify(res), 200)
                



# GET /login?pseudo=&password=
@app.route("/login", methods=['GET'])
def is_correct():
    '''
    Returns the token and the id of the user if the login/password is correct
    '''
    if not 'pseudo' in PARAMS or not 'password' in PARAMS:
        return(jsonify({'status':400}), 400)
    else:
        res = db.verify_auth(pseudo=PARAMS.get('pseudo'))
        app.logger.debug('veryfing auth', res)
        if res == []: # in case the user does not exist
            return(jsonify({'status':404}), 404)
        elif check_password_hash(res[0][0],PARAMS.get('password')):
            id = db.get_userid(login=PARAMS.get('pseudo'))
            app.logger.debug('user id corresponding', id[0][0])
            app.logger.debug('token given', encode_auth_token(id[0][0]))
            return(jsonify({'TOKEN':encode_auth_token(id[0][0]), 'status' :200}), 200)
        else:
            return(jsonify({'TEXT':'wrong password', 'status' :401}), 401)


'''Methods that require authentification'''

@app.route("/users", methods=['GET'])
def get_all_users():
    '''
    Returns all users, only for Admin
    :params token
    '''
    token = PARAMS.get('token', '')
    if token == '':
        return('you need to log in', 401)
    else:
        userid = decode_auth_token(token)
        if type(userid)==str:
            return('you need to log in', 401)
        else:
            if is_admin(userid):
                res = db.get_all_users()
                return(jsonify(res), 200)
            else:
                return(" You don't have permission", 403)


# GET /monprofile or PUT|PATCH /monprofile?naissance=&pres=
@app.route('/monprofile', methods=['GET', 'PUT', 'PATCH'])
def get_user():
    '''
    Get my information or change it
    :params (for all requests) : token
    :params(for PUT and PATCH)
        - naissance (date default none)
        - pres (string default none)
    '''
    token = PARAMS.get('token', '')
    app.logger.debug('token user', token)
    if token == '':
        return('you need to log in', 401)
    else:
        userid = decode_auth_token(token)
        if type(userid)==str:
            return('you need to log in', 401)
        else:
            if request.method == 'GET':
                res = db.get_user(userid=userid)
                if res == []: # useless but kept in case
                    return(Response(status=404))
                else:
                    return(jsonify(res), 200)
            else:
                naissance, pres = PARAMS.get('naissance', None), PARAMS.get('pres', None)
                if naissance is not None:
                    db.update_user_naissance(naissance=naissance, userid=userid)
                if pres is not None:
                    db.update_user_pres(pres=pres, userid=userid)
                
                return(Response(200))

# GET /meslistes or POST /meslistes?listenom= or DELETE /meslistes?listenom
@app.route('/meslistes', methods=['GET', 'POST', 'DELETE'])
def get_lists_of_user():
    '''
    GET : returns all my lists
    POST : create a new list
    DELETE : erase a list

    '''
    token = PARAMS.get('token', '')
    if token == '':
        return("you need to log in", 401)
    else:
        userid = decode_auth_token(token)
        if type(userid)==str:
            return("you need to sign in again", 401)
        else:
            if request.method == 'GET':
                res = db.get_lists_of_user(userid=userid)
                app.logger.debug('all lists of user', res)
                if res == []:
                    return(Response(status=404))
                else:
                    return(jsonify(res), 200)
            elif request.method == 'POST':
                if not 'listenom' in PARAMS:
                    return(Response(status=400))
                else:
                    db.post_a_list(nom=PARAMS.get('listenom'), userid=userid)
                    app.logger.debug('new list posted', PARAMS.get('listenom'))
                    app.logger.debug('userid', userid)
                    return(Response(status=201))
            else : 
                if not 'listenom' in PARAMS:
                    return(Response(status=400))
                else:
                    listid = db.get_listid_user(userid=userid, listenom=PARAMS.get('listenom'))
                    app.logger.debug(listid[0][0])
                    listid = listid[0][0]
                    if listid != []:
                        db.clean_up_list(listid=listid)
                        db.erase_list(listid=listid)
                        return('Successfully deleted', 204)

@app.route('/meslistes/<string:listenom>', methods=['GET', 'POST', 'DELETE'])
def get_books_lists_user(listenom):
    '''
    GET : returns all the books I have put in my list listenom
    POST : post a new book in my list listenom
    DELETE : remove a book from my list listenom
    '''

    token = PARAMS.get('token', '')
    if token == '':
        return('you need to log in', 401)
    else:
        userid = decode_auth_token(token)
        if type(userid)==str:
            return('you need to sign in again', 401)
        
        else:
            if request.method == 'GET':
                res = db.get_books_list_user(userid=userid, listenom=listenom)
                if res == []:
                    return(Response(status=404))
                else:
                    return(jsonify(res), 200)
            else:
                listid = db.get_listid_user(userid=userid, listenom=listenom) # gives the id of the list listenom of user
                num_lid = db.get_lid()
                if listid == [] or not 'lid' in PARAMS:
                    return(Response(status=400))
                else:
                    listid = listid[0][0]
                    lid = int(PARAMS.get('lid'))
                    if not (lid,) in num_lid: # book does not exist in database
                        return(Response(status=400))
                    else:
                        check_primary = db.get_rel_lid_listid()
                        if request.method == 'POST' and not (lid,listid) in check_primary:
                            db.add_book_list_user(lid=lid, listid=listid)
                            return('Added to list '+ listenom, 201)
                        elif request.method == 'DELETE' and (lid,listid) in check_primary:
                            db.delete_book_from_list(lid=lid, listid=listid)
                            return('Book successfully deleted from list '+ listenom, 204)
                        else:
                            return(Response(status=204))



