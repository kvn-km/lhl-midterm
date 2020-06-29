const express = require("express");
const router = express.Router();

module.exports = (db) => {
  //CLEARS the cookie when a user is logging out
  router.post("/", (req, res) => {
    req.session = null;
    res.redirect(`/`);
  });
  return router;
};
