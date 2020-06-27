const express = require('express');
const router  = express.Router();



module.exports = (db) => {
  router.get("/new", (req, res) => {
    res.render("post_items")
  });
  return router;
};
