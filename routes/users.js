const express = require("express");
const router = express.Router();

module.exports = (db) => {
  //gets the seller items that are on sale
  const getSellerItemsBySellerId = (sellerId) => {
    return db
      .query(`SELECT * FROM items WHERE seller_id = $1;`, [sellerId])
      .then((data) => {
        let sellerItems = data.rows;
        return sellerItems;
      })
      .catch((err) => console.error("query error", err.stack));
  };

  //gets the user favourites items
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

  router.get("/:id", (req, res) => {
    const userId = req.session["user_id"];
    const username = req.session["username"];
    getUserFavouritesById(userId).then((favourites) => {
      getSellerItemsBySellerId(userId).then((sellerItems) => {
        let templateVars = { favourites, user: username, sellerItems };
        res.render("userpage", templateVars);
      });
    });
  });

  return router;
};
