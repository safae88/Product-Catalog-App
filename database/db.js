import * as SQLite from 'expo-sqlite'; //contients des (fncs , ..) comme : runAsync() | execAsync() | getAllAsync()

let dbInstance = null;
// Ouvre la base une seule fois puis réutilise la même instance.
export const getDb = async () => {
  if (dbInstance) {
    dbInstance = await SQLite.openDatabaseAsync('products.db'); //open db a partir de la bib SQLite qui contient des fncs comme (openDatabaseAsync())
  }
  return dbInstance;
};

// Initialise la base et crée la table si elle n'existe pas.
export const initDatabase = async () => {
  const db = await getDb();
  //executer la requete SQL
  await db.execAsync(` 
    CREATE TABLE IF NOT EXISTS table1 (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titLe TEXT,
      price REAL,
      image TEXT
    );
  `);
  return db;
};

// Sauvegarde un produit dans la table locale.
export const saveProduct = async (product) => {
  const db = await initDatabase();
  //modifier la BD
  await db.runAsync(
    'INSERT OR IGNORE INTO table1 (id, title, price, image) VALUES (?, ?, ?, ?);', //IGNORE to save once not multiple times!
    [product.id ,product.title, product.price, product.image]
  );
};

// Récupérer les produits sauvegardés
export const getSavedFavoris = async () => {
  const db = await initDatabase();
  //Lire les données
  const result = await db.getAllAsync(
    `SELECT * FROM table1`
  );

  return result;
};

// Supprimer un produit sauvegardé via son id
export const deleteSavedFavori = async (productId) => {
  const db = await initDatabase();
  await db.runAsync('DELETE FROM table1 WHERE id = ?;', [productId]);
};
