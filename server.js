// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const app = express();
const morgan = require("morgan");
let cookieSession = require("cookie-session");

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  "/styles",
  sass({
    src: __dirname + "/styles",
    dest: __dirname + "/public/styles",
    debug: true,
    outputStyle: "expanded",
  })
);
app.use(express.static("public"));

app.use(
  cookieSession({
    name: "session",
    keys: [
      "f080ac7b-b838-4c5f-a1f4-b0a9fee10130",
      "c3fb18be-448b-4f6e-a377-49373e9b7e1a",
    ],
  })
);

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const widgetsRoutes = require("./routes/widgets");

const homeRoutes = require("./routes/homepage");
const loginRoutes = require("./routes/login");
const logoutRoutes = require("./routes/logout");
const usersRoutes = require("./routes/user");
const postNewItems = require("./routes/post_items");
const messagesRoutes = require("./routes/messages");
const messagesHelper = require("./public/scripts/messages-helperFunctions.js");
const messagesRoute = require("./routes/messages-Route")(messagesHelper);
const itemRoutes = require("./routes/item");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own

app.use("/", homeRoutes(db));
app.use("/posts", postNewItems(db));
app.use("/login", loginRoutes(db));
app.use("/logout", logoutRoutes(db));
app.use("/messages", messagesRoutes(db));
app.use("/user", usersRoutes(db));
app.use("/messagesRoute", messagesRoute);
app.use("/item", itemRoutes(db));

app.listen(PORT, () => {
  console.log(
    `Example app listening on port ${PORT}\n\n~~~~~~~BEGIN~~~~~~~\n\n\n`
  );
});
