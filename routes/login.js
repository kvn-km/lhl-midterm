const express = require("express");
const router = express.Router();

module.exports = (db) => {
  //get the user object with its username
  const getUserByUsername = (username) => {
    return db
      .query(`SELECT * FROM users WHERE username LIKE $1;`, [username])
      .then((data) => {
        return data.rows[0];
      })
      .catch((err) => console.error("query error", err.stack));
  };
  //Renders the login form
  router.get("/", (req, res) => {
    const username = req.session["username"];
    console.log("username:", username);
    let templateVars = { user: username };
    res.render("login", templateVars);
  });
  //Sets the cookie when login in
  router.post("/", (req, res) => {
    const username = req.body.username;
    getUserByUsername(username).then((user) => {
      req.session["user_id"] = user["id"];
      req.session["username"] = user["username"];
      console.log("req.session:", req.session);
      res.redirect(`/`);
    });
  });
  return router;
};
