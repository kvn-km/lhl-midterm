// helper functions for item page

const fetchAllItems = (db) => {
  return db.query(`SELECT * FROM items;`)
    .catch(error => { console.log("FETCH ALL ITEMS Fail", error); });
};

const fetchAllActiveItems = (db) => {
  return db.query(`SELECT * FROM items WHERE is_active = TRUE;`)
    .catch(error => { console.log("FETCH ALL ACTIVE Fail", error); });
};

const fetchFeaturedItems = (db) => {
  return db.query(`SELECT * FROM items WHERE is_featured = TRUE;`)
    .catch(error => { console.log("FETCH FEATURED Fail", error); });
};

const fetchAllUserItems = (db, cookies) => {
  const query = {
    text: `SELECT * FROM items WHERE seller_id = $1;`,
    values: [cookies.user_id]
  };
  return db.query(query)
    .catch(error => { console.log("FETCH ALL USER Fail", error); });
};

const fetchUserFavItems = (db, cookies) => {
  const query = {
    text: `SELECT * FROM favourites WHERE user_id = $1;`,
    values: [cookies.user_id]
  };
  return db.query(query)
    .catch(error => { console.log("FETCH USER FAVS Fail", error); });
};

const fetchItemFromID = (db, item_id) => {
  const query = {
    text: `SELECT * FROM items WHERE id = $1;`,
    values: [item_id]
  };
  return db.query(query)
    .catch(error => { console.log("FETCH ITEM Fail", error); });
};

const fetchItemTypes = (db) => {
  const query = {
    text: `SELECT type FROM items GROUP BY type;`,
  };
  return db.query(query)
    .catch(error => { console.log("FETCH ITEM TYPES Fail", error); });
};

const buyItem = (db, item_id, user_id) => {
  const query = {
    text: `UPDATE items SET is_active = 'FALSE', is_sold = 'TRUE', is_featured = 'FALSE', seller_id = $1 WHERE id = $2 RETURNING *;`,
    values: [user_id, item_id]
  };
  return db.query(query)
    .catch(error => { console.log("BUY ITEM Fail", error); });
};



module.exports = {
  fetchAllItems,
  fetchAllActiveItems,
  fetchFeaturedItems,
  fetchAllUserItems,
  fetchUserFavItems,
  fetchItemFromID,
  fetchItemTypes,
  buyItem
};
