const express = require("express");
const router = express.Router();
//creates an array of all the types of furniture that exits in the database
const typeList = (db) => {
  const type = [];
  for (let item of db) {
    if (!type.includes(item["type"])) {
      type.push(item["type"]);
    }
  }
  return type;
};

module.exports = (db) => {
  //gets the user favourites items
  const getUserFavouritesIdByUserId = (userId) => {
    return db
      .query(
        `SELECT items.id FROM items
            JOIN favourites
            ON favourites.item_id = items.id
            WHERE user_id = $1;`,
        [userId]
      )
      .then((data) => {
        let userFavourites = data.rows;
        let userFavouritesIds = [];
        userFavourites.forEach((userFavourite) => {
          userFavouritesIds.push(userFavourite.id);
        });
        return userFavouritesIds;
      })
      .catch((err) => console.error("query error", err.stack));
  };

  //gets all featured items
  const getAllItems = () => {
    return db
      .query(
        `SELECT id,photo,title,price,is_sold,type , is_featured
              FROM items`
      )
      .then((data) => {
        let items = data.rows;
        return items;
      })
      .catch((err) => console.error("query error", err.stack));
  };

  //Renders the home page with the featured items

  router.get("/", (req, res) => {
    const userId = req.session["user_id"];
    const username = req.session["username"];
    getAllItems().then((items) => {
      getUserFavouritesIdByUserId(userId)
        .then((favouritesIds) => {
          const types = typeList(items);
          let templateVars = {
            favouritesIds,
            user: username,
            types,
            items,
          };
          res.render("index", templateVars);
        })
        .catch((err) => {
          res.status(500).json({ error: err.message });
        });
    });
  });
  return router;
};
