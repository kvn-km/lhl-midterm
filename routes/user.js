const express = require("express");
const router = express.Router();

module.exports = (db) => {
  //GETS the seller items that are on sale
  const getSellerItemsBySellerId = (sellerId) => {
    return db
      .query(`SELECT * FROM items WHERE seller_id = $1;`, [sellerId])
      .then((data) => {
        let sellerItems = data.rows;
        return sellerItems;
      })
      .catch((err) => console.error("query error", err.stack));
  };

  //GETS the user favourites items
  const getUserFavouritesById = (userId) => {
    return db
      .query(
        `SELECT * FROM items
              JOIN favourites
              ON favourites.item_id = items.id
              WHERE user_id = $1;`,
        [userId]
      )
      .then((data) => {
        let userFavourites = data.rows;
        return userFavourites;
      })
      .catch((err) => console.error("query error", err.stack));
  };

  // UNFAVOURITES an item
  const unfavouriteItem = (itemId) => {
    return db.query(
      `DELETE FROM items
       JOIN favourites
       ON favourites.item_id = items.id
       WHERE items.id= $1;`,
      [itemId]
    );
  };

  // FAVOURITES an item
  const favouriteItem = (userId, itemId) => {
    return db.query(
      `INSERT INTO favourites (user_id, item_id)
       VALUES ($1, $2)`,
      [userId, itemId]
    );
  };

  //DELETES the item from the database
  const deleteItemById = (itemId) => {
    return db.query(
      `DELETE FROM items
            WHERE items.id= $1;`,
      [itemId]
    );
  };

  // MARKS the item as sold
  const markItemAsSold = (itemId) => {
    return db.query(
      `UPDATE items
          SET is_sold = TRUE
            WHERE items.id= $1;`,
      [itemId]
    );
  };

  //RENDERS the user page with its listings
  router.get("/", (req, res) => {
    const userId = req.session["user_id"];
    const username = req.session["username"];
    getUserFavouritesById(userId).then((favourites) => {
      getSellerItemsBySellerId(userId).then((sellerItems) => {
        let templateVars = { favourites, user: username, sellerItems };
        res.render("userpage", templateVars);
      });
    });
  });

  //DELETES the item from the database
  router.post("/:id/delete", (req, res) => {
    const userId = req.session["user_id"];
    const username = req.session["username"];
    const itemId = req.params.id;
    deleteItemById(itemId).then(() => res.redirect(`/user`));
  });

  //MARKS the item as sold in the database
  router.post("/:id/sold", (req, res) => {
    const userId = req.session["user_id"];
    const username = req.session["username"];
    const itemId = req.params.id;
    markItemAsSold(itemId).then(() => res.redirect(`/user`));
  });

  return router;
};
