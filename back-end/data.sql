-- initial data for testing purposes
INSERT INTO Auteur(prenom, nom, ne, mort, pseudo) VALUES ('Frederique', 'Audoin-Rouzeau', '1957-06-17', NULL, 'Fred Vargas'),
('Gabriel', 'Katz', '1948-01-01', NULL, 'Gabriel Katz'), ('Jane', 'Austen', '1775-12-16', '1817-07-18', 'Jane Austen');

INSERT INTO Collec(cnom) VALUES ('sans collection'),('Commissaire Jean-Baptiste Adamsberg'), ('La Part des Ombres');

INSERT INTO Nationalite(nnom) VALUES ('Française'), ('Anglaise');

INSERT INTO Theme(themenom) VALUES ('enquête policière'), ('meurtre'), ('Islande'), ('pouvoir'), ('combat'), ('rebellion'), ('féministe'), ('Angleterre'), ('Amour');

INSERT INTO Utilisateur(pseudo, mdp, naissance, presentation, isAdmin) VALUES ('19trin', 'ERJGI04I56u', '1999-01-01', 'prez Jump', false), 
('19frode', 'dghuis6i', '1999-01-02', 'film maker', false), 
('19boubou', 'pbkdf2:sha256:150000$Fb3fEYKV$7304605a085615e63cd388ecb29206f2583295935687ae37f0387a9794bedae9', '2000-08-25', 'prez mediamines', false), ('cimp', 'pbkdf2:sha256:150000$Z2zo5a7I$a71974696d054a2250fb3d061ce81323487c0c62b283ba5199cddb733a5110fc', '1999-01-03', 'le boss', true);
-- mdp de cimp=bossdelinfo, mdp de 19boubou = emmaboubou

INSERT INTO Liste(nom, userid) VALUES ('Travail', 1), ('Vacances', 2), ('Vacances', 3), ('deja lu', 1), ('deja lu', 2), ('lu', 3), ('deja lu', 4);

INSERT INTO Livre(titre, tome, annee, categorie, langue, note_moyenne, cid) VALUES ('Pride and Prejudices',NULL, '1813-01-01', 'historique', 'Anglais', 4.5, 1),
('La Part des Ombres', 1, '2018-01-01', 'thriller', 'Français', 3.0, 3), ('Temps glaciaires', NULL, '2015-01-01', 'thriller', 'Français', 2.5, 2);

INSERT INTO A_ecrit(lid, aid) VALUES (1, 3), (2, 2), (3, 1);
INSERT INTO Livre_a_Theme(lid, tid) VALUES (1, 7), (1, 8), (2, 5), (2, 6), (1, 1), (1, 3);

INSERT INTO Auteur_vient_de(aid, nid) VALUES (1, 1), (2,1), (2,2);


INSERT INTO Aime(tid, userid) VALUES (1, 1), (1, 2), (3, 2), (6, 3), (7, 1);


INSERT INTO User_vient_de(nid, userid) VALUES (1,1), (1,2), (1,3);

INSERT INTO Est_dans(lid,listeid, note, commentaire) VALUES (1, 6, 5.0, 'Wouah incroyable comme livre'), 
(1, 5, 4.0, 'étonnant'), (2, 4, 3.0, 'un peu mitigé'), (3, 5, 2.5, 'bof');
INSERT INTO Est_dans(lid, listeid) VALUES (1, 3), (1, 1), (2, 2), (3, 2);

