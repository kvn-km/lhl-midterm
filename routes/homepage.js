const express = require("express");
const router = express.Router();

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
  //Renders the home page with the featured items

  router.get("/", (req, res) => {
    db.query(`SELECT id,photo,title,price,type FROM items`)
      .then((data) => {
        const featuredItems = data.rows;
        const types = typeList(featuredItems);
        const username = req.session["username"];
        let templateVars = { featuredItems, user: username, types };
        res.render("index", templateVars);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
