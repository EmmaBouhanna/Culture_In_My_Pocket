-- create application stuff
CREATE TABLE Auteur(
   aid SERIAL PRIMARY KEY,
   prenom VARCHAR(400) NOT NULL,
   nom VARCHAR(500) NOT NULL,
   ne DATE,
   mort DATE,
   pseudo TEXT NOT NULL,
   UNIQUE(prenom, nom, pseudo)
);

CREATE TABLE Collec(
   cid SERIAL PRIMARY KEY,
   cnom VARCHAR(50) NOT NULL,
   UNIQUE(cnom)
);


CREATE TABLE Nationalite(
   nid SERIAL PRIMARY KEY,
   nnom VARCHAR(50) NOT NULL,
   UNIQUE(nnom)
); -- language names in French

CREATE TABLE Theme(
   tid SERIAL PRIMARY KEY,
   themenom VARCHAR(50) NOT NULL,
   UNIQUE(themenom)
);

CREATE TABLE Utilisateur(
   userid SERIAL PRIMARY KEY,
   pseudo VARCHAR(50),
   mdp VARCHAR(100),
   naissance DATE,
   presentation VARCHAR(500),
   isAdmin BOOLEAN NOT NULL,
   UNIQUE(pseudo)
);

CREATE TABLE Liste(
   listeid SERIAL PRIMARY KEY,
   nom VARCHAR(50) NOT NULL,
   userid INTEGER NOT NULL REFERENCES Utilisateur,
   UNIQUE(nom, userid)
);

CREATE TABLE Livre(
   lid SERIAL PRIMARY KEY,
   titre VARCHAR(500) NOT NULL,
   tome INTEGER, -- le numéro de tome si le livre est une série
   annee VARCHAR(100) NOT NULL,
   categorie VARCHAR(100),
   langue VARCHAR(50),
   note_moyenne FLOAT,
   res TEXT, --résumé du livre
   cid INTEGER NOT NULL REFERENCES Collec,
   isbn VARCHAR(200),
   coverlink TEXT
);


CREATE TABLE A_ecrit(
   lid INTEGER NOT NULL REFERENCES Livre,
   aid INTEGER NOT NULL REFERENCES Auteur,
   PRIMARY KEY(lid, aid)
);

CREATE TABLE Livre_a_Theme(
   lid INTEGER NOT NULL REFERENCES Livre,
   tid INTEGER NOT NULL REFERENCES Theme,
   PRIMARY KEY(lid, tid)
);
/*
CREATE TABLE Collec_a_Theme(
   cid INTEGER NOT NULL REFERENCES Collec,
   tid INTEGER NOT NULL REFERENCES Theme,
   PRIMARY KEY(cid, tid)
);
*/

CREATE TABLE Auteur_vient_de(
   aid INTEGER NOT NULL REFERENCES Auteur,
   nid INTEGER NOT NULL REFERENCES Nationalite,
   PRIMARY KEY(aid, nid)
);


CREATE TABLE Aime(
   tid INTEGER NOT NULL REFERENCES Theme,
   userid INTEGER NOT NULL REFERENCES Utilisateur,
   PRIMARY KEY(tid, userid)
);

CREATE TABLE User_vient_de(
   nid INTEGER NOT NULL REFERENCES Nationalite,
   userid INTEGER NOT NULL REFERENCES Utilisateur,
   PRIMARY KEY(nid, userid)
);

CREATE TABLE Est_dans(
   eid SERIAL PRIMARY KEY,
   lid INTEGER NOT NULL REFERENCES Livre,
   listeid INTEGER NOT NULL REFERENCES Liste,
   note FLOAT,
   commentaire VARCHAR(500),
   CHECK(note>=0 AND note<=5)
);
