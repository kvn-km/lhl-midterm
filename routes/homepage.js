const express = require("express");
const router = express.Router();

module.exports = (db) => {
  //Renders the home page with the featured items
  router.get("/", (req, res) => {
    db.query(`SELECT photo, title FROM items`)
      .then((data) => {
        const featuredItems = data.rows;
        const username = req.session["username"];
        let templateVars = { featuredItems, user: username };
        res.render("index", templateVars);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
