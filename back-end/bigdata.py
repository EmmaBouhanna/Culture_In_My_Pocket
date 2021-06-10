import pandas
import psycopg2


df = pandas.read_csv('goodreads_books.csv')
df_utile = df[['title', 'date_published', 'average_rating', 'isbn', 'cover_link','description', 'genre_and_votes', 'author']]
df_livres = df_utile.dropna(how='any')

#  ajouter les collections après
conn = psycopg2.connect("dbname=CIMP application_name=CIMP-backend")
with conn.cursor() as curs:
    for index, row in df_livres.iterrows():
        if index<10000:
            row_book = list(row)[:-1] # only the book part and the cid which corresponds to 'pas de collection'
            genre = str(row_book[-1]).split(',')[0][:-3]# keep only the most successful genre"
            if genre[-1] in ['1','2','3','4','5','6','7', '8', '9']:
                genre = genre[:-1]
            row_book = row_book[:-1] + [genre] + [1]
            row_auth = row[-1].split(',')
            curs.execute("INSERT INTO Livre(titre, annee, note_moyenne, isbn, coverlink, res, categorie, cid) VALUES %s RETURNING lid", (tuple(row_book), ))
            book_id = curs.fetchone()[0]
            curs.execute("INSERT INTO Theme(themenom) VALUES %s ON CONFLICT DO NOTHING", ((genre, ), ))
            for x in row_auth:
                x = [x.split()[0], x.split()[-1], x ] # prenom, nom, pseudo (si plusieurs prenoms on met que le premier et les autres vont dans le pseudo)
                curs.execute("INSERT INTO Auteur(prenom, nom, pseudo) VALUES %s ON CONFLICT (prenom, nom, pseudo) DO UPDATE SET pseudo=EXCLUDED.pseudo RETURNING aid", (tuple(x), ))
                author_id = curs.fetchone()[0]
                curs.execute("INSERT INTO A_ecrit(lid, aid) VALUES %s ON CONFLICT DO NOTHING", ((book_id, author_id), ))
    conn.commit() 
    curs.close()
conn.close()


