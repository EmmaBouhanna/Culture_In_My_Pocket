-- SQL queries to be fed to anosdb

-- name: now
SELECT CURRENT_TIMESTAMP;

-- name: get_books
SELECT l.*, CASE WHEN a.pseudo IS NULL THEN a.prenom ||' '|| a.nom ELSE a.pseudo END AS aut 
FROM Livre AS l JOIN A_Ecrit USING(lid) JOIN Auteur AS a USING(aid) WHERE note_moyenne>=:note AND titre LIKE :titre AND categorie LIKE :categorie
LIMIT 10;
--name: get_themes
SELECT * FROM Theme LIMIT 36;

--name: get_suggestions

SELECT t.themenom FROM Theme AS t JOIN Aime USING(tid)
WHERE userid= :userid;

--name: get_lid
SELECT lid FROM Livre;

--name: get_books_of_theme
SELECT DISTINCT(l.*) FROM Livre AS l JOIN Livre_a_Theme USING (lid) JOIN Theme USING(tid)
WHERE themenom LIKE :nom;

--name: get_books_of_aut
SELECT l.*, CASE WHEN a.pseudo IS NULL THEN a.prenom ||' '|| a.nom ELSE a.pseudo END AS aut FROM Livre AS l JOIN A_ecrit USING(lid) JOIN Auteur AS a USING(aid)
WHERE nom =:anom OR pseudo=:anom OR prenom=:anom
ORDER BY 1;

--name: get_collections
SELECT * FROM Collec;

--name: get_books_of_collec
SELECT * FROM Livre WHERE cid= :cid;

--name: get_all_users
SELECT * FROM Utilisateur;

--name: get_user
SELECT * FROM Utilisateur WHERE userid= :userid;

--name: get_lists_of_user
SELECT * FROM Liste WHERE userid= :userid;

--name: post_a_list!
INSERT INTO Liste(nom, userid) VALUES (:nom, :userid);

--name: get_books_list_user
SELECT li.* FROM Livre AS li JOIN Est_dans USING(lid) JOIN Liste AS l USING(listeid)
WHERE l.nom LIKE :listenom AND userid= :userid;

--name: get_listid_user
SELECT listeid FROM Liste WHERE userid= :userid AND nom LIKE :listenom;

--name: get_rel_lid_listid
SELECT lid,listeid FROM Est_dans;

--name: add_book_list_user!
INSERT INTO Est_dans(lid, listeid) VALUES (:lid, :listid);

--name: verify_auth
SELECT mdp FROM Utilisateur WHERE pseudo =:pseudo;

--name: get_userid
SELECT userid FROM Utilisateur WHERE pseudo = :login;

--name : isAdmin
SELECT isAdmin FROM Utilisateur WHERE userid= :userid;

--name: post_user
INSERT INTO Utilisateur(pseudo, mdp, naissance, presentation, isAdmin) VALUES (:pseudo, :mdp, :naissance, :pres, false) RETURNING userid;

--name: get_lastuser
SELECT userid FROM Utilisateur ORDER BY 1 DESC LIMIT 1;

--name: post_themes!
INSERT INTO Aime(tid, userid) VALUES (:tid, :userid);

--name: update_user_pres!
UPDATE Utilisateur SET presentation= :pres
WHERE userid= :userid;

--name: update_user_naissance!
UPDATE Utilisateur SET naissance= :naissance
WHERE userid= :userid;

--name: delete_book_from_list!
DELETE FROM Est_dans WHERE listeid= :listid AND lid= :lid;

--name: get_authors
SELECT DISTINCT(Auteur.*) FROM Auteur 
JOIN A_ecrit USING(aid)
JOIN Livre USING(lid)
WHERE categorie LIKE :categorie AND pseudo LIKE :titre AND note_moyenne>= :note
LIMIT 10;

--name: clean_up_list!
DELETE FROM Est_dans WHERE listeid= :listid;

--name: erase_list!
DELETE FROM Liste WHERE listeid= :listid;