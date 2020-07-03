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
    text: `SELECT item_id FROM favourites WHERE user_id = $1;`,
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
const fetchSellerEmail = (db, item_id) => {
  const query = {
    text: `SELECT email FROM users JOIN items ON users.id = items.seller_id WHERE items.id = ${item_id};`,
  };
  return db.query(query)
    .catch(error => { console.log("FETCH ITEM TYPES Fail", error); });
};




const unFavItem = (db, item_id, user_id) => {
  const query = {
    text: `DELETE FROM favourites WHERE user_id = ${user_id} AND item_id = ${item_id};`
  };
  return db.query(query)
    .catch(error => { console.log("unFAV ITEM Fail", error); });
};
const favItem = (db, item_id, user_id) => {
  const query = {
    text: `INSERT INTO favourites (user_id, item_id) VALUES(${user_id}, ${item_id});`
  };
  return db.query(query)
    .catch(error => { console.log("FAV ITEM Fail", error); });
};

const activateItem = (db, item_id) => {
  const query = {
    text: `UPDATE items SET is_active = 'TRUE' WHERE id = ${item_id} RETURNING *;`
  };
  return db.query(query)
    .catch(error => { console.log("ACTIVATE ITEM Fail", error); });
};
const deactivateItem = (db, item_id) => {
  const query = {
    text: `UPDATE items SET is_active = 'FALSE' WHERE id = ${item_id} RETURNING *;`
  };
  return db.query(query)
    .catch(error => { console.log("ACTIVATE ITEM Fail", error); });
};

const buyItem = (db, item_id, user_id) => {
  unFavItem(db, item_id, user_id);
  const query = {
    text: `UPDATE items SET is_active = 'FALSE', is_sold = 'TRUE', is_featured = 'FALSE', seller_id = $1 WHERE id = $2 RETURNING *;`,
    values: [user_id, item_id]
  };
  return db.query(query)
    .catch(error => { console.log("BUY ITEM Fail", error); });
};


const soldItem = (db, item_id, user_id) => {
  unFavItem(db, item_id, user_id);
  const query = {
    text: `UPDATE items SET is_active = 'FALSE', is_sold = 'TRUE', is_featured = 'FALSE', seller_id = $1 WHERE id = $2 RETURNING *;`,
    values: [user_id, item_id]
  };
  return db.query(query)
    .catch(error => { console.log("BUY ITEM Fail", error); });
};

//
// MESSAGES
//

const getConvos = (db, user_id) => {
  const query = {
    text: `SELECT * FROM messages WHERE seller_id = $1;`,
    values: [user_id]
  };
  return db.query(query)
    .catch(error => { console.log("MESSAGES GET Fail", error); });
};

const getMessagesWithSeller = (db, contacts, item_id) => {
  const query = {
    text: `SELECT message FROM messages WHERE sender_id = $1 AND receiver_id = $2 AND item_id = $3;`,
    values: [contacts.user_id, contacts.seller_id, item_id]
  };
  return db.query(query)
    .catch(error => { console.log("MESSAGES GET Fail", error); });
};

const getMessages = (db, contacts, item_id) => {
  const query = {
    text: `SELECT * FROM messages WHERE item_id = $3 AND ((sender_id = $1 AND receiver_id = $2) OR (sender_id = $2 AND receiver_id = $1)) ORDER BY id ASC;`,
    values: [contacts.user_id, contacts.seller_id, item_id]
  };
  return db.query(query)
    .catch(error => { console.log("MESSAGES GET Fail", error); });
};

const sendMessagToSeller = (db, contacts, item_id, message) => {
  const query = {
    text: `INSERT INTO messages(item_id, sender_id, receiver_id, message, timestamp)
      VALUES ($1, $2, $3, $4, NOW()) RETURNING *;`,
    values: [item_id, contacts.user_id, contacts.seller_id, message]
  };
  return db.query(query)
    .catch(error => { console.log("MESSAGES SEND Fail", error); });
};




const createVarsMulti = (db, cookies, req) => {
  // const user_id = req.session.user_id;
  // const item_id = req.params.item_id;
  let theItem = [];
  let myFavouritesIds = [];
  let theTypes = [];
  let myFeaturedItems = [];
  return fetchAllActiveItems(db)
    .then(data1 => {
      theItem.push(data1.rows);
      return fetchItemTypes(db)
        .then((data2) => {
          for (let aType of data2.rows) {
            theTypes.push(aType.type);
          }
          return fetchUserFavItems(db, cookies)
            .then((data3) => {
              for (let favs of data3.rows) {
                myFavouritesIds.push(favs.item_id);
              }
              return fetchFeaturedItems(db)
                .then((data4) => {
                  for (let row of data4.rows) {
                    myFeaturedItems.push(row);
                  }
                })
                .then((data5) => {
                  //
                  // create variable
                  //
                  templateVars = {
                    anItem: true,
                    user: cookies,
                    item: theItem[0],
                    types: theTypes,
                    favouritesIds: myFavouritesIds[0],
                    featuredItems: myFeaturedItems
                  };
                  return templateVars;
                });
            });
        });
    });
};
const createVarsSingle = (db, cookies, req) => {
  const user_id = req.session.user_id;
  const item_id = req.params.item_id;
  let theItem = [];
  let myFavouritesIds = [];
  let theTypes = [];
  let myFeaturedItems = [];
  let sellerEmail = "";
  let templateVars = {};
  return fetchItemFromID(db, item_id)
    .then((data1) => {
      theItem.push(data1.rows[0]);
      return fetchItemTypes(db)
        .then((data2) => {
          for (let aType of data2.rows) {
            theTypes.push(aType.type);
          }
          return fetchUserFavItems(db, cookies)
            .then((data3) => {
              let theFavs = data3.rows;
              for (let favs of theFavs) {
                myFavouritesIds.push(favs.item_id);
              }
              return fetchFeaturedItems(db)
                .then((data4) => {
                  for (let row of data4.rows) {
                    myFeaturedItems.push(row);
                  }
                  return fetchSellerEmail(db, item_id)
                    .then((email) => {
                      sellerEmail = email.rows[0];
                      templateVars["email"] = sellerEmail;
                    })
                    .then((data5) => {
                      //
                      // create variable
                      //
                      templateVars = {
                        email: sellerEmail,
                        anItem: true,
                        user: cookies,
                        item: theItem[0],
                        types: theTypes,
                        favouritesIds: myFavouritesIds,
                        featuredItems: myFeaturedItems
                      };
                      return templateVars;
                    });
                });
            });
        });
    });
};
const createVarsMSG = (db, contacts, req) => {
  const user_id = req.session.user_id;
  const item_id = req.params.item_id;
  let theItem = [];
  let templateVars = {};
  return fetchItemFromID(db, item_id)
    .then((data1) => {
      theItem.push(data1.rows[0]);
      getMessages(db, contacts, item_id)
        .then((messages) => {
          const theMessages = messages.rows;
          templateVars = {
            user: cookies,
            item: theItem[0],
            messages: theMessages
          };
          return templateVars;
        });
    });
};



module.exports = {
  fetchAllItems,
  fetchAllActiveItems,
  fetchFeaturedItems,
  fetchAllUserItems,
  fetchUserFavItems,
  fetchItemFromID,
  fetchItemTypes,
  fetchSellerEmail,
  unFavItem,
  activateItem,
  deactivateItem,
  favItem,
  buyItem,
  soldItem,
  getMessagesWithSeller,
  sendMessagToSeller,
  getMessages,
  getConvos,
  createVarsMulti,
  createVarsSingle,
  createVarsMSG
};
